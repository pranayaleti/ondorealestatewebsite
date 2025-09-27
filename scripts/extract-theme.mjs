#!/usr/bin/env node
// Extract computed styles and capture baseline screenshots for key pages
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const ROOT = process.cwd();
const REPORT_DIR = path.join(ROOT, 'reports', 'theme-audit');
const MODE = (process.env.MODE || 'before').toLowerCase();
const OUT_DIR = path.join(REPORT_DIR, MODE);
const TMP_JSON = '/tmp/theme-extraction.json';

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function rgbToHex(input) {
  if (!input) return null;
  // Handle rgb/rgba/hsl/hsla; for now only rgb(a) expected from computed styles
  const m = input.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!m) return null;
  const r = Number(m[1]);
  const g = Number(m[2]);
  const b = Number(m[3]);
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase();
}

async function extractForPage(page, url, label) {
  await page.goto(url, { waitUntil: 'networkidle' });
  // Give Next.js time to hydrate and theme provider to apply
  await page.waitForTimeout(500);

  const selectors = ['body','h1','h2','h3','h4','h5','h6','p','a','button','input','nav'];

  const styles = await page.evaluate((selectors) => {
    function pick(el) {
      const cs = window.getComputedStyle(el);
      return {
        color: cs.color,
        backgroundColor: cs.backgroundColor,
        backgroundImage: cs.backgroundImage,
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        borderColor: cs.borderColor,
        borderWidth: cs.borderWidth,
        borderStyle: cs.borderStyle,
        borderRadius: cs.borderRadius,
        boxShadow: cs.boxShadow,
      };
    }
    const out = {};
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el) out[sel] = pick(el);
    }
    // Representative elements
    const card = document.querySelector('.bg-gray-900, .card, [data-card]');
    if (card) out['card'] = pick(card);
    const brandText = document.querySelector('.text-orange-400, .text-primary');
    if (brandText) out['brandText'] = pick(brandText);
    const brandBg = document.querySelector('.bg-orange-500, .bg-primary');
    if (brandBg) out['brandBg'] = pick(brandBg);
    const gradient = document.querySelector('[class*="bg-gradient"], .brand-gradient');
    if (gradient) out['gradient'] = pick(gradient);
    return out;
  }, selectors);

  const normalized = {};
  for (const [key, val] of Object.entries(styles)) {
    normalized[key] = {
      ...val,
      colorHex: rgbToHex(val.color),
      backgroundColorHex: rgbToHex(val.backgroundColor),
      borderColorHex: rgbToHex(val.borderColor),
    };
  }

  // Screenshot
  ensureDir(OUT_DIR);
  const screenshotPath = path.join(OUT_DIR, `${label}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });

  return { url, label, styles: normalized, screenshot: path.relative(ROOT, screenshotPath) };
}

async function main() {
  ensureDir(REPORT_DIR);
  ensureDir(OUT_DIR);

  // If server not running, start it
  const base = process.env.BASE_URL || 'http://localhost:3000';
  let devProc;
  const ping = await fetch(base).catch(() => null);
  if (!ping) {
    devProc = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'dev'], {
      cwd: ROOT,
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'development' },
    });
    // naive wait-for-dev
    let ready = false;
    for (let i = 0; i < 60; i++) {
      await new Promise((r) => setTimeout(r, 1000));
      try {
        const res = await fetch(base + '/api/healthz', { cache: 'no-store' });
        if (res.ok) { ready = true; break; }
      } catch {}
      try {
        const res = await fetch(base, { cache: 'no-store' });
        if (res.ok) { ready = true; break; }
      } catch {}
    }
    if (!ready) console.warn('Dev server may not be fully ready; proceeding.');
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({ deviceScaleFactor: 1 });
  const page = await context.newPage();

  const targets = [
    { url: base + '/founders-letter', label: 'founders-letter' },
    { url: base + '/why-utah', label: 'why-utah' },
    { url: base + '/', label: 'home' },
    { url: base + '/dashboard', label: 'dashboard' },
  ];

  const results = [];
  for (const t of targets) {
    try {
      results.push(await extractForPage(page, t.url, t.label));
    } catch (e) {
      console.warn('Failed to extract for', t.url, e.message);
    }
  }

  await browser.close();
  if (devProc) devProc.kill('SIGTERM');

  const payload = { generatedAt: new Date().toISOString(), mode: MODE, results };
  fs.writeFileSync(TMP_JSON, JSON.stringify(payload, null, 2));
  const repoCopy = path.join(REPORT_DIR, `theme-extraction.${MODE}.json`);
  fs.writeFileSync(repoCopy, JSON.stringify(payload, null, 2));

  console.log('Extraction complete:', TMP_JSON, 'and', repoCopy);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


