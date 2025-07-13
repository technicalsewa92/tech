#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔄 React Icons to Lucide React Replacement Guide\n');

// Common icon mappings from react-icons to lucide-react
const ICON_MAPPINGS = {
  // Navigation icons
  FaHome: 'Home',
  FaBars: 'Menu',
  FaSearch: 'Search',
  FaUser: 'User',
  FaPhone: 'Phone',
  FaEnvelope: 'Mail',
  FaMapMarkerAlt: 'MapPin',
  FaArrowRight: 'ArrowRight',
  FaArrowLeft: 'ArrowLeft',
  FaChevronDown: 'ChevronDown',
  FaChevronUp: 'ChevronUp',
  FaChevronRight: 'ChevronRight',
  FaChevronLeft: 'ChevronLeft',

  // Social icons
  FaFacebook: 'Facebook',
  FaTwitter: 'Twitter',
  FaInstagram: 'Instagram',
  FaLinkedin: 'Linkedin',
  FaYoutube: 'Youtube',
  FaWhatsapp: 'MessageCircle',

  // UI icons
  FaStar: 'Star',
  FaHeart: 'Heart',
  FaEye: 'Eye',
  FaEyeSlash: 'EyeOff',
  FaCheck: 'Check',
  FaTimes: 'X',
  FaPlus: 'Plus',
  FaMinus: 'Minus',
  FaEdit: 'Edit',
  FaTrash: 'Trash',
  FaDownload: 'Download',
  FaUpload: 'Upload',
  FaPrint: 'Printer',
  FaShare: 'Share',
  FaBookmark: 'Bookmark',
  FaBookmarkO: 'Bookmark',
  FaCalendar: 'Calendar',
  FaClock: 'Clock',
  FaLocationArrow: 'Navigation',

  // Material Design icons
  MdPhone: 'Phone',
  MdEmail: 'Mail',
  MdLocationOn: 'MapPin',
  MdSearch: 'Search',
  MdMenu: 'Menu',
  MdClose: 'X',
  MdAdd: 'Plus',
  MdRemove: 'Minus',
  MdEdit: 'Edit',
  MdDelete: 'Trash',
  MdDownload: 'Download',
  MdUpload: 'Upload',
  MdPrint: 'Printer',
  MdShare: 'Share',
  MdBookmark: 'Bookmark',
  MdBookmarkBorder: 'Bookmark',
  MdCalendar: 'Calendar',
  MdAccessTime: 'Clock',
  MdNavigation: 'Navigation',

  // Ionicons
  IoStar: 'Star',
  IoHeart: 'Heart',
  IoEye: 'Eye',
  IoEyeOff: 'EyeOff',
  IoCheckmark: 'Check',
  IoClose: 'X',
  IoAdd: 'Plus',
  IoRemove: 'Minus',
  IoCreate: 'Edit',
  IoTrash: 'Trash',
  IoDownload: 'Download',
  IoUpload: 'Upload',
  IoPrint: 'Printer',
  IoShare: 'Share',
  IoBookmark: 'Bookmark',
  IoCalendar: 'Calendar',
  IoTime: 'Clock',
  IoLocation: 'MapPin',

  // Feather icons (already compatible)
  FiHome: 'Home',
  FiMenu: 'Menu',
  FiSearch: 'Search',
  FiUser: 'User',
  FiPhone: 'Phone',
  FiMail: 'Mail',
  FiMapPin: 'MapPin',
  FiArrowRight: 'ArrowRight',
  FiArrowLeft: 'ArrowLeft',
  FiChevronDown: 'ChevronDown',
  FiChevronUp: 'ChevronUp',
  FiChevronRight: 'ChevronRight',
  FiChevronLeft: 'ChevronLeft',
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
  FiPrinter: 'Printer',
  FiShare: 'Share',
  FiBookmark: 'Bookmark',
  FiCalendar: 'Calendar',
  FiClock: 'Clock',
  FiNavigation: 'Navigation',
};

function generateReplacementGuide() {
  console.log('📋 Icon Replacement Guide:\n');

  console.log('1. Update imports:');
  console.log(
    '   OLD: import { FaHome, MdPhone, IoStar } from "react-icons/fa";'
  );
  console.log('   NEW: import { Home, Phone, Star } from "lucide-react";\n');

  console.log('2. Common replacements:');
  Object.entries(ICON_MAPPINGS)
    .slice(0, 20)
    .forEach(([oldIcon, newIcon]) => {
      console.log(`   ${oldIcon} → ${newIcon}`);
    });
  console.log('   ... (see full list below)\n');

  console.log('3. Usage remains the same:');
  console.log('   OLD: <FaHome />');
  console.log('   NEW: <Home />\n');
}

function generateSearchPatterns() {
  console.log('🔍 Search patterns to find react-icons usage:\n');

  const patterns = [
    'import.*react-icons',
    'from ["\']react-icons/fa["\']',
    'from ["\']react-icons/md["\']',
    'from ["\']react-icons/io["\']',
    'from ["\']react-icons/fi["\']',
    '<Fa[A-Z][a-zA-Z]*',
    '<Md[A-Z][a-zA-Z]*',
    '<Io[A-Z][a-zA-Z]*',
    '<Fi[A-Z][a-zA-Z]*',
  ];

  patterns.forEach(pattern => {
    console.log(`   ${pattern}`);
  });
  console.log('');
}

function generateFullIconList() {
  console.log('📝 Complete Icon Mapping:\n');

  Object.entries(ICON_MAPPINGS).forEach(([oldIcon, newIcon]) => {
    console.log(`   ${oldIcon} → ${newIcon}`);
  });
  console.log('');
}

function generateImplementationSteps() {
  console.log('🛠️ Implementation Steps:\n');

  const steps = [
    '1. Search for react-icons imports in your codebase',
    '2. Replace each import with lucide-react equivalent',
    '3. Update icon component names in JSX',
    '4. Remove react-icons from package.json',
    '5. Run npm install to update dependencies',
    '6. Test all icon functionality',
    '7. Run bundle analysis to verify size reduction',
  ];

  steps.forEach(step => {
    console.log(`   ${step}`);
  });
  console.log('');
}

function calculateExpectedSavings() {
  console.log('📊 Expected Bundle Size Reduction:\n');
  console.log('   react-icons package size: ~200KB');
  console.log('   lucide-react package size: ~50KB');
  console.log('   Expected savings: ~150KB');
  console.log('   Percentage reduction: 75% for icon libraries\n');
}

// Run the analysis
generateReplacementGuide();
generateSearchPatterns();
generateFullIconList();
generateImplementationSteps();
calculateExpectedSavings();

console.log('✅ Run this script anytime to review icon replacement guide');
console.log(
  '📞 Next: Replace react-icons imports with lucide-react equivalents'
);
