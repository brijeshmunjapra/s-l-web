#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  searchDirs: ['src', 'public', '.'], // Search in multiple directories
  quality: 80,
  compressionLevel: 6,
  formats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'], // Include more formats
  exclude: ['node_modules', '.git', '.image-cache', 'dist', 'build'],
  maxRetries: 3, // Retry failed images
  retryDelay: 1000 // Wait 1 second between retries
};

async function findAllImageFiles(searchDirs, formats, exclude) {
  const allFiles = [];

  for (const dir of searchDirs) {
    if (!fs.existsSync(dir)) {
      console.log(`⚠️  Directory ${dir} does not exist, skipping...`);
      continue;
    }

    const patterns = formats.map(format => `${dir}/**/*.${format}`);
    console.log(`🔍 Searching in ${dir} with patterns:`, patterns);

    try {
      const files = await glob(patterns, {
        ignore: exclude.map(pattern => `**/${pattern}/**`),
        cwd: process.cwd(),
        absolute: true
      });
      allFiles.push(...files);
      console.log(`📁 Found ${files.length} images in ${dir}`);
    } catch (error) {
      console.warn(`⚠️  Error searching in ${dir}:`, error.message);
    }
  }

  // Remove duplicates
  const uniqueFiles = [...new Set(allFiles)];
  return uniqueFiles;
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function processImageWithRetry(imagePath, options, retryCount = 0) {
  const { quality, compressionLevel } = options;

  try {
    // Check if file exists and is readable
    if (!fs.existsSync(imagePath)) {
      throw new Error('File does not exist');
    }

    const stats = fs.statSync(imagePath);
    if (stats.size === 0) {
      throw new Error('File is empty');
    }

    const ext = path.extname(imagePath).toLowerCase();
    const originalSize = stats.size;

    let sharpInstance = sharp(imagePath);

    // Get metadata first to ensure file is valid
    const metadata = await sharpInstance.metadata();

    // Apply compression based on format
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        sharpInstance = sharpInstance.jpeg({
          quality: quality,
          progressive: true,
          mozjpeg: true
        });
        break;

      case '.png':
        sharpInstance = sharpInstance.png({
          compressionLevel: compressionLevel,
          progressive: true
        });
        break;

      case '.webp':
        sharpInstance = sharpInstance.webp({
          quality: quality,
          effort: 4
        });
        break;

      case '.gif':
        // Convert GIF to WebP for better compression
        sharpInstance = sharpInstance.webp({
          quality: quality,
          effort: 4
        });
        const newPath = imagePath.replace(/\.gif$/i, '.webp');
        await sharpInstance.toFile(newPath);
        fs.unlinkSync(imagePath);
        return {
          compressed: true,
          savedBytes: originalSize - fs.statSync(newPath).size,
          converted: true,
          newPath
        };

      case '.svg':
        // SVGs are usually already optimized, skip compression
        return { compressed: false, savedBytes: 0, skipped: true };

      default:
        console.log(`⚠️  Unsupported format ${ext} for ${imagePath}, skipping...`);
        return { compressed: false, savedBytes: 0, skipped: true };
    }

    // Process the image
    const compressedBuffer = await sharpInstance.toBuffer();
    const compressedSize = compressedBuffer.length;

    // Only replace if compression actually reduced the size
    if (compressedSize < originalSize) {
      // Create backup if it doesn't exist
      const backupPath = imagePath + '.backup';
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(imagePath, backupPath);
      }

      fs.writeFileSync(imagePath, compressedBuffer);

      return {
        compressed: true,
        savedBytes: originalSize - compressedSize
      };
    } else {
      return { compressed: false, savedBytes: 0 };
    }

  } catch (error) {
    if (retryCount < CONFIG.maxRetries) {
      console.log(`🔄 Retrying ${path.relative(process.cwd(), imagePath)} (attempt ${retryCount + 1}/${CONFIG.maxRetries})`);
      await sleep(CONFIG.retryDelay);
      return processImageWithRetry(imagePath, options, retryCount + 1);
    }

    throw new Error(`${error.message}`);
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function compressAllImages() {
  console.log('🚀 Starting comprehensive image compression for entire project...\n');

  try {
    const imageFiles = await findAllImageFiles(CONFIG.searchDirs, CONFIG.formats, CONFIG.exclude);

    if (imageFiles.length === 0) {
      console.log('ℹ️  No images found to compress');
      return;
    }

    console.log(`\n📸 Found ${imageFiles.length} images to process\n`);

    let processed = 0;
    let compressed = 0;
    let converted = 0;
    let skipped = 0;
    let totalSaved = 0;
    let errors = 0;

    // Process images sequentially to avoid file access conflicts
    for (const imagePath of imageFiles) {
      try {
        const result = await processImageWithRetry(imagePath, CONFIG);

        processed++;

        if (result.compressed) {
          compressed++;
          totalSaved += result.savedBytes;
          if (result.converted) {
            converted++;
            console.log(`🔄 ${path.relative(process.cwd(), imagePath)} → ${path.relative(process.cwd(), result.newPath)}: ${formatBytes(result.savedBytes)} saved`);
          } else {
            console.log(`✅ ${path.relative(process.cwd(), imagePath)}: ${formatBytes(result.savedBytes)} saved`);
          }
        } else if (result.skipped) {
          skipped++;
          console.log(`⏭️  ${path.relative(process.cwd(), imagePath)}: skipped (unsupported or already optimized)`);
        } else {
          console.log(`⏭️  ${path.relative(process.cwd(), imagePath)}: no compression needed`);
        }
      } catch (error) {
        errors++;
        console.warn(`❌ Failed to process ${path.relative(process.cwd(), imagePath)}:`, error.message);
      }
    }

    console.log('\n🎉 Comprehensive compression complete!');
    console.log(`📊 Summary:`);
    console.log(`   • Total images: ${processed}`);
    console.log(`   • Compressed: ${compressed}`);
    console.log(`   • Converted (GIF→WebP): ${converted}`);
    console.log(`   • Skipped: ${skipped}`);
    console.log(`   • Errors: ${errors}`);

    if (compressed > 0 || converted > 0) {
      console.log(`💾 Total space saved: ${formatBytes(totalSaved)}`);
    }

    if (errors > 0) {
      console.log(`\n💡 Tip: Some images failed due to file access issues. Try closing any programs using these images and run again.`);
    }

  } catch (error) {
    console.error('❌ Image compression failed:', error);
    process.exit(1);
  }
}

// Run the compression
compressAllImages();
