#!/usr/bin/env node

/**
 * Performance Optimization Script for Technical Sewa
 *
 * This script helps implement the performance optimizations
 * outlined in the PERFORMANCE_OPTIMIZATION.md file.
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Performance Optimization for Technical Sewa...\n');

// 1. Analyze current bundle size
function analyzeBundle() {
  console.log('📊 Analyzing current bundle size...');

  // Check if bundle analyzer is available
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  if (packageJson.dependencies['@next/bundle-analyzer']) {
    console.log('✅ Bundle analyzer is already configured');
  } else {
    console.log(
      '❌ Bundle analyzer not found. Run: npm install @next/bundle-analyzer'
    );
  }
}

// 2. Check for unused dependencies
function checkUnusedDependencies() {
  console.log('\n🔍 Checking for unused dependencies...');

  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const dependencies = Object.keys(packageJson.dependencies);

  // List potentially unused heavy dependencies
  const heavyDeps = [
    'react-icons',
    '@mui/material',
    '@mui/icons-material',
    'framer-motion',
    'swiper',
    'react-leaflet',
    'leaflet',
  ];

  console.log('📦 Heavy dependencies found:');
  heavyDeps.forEach(dep => {
    if (dependencies.includes(dep)) {
      console.log(`   - ${dep} (consider optimization)`);
    }
  });
}

// 3. Check for duplicate icon libraries
function checkIconLibraries() {
  console.log('\n🎨 Checking icon libraries...');

  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const dependencies = Object.keys(packageJson.dependencies);

  const iconLibs = ['react-icons', 'lucide-react'];
  const foundIcons = iconLibs.filter(lib => dependencies.includes(lib));

  if (foundIcons.length > 1) {
    console.log('⚠️  Multiple icon libraries detected:');
    foundIcons.forEach(lib => console.log(`   - ${lib}`));
    console.log(
      '💡 Recommendation: Consolidate to lucide-react for better performance'
    );
  } else {
    console.log('✅ Icon libraries look good');
  }
}

// 4. Check Next.js configuration
function checkNextConfig() {
  console.log('\n⚙️  Checking Next.js configuration...');

  if (fs.existsSync('next.config.js')) {
    const config = fs.readFileSync('next.config.js', 'utf8');

    const checks = [
      { name: 'Gzip compression', pattern: /compress:\s*true/ },
      { name: 'Image optimization', pattern: /images:\s*{/ },
      { name: 'Cache headers', pattern: /Cache-Control/ },
      { name: 'Bundle analyzer', pattern: /@next\/bundle-analyzer/ },
      { name: 'Package optimization', pattern: /optimizePackageImports/ },
    ];

    checks.forEach(check => {
      if (check.pattern.test(config)) {
        console.log(`✅ ${check.name} is configured`);
      } else {
        console.log(`❌ ${check.name} is missing`);
      }
    });
  } else {
    console.log('❌ next.config.js not found');
  }
}

// 5. Check for large components
function checkLargeComponents() {
  console.log('\n📁 Checking for large components...');

  const componentsDir = 'components';
  if (fs.existsSync(componentsDir)) {
    const files = fs.readdirSync(componentsDir, { recursive: true });

    const largeFiles = files.filter(file => {
      if (typeof file === 'string' && file.endsWith('.tsx')) {
        const filePath = path.join(componentsDir, file);
        const stats = fs.statSync(filePath);
        return stats.size > 10000; // Files larger than 10KB
      }
      return false;
    });

    if (largeFiles.length > 0) {
      console.log('📦 Large components found:');
      largeFiles.forEach(file => {
        const filePath = path.join(componentsDir, file);
        const stats = fs.statSync(filePath);
        console.log(`   - ${file} (${Math.round(stats.size / 1024)}KB)`);
      });
      console.log('💡 Consider code splitting for these components');
    } else {
      console.log('✅ No unusually large components found');
    }
  }
}

// 6. Check image optimization
function checkImageOptimization() {
  console.log('\n🖼️  Checking image optimization...');

  const publicDir = 'public';
  if (fs.existsSync(publicDir)) {
    const files = fs.readdirSync(publicDir, { recursive: true });
    const imageFiles = files.filter(
      file =>
        typeof file === 'string' && /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file)
    );

    console.log(`📸 Found ${imageFiles.length} image files`);

    // Check for large images
    const largeImages = imageFiles.filter(file => {
      const filePath = path.join(publicDir, file);
      const stats = fs.statSync(filePath);
      return stats.size > 500000; // Images larger than 500KB
    });

    if (largeImages.length > 0) {
      console.log('⚠️  Large images found:');
      largeImages.forEach(file => {
        const filePath = path.join(publicDir, file);
        const stats = fs.statSync(filePath);
        console.log(`   - ${file} (${Math.round(stats.size / 1024)}KB)`);
      });
      console.log('💡 Consider optimizing these images');
    }
  }
}

// 7. Generate optimization recommendations
function generateRecommendations() {
  console.log('\n📋 Performance Optimization Recommendations:\n');

  const recommendations = [
    {
      priority: 'HIGH',
      action: 'Enable gzip compression',
      impact: 'Reduce bundle size by 60-80%',
      implementation: 'Already configured in next.config.js',
    },
    {
      priority: 'HIGH',
      action: 'Add cache headers',
      impact: 'Improve repeat visits by 40-60%',
      implementation: 'Already configured in next.config.js',
    },
    {
      priority: 'HIGH',
      action: 'Optimize images',
      impact: 'Reduce image size by 50-70%',
      implementation: 'Use Next.js Image component with WebP/AVIF',
    },
    {
      priority: 'MEDIUM',
      action: 'Consolidate icon libraries',
      impact: 'Reduce bundle size by 200-300KB',
      implementation: 'Replace react-icons with lucide-react where possible',
    },
    {
      priority: 'MEDIUM',
      action: 'Implement code splitting',
      impact: 'Improve initial load time by 30-50%',
      implementation: 'Use dynamic imports for heavy components',
    },
    {
      priority: 'MEDIUM',
      action: 'Optimize Material-UI usage',
      impact: 'Reduce bundle size by 100-200KB',
      implementation: 'Use dynamic imports for MUI components',
    },
    {
      priority: 'LOW',
      action: 'Add service worker',
      impact: 'Enable offline functionality',
      implementation: 'Implement PWA features',
    },
  ];

  recommendations.forEach(rec => {
    console.log(`${rec.priority}: ${rec.action}`);
    console.log(`   Impact: ${rec.impact}`);
    console.log(`   Implementation: ${rec.implementation}\n`);
  });
}

// 8. Generate action plan
function generateActionPlan() {
  console.log('\n🎯 Immediate Action Plan:\n');

  const actions = [
    '1. Run: npm run build && ANALYZE=true npm run build',
    '2. Review bundle analysis report',
    '3. Implement code splitting for dashboard components',
    '4. Replace react-icons with lucide-react in UI components',
    '5. Optimize images using Next.js Image component',
    '6. Add lazy loading to heavy components',
    '7. Test performance with Lighthouse',
    '8. Monitor Core Web Vitals',
  ];

  actions.forEach(action => {
    console.log(`   ${action}`);
  });
}

// Run all checks
function runOptimizationCheck() {
  analyzeBundle();
  checkUnusedDependencies();
  checkIconLibraries();
  checkNextConfig();
  checkLargeComponents();
  checkImageOptimization();
  generateRecommendations();
  generateActionPlan();

  console.log('\n✅ Performance optimization check completed!');
  console.log(
    '📖 See PERFORMANCE_OPTIMIZATION.md for detailed implementation guide.'
  );
}

// Run the script
if (require.main === module) {
  runOptimizationCheck();
}

module.exports = {
  runOptimizationCheck,
  analyzeBundle,
  checkUnusedDependencies,
  checkIconLibraries,
  checkNextConfig,
  checkLargeComponents,
  checkImageOptimization,
  generateRecommendations,
  generateActionPlan,
};
