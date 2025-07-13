#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔄 Comprehensive React Icons to Lucide React Replacement\n');

// Icon mappings from react-icons to lucide-react
const ICON_MAPPINGS = {
  // Ant Design Icons
  AiFillStar: 'Star',
  AiOutlineStar: 'Star',
  AiOutlinePhone: 'Phone',
  AiOutlineWhatsApp: 'MessageCircle',
  AiOutlineEye: 'Eye',
  AiOutlineClockCircle: 'Clock',

  // Bootstrap Icons
  BsFillTelephoneFill: 'Phone',
  BsCheckCircleFill: 'CheckCircle',
  BsEyeSlashFill: 'EyeOff',
  BsYoutube: 'Youtube',
  BsTwitter: 'Twitter',

  // Feather Icons (already compatible)
  FiList: 'List',
  FiClock: 'Clock',
  FiFileText: 'FileText',
  FiPrinter: 'Printer',
  FiCalendar: 'Calendar',
  FiUser: 'User',
  FiInfo: 'Info',
  FiArrowUp: 'ArrowUp',
  FiArrowRight: 'ArrowRight',
  FiArrowLeft: 'ArrowLeft',
  FiBookmark: 'Bookmark',
  FiPhone: 'Phone',
  FiPhoneCall: 'Phone',
  FiMapPin: 'MapPin',
  FiShield: 'Shield',
  FiTool: 'Wrench',
  FiMail: 'Mail',
  FiStar: 'Star',
  FiHeart: 'Heart',
  FiEye: 'Eye',
  FiEyeOff: 'EyeOff',
  FiCheck: 'Check',
  FiX: 'X',
  FiPlus: 'Plus',
  FiMinus: 'Minus',
  FiEdit: 'Edit',
  FiTrash: 'Trash',
  FiDownload: 'Download',
  FiUpload: 'Upload',
  FiShare: 'Share',
  FiNavigation: 'Navigation',

  // Material Design Icons
  MdPendingActions: 'Clock',
  MdVerified: 'CheckCircle',
  MdOutlinePhone: 'Phone',
  MdOutlineSpeakerPhone: 'Phone',
  MdOutlineDashboard: 'LayoutDashboard',
  MdMasks: 'Shield',
  MdSanitizer: 'Droplets',

  // Ionicons
  IoMdStar: 'Star',
  IoMenu: 'Menu',
  IoLocationOutline: 'MapPin',
  IoLocationSharp: 'MapPin',

  // Other icon libraries
  SlArrowRight: 'ArrowRight',
  VscFilter: 'Filter',
  CiGrid41: 'Grid',
  FaList: 'List',
  FaProductHunt: 'Package',
  FaUserPlus: 'UserPlus',
  FaDoorOpen: 'LogOut',
  FaFacebook: 'Facebook',
  FaMinus: 'Minus',
  FaPlus: 'Plus',
  TbBrandAnsible: 'Package',
  RxCross2: 'X',
  BiLeftArrow: 'ArrowLeft',
  BiRightArrow: 'ArrowRight',
  BiLogoInstagramAlt: 'Instagram',
  ImFacebook: 'Facebook',
  ImPhone: 'Phone',
  RiLayoutGridFill: 'Grid',
  TfiLayoutColumn3Alt: 'Columns',
  GiGloves: 'Shield',
  CgDanger: 'AlertTriangle',
  FcGoogle: 'Chrome',
};

function findFilesWithReactIcons() {
  const extensions = ['.tsx', '.ts', '.jsx', '.js'];
  const files = [];

  function walkDir(dir) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (
        stat.isDirectory() &&
        !item.startsWith('.') &&
        item !== 'node_modules'
      ) {
        walkDir(fullPath);
      } else if (stat.isFile() && extensions.includes(path.extname(item))) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('react-icons')) {
          files.push(fullPath);
        }
      }
    }
  }

  walkDir('.');
  return files;
}

function replaceIconsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;

  // Replace imports
  const importRegex =
    /import\s*{([^}]+)}\s*from\s*['"]react-icons\/([^'"]+)['"]/g;
  content = content.replace(importRegex, (match, icons, library) => {
    const iconList = icons.split(',').map(icon => icon.trim());
    const newIcons = [];
    const remainingIcons = [];

    iconList.forEach(icon => {
      if (ICON_MAPPINGS[icon]) {
        newIcons.push(ICON_MAPPINGS[icon]);
      } else {
        remainingIcons.push(icon);
      }
    });

    if (newIcons.length > 0) {
      hasChanges = true;
      let newImport = `import { ${newIcons.join(', ')} } from 'lucide-react'`;
      if (remainingIcons.length > 0) {
        newImport += `\nimport { ${remainingIcons.join(', ')} } from 'react-icons/${library}'`;
      }
      return newImport;
    }
    return match;
  });

  // Replace icon usage
  Object.entries(ICON_MAPPINGS).forEach(([oldIcon, newIcon]) => {
    const usageRegex = new RegExp(`<${oldIcon}\\b`, 'g');
    if (content.match(usageRegex)) {
      content = content.replace(usageRegex, `<${newIcon}`);
      hasChanges = true;
    }
  });

  if (hasChanges) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${filePath}`);
    return true;
  }

  return false;
}

function generateReplacementReport() {
  console.log('📋 Replacement Report:\n');

  const files = findFilesWithReactIcons();
  console.log(`Found ${files.length} files with react-icons imports\n`);

  let totalReplacements = 0;
  files.forEach(file => {
    if (replaceIconsInFile(file)) {
      totalReplacements++;
    }
  });

  console.log(`\n✅ Replaced icons in ${totalReplacements} files`);
  console.log('📊 Expected bundle size reduction: ~150KB');
}

function generateNextSteps() {
  console.log('\n🛠️ Next Steps:\n');
  console.log('1. Remove react-icons from package.json');
  console.log('2. Run: npm install');
  console.log('3. Test all icon functionality');
  console.log('4. Run: npm run analyze');
  console.log('5. Verify bundle size reduction');
}

// Run the replacement
generateReplacementReport();
generateNextSteps();

console.log(
  '\n✅ Run this script to replace all react-icons with lucide-react'
);
console.log('📞 Next: Remove react-icons dependency and test functionality');
