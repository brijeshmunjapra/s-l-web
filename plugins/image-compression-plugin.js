import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { glob } from 'glob';

export default function imageCompressionPlugin(options = {}) {
  const {
    srcDir = 'src/assets',
    quality = 80,
    compressionLevel = 6,
    formats = ['jpg', 'jpeg', 'png', 'webp'],
    exclude = [],
    cacheDir = '.image-cache'
  } = options;

  let compressedImages = new Set();
  let isFirstRun = true;

  async function compressImages() {
    try {
      const imageFiles = await findImageFiles(srcDir, formats, exclude);

      if (imageFiles.length === 0) {
        console.log('ℹ️  No images found to compress');
        return;
      }

      console.log(`📸 Found ${imageFiles.length} images to process`);

      let processed = 0;
      let compressed = 0;
      let totalSaved = 0;

      for (const imagePath of imageFiles) {
        try {
          const result = await processImage(imagePath, {
            quality,
            compressionLevel,
            cacheDir
          });

          processed++;

          if (result.compressed) {
            compressed++;
            totalSaved += result.savedBytes;
            console.log(`✅ ${path.relative(process.cwd(), imagePath)}: ${formatBytes(result.savedBytes)} saved`);
          } else if (result.cached) {
            console.log(`📋 ${path.relative(process.cwd(), imagePath)}: using cached version`);
          }
        } catch (error) {
          console.warn(`⚠️  Failed to process ${imagePath}:`, error.message);
        }
      }

      if (compressed > 0) {
        console.log(`🎉 Compressed ${compressed}/${processed} images, saved ${formatBytes(totalSaved)} total`);
      } else {
        console.log(`✨ All ${processed} images are already optimized`);
      }

    } catch (error) {
      console.error('❌ Image compression failed:', error);
    }
  }

  async function findImageFiles(srcDir, formats, exclude) {
    const patterns = formats.map(format => path.join(srcDir, `**/*.${format}`));
    console.log('🔍 Looking for images with patterns:', patterns);
    const files = await glob(patterns, {
      ignore: exclude.map(pattern => `**/${pattern}/**`)
    });
    console.log('📁 Found files:', files);
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

        default: {
          // For other formats, try to convert to WebP with better compression
          sharpInstance = sharpInstance.webp({
            quality: quality,
            effort: 4
          });
          const newPath = path.join(dirname, `${basename}.webp`);
          await sharpInstance.toFile(newPath);
          fs.unlinkSync(imagePath); // Remove original
          return { compressed: true, savedBytes: originalSize - fs.statSync(newPath).size };
        }
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

  return {
    name: 'vite-plugin-image-compression',

    configureServer(server) {
      // Run compression once when dev server starts
      if (isFirstRun) {
        console.log('🔄 Starting automatic image compression...');
        compressImages();
        isFirstRun = false;
      }
    },

    buildStart() {
      // Also run during build
      if (isFirstRun) {
        console.log('🔄 Starting automatic image compression...');
        compressImages();
        isFirstRun = false;
      }
    }
  };
}
