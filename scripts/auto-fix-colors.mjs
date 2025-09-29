#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Color replacement mappings
const BACKGROUND_MAPPINGS = {
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

const TEXT_MAPPINGS = {
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

const fixes = [];

function fixFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    let newContent = content;
    let fileChanged = false;
    const fileFixes = [];

    // Apply background color fixes
    Object.entries(BACKGROUND_MAPPINGS).forEach(([oldClass, newClass]) => {
      const regex = new RegExp(`\\b${oldClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
      const matches = newContent.match(regex);
      if (matches) {
        newContent = newContent.replace(regex, newClass);
        fileChanged = true;
        fileFixes.push({
          type: 'background',
          oldValue: oldClass,
          newValue: newClass,
          count: matches.length
        });
      }
    });

    // Apply text color fixes
    Object.entries(TEXT_MAPPINGS).forEach(([oldClass, newClass]) => {
      const regex = new RegExp(`\\b${oldClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
      const matches = newContent.match(regex);
      if (matches) {
        newContent = newContent.replace(regex, newClass);
        fileChanged = true;
        fileFixes.push({
          type: 'text',
          oldValue: oldClass,
          newValue: newClass,
          count: matches.length
        });
      }
    });

    // Fix specific problematic patterns
    // Fix gradient backgrounds that should use theme tokens
    newContent = newContent.replace(
      /bg-gradient-to-br from-blue-50 to-yellow-50/g,
      'bg-gradient-to-br from-muted to-muted'
    );

    // Fix specific hex colors in login page
    newContent = newContent.replace(
      /from-\[#FF7A00\] to-\[#FF4500\]/g,
      'from-primary to-primary'
    );

    if (fileChanged) {
      writeFileSync(filePath, newContent, 'utf8');
      fixes.push({
        file: filePath,
        fixes: fileFixes,
        totalChanges: fileFixes.reduce((sum, fix) => sum + fix.count, 0)
      });
      console.log(`✅ Fixed ${filePath} (${fileFixes.reduce((sum, fix) => sum + fix.count, 0)} changes)`);
    }

    return fileChanged;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Read the audit results to get list of files to fix
const auditResults = JSON.parse(readFileSync('reports/color-audit.json', 'utf8'));

console.log('🔧 Starting auto-fix for color inconsistencies...');

let totalFilesFixed = 0;
let totalChanges = 0;

// Fix all files with inconsistencies
auditResults.inconsistencies.forEach(item => {
  if (fixFile(item.file)) {
    totalFilesFixed++;
  }
});

// Also fix some specific known problematic files
const additionalFiles = [
  'app/not-found.tsx',
  'app/login/page.tsx',
  'components/landing-page.tsx'
];

additionalFiles.forEach(file => {
  try {
    if (fixFile(file)) {
      totalFilesFixed++;
    }
  } catch (error) {
    // File might not exist, continue
  }
});

console.log(`\n🎉 Auto-fix complete!`);
console.log(`📁 Files fixed: ${totalFilesFixed}`);
console.log(`🔧 Total changes: ${fixes.reduce((sum, fix) => sum + fix.totalChanges, 0)}`);

// Save fix report
const fixReport = {
  timestamp: new Date().toISOString(),
  totalFilesFixed,
  totalChanges: fixes.reduce((sum, fix) => sum + fix.totalChanges, 0),
  fixes: fixes
};

writeFileSync('reports/color-fixes.json', JSON.stringify(fixReport, null, 2));
console.log(`📄 Fix report saved to: reports/color-fixes.json`);
