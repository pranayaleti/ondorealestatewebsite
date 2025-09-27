#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const ROOT = process.cwd();
const REPORT_DIR = path.join(ROOT, 'reports', 'theme-audit');
const BEFORE = path.join(REPORT_DIR, 'before');
const AFTER = path.join(REPORT_DIR, 'after');
const OUT = path.join(REPORT_DIR, 'diff');

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const pages = ['founders-letter','why-utah','home','dashboard'];
const summary = [];

for (const p of pages) {
  const a = path.join(AFTER, `${p}.png`);
  const b = path.join(BEFORE, `${p}.png`);
  if (!fs.existsSync(a) || !fs.existsSync(b)) {
    summary.push({ page: p, missing: true });
    continue;
  }
  const img1 = PNG.sync.read(fs.readFileSync(b));
  const img2 = PNG.sync.read(fs.readFileSync(a));
  const { width, height } = img1;
  const diff = new PNG({ width, height });
  const numDiff = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
  const diffPath = path.join(OUT, `${p}.png`);
  fs.writeFileSync(diffPath, PNG.sync.write(diff));
  summary.push({ page: p, width, height, pixelsDifferent: numDiff, diffPath: path.relative(ROOT, diffPath) });
}

fs.writeFileSync(path.join(REPORT_DIR, 'visual-diff-summary.json'), JSON.stringify({ generatedAt: new Date().toISOString(), summary }, null, 2));
console.log('Visual diff summary written');


