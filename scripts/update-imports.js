const fs = require('fs');
const path = require('path');

// Import path mappings for the new structure
const importMappings = {
  // Old paths to new paths
  '@/components/ui/': '@/components/ui/',
  '@/components/': '@/components/',
  '@/lib/': '@/lib/',
  '@/hooks/': '@/hooks/',
  '@/store/': '@/store/',
  '@/utils/': '@/lib/utils/',
  '@/types/': '@/lib/types/',
  '@/api/': '@/lib/api/',
  '@/config/': '@/lib/config/',

  // Specific component mappings
  '@/components/ui/Button': '@/components/ui/Button',
  '@/components/ui/Input': '@/components/ui/Input',
  '@/components/ui/Modal': '@/components/ui/Modal',
  '@/components/ui/Table': '@/components/ui/Table',
  '@/components/ui/Avatar': '@/components/ui/Avatar',
  '@/components/ui/Badge': '@/components/ui/Badge',
  '@/components/ui/Skeleton': '@/components/ui/Skeleton',
  '@/components/ui/Loading': '@/components/ui/Loading',
  '@/components/ui/CdnImage': '@/components/ui/CdnImage',
  '@/components/ui/ImageWithFallback': '@/components/ui/ImageWithFallback',
  '@/components/ui/PageTitle': '@/components/ui/PageTitle',

  // Utility mappings
  '@/lib/utils': '@/lib/utils',
  '@/lib/api': '@/lib/api',
  '@/lib/authApi': '@/lib/authApi',
  '@/lib/seo': '@/lib/seo',
  '@/lib/analytics': '@/lib/analytics',
  '@/lib/firebase': '@/lib/firebase',
  '@/lib/fpixel': '@/lib/fpixel',
  '@/lib/googleReviews': '@/lib/googleReviews',
  '@/lib/logger': '@/lib/logger',
  '@/lib/react-query': '@/lib/react-query',
  '@/lib/cdn': '@/lib/cdn',
  '@/lib/catchfn': '@/lib/catchfn',
  '@/lib/essentials': '@/lib/essentials',
};

// Directories to process
const directories = [
  'app',
  'components',
  'features',
  'src',
  'lib',
  'hooks',
  'store',
  'utils',
];

// File extensions to process
const extensions = ['.ts', '.tsx', '.js', '.jsx'];

function updateImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;

    // Update import statements
    for (const [oldPath, newPath] of Object.entries(importMappings)) {
      const importRegex = new RegExp(
        `from\\s+['"]${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^'"]*)['"]`,
        'g'
      );
      const newContent = content.replace(importRegex, `from '${newPath}$1'`);

      if (newContent !== content) {
        content = newContent;
        updated = true;
      }
    }

    // Update require statements
    for (const [oldPath, newPath] of Object.entries(importMappings)) {
      const requireRegex = new RegExp(
        `require\\(['"]${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^'"]*)['"]\\)`,
        'g'
      );
      const newContent = content.replace(
        requireRegex,
        `require('${newPath}$1')`
      );

      if (newContent !== content) {
        content = newContent;
        updated = true;
      }
    }

    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated imports in: ${filePath}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function processDirectory(dirPath) {
  try {
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        processDirectory(fullPath);
      } else if (stat.isFile() && extensions.includes(path.extname(item))) {
        updateImportsInFile(fullPath);
      }
    }
  } catch (error) {
    console.error(`❌ Error processing directory ${dirPath}:`, error.message);
  }
}

function main() {
  console.log('🔄 Starting import path updates...\n');

  const totalFiles = 0;
  const updatedFiles = 0;

  for (const dir of directories) {
    if (fs.existsSync(dir)) {
      console.log(`📁 Processing directory: ${dir}`);
      processDirectory(dir);
    }
  }

  console.log('\n✅ Import path updates completed!');
  console.log('📋 Next steps:');
  console.log('1. Run: npm run build');
  console.log('2. Check for any remaining import errors');
  console.log('3. Update any manual import paths');
}

if (require.main === module) {
  main();
}

module.exports = { updateImportsInFile, processDirectory };
