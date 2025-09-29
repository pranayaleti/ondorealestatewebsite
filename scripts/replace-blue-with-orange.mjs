#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

// Blue to Orange color mappings
const BLUE_TO_ORANGE_MAPPINGS = {
  // Background colors
  'bg-blue-50': 'bg-orange-50',
  'bg-blue-100': 'bg-orange-100', 
  'bg-blue-200': 'bg-orange-200',
  'bg-blue-300': 'bg-orange-300',
  'bg-blue-400': 'bg-orange-400',
  'bg-blue-500': 'bg-orange-500',
  'bg-blue-600': 'bg-orange-600',
  'bg-blue-700': 'bg-orange-700',
  'bg-blue-800': 'bg-orange-800',
  'bg-blue-900': 'bg-orange-900',
  
  // Text colors
  'text-blue-50': 'text-orange-50',
  'text-blue-100': 'text-orange-100',
  'text-blue-200': 'text-orange-200', 
  'text-blue-300': 'text-orange-300',
  'text-blue-400': 'text-orange-400',
  'text-blue-500': 'text-orange-500',
  'text-blue-600': 'text-orange-600',
  'text-blue-700': 'text-orange-700',
  'text-blue-800': 'text-orange-800',
  'text-blue-900': 'text-orange-900',
  
  // Border colors
  'border-blue-50': 'border-orange-50',
  'border-blue-100': 'border-orange-100',
  'border-blue-200': 'border-orange-200',
  'border-blue-300': 'border-orange-300',
  'border-blue-400': 'border-orange-400',
  'border-blue-500': 'border-orange-500',
  'border-blue-600': 'border-orange-600',
  'border-blue-700': 'border-orange-700',
  'border-blue-800': 'border-orange-800',
  'border-blue-900': 'border-orange-900',
  
  // Ring colors
  'ring-blue-50': 'ring-orange-50',
  'ring-blue-100': 'ring-orange-100',
  'ring-blue-200': 'ring-orange-200',
  'ring-blue-300': 'ring-orange-300',
  'ring-blue-400': 'ring-orange-400',
  'ring-blue-500': 'ring-orange-500',
  'ring-blue-600': 'ring-orange-600',
  'ring-blue-700': 'ring-orange-700',
  'ring-blue-800': 'ring-orange-800',
  'ring-blue-900': 'ring-orange-900',
  
  // Gradient colors
  'from-blue-50': 'from-orange-50',
  'from-blue-100': 'from-orange-100',
  'from-blue-200': 'from-orange-200',
  'from-blue-300': 'from-orange-300',
  'from-blue-400': 'from-orange-400',
  'from-blue-500': 'from-orange-500',
  'from-blue-600': 'from-orange-600',
  'from-blue-700': 'from-orange-700',
  'from-blue-800': 'from-orange-800',
  'from-blue-900': 'from-orange-900',
  
  'to-blue-50': 'to-orange-50',
  'to-blue-100': 'to-orange-100',
  'to-blue-200': 'to-orange-200',
  'to-blue-300': 'to-orange-300',
  'to-blue-400': 'to-orange-400',
  'to-blue-500': 'to-orange-500',
  'to-blue-600': 'to-orange-600',
  'to-blue-700': 'to-orange-700',
  'to-blue-800': 'to-orange-800',
  'to-blue-900': 'to-orange-900',
  
  // Hover states
  'hover:bg-blue-50': 'hover:bg-orange-50',
  'hover:bg-blue-100': 'hover:bg-orange-100',
  'hover:bg-blue-200': 'hover:bg-orange-200',
  'hover:bg-blue-300': 'hover:bg-orange-300',
  'hover:bg-blue-400': 'hover:bg-orange-400',
  'hover:bg-blue-500': 'hover:bg-orange-500',
  'hover:bg-blue-600': 'hover:bg-orange-600',
  'hover:bg-blue-700': 'hover:bg-orange-700',
  'hover:bg-blue-800': 'hover:bg-orange-800',
  'hover:bg-blue-900': 'hover:bg-orange-900',
  
  'hover:text-blue-50': 'hover:text-orange-50',
  'hover:text-blue-100': 'hover:text-orange-100',
  'hover:text-blue-200': 'hover:text-orange-200',
  'hover:text-blue-300': 'hover:text-orange-300',
  'hover:text-blue-400': 'hover:text-orange-400',
  'hover:text-blue-500': 'hover:text-orange-500',
  'hover:text-blue-600': 'hover:text-orange-600',
  'hover:text-blue-700': 'hover:text-orange-700',
  'hover:text-blue-800': 'hover:text-orange-800',
  'hover:text-blue-900': 'hover:text-orange-900',
  
  // Focus states
  'focus:bg-blue-50': 'focus:bg-orange-50',
  'focus:bg-blue-100': 'focus:bg-orange-100',
  'focus:bg-blue-200': 'focus:bg-orange-200',
  'focus:bg-blue-300': 'focus:bg-orange-300',
  'focus:bg-blue-400': 'focus:bg-orange-400',
  'focus:bg-blue-500': 'focus:bg-orange-500',
  'focus:bg-blue-600': 'focus:bg-orange-600',
  'focus:bg-blue-700': 'focus:bg-orange-700',
  'focus:bg-blue-800': 'focus:bg-orange-800',
  'focus:bg-blue-900': 'focus:bg-orange-900',
  
  'focus:text-blue-50': 'focus:text-orange-50',
  'focus:text-blue-100': 'focus:text-orange-100',
  'focus:text-blue-200': 'focus:text-orange-200',
  'focus:text-blue-300': 'focus:text-orange-300',
  'focus:text-blue-400': 'focus:text-orange-400',
  'focus:text-blue-500': 'focus:text-orange-500',
  'focus:text-blue-600': 'focus:text-orange-600',
  'focus:text-blue-700': 'focus:text-orange-700',
  'focus:text-blue-800': 'focus:text-orange-800',
  'focus:text-blue-900': 'focus:text-orange-900',
};

