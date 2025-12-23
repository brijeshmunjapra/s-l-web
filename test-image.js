import sharp from 'sharp';
import fs from 'fs';

async function testImage(imagePath) {
  try {
    console.log(`Testing ${imagePath}...`);

    // Check if file exists
    if (!fs.existsSync(imagePath)) {
      console.log('File does not exist');
      return;
    }

    const stats = fs.statSync(imagePath);
    console.log(`File size: ${stats.size} bytes`);

    // Try to get metadata
    const metadata = await sharp(imagePath).metadata();
    console.log('Metadata:', metadata);

    // Try to compress
    const buffer = await sharp(imagePath)
      .jpeg({ quality: 80 })
      .toBuffer();

    console.log(`Compressed size: ${buffer.length} bytes`);
    console.log('✅ Success!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testImage('src/assets/ContactUs.jpg');
