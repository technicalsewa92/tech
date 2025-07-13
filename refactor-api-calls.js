#!/usr/bin/env node

/**
 * API Refactoring Script
 * This script helps identify and refactor direct API calls to use React Query
 */

const fs = require('fs');
const path = require('path');

// Files that need React Query refactoring
const filesToRefactor = [
  // Components with direct API calls
  'src/components/Number.tsx',
  'src/components/Search.tsx',
  'src/components/footer/Request.tsx',
  'src/features/complain/complain-form/complainFormFinalStep.tsx',
  'src/features/dashboard/OrderHistoryPage.tsx',
  'src/features/dashboard/TopContainers.tsx',
  'src/features/authentication/login/index.tsx',
  'src/features/authentication/login1/index.tsx',
  'src/features/account/edit-profile/index.tsx',
  'src/components/mapComponents/MapComponent.tsx',
];

// API patterns to replace
const apiPatterns = [
  {
    pattern: /axios\.get\(/g,
    replacement: '// Use React Query hook instead',
    description: 'Replace axios.get with React Query',
  },
  {
    pattern: /axios\.post\(/g,
    replacement: '// Use React Query mutation instead',
    description: 'Replace axios.post with React Query',
  },
  {
    pattern: /fetch\(/g,
    replacement: '// Use React Query hook instead',
    description: 'Replace fetch with React Query',
  },
  {
    pattern: /api\.post\(/g,
    replacement: '// Use React Query mutation instead',
    description: 'Replace api.post with React Query',
  },
  {
    pattern: /api\.get\(/g,
    replacement: '// Use React Query hook instead',
    description: 'Replace api.get with React Query',
  },
];

// React Query hooks to add
const reactQueryHooks = {
  // For data fetching
  useServices: 'const { data: services, isLoading } = useServices();',
  useServicesPop: 'const { data: services, isLoading } = useServicesPop();',
  useTotalFooter: 'const { data: footerData, isLoading } = useTotalFooter();',
  useCustomerSales:
    'const { data: salesData, isLoading } = useCustomerSales(user?.id);',
  useCustomerComplaints:
    'const { data: complaintsData, isLoading } = useCustomerComplaints(user?.id);',

  // For mutations
  useLoginMutation: 'const loginMutation = useLoginMutation();',
  useGoogleLoginMutation:
    'const googleLoginMutation = useGoogleLoginMutation();',
  useUpdateProfileMutation:
    'const updateProfileMutation = useUpdateProfileMutation();',
  useLogComplaintMutation:
    'const logComplaintMutation = useLogComplaintMutation();',
  useCallbackRequestMutation:
    'const callbackRequestMutation = useCallbackRequestMutation();',
};

// Import statements to add
const importsToAdd = {
  useServices: "import { useServices } from '@/lib/api';",
  useServicesPop: "import { useServicesPop } from '@/lib/api';",
  useTotalFooter: "import { useTotalFooter } from '@/lib/api';",
  useCustomerSales: "import { useCustomerSales } from '@/lib/api';",
  useCustomerComplaints: "import { useCustomerComplaints } from '@/lib/api';",
  useLoginMutation: "import { useLoginMutation } from '@/lib/api';",
  useGoogleLoginMutation: "import { useGoogleLoginMutation } from '@/lib/api';",
  useUpdateProfileMutation:
    "import { useUpdateProfileMutation } from '@/lib/api';",
  useLogComplaintMutation:
    "import { useLogComplaintMutation } from '@/lib/api';",
  useCallbackRequestMutation:
    "import { useCallbackRequestMutation } from '@/lib/api';",
};

function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    console.log(`\n📁 Analyzing: ${filePath}`);

    // Check for direct API calls
    let hasDirectApiCalls = false;
    lines.forEach((line, index) => {
      if (
        line.includes('axios.') ||
        line.includes('fetch(') ||
        line.includes('api.')
      ) {
        console.log(`  Line ${index + 1}: ${line.trim()}`);
        hasDirectApiCalls = true;
      }
    });

    if (!hasDirectApiCalls) {
      console.log(`  ✅ No direct API calls found`);
    }

    return hasDirectApiCalls;
  } catch (error) {
    console.log(`  ❌ Error reading file: ${error.message}`);
    return false;
  }
}

function generateRefactoringPlan() {
  console.log('\n🚀 React Query Refactoring Plan');
  console.log('================================');

  let totalFiles = 0;
  let filesWithApiCalls = 0;

  filesToRefactor.forEach(file => {
    if (analyzeFile(file)) {
      filesWithApiCalls++;
    }
    totalFiles++;
  });

  console.log(`\n📊 Summary:`);
  console.log(`  Total files checked: ${totalFiles}`);
  console.log(`  Files with direct API calls: ${filesWithApiCalls}`);
  console.log(`  Files already optimized: ${totalFiles - filesWithApiCalls}`);

  console.log(`\n📋 Next Steps:`);
  console.log(`  1. Replace direct API calls with React Query hooks`);
  console.log(`  2. Add proper error handling and loading states`);
  console.log(`  3. Implement cache invalidation for mutations`);
  console.log(`  4. Test all components to ensure functionality`);
  console.log(`  5. Remove unused imports and clean up code`);
}

function generateReactQueryHooks() {
  console.log('\n🔧 Available React Query Hooks');
  console.log('================================');

  Object.entries(reactQueryHooks).forEach(([hookName, usage]) => {
    console.log(`\n${hookName}:`);
    console.log(`  Usage: ${usage}`);
    console.log(`  Import: ${importsToAdd[hookName]}`);
  });
}

// Run the analysis
generateRefactoringPlan();
generateReactQueryHooks();

console.log('\n✅ Script completed!');
console.log('💡 Use the generated hooks to refactor your components.');
