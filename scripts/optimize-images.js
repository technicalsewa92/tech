#!/usr/bin/env node

/**
 * Image Optimization Script for Technical Sewa
 *
 * This script helps optimize large images by converting them to WebP format
 * and providing optimization recommendations.
 */

const fs = require('fs');
const path = require('path');

console.log('🖼️  Starting Image Optimization for Technical Sewa...\n');

// Function to get file size in KB
function getFileSizeKB(filePath) {
  const stats = fs.statSync(filePath);
  return Math.round(stats.size / 1024);
}

// Function to check if image needs optimization
function needsOptimization(filePath) {
  const sizeKB = getFileSizeKB(filePath);
  return sizeKB > 100; // Images larger than 100KB need optimization
}

// Function to find large images
function findLargeImages(dir) {
  const largeImages = [];

  function scanDirectory(currentDir) {
    const files = fs.readdirSync(currentDir);

    files.forEach(file => {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else if (stat.isFile()) {
        const ext = path.extname(file).toLowerCase();
        if (['.png', '.jpg', '.jpeg', '.gif'].includes(ext)) {
          if (needsOptimization(filePath)) {
            largeImages.push({
              path: filePath,
              size: getFileSizeKB(filePath),
              relativePath: path.relative(process.cwd(), filePath),
            });
          }
        }
      }
    });
  }

  scanDirectory(dir);
  return largeImages;
}

// Function to generate optimization recommendations
function generateImageRecommendations(largeImages) {
  console.log('📸 Image Optimization Analysis:\n');

  if (largeImages.length === 0) {
    console.log('✅ No large images found! Your images are already optimized.');
    return;
  }

  console.log(
    `⚠️  Found ${largeImages.length} large images that need optimization:\n`
  );

  largeImages.forEach((image, index) => {
    console.log(`${index + 1}. ${image.relativePath} (${image.size}KB)`);

    // Calculate potential savings
    const potentialSavings = Math.round(image.size * 0.6); // 60% reduction with WebP
    console.log(`   💡 Convert to WebP: Could save ~${potentialSavings}KB`);

    // Provide specific recommendations
    if (image.size > 500) {
      console.log(`   🚨 CRITICAL: This image is very large! Consider:`);
      console.log(`      - Converting to WebP format`);
      console.log(`      - Reducing dimensions`);
      console.log(`      - Using Next.js Image component with optimization`);
    } else if (image.size > 200) {
      console.log(
        `   ⚠️  MEDIUM: Consider WebP conversion for better performance`
      );
    }
    console.log('');
  });

  console.log('📋 Optimization Recommendations:\n');
  console.log('1. Convert PNG/JPG to WebP format:');
  console.log('   - Use online tools like Squoosh.app');
  console.log('   - Or use command line: cwebp input.png -o output.webp');
  console.log('');
  console.log('2. Use Next.js Image component:');
  console.log('   - Automatically optimizes images');
  console.log('   - Provides WebP/AVIF formats');
  console.log('   - Implements lazy loading');
  console.log('');
  console.log('3. Implement responsive images:');
  console.log('   - Use different sizes for different devices');
  console.log('   - Consider srcset for multiple resolutions');
  console.log('');
  console.log('4. Optimize critical images first:');
  console.log('   - Focus on above-the-fold images');
  console.log('   - Prioritize hero/banner images');
  console.log('');
}

// Function to check for Next.js Image usage
function checkNextImageUsage() {
  console.log('🔍 Checking Next.js Image usage...\n');

  const componentsDir = 'components';
  const appDir = 'app';

  let nextImageUsage = 0;
  let regularImgUsage = 0;

  function scanForImages(dir) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir, { recursive: true });

    files.forEach(file => {
      if (typeof file === 'string' && file.endsWith('.tsx')) {
        const filePath = path.join(dir, file);
        const content = fs.readFileSync(filePath, 'utf8');

        if (content.includes('next/image')) {
          nextImageUsage++;
        }
        if (content.includes('<img')) {
          regularImgUsage++;
        }
      }
    });
  }

  scanForImages(componentsDir);
  scanForImages(appDir);

  console.log(`✅ Next.js Image components: ${nextImageUsage}`);
  console.log(`⚠️  Regular <img> tags: ${regularImgUsage}`);

  if (regularImgUsage > 0) {
    console.log(
      '\n💡 Recommendation: Replace regular <img> tags with Next.js Image component'
    );
    console.log(
      '   Example: <Image src="/path/to/image.jpg" alt="description" width={400} height={300} />'
    );
  }

  console.log('');
}

// Main execution
function runImageOptimization() {
  const publicDir = 'public';

  if (!fs.existsSync(publicDir)) {
    console.log('❌ Public directory not found');
    return;
  }

  console.log('🔍 Scanning for large images...\n');

  const largeImages = findLargeImages(publicDir);
  generateImageRecommendations(largeImages);
  checkNextImageUsage();

  console.log('✅ Image optimization analysis completed!');
  console.log(
    '📖 See PERFORMANCE_OPTIMIZATION.md for detailed implementation guide.'
  );
}

// Run the script
if (require.main === module) {
  runImageOptimization();
}

module.exports = {
  runImageOptimization,
  findLargeImages,
  generateImageRecommendations,
  checkNextImageUsage,
};
