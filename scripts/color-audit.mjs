#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

// Color patterns to search for
const PATTERNS = {
  tailwindBg: /bg-[-_a-z0-9]+/g,
  tailwindText: /text-[-_a-z0-9]+/g,
  hexColors: /#[A-Fa-f0-9]{3,8}\b/g,
  rgbColors: /rgb\([^)]+\)/g,
  rgbaColors: /rgba\([^)]+\)/g,
  hslColors: /hsl\([^)]+\)/g,
  inlineStyles: /style\s*=\s*{[^}]*background[^}]*}/g,
  cssVars: /var\(--[^)]+\)/g,
};

// Canonical theme tokens
const CANONICAL_TOKENS = {
  background: 'bg-background',
  surface: 'bg-card',
  muted: 'bg-muted',
  card: 'bg-card',
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent',
  destructive: 'bg-destructive',
  popover: 'bg-popover',
};

// Inconsistent color mappings
const INCONSISTENT_COLORS = {
  'bg-white': 'bg-card',
  'bg-gray-50': 'bg-muted',
  'bg-gray-100': 'bg-muted',
  'bg-gray-200': 'bg-muted',
  'bg-gray-800': 'bg-card',
  'bg-gray-900': 'bg-background',
  'bg-blue-50': 'bg-muted',
  'bg-blue-100': 'bg-muted',
  'bg-blue-900': 'bg-card',
  'bg-red-50': 'bg-muted',
  'bg-red-900': 'bg-card',
  'bg-green-50': 'bg-muted',
  'bg-green-100': 'bg-muted',
  'bg-green-900': 'bg-card',
  'bg-yellow-50': 'bg-muted',
  'bg-orange-50': 'bg-muted',
  'bg-purple-50': 'bg-muted',
  'bg-pink-50': 'bg-muted',
  'bg-indigo-50': 'bg-muted',
  'bg-slate-50': 'bg-muted',
  'bg-slate-100': 'bg-muted',
  'bg-slate-800': 'bg-card',
  'bg-slate-900': 'bg-background',
  'bg-zinc-50': 'bg-muted',
  'bg-zinc-100': 'bg-muted',
  'bg-zinc-800': 'bg-card',
  'bg-zinc-900': 'bg-background',
  'bg-neutral-50': 'bg-muted',
  'bg-neutral-100': 'bg-muted',
  'bg-neutral-800': 'bg-card',
  'bg-neutral-900': 'bg-background',
  'bg-stone-50': 'bg-muted',
  'bg-stone-100': 'bg-muted',
  'bg-stone-800': 'bg-card',
  'bg-stone-900': 'bg-background',
};

// Text color mappings
const TEXT_COLOR_MAPPINGS = {
  'text-gray-500': 'text-muted-foreground',
  'text-gray-600': 'text-muted-foreground',
  'text-gray-700': 'text-foreground',
  'text-gray-800': 'text-foreground',
  'text-gray-900': 'text-foreground',
  'text-blue-600': 'text-primary',
  'text-blue-400': 'text-primary',
  'text-red-600': 'text-destructive',
  'text-red-400': 'text-destructive',
  'text-green-600': 'text-primary',
  'text-green-400': 'text-primary',
  'text-orange-600': 'text-primary',
  'text-orange-400': 'text-primary',
};

const auditResults = {
  timestamp: new Date().toISOString(),
  totalFilesScanned: 0,
  inconsistencies: [],
  fixes: [],
  summary: {
    totalInconsistencies: 0,
    totalFixes: 0,
    filesChanged: 0,
  }
};

function scanFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const findings = [];

    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      
      // Check for inconsistent background colors
      Object.entries(INCONSISTENT_COLORS).forEach(([oldClass, newClass]) => {
        const regex = new RegExp(`\\b${oldClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
        const matches = line.match(regex);
        if (matches) {
          findings.push({
            type: 'background_inconsistency',
            line: lineNumber,
            oldValue: oldClass,
            newValue: newClass,
            context: line.trim(),
            severity: 'medium'
          });
        }
      });

      // Check for inconsistent text colors
      Object.entries(TEXT_COLOR_MAPPINGS).forEach(([oldClass, newClass]) => {
        const regex = new RegExp(`\\b${oldClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
        const matches = line.match(regex);
        if (matches) {
          findings.push({
            type: 'text_inconsistency',
            line: lineNumber,
            oldValue: oldClass,
            newValue: newClass,
            context: line.trim(),
            severity: 'low'
          });
        }
      });

      // Check for hex colors
      const hexMatches = line.match(PATTERNS.hexColors);
      if (hexMatches) {
        hexMatches.forEach(match => {
          findings.push({
            type: 'hex_color',
            line: lineNumber,
            oldValue: match,
            newValue: 'var(--color-*)',
            context: line.trim(),
            severity: 'high'
          });
        });
      }

      // Check for inline styles with background
      const styleMatches = line.match(PATTERNS.inlineStyles);
      if (styleMatches) {
        styleMatches.forEach(match => {
          findings.push({
            type: 'inline_style',
            line: lineNumber,
            oldValue: match,
            newValue: 'className with token',
            context: line.trim(),
            severity: 'high'
          });
        });
      }
    });

    if (findings.length > 0) {
      auditResults.inconsistencies.push({
        file: filePath,
        findings: findings
      });
      auditResults.summary.totalInconsistencies += findings.length;
    }

    return findings;
  } catch (error) {
    console.error(`Error scanning ${filePath}:`, error.message);
    return [];
  }
}

function scanDirectory(dirPath, extensions = ['.tsx', '.ts', '.jsx', '.js', '.css']) {
  const files = readdirSync(dirPath);
  
  files.forEach(file => {
    const filePath = join(dirPath, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and other irrelevant directories
      if (!['node_modules', '.git', '.next', 'dist', 'build'].includes(file)) {
        scanDirectory(filePath, extensions);
      }
    } else if (extensions.includes(extname(file))) {
      auditResults.totalFilesScanned++;
      scanFile(filePath);
    }
  });
}

// Main execution
console.log('🔍 Starting color consistency audit...');

// Scan key directories
const directoriesToScan = [
  'app',
  'components',
  'src',
  'pages'
];

directoriesToScan.forEach(dir => {
  if (statSync(dir).isDirectory()) {
    console.log(`📁 Scanning ${dir}/...`);
    scanDirectory(dir);
  }
});

// Generate report
const reportPath = 'reports/color-audit.json';
writeFileSync(reportPath, JSON.stringify(auditResults, null, 2));

console.log(`\n📊 Audit Complete!`);
console.log(`📁 Files scanned: ${auditResults.totalFilesScanned}`);
console.log(`⚠️  Inconsistencies found: ${auditResults.summary.totalInconsistencies}`);
console.log(`📄 Report saved to: ${reportPath}`);

// Print summary
if (auditResults.inconsistencies.length > 0) {
  console.log('\n🔍 Top inconsistencies found:');
  auditResults.inconsistencies.slice(0, 10).forEach(item => {
    console.log(`  📄 ${item.file}`);
    item.findings.slice(0, 3).forEach(finding => {
      console.log(`    Line ${finding.line}: ${finding.oldValue} → ${finding.newValue}`);
    });
  });
}
