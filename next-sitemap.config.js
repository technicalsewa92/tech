// next-sitemap.config.js
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://www.technicalsewa.com/', // Replace with your site URL
    generateRobotsTxt: true, // Generate robots.txt
    sitemapSize: 7000,       // Split sitemap after this many URLs
    changefreq: 'daily',     // Frequency of content change
    priority: 0.7,           // Priority of URLs
  };
  