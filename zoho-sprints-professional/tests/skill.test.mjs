import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { check, sync, SKILL_NAMES } from '../tools/skill.mjs';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function fixture(run) {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'zoho-skill-contract-'));
  for (const name of SKILL_NAMES) {
    const source = path.join(base, '.agents', 'skills', name);
    fs.mkdirSync(path.dirname(source), { recursive: true });
    fs.cpSync(path.join(packageRoot, '.agents', 'skills', name), source, { recursive: true });
  }
  try { run(base); }
  finally {
    const resolved = path.resolve(base);
    if (resolved.startsWith(path.resolve(os.tmpdir()) + path.sep) && path.basename(resolved).startsWith('zoho-skill-contract-')) {
      fs.rmSync(resolved, { recursive: true, force: true });
    }
  }
}

test('sync creates identical portable skills and a deterministic manifest', () => fixture((base) => {
  sync(base);
  assert.deepEqual(check(base), []);
  const manifest = JSON.parse(fs.readFileSync(path.join(base, 'manifest.json'), 'utf8'));
  assert.equal(manifest.version, '3.0.0');
  assert.deepEqual(manifest.skills.map((skill) => skill.name), SKILL_NAMES);
  const first = fs.readFileSync(path.join(base, 'manifest.json'), 'utf8');
  sync(base);
  assert.equal(fs.readFileSync(path.join(base, 'manifest.json'), 'utf8'), first);
}));

test('check rejects drift in any portable copy', () => fixture((base) => {
  sync(base);
  fs.appendFileSync(path.join(base, 'skills', 'zoho-task-authoring', 'SKILL.md'), '\nStale edit\n');
  assert.ok(check(base).some((error) => error.includes('distribution differs')));
}));

test('check rejects broken links and private endpoints', () => fixture((base) => {
  sync(base);
  const skill = path.join(base, '.agents', 'skills', 'zoho-sprints', 'SKILL.md');
  fs.appendFileSync(skill, '\n[Missing](references/not-there.md)\n');
  assert.ok(check(base).some((error) => error.includes('broken link')));
  fs.appendFileSync(skill, '\nhttps://example.zohomcp.com/mcp/private\n');
  assert.ok(check(base).some((error) => error.includes('private MCP endpoint')));
}));

test('check rejects a description that does not start with Use when', () => fixture((base) => {
  sync(base);
  const file = path.join(base, '.agents', 'skills', 'zoho-task-authoring', 'SKILL.md');
  const text = fs.readFileSync(file, 'utf8').replace(/^description: Use when /m, 'description: Handles ');
  fs.writeFileSync(file, text);
  assert.ok(check(base).some((error) => error.includes('must start with "Use when"')));
}));

test('append-description preserves the complete old prefix, including trailing whitespace', () => {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'zoho-description-'));
  try {
    const oldPath = path.join(base, 'old.txt');
    const newPath = path.join(base, 'new.txt');
    const outPath = path.join(base, 'combined.txt');
    const oldText = '<p>Existing requirement</p>\r\n  \r\n';
    fs.writeFileSync(oldPath, oldText, 'utf8');
    fs.writeFileSync(newPath, 'New evidence', 'utf8');
    const script = path.join(packageRoot, '.agents', 'skills', 'zoho-sprints', 'scripts', 'append-description.mjs');
    const result = spawnSync(process.execPath, [script, oldPath, newPath, outPath], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    const combined = fs.readFileSync(outPath, 'utf8');
    assert.equal(combined, `${oldText}##+=================================================##\nNew evidence`);
    assert.equal(JSON.parse(result.stdout).oldPreserved, true);
  } finally {
    fs.rmSync(base, { recursive: true, force: true });
  }
});
