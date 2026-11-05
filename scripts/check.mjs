// Repo checks, run in CI and locally: node scripts/check.mjs
// 1. Every skills/<folder>/SKILL.md has valid frontmatter: `name` is kebab-case, at most
//    64 characters and equal to the folder; `description` is 1-1024 characters without < or >.
// 2. No tracked file sits under a .learnings/private/ folder.
// 3. Every relative link in a tracked markdown file points to a file or folder that exists.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];

// 1. Skill frontmatter
const skillsDir = join(root, 'skills');
for (const folder of readdirSync(skillsDir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)) {
  const file = `skills/${folder}/SKILL.md`;
  if (!existsSync(join(root, file))) { errors.push(`${file}: missing`); continue; }
  const m = readFileSync(join(root, file), 'utf8').replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) { errors.push(`${file}: no frontmatter block`); continue; }
  const fields = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([a-z][\w-]*):\s*(.*)$/);
    if (kv) fields[kv[1]] = kv[2].trim().replace(/^(['"])(.*)\1$/, '$2');
  }
  const { name = '', description = '' } = fields;
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) errors.push(`${file}: name "${name}" is not kebab-case`);
  if (name.length > 64) errors.push(`${file}: name is longer than 64 characters`);
  if (name !== folder) errors.push(`${file}: name "${name}" does not match folder "${folder}"`);
  if (description.length < 1 || description.length > 1024) errors.push(`${file}: description is ${description.length} characters (1-1024)`);
  if (/[<>]/.test(description)) errors.push(`${file}: description contains < or >`);
}

// 2. Private lesson notes
const tracked = execFileSync('git', ['ls-files'], { cwd: root, encoding: 'utf8' }).split('\n').filter(Boolean);
for (const path of tracked) {
  if (/(^|\/)\.learnings\/private\//.test(path)) errors.push(`${path}: private lesson notes are tracked`);
}

// 3. Relative markdown links
for (const path of tracked.filter(p => p.endsWith('.md'))) {
  const text = readFileSync(join(root, path), 'utf8').replace(/```[\s\S]*?```/g, '');
  for (const [, target] of text.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    const local = decodeURIComponent(target.split('#')[0]);
    if (local && !existsSync(join(root, dirname(path), local))) errors.push(`${path}: broken link ${target}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  console.error(`\n${errors.length} problem(s) found.`);
  process.exit(1);
}
console.log('All checks passed.');
