#!/usr/bin/env node
/**
 * Comprehensive image optimization script
 * Optimizes all images in public/ directory to WebP and reduces file sizes
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, dirname, extname, basename } from 'path';
import { existsSync } from 'fs';

const PUBLIC_DIR = join(process.cwd(), 'public');
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];
const MAX_QUALITY = 85;
const MAX_WIDTH = 1920;

// Skip already optimized images
const SKIP_PATTERNS = ['logo-favicon', '_optimized'];

async function optimizeImage(inputPath, outputPath, maxWidth = MAX_WIDTH, quality = MAX_QUALITY) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Skip if already small
    if (metadata.width && metadata.width <= 640) {
      return { optimized: false, reason: 'already small' };
    }

    const targetWidth = Math.min(metadata.width || maxWidth, maxWidth);
    
    // Generate WebP version (smaller than PNG)
    await image
      .resize(targetWidth, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ 
        quality,
        effort: 6,
        nearLossless: false
      })
      .toFile(outputPath);
    
    const originalSize = await stat(inputPath);
    const optimizedSize = await stat(outputPath);
    const savings = ((originalSize.size - optimizedSize.size) / originalSize.size * 100).toFixed(1);
    
    return {
      optimized: true,
      originalSize: originalSize.size,
      optimizedSize: optimizedSize.size,
      savings: parseFloat(savings),
    };
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
    return { optimized: false, error: error.message };
  }
}

async function processDirectory(dir) {
  const entries = await readdir(dir);
  const results = [];
  
  for (const entry of entries) {
    // Skip hidden files and optimization directories
    if (entry.startsWith('.') || SKIP_PATTERNS.some(pattern => entry.includes(pattern))) {
      continue;
    }
    
    const fullPath = join(dir, entry);
    const stats = await stat(fullPath);
    
    if (stats.isDirectory()) {
      continue; // Skip subdirectories for now
    } else if (stats.isFile()) {
      const ext = extname(entry).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext)) {
        const name = basename(entry, ext);
        const webpPath = join(dir, `${name}.webp`);
        
        // Only optimize if WebP doesn't exist or is older
        if (!existsSync(webpPath) || (await stat(webpPath)).mtime < stats.mtime) {
          const result = await optimizeImage(fullPath, webpPath);
          if (result.optimized) {
            results.push({
              file: entry,
              original: `${(result.originalSize / 1024).toFixed(1)} KB`,
              optimized: `${(result.optimizedSize / 1024).toFixed(1)} KB`,
              savings: `${result.savings}%`,
            });
            console.log(`✓ ${entry} → ${name}.webp (${result.savings}% smaller)`);
          }
        }
      }
    }
  }
  
  return results;
}

async function main() {
  console.log('🖼️  Optimizing all images...\n');
  
  const results = await processDirectory(PUBLIC_DIR);
  
  if (results.length === 0) {
    console.log('No images needed optimization.\n');
  } else {
    console.log(`\n✅ Optimized ${results.length} images`);
    const totalOriginal = results.reduce((sum, r) => sum + parseFloat(r.original), 0);
    const totalOptimized = results.reduce((sum, r) => sum + parseFloat(r.optimized), 0);
    const totalSavings = ((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1);
    console.log(`Total savings: ${totalSavings}% (${totalOriginal.toFixed(1)} KB → ${totalOptimized.toFixed(1)} KB)\n`);
  }
  
  console.log('💡 Next steps:');
  console.log('   Update components to use .webp versions for better performance');
  console.log('   Example: src="/image.png" → src="/image.webp"');
}

main().catch(console.error);

