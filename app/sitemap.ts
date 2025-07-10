import { fetchServerClient } from '@/lib/api';
import { MetadataRoute } from 'next';
import { logger } from '@/lib/logger';

const siteUrl = 'https://www.technicalsewa.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Core pages with high priority
  const corePages = [
    {
      url: siteUrl,
      changeFrequency: 'daily' as const,
      priority: 1.0,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/service`,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/blogs`,
      changeFrequency: 'daily' as const,
      priority: 0.8,
      lastModified: new Date(),
    },
  ];

  // Secondary pages
  const secondaryPages = [
    '/professionals',
    '/partpurja',
    '/trainings',
    '/about',
    '/contact',
    '/terms',
    '/privacy-policy',
  ].map(route => ({
    url: `${siteUrl}${route}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    lastModified: new Date(),
  }));

  // Service category pages
  const serviceCategories = [
    '/service/ac-repair',
    '/service/refrigerator-repair',
    '/service/washing-machine-repair',
    '/service/tv-repair',
    '/service/microwave-repair',
  ].map(route => ({
    url: `${siteUrl}${route}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    lastModified: new Date(),
  }));

  // Try to fetch dynamic content from API - temporarily disabled to fix build
  const apiSiteMap: MetadataRoute.Sitemap = [];
  try {
    // Temporarily commenting out to fix build issues
    // const urlList = await fetchServerClient(
    //   "https://www.technicalsewa.com/techsewa/publiccontrol/urllist"
    // );
    // if (Array.isArray(urlList)) {
    //   apiSiteMap = urlList.map((item: any) => ({
    //     url: item.page_url || `${siteUrl}/page/${item.id}`,
    //     changeFrequency: "monthly" as const,
    //     priority: parseFloat(item.priority) || 0.6,
    //     lastModified: new Date(item.updated_at || Date.now()),
    //   }));
    // }
  } catch (error) {
    logger.debug('Failed to fetch dynamic sitemap URLs from API');
  }

  return [...corePages, ...secondaryPages, ...serviceCategories, ...apiSiteMap];
}
