#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

function hexToRgb(hex) {
  const m = hex.replace('#','');
  const bigint = parseInt(m, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

function luminance([r, g, b]) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function contrast(hex1, hex2) {
  const L1 = luminance(hexToRgb(hex1));
  const L2 = luminance(hexToRgb(hex2));
  const brightest = Math.max(L1, L2);
  const darkest = Math.min(L1, L2);
  return (brightest + 0.05) / (darkest + 0.05);
}

const tokensPath = path.join(process.cwd(), 'src/styles/design-tokens.json');
const outDir = path.join(process.cwd(), 'reports', 'theme-audit');
const reportPath = path.join(outDir, 'accessibility-contrast.json');

const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
const c = tokens.color;

const pairs = [
  { name: 'text-primary on bg-base', fg: c['text-primary'].value, bg: c['bg-base'].value, min: 4.5 },
  { name: 'text-muted on bg-base', fg: c['text-muted'].value, bg: c['bg-base'].value, min: 4.5 },
  { name: 'inverse on accent-1', fg: '#FFFFFF', bg: c['accent-1'].value, min: 4.5 },
  { name: 'link on bg-base', fg: c['link'].value, bg: c['bg-base'].value, min: 4.5 },
  { name: 'text-primary on bg-elevated', fg: c['text-primary'].value, bg: c['bg-elevated'].value, min: 4.5 },
  { name: 'accent-1 on bg-base', fg: c['accent-1'].value, bg: c['bg-base'].value, min: 3.0 }
];

const results = pairs.map((p) => ({
  pair: p.name,
  ratio: Number(contrast(p.fg, p.bg).toFixed(2)),
  min: p.min,
  pass: contrast(p.fg, p.bg) >= p.min
}));

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(reportPath, JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2));
console.log('Accessibility contrast report written to', reportPath);


