#!/usr/bin/env node
/**
 * Check for unused dependencies
 * Helps identify packages that can be removed to reduce bundle size
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const packageJsonPath = join(process.cwd(), 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

const dependencies = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies,
};

// Known unused dependencies (based on analysis)
const potentiallyUnused = [
  'react-router-dom', // Next.js uses its own routing
  '@vercel/analytics', // Commented out in layout.tsx
];

console.log('🔍 Checking for unused dependencies...\n');

// Check each potentially unused dependency
for (const dep of potentiallyUnused) {
  if (dependencies[dep]) {
    try {
      // Try to find imports of this package
      const result = execSync(
        `grep -r "from ['\"]${dep}" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" . 2>/dev/null || true`,
        { encoding: 'utf-8', cwd: process.cwd() }
      );
      
      if (!result.trim()) {
        console.log(`⚠️  Potentially unused: ${dep}`);
        console.log(`   Consider removing: npm uninstall ${dep}\n`);
      } else {
        console.log(`✓ ${dep} is being used\n`);
      }
    } catch (error) {
      console.log(`⚠️  Could not check ${dep}: ${error.message}\n`);
    }
  }
}

console.log('✅ Dependency check complete!');
console.log('\n💡 Tips:');
console.log('   - Use tree-shaken imports: import format from "date-fns/format"');
console.log('   - Use dynamic imports for heavy libraries');
console.log('   - Remove unused dependencies to reduce bundle size');