// Files to process (excluding reports and scripts)
const FILES_TO_PROCESS = [
  'app',
  'components', 
  'pages'
];

const fixes = [];

function fixFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    let newContent = content;
    let fileChanged = false;
    const fileFixes = [];

    // Apply blue to orange mappings
    Object.entries(BLUE_TO_ORANGE_MAPPINGS).forEach(([oldClass, newClass]) => {
      const regex = new RegExp(`\\b${oldClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
      const matches = newContent.match(regex);
      if (matches) {
        newContent = newContent.replace(regex, newClass);
        fileChanged = true;
        fileFixes.push({
          type: 'blue_to_orange',
          oldValue: oldClass,
          newValue: newClass,
          count: matches.length
        });
      }
    });

    // Special case: replace specific blue backgrounds with primary orange
    newContent = newContent.replace(
      /bg-blue-600 text-foreground/g,
      'bg-primary text-primary-foreground'
    );

    // Replace blue gradients with orange gradients
    newContent = newContent.replace(
      /from-blue-500 to-blue-600/g,
      'from-orange-500 to-orange-600'
    );

    // Replace blue hover states with orange
    newContent = newContent.replace(
      /hover:text-blue-800/g,
      'hover:text-orange-800'
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

function scanDirectory(dirPath, extensions = ['.tsx', '.ts', '.jsx', '.js']) {
  const files = readdirSync(dirPath);
  
  files.forEach(file => {
    const filePath = join(dirPath, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and other irrelevant directories
      if (!['node_modules', '.git', '.next', 'dist', 'build', 'reports', 'scripts'].includes(file)) {
        scanDirectory(filePath, extensions);
      }
    } else if (extensions.includes(extname(file))) {
      fixFile(filePath);
    }
  });
}

console.log('🟠 Starting blue to orange color replacement...');

let totalFilesFixed = 0;

// Process all directories
FILES_TO_PROCESS.forEach(dir => {
  if (statSync(dir).isDirectory()) {
    console.log(`📁 Processing ${dir}/...`);
    scanDirectory(dir);
  }
});

console.log(`\n🎉 Blue to orange replacement complete!`);
console.log(`📁 Files fixed: ${fixes.length}`);
console.log(`🔧 Total changes: ${fixes.reduce((sum, fix) => sum + fix.totalChanges, 0)}`);

// Save fix report
const fixReport = {
  timestamp: new Date().toISOString(),
  totalFilesFixed: fixes.length,
  totalChanges: fixes.reduce((sum, fix) => sum + fix.totalChanges, 0),
  fixes: fixes
};

writeFileSync('reports/blue-to-orange-fixes.json', JSON.stringify(fixReport, null, 2));
console.log(`📄 Fix report saved to: reports/blue-to-orange-fixes.json`);
