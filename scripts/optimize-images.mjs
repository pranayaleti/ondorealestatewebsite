#!/usr/bin/env node
/**
 * Build-time image optimization script
 * Optimizes images in public/ directory using sharp
 * Creates optimized versions in multiple formats (WebP, AVIF) and sizes
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, dirname, extname, basename } from 'path';
import { existsSync } from 'fs';

const PUBLIC_DIR = join(process.cwd(), 'public');
const OPTIMIZED_DIR = join(PUBLIC_DIR, '_optimized');
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];
const MAX_WIDTH = 1920;
const QUALITY = 85;

// Responsive image sizes
const SIZES = [640, 768, 1024, 1280, 1920];

async function optimizeImage(inputPath, outputDir) {
  const ext = extname(inputPath).toLowerCase();
  const name = basename(inputPath, ext);
  
  if (!IMAGE_EXTENSIONS.includes(ext)) {
    return;
  }

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Skip if already small
    if (metadata.width && metadata.width <= 640 && metadata.height && metadata.height <= 640) {
      return;
    }

    // Create optimized versions
    const tasks = [];

    // Generate WebP versions at different sizes
    for (const size of SIZES) {
      if (metadata.width && size > metadata.width) continue;
      
      const outputPath = join(outputDir, `${name}-${size}w.webp`);
      tasks.push(
        image
          .clone()
          .resize(size, null, { withoutEnlargement: true })
          .webp({ quality: QUALITY, effort: 6 })
          .toFile(outputPath)
          .then(() => console.log(`✓ Generated ${basename(outputPath)}`))
      );
    }

    // Generate AVIF version (smallest, best quality)
    const avifPath = join(outputDir, `${name}.avif`);
    tasks.push(
      image
        .clone()
        .resize(MAX_WIDTH, null, { withoutEnlargement: true })
        .avif({ quality: QUALITY, effort: 4 })
        .toFile(avifPath)
        .then(() => console.log(`✓ Generated ${basename(avifPath)}`))
    );

    // Generate optimized WebP fallback
    const webpPath = join(outputDir, `${name}.webp`);
    tasks.push(
      image
        .clone()
        .resize(MAX_WIDTH, null, { withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6 })
        .toFile(webpPath)
        .then(() => console.log(`✓ Generated ${basename(webpPath)}`))
    );

    await Promise.all(tasks);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
  }
}

async function processDirectory(dir) {
  const entries = await readdir(dir);
  
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stats = await stat(fullPath);
    
    if (stats.isDirectory()) {
      if (entry === '_optimized' || entry === 'node_modules') {
        continue;
      }
      await processDirectory(fullPath);
    } else if (stats.isFile()) {
      const ext = extname(entry).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext)) {
        const relativePath = fullPath.replace(PUBLIC_DIR + '/', '');
        const outputDir = join(OPTIMIZED_DIR, dirname(relativePath));
        
        if (!existsSync(outputDir)) {
          await mkdir(outputDir, { recursive: true });
        }
        
        await optimizeImage(fullPath, outputDir);
      }
    }
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');
  
  if (!existsSync(OPTIMIZED_DIR)) {
    await mkdir(OPTIMIZED_DIR, { recursive: true });
  }
  
  await processDirectory(PUBLIC_DIR);
  
  console.log('\n✅ Image optimization complete!');
  console.log(`📁 Optimized images saved to: ${OPTIMIZED_DIR}`);
}

main().catch(console.error);

