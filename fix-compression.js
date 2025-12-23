import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { glob } from 'glob';

async function compressImage(imagePath) {
  try {
    const originalSize = fs.statSync(imagePath).size;
    const ext = path.extname(imagePath).toLowerCase();

    let sharpInstance = sharp(imagePath);

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
        console.log(`⚠️  Skipping unsupported format ${ext}: ${imagePath}`);
        return { compressed: false, savedBytes: 0 };
    }

    // Process the image
    const compressedBuffer = await sharpInstance.toBuffer();
    const compressedSize = compressedBuffer.length;

    // Only replace if compression actually reduced the size
    if (compressedSize < originalSize) {
      // Create backup
      const backupPath = imagePath + '.backup';
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(imagePath, backupPath);
      }

      fs.writeFileSync(imagePath, compressedBuffer);
      const savedBytes = originalSize - compressedSize;
      console.log(`✅ ${path.relative(process.cwd(), imagePath)}: ${(savedBytes / 1024).toFixed(2)} KB saved`);
      return { compressed: true, savedBytes };
    } else {
      console.log(`⏭️  ${path.relative(process.cwd(), imagePath)}: no compression needed`);
      return { compressed: false, savedBytes: 0 };
    }

  } catch (error) {
    console.error(`❌ Failed to compress ${imagePath}:`, error.message);
    return { compressed: false, savedBytes: 0, error: true };
  }
}

async function fixCompression() {
  console.log('🔧 Fixing image compression...\n');

  const imageFiles = await glob('src/assets/**/*.{jpg,jpeg,png,webp}', {
    ignore: ['**/node_modules/**']
  });

  console.log(`📸 Found ${imageFiles.length} images to process\n`);

  let processed = 0;
  let compressed = 0;
  let errors = 0;
  let totalSaved = 0;

  // Process files sequentially to avoid file access issues
  for (const imagePath of imageFiles) {
    const result = await compressImage(imagePath);
    processed++;

    if (result.compressed) {
      compressed++;
      totalSaved += result.savedBytes;
    }
    if (result.error) {
      errors++;
    }
  }

  console.log('\n🎉 Fix complete!');
  console.log(`📊 Summary:`);
  console.log(`   • Total images: ${processed}`);
  console.log(`   • Compressed: ${compressed}`);
  console.log(`   • Errors: ${errors}`);
  console.log(`💾 Total space saved: ${(totalSaved / 1024).toFixed(2)} KB`);
}

fixCompression().catch(console.error);
