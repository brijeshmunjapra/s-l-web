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
  srcDir: 'src/assets',
  quality: 80,
  compressionLevel: 6,
  formats: ['jpg', 'jpeg', 'png', 'webp'],
  exclude: ['node_modules', '.git'],
  cacheDir: '.image-cache'
};

async function findImageFiles(srcDir, formats, exclude) {
  const patterns = formats.map(format => `${srcDir}/**/*.${format}`);

  const files = await glob(patterns, {
    ignore: exclude.map(pattern => `**/${pattern}/**`),
    cwd: process.cwd()
  });

  return files;
}

async function processImage(imagePath, options) {
  const { quality, compressionLevel, cacheDir } = options;

  // Create cache directory if it doesn't exist
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  const ext = path.extname(imagePath).toLowerCase();
  const basename = path.basename(imagePath, ext);
  const dirname = path.dirname(imagePath);

  // Create cache file path
  const cacheKey = `${basename}_${fs.statSync(imagePath).mtime.getTime()}`;
  const cachePath = path.join(cacheDir, `${cacheKey}${ext}`);

  // Check if cached version exists and is newer
  if (fs.existsSync(cachePath)) {
    const cacheStats = fs.statSync(cachePath);
    const originalStats = fs.statSync(imagePath);

    if (cacheStats.mtime >= originalStats.mtime) {
      // Copy cached version to original location if different
      if (!areFilesEqual(imagePath, cachePath)) {
        fs.copyFileSync(cachePath, imagePath);
      }
      return { compressed: false, cached: true, savedBytes: 0 };
    }
  }

  const originalSize = fs.statSync(imagePath).size;

  try {
    let sharpInstance = sharp(imagePath);

    // Get image info
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

      default:
        console.log(`⚠️  Unsupported format ${ext} for ${imagePath}, skipping...`);
        return { compressed: false, cached: false, savedBytes: 0 };
    }

    // Process the image
    const compressedBuffer = await sharpInstance.toBuffer();
    const compressedSize = compressedBuffer.length;

    // Only replace if compression actually reduced the size
    if (compressedSize < originalSize) {
      fs.writeFileSync(imagePath, compressedBuffer);

      // Save to cache
      fs.writeFileSync(cachePath, compressedBuffer);

      return {
        compressed: true,
        savedBytes: originalSize - compressedSize
      };
    } else {
      // If compression didn't help, still cache the original
      fs.copyFileSync(imagePath, cachePath);
      return { compressed: false, cached: false, savedBytes: 0 };
    }

  } catch (error) {
    throw new Error(`Failed to compress ${imagePath}: ${error.message}`);
  }
}

function areFilesEqual(file1, file2) {
  try {
    const buffer1 = fs.readFileSync(file1);
    const buffer2 = fs.readFileSync(file2);
    return buffer1.equals(buffer2);
  } catch {
    return false;
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function compressImages() {
  console.log('🚀 Starting manual image compression...\n');

  try {
    const imageFiles = await findImageFiles(CONFIG.srcDir, CONFIG.formats, CONFIG.exclude);

    if (imageFiles.length === 0) {
      console.log('ℹ️  No images found to compress');
      return;
    }

    console.log(`📸 Processing ${imageFiles.length} images...\n`);

    let processed = 0;
    let compressed = 0;
    let cached = 0;
    let totalSaved = 0;
    let errors = 0;

    for (const imagePath of imageFiles) {
      try {
        const result = await processImage(imagePath, CONFIG);

        processed++;

        if (result.compressed) {
          compressed++;
          totalSaved += result.savedBytes;
          console.log(`✅ ${path.relative(process.cwd(), imagePath)}: ${formatBytes(result.savedBytes)} saved`);
        } else if (result.cached) {
          cached++;
          console.log(`📋 ${path.relative(process.cwd(), imagePath)}: using cached version`);
        } else {
          console.log(`⏭️  ${path.relative(process.cwd(), imagePath)}: no compression needed`);
        }
      } catch (error) {
        errors++;
        console.warn(`❌ Failed to process ${imagePath}:`, error.message);
      }
    }

    console.log('\n🎉 Compression complete!');
    console.log(`📊 Summary:`);
    console.log(`   • Total images: ${processed}`);
    console.log(`   • Compressed: ${compressed}`);
    console.log(`   • Used cache: ${cached}`);
    console.log(`   • Errors: ${errors}`);

    if (compressed > 0) {
      console.log(`💾 Total space saved: ${formatBytes(totalSaved)}`);
    }

  } catch (error) {
    console.error('❌ Image compression failed:', error);
    process.exit(1);
  }
}

// Run the compression
compressImages();
