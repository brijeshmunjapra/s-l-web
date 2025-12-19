import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { glob } from 'glob'

// Image compression configuration
const COMPRESSION_CONFIG = {
  jpg: { quality: 85, progressive: true, mozjpeg: true },
  jpeg: { quality: 85, progressive: true, mozjpeg: true },
  webp: { quality: 85, effort: 4 },
  png: { quality: 85, compressionLevel: 8, palette: true }
}

const SUPPORTED_EXTENSIONS = ['jpg', 'jpeg', 'webp', 'png']

async function compressImage(inputPath, outputPath, format) {
  const config = COMPRESSION_CONFIG[format.toLowerCase()]

  if (!config) return false

  try {
    const inputStats = fs.statSync(inputPath)
    const inputSize = inputStats.size

    // Create a temporary file path
    const tempPath = `${inputPath}.tmp`

    let sharpInstance = sharp(inputPath)

    // Apply format-specific compression
    switch (format.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
        sharpInstance = sharpInstance.jpeg(config)
        break
      case 'webp':
        sharpInstance = sharpInstance.webp(config)
        break
      case 'png':
        sharpInstance = sharpInstance.png(config)
        break
    }

    await sharpInstance.toFile(tempPath)

    const outputStats = fs.statSync(tempPath)
    const outputSize = outputStats.size

    // Only replace if the compressed file is actually smaller
    if (outputSize < inputSize) {
      fs.renameSync(tempPath, inputPath)
      console.log(`✅ Auto-compressed: ${path.basename(inputPath)} (${((inputSize - outputSize) / inputSize * 100).toFixed(2)}% savings)`)
      return true
    } else {
      // Remove temp file if compression didn't help
      fs.unlinkSync(tempPath)
      console.log(`⏭️ Skipped: ${path.basename(inputPath)} (already optimized)`)
      return true
    }
  } catch (error) {
    console.error(`❌ Error compressing ${inputPath}:`, error.message)
    return false
  }
}

async function compressAssetsFolder() {
  console.log('🖼️ Auto-compressing assets...')

  const assetsPath = path.resolve('src/assets')
  const imageFiles = []

  function scanDir(dir) {
    const items = fs.readdirSync(dir)

    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        scanDir(fullPath)
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase().slice(1)
        if (SUPPORTED_EXTENSIONS.includes(ext)) {
          imageFiles.push(fullPath)
        }
      }
    }
  }

  scanDir(assetsPath)

  let compressed = 0
  for (const filePath of imageFiles) {
    const extension = path.extname(filePath).slice(1).toLowerCase()
    if (SUPPORTED_EXTENSIONS.includes(extension)) {
      const success = await compressImage(filePath, filePath, extension)
      if (success) compressed++
    }
  }

  console.log(`✨ Auto-compression complete! Processed ${compressed} images.`)
}

// Custom plugin for one-time image compression
function autoCompressPlugin() {
  return {
    name: 'auto-compress-images',
    buildStart() {
      // Compress all images once when dev server starts
      compressAssetsFolder()
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), autoCompressPlugin()],
})
