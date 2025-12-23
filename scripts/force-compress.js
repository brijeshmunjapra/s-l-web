#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { glob } from 'glob';

// Force compress the problematic images by working with backup files
async function forceCompressProblematicImages() {
  console.log('🔧 Force compressing problematic images...\n');

  // List of known problematic files
  const problematicFiles = [
    'src/assets/ContactUs.jpg',
    'src/assets/third-section/right.webp',
    'src/assets/third-section/left-top.webp',
    'src/assets/third-section/left-bottom.webp',
    'src/assets/sixth-section/bg.jpg',
    'src/assets/second-section/image.webp',
    'src/assets/hero/5.jpg',
    'src/assets/hero/4.jpg',
    'src/assets/hero/3.jpg',
    'src/assets/hero/2.jpg',
    'src/assets/hero/1.jpg',
    'src/assets/first-section/right.jpg',
    'src/assets/first-section/left.jpg',
    'src/assets/about-us/1.jpg'
  ];

  let processed = 0;
  let compressed = 0;
  let totalSaved = 0;

  for (const imagePath of problematicFiles) {
    try {
      const backupPath = imagePath + '.backup';

      if (!fs.existsSync(backupPath)) {
        console.log(`⏭️  No backup found for ${imagePath}, skipping...`);
        continue;
      }

      console.log(`🔄 Processing ${imagePath} using backup...`);

      // Compress the backup file
      const ext = path.extname(imagePath).toLowerCase();
      const originalSize = fs.statSync(backupPath).size;

      let sharpInstance = sharp(backupPath);

      // Apply compression based on format
      switch (ext) {
        case '.jpg':
        case '.jpeg':
          sharpInstance = sharpInstance.jpeg({
            quality: 80,
            progressive: true,
            mozjpeg: true
          });
          break;

        case '.png':
          sharpInstance = sharpInstance.png({
            compressionLevel: 6,
            progressive: true
          });
          break;

        case '.webp':
          sharpInstance = sharpInstance.webp({
            quality: 80,
            effort: 4
          });
          break;

        default:
          console.log(`⚠️  Unsupported format ${ext} for ${imagePath}, skipping...`);
          continue;
      }

      // Process the image
      const compressedBuffer = await sharpInstance.toBuffer();
      const compressedSize = compressedBuffer.length;

      if (compressedSize < originalSize) {
        // Replace the original file
        fs.writeFileSync(imagePath, compressedBuffer);

        // Update backup with compressed version
        fs.writeFileSync(backupPath, compressedBuffer);

        const savedBytes = originalSize - compressedSize;
        console.log(`✅ ${imagePath}: ${(savedBytes / 1024).toFixed(2)} KB saved`);
        compressed++;
        totalSaved += savedBytes;
      } else {
        console.log(`⏭️  ${imagePath}: no compression needed`);
      }

      processed++;

    } catch (error) {
      console.warn(`❌ Failed to force compress ${imagePath}:`, error.message);
    }
  }

  console.log('\n🎉 Force compression complete!');
  console.log(`📊 Summary:`);
  console.log(`   • Processed: ${processed}`);
  console.log(`   • Compressed: ${compressed}`);
  console.log(`💾 Total space saved: ${(totalSaved / 1024).toFixed(2)} KB`);
}

forceCompressProblematicImages().catch(console.error);
