/**
 * Utility functions for handling image URLs
 */

/**
 * Normalizes image URLs to use the correct CRM domain
 * @param url - The image URL to normalize
 * @returns The normalized URL using the CRM domain
 */
export const normalizeImageUrl = (url: string | undefined | null): string => {
  if (!url) return '';
  
  // If it's already using the CRM domain, return as is
  if (url.includes('crm.technicalsewa.com')) {
    return url;
  }
  
  // Replace old domains with the CRM domain
  return url
    .replace('https://www.technicalsewa.com/multiservice/', 'https://crm.technicalsewa.com/techsewa/')
    .replace('https://www.technicalsewa.com/techsewa/', 'https://crm.technicalsewa.com/techsewa/');
};

/**
 * Gets a fallback image URL for when the primary image fails to load
 * @param type - The type of fallback image needed ('brand', 'category', 'banner')
 * @returns A fallback image URL
 */
export const getFallbackImageUrl = (type: 'brand' | 'category' | 'banner' = 'brand'): string => {
  const fallbackImages = {
    brand: 'https://crm.technicalsewa.com/techsewa/uploads/brands_image/default_brand.png',
    category: 'https://crm.technicalsewa.com/techsewa/uploads/brands_image/default_category.png',
    banner: 'https://crm.technicalsewa.com/techsewa/uploads/brands_image/Website_slider_75.webp'
  };
  
  return fallbackImages[type];
};
