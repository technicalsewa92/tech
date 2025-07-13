#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Remaining Icon References\n');

// Remaining icon mappings that need to be fixed
const REMAINING_ICONS = {
  BsCheckCircleFill: 'CheckCircle',
  SlArrowRight: 'ArrowRight',
  FiTool: 'Wrench',
  BsFillTelephoneFill: 'Phone',
  AiOutlineWhatsApp: 'MessageCircle',
  AiOutlinePhone: 'Phone',
  FiMapPin: 'MapPin',
};

function fixRemainingIcons() {
  const files = [
    'components/pageHelperComponents.js/ServiceSlug1Enhanced.tsx',
    'components/pageHelperComponents.js/ServiceSlug1.tsx',
    'features/service/child-service/ChildService.tsx',
    'features/service/Faqlist.tsx',
    'features/service/reviews.tsx',
    'features/dashboard/TopContainers.tsx',
    'features/dashboard/ReviewModel.tsx',
    'features/dashboard/ledger/UserLedger.tsx',
    'features/dashboard/comission/Comissions.tsx',
    'features/complain/my-complains/complainsTable.tsx',
    'features/complain/my-complains/tabularComplains.tsx',
    'features/complain/my-complains/newcomplains.tsx',
    'features/complain/my-complains/index.tsx',
    'features/complain/complain-view/Addreview.tsx',
    'features/authentication/signup/standard-signup.tsx',
    'features/authentication/signup/pro-signup.tsx',
    'features/authentication/login1/index.tsx',
    'features/authentication/login/index.tsx',
    'features/account/profile/technicianProfile.tsx',
    'components/WhyChooseUs.tsx',
    'components/ProfessionalsCardModal.tsx',
    'components/NavUserDropdown.tsx',
    'components/Modal.tsx',
    'components/HeroCarousel.tsx',
    'components/footer/FooterContact.tsx',
    'components/footer/Footer.tsx',
    'components/blog/TableOfContents.tsx',
    'components/blog/ReadingStats.tsx',
    'components/blog/PrintButton.tsx',
    'components/blog/LastUpdated.tsx',
    'components/blog/FloatingShareButton.tsx',
    'components/blog/EnhancedTableOfContents.tsx',
    'components/blog/SocialShare.tsx',
    'components/blog/BlogCTA.tsx',
    'components/blog/BlogMeta.tsx',
    'components/blog/BackToTopButton.tsx',
    'components/blog/AuthorBio.tsx',
    'app/blog/[slug]/page.tsx',
    'app/sign-up-page/page.tsx',
    'app/professionals/page.tsx',
    'app/blogs/[category_name]/page.tsx',
    'app/(dash)/pay-online/page.tsx',
    'app/(dash)/order-history/[id]/page.tsx',
    'app/(dash)/dashboard/page.tsx',
  ];

  let totalFixed = 0;

  files.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      let hasChanges = false;

      // Replace remaining icon usages
      Object.entries(REMAINING_ICONS).forEach(([oldIcon, newIcon]) => {
        const usageRegex = new RegExp(`<${oldIcon}\\b`, 'g');
        if (content.match(usageRegex)) {
          content = content.replace(usageRegex, `<${newIcon}`);
          hasChanges = true;
        }
      });

      if (hasChanges) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed: ${filePath}`);
        totalFixed++;
      }
    }
  });

  console.log(`\n✅ Fixed icons in ${totalFixed} files`);
}

// Run the fix
fixRemainingIcons();

console.log('\n📞 Next: Run npm run build to test the fixes');
