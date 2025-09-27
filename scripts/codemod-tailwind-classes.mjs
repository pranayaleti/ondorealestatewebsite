#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const TARGET_DIRS = ['app', 'components', 'pages'];

const classReplacements = [
  // Backgrounds
  { find: /bg-black(?![\w-])/g, replace: 'bg-background' },
  { find: /bg-white(?![\w-])/g, replace: 'bg-foreground' }, // not ideal; will be rarely used
  { find: /bg-gray-900/g, replace: 'bg-card' },
  { find: /bg-gray-800/g, replace: 'bg-muted' },
  { find: /bg-orange-500(\/\d+)?/g, replace: 'bg-primary' },
  { find: /bg-orange-600/g, replace: 'bg-primary' },
  { find: /bg-white\/10/g, replace: 'bg-secondary' },
  { find: /bg-white\/20/g, replace: 'bg-secondary' },

  // Text
  { find: /text-white/g, replace: 'text-foreground' },
  { find: /text-black/g, replace: 'text-foreground' },
  { find: /text-gray-300/g, replace: 'text-muted-foreground' },
  { find: /text-gray-400/g, replace: 'text-muted-foreground' },
  { find: /text-orange-400/g, replace: 'text-primary' },
  { find: /text-orange-500/g, replace: 'text-primary' },
  { find: /text-orange-600/g, replace: 'text-primary' },

  // Borders
  { find: /border-gray-800/g, replace: 'border-border' },
  { find: /border-gray-700/g, replace: 'border-border' },
  { find: /border-orange-500(\/\d+)?/g, replace: 'border-primary' },
  { find: /ring-orange-500\/40/g, replace: 'ring-primary/40' },

  // Gradient utils
  { find: /from-black/g, replace: 'from-[var(--gradient-from)]' },
  { find: /via-gray-900/g, replace: 'via-[var(--color-gradient-via)]' },
  { find: /to-orange-900/g, replace: 'to-[var(--color-gradient-to)]' },
  { find: /from-orange-900/g, replace: 'from-[var(--color-gradient-to)]' },
  // Buttons with white text over orange should use tokenized foreground
  { find: /\btext-white\b(?=[^\n]*bg-primary)/g, replace: '' }
];

function rewriteFile(filePath) {
  let src = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  for (const rule of classReplacements) {
    if (rule.find.test(src)) {
      src = src.replace(rule.find, rule.replace);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(filePath, src, 'utf8');
    console.log('Updated classes in', path.relative(ROOT, filePath));
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(tsx|jsx|ts|js)$/.test(entry.name)) rewriteFile(full);
  }
}

for (const d of TARGET_DIRS) {
  const full = path.join(ROOT, d);
  if (fs.existsSync(full)) walk(full);
}

console.log('Tailwind class codemod complete');


