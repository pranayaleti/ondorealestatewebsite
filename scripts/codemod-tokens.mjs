#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const GLOB_DIRS = ['app', 'components', 'pages', 'styles', 'lib'];

// Map of raw color hexes to Tailwind classes or CSS vars
const replacements = [
  { pattern: /#0d0d0d/gi, replace: 'hsl(var(--background))' },
  { pattern: /#111827/gi, replace: 'hsl(var(--card))' },
  { pattern: /#f2f2f2/gi, replace: 'hsl(var(--foreground))' },
  { pattern: /#d1d5db/gi, replace: 'hsl(var(--muted-foreground))' },
  { pattern: /#1f2937/gi, replace: 'hsl(var(--border))' },
  { pattern: /#333333/gi, replace: 'hsl(var(--border))' },
  { pattern: /#f97316/gi, replace: 'hsl(var(--primary))' },
  { pattern: /#fb923c/gi, replace: 'hsl(var(--primary))' },
  { pattern: /#ff7700/gi, replace: 'hsl(var(--primary))' }
];

const fontPatterns = [
  { pattern: /font-family:\s*[^;]+;/gi, replace: 'font-family: var(--font-family-base);' }
];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (/\.(tsx?|css|mjs|jsx|ts|js)$/.test(entry.name)) {
      let contents = fs.readFileSync(full, 'utf8');
      let changed = false;
      for (const { pattern, replace } of replacements) {
        if (pattern.test(contents)) {
          contents = contents.replace(pattern, replace);
          changed = true;
        }
      }
      for (const { pattern, replace } of fontPatterns) {
        if (pattern.test(contents)) {
          contents = contents.replace(pattern, replace);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(full, contents, 'utf8');
        console.log('Rewrote tokens in', path.relative(ROOT, full));
      }
    }
  }
}

for (const dir of GLOB_DIRS) {
  const full = path.join(ROOT, dir);
  if (fs.existsSync(full)) walk(full);
}

console.log('Codemod complete');


