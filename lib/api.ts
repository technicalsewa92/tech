// Simple fetch client for client-side requests
export async function fetchClient(url: string, options = {}) {
  const defaultOptions = {};
  const mergedOptions = { ...defaultOptions, ...options };
  const response = await fetch(`${baseUrl}${url}`, mergedOptions as any);
  return response.json();
}
// --- Child Service API Utilities ---

// 1. Fetch all services/products for a parent category
export async function getAllServicesForCategory() {
  return await fetchServerClient(
    '/techsewa/masterconfig/publicmasterconfig/getSliderListpop'
  );
}

// 2. Find a service/product by slug (case-insensitive, URI-decoded)
export function findServiceBySlug(services: any[], slug: string) {
  if (!Array.isArray(services) || !slug) {
    return null;
  }
  return services.find(
    item =>
      decodeURIComponent(String(item.url_product_name)).toLowerCase() ===
      decodeURIComponent(String(slug)).toLowerCase()
  );
}

// 3. Fetch product category by product ID
export async function getProductCategoryByProductId(product_id: string) {
  const formData = new FormData();
  formData.append('product_id', product_id);
  const res = await fetch(
    `${baseUrl}/techsewa/publicControl/GetProductcategiryByProduct`,
    {
      method: 'POST',
      body: formData,
      next: { revalidate: 120 },
    }
  );
  return res.json();
}

// 4. Fetch services by product category
export async function getServicesByProductCategory(brand_id: string) {
  const formData = new FormData();
  formData.append('brand_id', brand_id);
  const res = await fetch(
    `${baseUrl}/techsewa/publicControl/getServicesByProductCategory`,
    {
      method: 'POST',
      body: formData,
      next: { revalidate: 120 },
    }
  );
  return res.json();
}
import { baseUrl } from '@/public/baseUrl';
import axios from 'axios';
import { logger } from './logger';

// Axios instance for advanced use cases
export const api = axios.create({ baseURL: baseUrl });
// for server side requests
export async function fetchServerClient(url: string, options = {}) {
  const defaultOptions = {
    // cache: "no-store",
    next: { revalidate: 120 }, // 2 minute cache timeout
  };

  const mergedOptions = { ...defaultOptions, ...options };

  try {
    const response = await fetch(`${baseUrl}${url}`, mergedOptions as any);

    if (!response.ok) {
      logger.debug(
        `API fetch failed for ${url}: HTTP ${response.status}: ${response.statusText}`
      );
      return null; // Return null instead of throwing
    }

    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch (parseError) {
      logger.debug(`Invalid JSON response from ${url}`);
      return null; // Return null instead of throwing
    }
  } catch (error) {
    // Log the error once with context
    logger.debug(
      `API fetch failed for ${url}:`,
      error instanceof Error ? error.message : 'Unknown error'
    );
    return null; // Return null instead of throwing
  }
}

export async function getTrainings() {
  try {
    const res = await fetchServerClient(
      '/techsewa/publiccontrol/publicmasterconfig/gettrainingDetails'
    );
    return res;
  } catch (error) {
    return [];
  }
}

export async function getTrainingDataById(id: string) {
  const formData = new FormData();
  formData.append('training_id', `${id}`);
  try {
    const res = await fetch(
      `${baseUrl}/techsewa/publiccontrol/publicmasterconfig/gettrainingDetails`,
      {
        method: 'POST',
        body: formData,
        next: { revalidate: 120 }, // 2 minute cache timeout
        // cache: "no-store",
      }
    );
    return res.json();
  } catch (error) {
    return { error: true };
  }
}

// -------------------

