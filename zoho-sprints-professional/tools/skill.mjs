import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const version = '3.0.0';
export const SKILL_NAMES = [
  'zoho-workflow',
  'zoho-sprints',
  'user-story-authoring',
  'zoho-project-knowledge',
  'zoho-work-item-linking',
  'zoho-release-management',
  'zoho-task-authoring',
];

const canonicalRelative = (name) => `.agents/skills/${name}`;
const distributionRelative = (name) => `skills/${name}`;
const normalize = (name) => name.split(path.sep).join('/');
const digest = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');

function files(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name, 'en'))
    .flatMap((entry) => {
      const current = path.join(directory, entry.name);
      return entry.isDirectory() ? files(current) : [current];
    });
}

function within(base, candidate) {
  const relative = path.relative(base, candidate);
  return Boolean(relative) && relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}

function manifestFor(base) {
  return {
    name: 'Zoho Sprints Professional Skills',
    version,
    skills: SKILL_NAMES.map((name) => {
      const source = path.join(base, canonicalRelative(name));
      return {
        name,
        canonical: `${canonicalRelative(name)}/SKILL.md`,
        distribution: `${distributionRelative(name)}/SKILL.md`,
        files: files(source).map((file) => ({
          path: normalize(path.relative(source, file)),
          sha256: digest(file),
        })),
      };
    }),
  };
}

export function sync(base = root) {
  const absolute = fs.realpathSync(base);
  for (const name of SKILL_NAMES) {
    const source = path.join(absolute, canonicalRelative(name));
    const destination = path.join(absolute, distributionRelative(name));
    if (!fs.existsSync(path.join(source, 'SKILL.md'))) throw new Error(`Canonical skill is missing: ${name}`);
    if (!within(absolute, destination)) throw new Error(`Distribution path is outside package: ${name}`);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    if (!within(absolute, fs.realpathSync(path.dirname(destination)))) throw new Error(`Distribution parent follows a link outside package: ${name}`);
    if (fs.existsSync(destination)) {
      if (fs.lstatSync(destination).isSymbolicLink()) throw new Error(`Refusing to replace a symlinked distribution: ${name}`);
      fs.rmSync(destination, { recursive: true, force: true });
    }
    fs.cpSync(source, destination, { recursive: true });
  }
  fs.writeFileSync(path.join(absolute, 'manifest.json'), `${JSON.stringify(manifestFor(absolute), null, 2)}\n`);
}

function frontmatter(text) {
  return text.replace(/\r\n/g, '\n').match(/^---\n([\s\S]+?)\n---\n/)?.[1] ?? null;
}

export function check(base = root) {
  const absolute = fs.realpathSync(base);
  const errors = [];

  for (const name of SKILL_NAMES) {
    const source = path.join(absolute, canonicalRelative(name));
    const distribution = path.join(absolute, distributionRelative(name));
    if (!fs.existsSync(path.join(source, 'SKILL.md'))) {
      errors.push(`canonical SKILL.md missing: ${name}`);
      continue;
    }

    const sourceFiles = files(source);
    const distributedFiles = files(distribution);
    const sourceNames = sourceFiles.map((file) => normalize(path.relative(source, file)));
    const distributedNames = distributedFiles.map((file) => normalize(path.relative(distribution, file)));
    if (JSON.stringify(sourceNames) !== JSON.stringify(distributedNames)) errors.push(`distribution differs: ${name} file set`);
    for (const fileName of sourceNames) {
      const target = path.join(distribution, fileName);
      if (!fs.existsSync(target) || digest(path.join(source, fileName)) !== digest(target)) {
        errors.push(`distribution differs: ${name}/${fileName}`);
      }
    }

    const fm = frontmatter(fs.readFileSync(path.join(source, 'SKILL.md'), 'utf8'));
    if (!fm || !new RegExp(`^name:\\s*${name}\\s*$`, 'm').test(fm) || !/^description:\s*\S.+$/m.test(fm)) {
      errors.push(`SKILL.md frontmatter requires ${name} name and description`);
    } else {
      const description = fm.match(/^description:\s*(.+)$/m)?.[1]?.trim() ?? '';
      if (!/^Use when\b/.test(description)) errors.push(`SKILL.md description must start with "Use when": ${name}`);
    }

    for (const file of sourceFiles) {
      const content = fs.readFileSync(file, 'utf8');
      if (/https:\/\/[^\s"']+\.zohomcp\.com\/mcp\//i.test(content)) errors.push(`private MCP endpoint in ${name}/${normalize(path.relative(source, file))}`);
      if (!file.endsWith('.md')) continue;
      const outsideFences = content.replace(/(^|\n)```[\s\S]*?\n```/g, '\n');
      for (const match of outsideFences.matchAll(/\]\(([^)]+)\)/g)) {
        const target = match[1].split('#')[0];
        if (!target || /^[a-z][a-z0-9+.-]*:/i.test(target)) continue;
        if (!fs.existsSync(path.resolve(path.dirname(file), target))) {
          errors.push(`broken link in ${name}/${normalize(path.relative(source, file))}: ${target}`);
        }
      }
    }
  }

  try {
    const contract = JSON.parse(fs.readFileSync(path.join(absolute, '.agents/skills/zoho-sprints/references/contract.json'), 'utf8'));
    if (contract.version !== 2 || JSON.stringify(contract.roles) !== JSON.stringify(['admin', 'developer']) || !Array.isArray(contract.action_states)) {
      errors.push('policy contract structure differs');
    }
  } catch { errors.push('policy contract is missing or invalid'); }

  try {
    const current = JSON.parse(fs.readFileSync(path.join(absolute, 'manifest.json'), 'utf8'));
    if (JSON.stringify(current) !== JSON.stringify(manifestFor(absolute))) errors.push('manifest is stale; run npm run sync');
  } catch { errors.push('manifest is missing or invalid'); }
  return errors;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const operation = process.argv[2];
  if (operation === 'sync') sync();
  else if (operation === 'check') {
    const errors = check();
    if (errors.length) {
      process.stderr.write(`${errors.join('\n')}\n`);
      process.exitCode = 1;
    } else process.stdout.write('All skill sources, distributions, links, contracts and manifests: valid.\n');
  } else {
    process.stderr.write('Usage: node tools/skill.mjs sync|check\n');
    process.exitCode = 2;
  }
}
