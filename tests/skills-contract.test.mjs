import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";

const ROOT = process.cwd();
const AGENTS = path.join(ROOT, ".agents", "skills");
const OPENCODE = path.join(ROOT, ".opencode", "skills");
const SEPARATOR = "##+=================================================##";
const SKILLS = [
  "zoho-workflow",
  "zoho-sprints",
  "user-story-authoring",
  "zoho-project-knowledge",
  "zoho-work-item-linking",
  "zoho-release-management",
  "zoho-task-authoring",
];

function read(...parts) {
  return fs.readFileSync(path.join(...parts), "utf8");
}

function walk(dir, base = dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, base, out);
    else out.push(path.relative(base, full).replaceAll("\\", "/"));
  }
  return out;
}

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

test("zoho-sprints addresses large-description fallback and the exact separator", () => {
  const skill = read(AGENTS, "zoho-sprints", "SKILL.md");
  assert.match(skill, /large-description-writes\.md/);
  assert.ok(skill.includes(SEPARATOR), "SKILL.md must carry the exact separator");
  assert.match(skill, /414|Error in executing tool/);
  assert.match(skill, /form-urlencoded/);
});

test("document-actual-delivery preserves old text and uses the separator", () => {
  const doc = read(AGENTS, "zoho-sprints", "workflows", "document-actual-delivery.md");
  assert.ok(doc.includes(SEPARATOR), "separator missing from the delivery workflow");
  assert.match(doc, /byte-for-byte/i);
  assert.match(doc, /large-description-writes\.md/);
  assert.match(doc, /append-description\.mjs/);
});

test("field-completeness requires the separator for appended descriptions", () => {
  const doc = read(AGENTS, "zoho-sprints", "references", "field-completeness.md");
  assert.ok(doc.includes(SEPARATOR), "separator missing from field completeness");
  assert.match(doc, /large-description-writes\.md/);
});

test("append-description.mjs preserves old bytes and inserts exactly one separator", () => {
  const script = path.join(AGENTS, "zoho-sprints", "scripts", "append-description.mjs");
  assert.ok(fs.existsSync(script), "append-description.mjs is missing");

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "zoho-append-"));
  const oldFile = path.join(tmp, "old.txt");
  const newFile = path.join(tmp, "new.md");
  const outFile = path.join(tmp, "out.txt");
  const oldText = "As a user, I want deterministic behaviour.\n\nAcceptance Criteria\n1. Keep this byte.";
  fs.writeFileSync(oldFile, oldText, "utf8");
  fs.writeFileSync(newFile, "--- [ZOHO-ACTUAL-DELIVERY v1 | T-1] ---\nbody\n--- [/ZOHO-ACTUAL-DELIVERY | T-1] ---", "utf8");

  const out = execFileSync(process.execPath, [script, oldFile, newFile, outFile], { encoding: "utf8" });
  const report = JSON.parse(out);
  const combined = fs.readFileSync(outFile, "utf8");

  assert.equal(report.separator, SEPARATOR);
  assert.equal(report.oldPreserved, true);
  assert.ok(combined.startsWith(oldText), "old text must be preserved as a prefix");
  assert.equal((combined.match(new RegExp(SEPARATOR.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length, 1);
});

test("all relative markdown links in the live skills resolve", () => {
  const missing = [];
  for (const dir of [AGENTS, OPENCODE]) {
    for (const rel of walk(dir)) {
      if (!rel.endsWith(".md")) continue;
      const full = path.join(dir, rel);
      const text = fs.readFileSync(full, "utf8");
      for (const match of text.matchAll(/\]\(([^)#\s]+)(?:#[^)]*)?\)/g)) {
        const target = match[1];
        if (/^(https?:|mailto:)/.test(target)) continue;
        const resolved = path.resolve(path.dirname(full), target);
        if (!fs.existsSync(resolved)) missing.push(`${path.basename(dir)}/${rel} -> ${target}`);
      }
    }
  }
  assert.deepEqual(missing, [], `broken links:\n${missing.join("\n")}`);
});

test("agents and opencode skill trees stay identical", () => {
  const a = walk(AGENTS).sort();
  const b = walk(OPENCODE).sort();
  assert.deepEqual(a, b, "file lists differ between .agents and .opencode");
  for (const rel of a) {
    assert.equal(sha256(path.join(AGENTS, rel)), sha256(path.join(OPENCODE, rel)), `content differs: ${rel}`);
  }
});

test("every installed skill has valid frontmatter and a discovery-first description", () => {
  for (const name of SKILLS) {
    const file = path.join(AGENTS, name, "SKILL.md");
    assert.ok(fs.existsSync(file), `missing skill: ${name}`);
    const text = fs.readFileSync(file, "utf8");
    const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    assert.ok(match, `${name}: missing frontmatter`);
    const frontmatter = match[1];
    assert.match(frontmatter, new RegExp(`^name:\\s*${name}$`, "m"), `${name}: wrong name`);
    const description = frontmatter.match(/^description:\s*(.+)$/m)?.[1]?.trim();
    assert.ok(description && description.length > 20, `${name}: weak description`);
    assert.match(description, /^Use when\b/, `${name}: description must start with "Use when"`);
  }
});

test("zoho-workflow routes to every specialist skill and recommends a next step", () => {
  const text = read(AGENTS, "zoho-workflow", "SKILL.md");
  for (const name of SKILLS.filter((s) => s !== "zoho-workflow")) {
    assert.ok(text.includes(name), `zoho-workflow does not route to ${name}`);
  }
  assert.match(text, /الخطوة التالية الموصى بها/);
});