export async function getTrainingCategoriesData() {
  try {
    const res = await fetch(
      `${baseUrl}/techsewa/publiccontrol/publicmasterconfig/gettrainingcategories`,
      {
        next: { revalidate: 120 }, // 2 minute cache timeout
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (parseError) {
      throw new Error(`Invalid JSON response`);
    }
  } catch (error) {
    logger.debug(
      'Failed to fetch training categories:',
      error instanceof Error ? error.message : 'Unknown error'
    );
    return [];
  }
}

export async function getBlogDataById(id: string) {
  const formData = new FormData();
  formData.append('id', id);
  try {
    const res = await fetch(
      // `${baseUrl}/techsewa/publiccontrol/publicmasterconfig/getblogDetailsbyidd`,
      `${baseUrl}/techsewa/publiccontrol/publicmasterconfig/getblogDetailsbyid`,
      {
        method: 'POST',
        body: formData,
        // cache: "no-store",
        next: { revalidate: 120 }, // 2 minute cache timeout
        // headers: {
        //   "Cache-Control": `max-age=${2 * 60}`, // max 30min cache
        // },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (parseError) {
      throw new Error(`Invalid JSON response`);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      logger.debug(
        `Failed to fetch blog data for ID ${id}:`,
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
    return { error: true };
  }
}

// get blogs by category id

export async function getBlogsByCategoryId(id: string) {
  const formData = new FormData();
  formData.append('id', id);
  try {
    const res = await fetch(
      `${baseUrl}/techsewa/publiccontrol/publicmasterconfig/getblogDetailsbyCatid`,
      {
        method: 'POST',
        body: formData,
        // cache: "no-store",
        next: { revalidate: 120 }, // 2 minute cache timeout
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (parseError) {
      throw new Error(`Invalid JSON response`);
    }
  } catch (error) {
    logger.debug(
      `Failed to fetch blogs for category ${id}:`,
      error instanceof Error ? error.message : 'Unknown error'
    );
    return { error: true };
  }
}

// get seo by page url

export async function getSEOByPageURL(requesturl: string) {
  try {
    logger.debug('Fetching SEO data for URL:', requesturl);
    const response = await axios.get(
      `${baseUrl}techsewa/publiccontrol/publicmasterconfig/getSeoContent`,
      {
        params: { url: requesturl },
        timeout: 5000, // 5 second timeout
      }
    );

    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error(`Invalid response: ${response.status}`);
    }
  } catch (error) {
    logger.debug(
      `SEO data unavailable for ${requesturl}:`,
      error instanceof Error ? error.message : 'Unknown error'
    );
    return {
      content: {
        page_title: 'Technical Sewa',
        description: 'Expert repair services for all appliances',
        keywords: 'repair, service, appliance, technical',
      },
    };
  }
}

function isURL(str: string) {
  // Regular expression for a simple URL validation
  const urlRegex =
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.){1,}([a-zA-Z]{2,})(:[0-9]+)?(\/.*)?$/;

  // Test the input string against the regex
  return urlRegex.test(str);
}

// Enhanced API client for layout-critical data with better fallback handling
export async function fetchLayoutData(
  url: string,
  fallbackData: any,
  options = {}
) {
  const defaultOptions = {
    timeout: 3000,
    validateStatus: (status: number) => status < 500, // Don't throw for 4xx errors
  };

  const mergedOptions = { ...defaultOptions, ...options };

  try {
    const response = await axios.get(url, mergedOptions);

    if (response.status === 200 && response.data) {
      return { success: true, data: response.data };
    } else {
      logger.debug(
        `Layout API returned ${response.status} for ${url}, using fallback`
      );
      return { success: false, data: fallbackData };
    }
  } catch (error) {
    logger.debug(
      `Layout API error for ${url}:`,
      error instanceof Error ? error.message : 'Unknown error',
      'using fallback'
    );
    return { success: false, data: fallbackData };
  }
}

// Utility function to generate consistent blog slugs
export function generateBlogSlug(blog: any): string {
  let rawSlug = blog?.page_url || blog?.blog_name || blog?.title || '';

  // If it's a full URL, extract just the path
  if (rawSlug.includes('http')) {
    try {
      const url = new URL(rawSlug);
      rawSlug = url.pathname.split('/').pop() || '';
    } catch (e) {
      // If URL parsing fails, extract the last part after the last slash
      rawSlug = rawSlug.split('/').pop() || '';
    }
  }

  // Clean the slug
  const slug = rawSlug
    ?.toLowerCase()
    .trim()
    .replace(/[^a-zA-Z0-9-\s]/g, '') // Replace special characters
    .replace(/\s+/g, '-');

  // Use blog_id as fallback if slug is empty
  return slug || blog?.blog_id || 'unknown';
}

// Fetch services for the RecommendedServices component
export async function getRecommendedServices(limit = 8, excludeSlug?: string) {
  try {
    const response = await fetchServerClient(
      '/techsewa/masterconfig/publicmasterconfig/getServiceList'
    );

    if (response?.brands && Array.isArray(response.brands)) {
      let filteredServices = response.brands;

      // Exclude current service if specified
      if (excludeSlug) {
        filteredServices = response.brands.filter(
          (service: any) => service.brand_slug !== excludeSlug
        );
      }

      // Shuffle and limit services
      const shuffled = filteredServices.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, limit);
    }

    return [];
  } catch (error) {
    logger.debug('Failed to fetch recommended services:', error);
    return [];
  }
}
