#!/usr/bin/env node
/**
 * Bundle analysis script
 * Analyzes bundle sizes and identifies opportunities for optimization
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const OUT_DIR = join(process.cwd(), 'out');
const NEXT_DIR = join(OUT_DIR, '_next');

function getFileSize(filePath) {
  try {
    const stats = statSync(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function analyzeDirectory(dir, extensions = ['.js', '.css']) {
  const files = [];
  
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      
      if (entry.isDirectory()) {
        files.push(...analyzeDirectory(fullPath, extensions));
      } else if (entry.isFile()) {
        const ext = entry.name.substring(entry.name.lastIndexOf('.'));
        if (extensions.includes(ext)) {
          const size = getFileSize(fullPath);
          files.push({
            path: fullPath.replace(process.cwd(), ''),
            name: entry.name,
            size,
            ext,
          });
        }
      }
    }
  } catch (error) {
    // Directory doesn't exist or can't be read
  }
  
  return files;
}

function main() {
  console.log('📊 Analyzing bundle sizes...\n');
  
  // Analyze JavaScript files
  const jsFiles = analyzeDirectory(OUT_DIR, ['.js']);
  const cssFiles = analyzeDirectory(OUT_DIR, ['.css']);
  
  // Sort by size
  jsFiles.sort((a, b) => b.size - a.size);
  cssFiles.sort((a, b) => b.size - a.size);
  
  // Calculate totals
  const totalJSSize = jsFiles.reduce((sum, file) => sum + file.size, 0);
  const totalCSSSize = cssFiles.reduce((sum, file) => sum + file.size, 0);
  
  console.log('📦 JavaScript Files:');
  console.log(`   Total: ${formatBytes(totalJSSize)} (${jsFiles.length} files)\n`);
  console.log('   Top 10 largest files:');
  jsFiles.slice(0, 10).forEach((file, index) => {
    console.log(`   ${index + 1}. ${file.name}: ${formatBytes(file.size)}`);
  });
  
  console.log('\n🎨 CSS Files:');
  console.log(`   Total: ${formatBytes(totalCSSSize)} (${cssFiles.length} files)\n`);
  console.log('   Top 10 largest files:');
  cssFiles.slice(0, 10).forEach((file, index) => {
    console.log(`   ${index + 1}. ${file.name}: ${formatBytes(file.size)}`);
  });
  
  // Recommendations
  console.log('\n💡 Optimization Recommendations:');
  
  if (totalJSSize > 500 * 1024) { // 500KB
    console.log('   ⚠️  JavaScript bundle is large. Consider:');
    console.log('      - Code splitting with dynamic imports');
    console.log('      - Tree shaking unused code');
    console.log('      - Lazy loading non-critical components');
  }
  
  if (totalCSSSize > 100 * 1024) { // 100KB
    console.log('   ⚠️  CSS bundle is large. Consider:');
    console.log('      - Purging unused Tailwind classes');
    console.log('      - Removing unused CSS');
    console.log('      - Critical CSS extraction');
  }
  
  const largeFiles = [...jsFiles, ...cssFiles].filter(f => f.size > 100 * 1024);
  if (largeFiles.length > 0) {
    console.log(`\n   ⚠️  Found ${largeFiles.length} files larger than 100KB:`);
    largeFiles.forEach(file => {
      console.log(`      - ${file.name}: ${formatBytes(file.size)}`);
    });
  }
  
  console.log('\n✅ Analysis complete!');
}

main().catch(console.error);

