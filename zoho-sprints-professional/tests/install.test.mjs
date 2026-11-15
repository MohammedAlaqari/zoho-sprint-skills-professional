import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { SKILL_NAMES } from '../tools/skill.mjs';

const packageRoot = path.resolve(import.meta.dirname, '..');
const installer = path.join(packageRoot, 'tools', 'install.mjs');

function withTarget(run) {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), 'zoho-skill-install-'));
  try { run(target); } finally { fs.rmSync(target, { recursive: true, force: true }); }
}

test('Codex install copies every skill without MCP credentials', () => withTarget((target) => {
  execFileSync(process.execPath, [installer, '--editor', 'codex', '--target', target]);
  for (const name of SKILL_NAMES) {
    const installed = path.join(target, '.agents', 'skills', name);
    assert.ok(fs.existsSync(path.join(installed, 'SKILL.md')), `missing ${name}`);
  }
  const sprints = path.join(target, '.agents', 'skills', 'zoho-sprints');
  assert.ok(fs.existsSync(path.join(sprints, 'references', 'large-description-writes.md')));
  assert.ok(fs.existsSync(path.join(sprints, 'scripts', 'append-description.mjs')));
  assert.ok(fs.existsSync(path.join(sprints, 'references', 'audit-ledger.md')));
  assert.equal(fs.existsSync(path.join(sprints, 'mcp_sprint_config.json')), false);
}));

test('existing installation is refused unless force is explicit', () => withTarget((target) => {
  execFileSync(process.execPath, [installer, '--editor', 'codex', '--target', target]);
  const installed = path.join(target, '.agents', 'skills', 'zoho-sprints');
  const marker = path.join(installed, 'stale.txt');
  fs.writeFileSync(marker, 'old');
  const refused = spawnSync(process.execPath, [installer, '--editor', 'codex', '--target', target], { encoding: 'utf8' });
  assert.notEqual(refused.status, 0);
  assert.ok(fs.existsSync(marker));
  execFileSync(process.execPath, [installer, '--editor', 'codex', '--target', target, '--force']);
  assert.equal(fs.existsSync(marker), false);
  const backupRoot = path.join(target, '.zoho-sprints-skill-backups');
  const backups = fs.readdirSync(backupRoot).map((name) => path.join(backupRoot, name));
  assert.equal(backups.length, 1);
  assert.ok(fs.existsSync(path.join(backups[0], '.agents', 'skills', 'zoho-sprints', 'stale.txt')));
}));

for (const [editor, folder] of Object.entries({cursor: '.cursor', kiro: '.kiro', opencode: '.opencode', antigravity: '.agents', generic: '.agents', claude: '.claude'})) {
  test(`${editor} installs every skill in its discovery path`, () => withTarget((target) => {
    execFileSync(process.execPath, [installer, '--editor', editor, '--target', target]);
    for (const name of SKILL_NAMES) {
      const installed = path.join(target, folder, 'skills', name);
      assert.ok(fs.existsSync(path.join(installed, 'SKILL.md')), `missing ${name}`);
    }
    assert.ok(fs.existsSync(path.join(target, folder, 'skills', 'zoho-sprints', 'workflows', 'git-audit.md')));
    assert.ok(fs.existsSync(path.join(target, folder, 'skills', 'zoho-task-authoring', 'assets', 'task-template-ar-en.md')));
  }));
}

test('invalid editor does not change the target', () => withTarget((target) => {
  const result = spawnSync(process.execPath, [installer, '--editor', 'unknown', '--target', target], { encoding: 'utf8' });
  assert.notEqual(result.status, 0);
  assert.deepEqual(fs.readdirSync(target), []);
}));
