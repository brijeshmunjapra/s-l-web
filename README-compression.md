# Image Compression Script

This project includes a manual image compression script that you can run to optimize all images in the `src/assets` folder.

## How to Use

To compress all images in your assets folder, run:

```bash
npm run compress-images
```

npm run compress-all

npm run compress-images

npm run force-compress

## What it does

- Scans all images in `src/assets` folder (including subdirectories)
- Supports JPG, JPEG, PNG, and WebP formats
- Compresses images using optimal settings for each format
- Only replaces files if compression actually reduces file size
- Uses caching to avoid re-processing unchanged images
- Provides detailed progress and savings report

## Configuration

The compression settings are configured in `scripts/compress-images.js`:

- **Quality**: 80% (for JPG/WebP)
- **Compression Level**: 6 (for PNG)
- **Supported formats**: JPG, JPEG, PNG, WebP
- **Cache directory**: `.image-cache`

## Output

The script will show:
- Number of images found and processed
- Space saved for each compressed image
- Total compression statistics
- Any errors encountered

## Example Output

```
🚀 Starting manual image compression...

📸 Processing 40 images...

✅ src\assets\logo.png: 70.56 KB saved
✅ src\assets\hero\1.jpg: 245.12 KB saved
⏭️  src\assets\already-optimized.webp: no compression needed

🎉 Compression complete!
📊 Summary:
   • Total images: 40
   • Compressed: 25
   • Used cache: 10
   • Errors: 5
💾 Total space saved: 2.3 MB
```

## Notes

- The script uses Sharp for image processing (already included in dependencies)
- Images are only replaced if compression reduces file size
- A cache system prevents re-processing of unchanged images
- Some files may fail to process due to file access permissions
