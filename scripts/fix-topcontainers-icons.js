#!/usr/bin/env node

const fs = require('fs');

console.log('🔧 Fixing TopContainers Icon References\n');

const filePath = 'features/dashboard/TopContainers.tsx';

if (fs.existsSync(filePath)) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Replace all MdPendingActions with AlertCircle
  const updatedContent = content.replace(/MdPendingActions/g, 'AlertCircle');

  fs.writeFileSync(filePath, updatedContent, 'utf8');
  console.log('✅ Fixed all MdPendingActions references in TopContainers.tsx');
} else {
  console.log('❌ File not found: TopContainers.tsx');
}

console.log('\n📞 Next: Run npm run build to test the fixes');
