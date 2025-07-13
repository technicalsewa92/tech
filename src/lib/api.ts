// Simple fetch client for client-side requests
export async function fetchClient(url: string, options = {}) {
  const defaultOptions = {};
  const mergedOptions = { ...defaultOptions, ...options };
  const response = await fetch(`${baseUrl}${url}`, mergedOptions as any);
  return response.json();
}

// ✅ React Query hooks for client-side data fetching
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// ✅ API endpoints for React Query hooks
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/techsewa/masterconfig/publiclogin/signinlate',
  GOOGLE_LOGIN: '/techsewa/masterConfig/publiclogin/SigninbyGtoken',
  CRM_LOGIN: '/techsewa/masterconfig/publiclogin/signinlate',

  // User Profile
  UPDATE_CUSTOMER: '/techsewa/publiccontrol/updateCustomer',
  UPDATE_TECHNICIAN: '/techsewa/publiccontrol/updateTechnician',

  // Complaints
  LOG_COMPLAINT: '/techsewa/publicControl/logComplain',
  GET_COMPLAINTS: '/techsewa/publiccontrol/getComplaintsByCustomer',

  // Orders & Sales
  GET_SALES_BY_CUSTOMER:
    '/techsewa/publiccontrol/publicsales/getsalesbyCustomer',

  // Services & Products
  GET_SERVICES: '/techsewa/masterconfig/publicmasterconfig/getSliderListpop',
  GET_SERVICES_POP:
    '/techsewa/masterconfig/publicmasterconfig/getSliderListpop1',
  GET_PRODUCT_CATEGORY: '/techsewa/publicControl/GetProductcategiryByProduct',
  GET_SERVICES_BY_CATEGORY:
    '/techsewa/publicControl/getServicesByProductCategory',

  // Footer & Stats
  GET_TOTAL_FOOTER: '/techsewa/publiccontrol/getGetTotalFooter',

  // Callback & Reviews
  CALLBACK_REQUEST: '/techsewa/publiccontrol/publicreview/getcallbackrequest',

  // Training
  GET_TRAININGS:
    '/techsewa/publiccontrol/publicmasterconfig/gettrainingDetails',
  GET_TRAINING_CATEGORIES:
    '/techsewa/publiccontrol/publicmasterconfig/gettrainingcategories',

  // Blog
  GET_BLOG_BY_ID:
    '/techsewa/publiccontrol/publicmasterconfig/getblogDetailsbyid',
  GET_BLOGS_BY_CATEGORY:
    '/techsewa/publiccontrol/publicmasterconfig/getblogDetailsbyCatid',

  // SEO
  GET_SEO_CONTENT: '/techsewa/publiccontrol/publicmasterconfig/getSeoContent',
} as const;

// ✅ React Query hooks for client-side data fetching
export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.GET_SERVICES);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useServicesPop = () => {
  return useQuery({
    queryKey: ['services-pop'],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.GET_SERVICES_POP);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useTotalFooter = () => {
  return useQuery({
    queryKey: ['total-footer'],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.GET_TOTAL_FOOTER);
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
};

export const useCustomerSales = (customerId: string | undefined) => {
  return useQuery({
    queryKey: ['customer-sales', customerId],
    queryFn: async () => {
      const formData = new FormData();
      if (customerId) {
        formData.append('cust_id', customerId);
      }
      const response = await api.post(
        API_ENDPOINTS.GET_SALES_BY_CUSTOMER,
        formData
      );
      return response.data;
    },
    enabled: !!customerId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCustomerComplaints = (customerId: string | undefined) => {
  return useQuery({
    queryKey: ['customer-complaints', customerId],
    queryFn: async () => {
      const formData = new FormData();
      if (customerId) {
        formData.append('cust_id', customerId);
      }
      const response = await api.post(API_ENDPOINTS.GET_COMPLAINTS, formData);
      return response.data;
    },
    enabled: !!customerId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProductCategory = (productId: string | undefined) => {
  return useQuery({
    queryKey: ['product-category', productId],
    queryFn: async () => {
      const formData = new FormData();
      if (productId) {
        formData.append('product_id', productId);
      }
      const response = await api.post(
        API_ENDPOINTS.GET_PRODUCT_CATEGORY,
        formData
      );
      return response.data;
    },
    enabled: !!productId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useServicesByCategory = (brandId: string | undefined) => {
  return useQuery({
    queryKey: ['services-by-category', brandId],
    queryFn: async () => {
      const formData = new FormData();
      if (brandId) {
        formData.append('brand_id', brandId);
      }
      const response = await api.post(
        API_ENDPOINTS.GET_SERVICES_BY_CATEGORY,
        formData
      );
      return response.data;
    },
    enabled: !!brandId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useTrainingData = (trainingId: string | undefined) => {
  return useQuery({
    queryKey: ['training-data', trainingId],
    queryFn: async () => {
      const formData = new FormData();
      if (trainingId) {
        formData.append('training_id', trainingId);
      }
      const response = await api.post(API_ENDPOINTS.GET_TRAININGS, formData);
      return response.data;
    },
    enabled: !!trainingId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useBlogData = (blogId: string | undefined) => {
  return useQuery({
    queryKey: ['blog-data', blogId],
    queryFn: async () => {
      const formData = new FormData();
      if (blogId) {
        formData.append('id', blogId);
      }
      const response = await api.post(API_ENDPOINTS.GET_BLOG_BY_ID, formData);
      return response.data;
    },
    enabled: !!blogId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useBlogsByCategory = (categoryId: string | undefined) => {
  return useQuery({
    queryKey: ['blogs-by-category', categoryId],
    queryFn: async () => {
      const formData = new FormData();
      if (categoryId) {
        formData.append('id', categoryId);
      }
      const response = await api.post(
        API_ENDPOINTS.GET_BLOGS_BY_CATEGORY,
        formData
      );
      return response.data;
    },
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

// ✅ Mutations for data updates
export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const formData = new FormData();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);
      const response = await api.post(API_ENDPOINTS.LOGIN, formData);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate user-related queries
      queryClient.invalidateQueries({ queryKey: ['customer-sales'] });
      queryClient.invalidateQueries({ queryKey: ['customer-complaints'] });
    },
  });
};

export const useGoogleLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: { email?: string; accessToken?: string }) => {
      const formData = new FormData();
      formData.append('email', user.email ?? '');
      formData.append('token', user.accessToken?.split('.')[0] ?? '');
      const response = await api.post(API_ENDPOINTS.GOOGLE_LOGIN, formData);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate user-related queries
      queryClient.invalidateQueries({ queryKey: ['customer-sales'] });
      queryClient.invalidateQueries({ queryKey: ['customer-complaints'] });
    },
  });
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      formData: FormData;
      userType: 'Customer' | 'Technician';
    }) => {
      const endpoint =
        data.userType === 'Technician'
          ? API_ENDPOINTS.UPDATE_TECHNICIAN
          : API_ENDPOINTS.UPDATE_CUSTOMER;
      const response = await api.post(endpoint, data.formData);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate user-related queries
      queryClient.invalidateQueries({ queryKey: ['customer-sales'] });
      queryClient.invalidateQueries({ queryKey: ['customer-complaints'] });
    },
  });
};

export const useLogComplaintMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (complaintData: FormData) => {
      const response = await api.post(
        API_ENDPOINTS.LOG_COMPLAINT,
        complaintData
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate complaints queries
      queryClient.invalidateQueries({ queryKey: ['customer-complaints'] });
    },
  });
};

export const useCallbackRequestMutation = () => {
  return useMutation({
    mutationFn: async (data: {
      name: string;
      mobile: string;
      email: string;
      query: string;
    }) => {
      const formData = new FormData();
      formData.append('cust_name', data.name);
      formData.append('cust_mobile', data.mobile);
      formData.append('cust_email', data.email);
      formData.append('cust_query', data.query);
      const response = await api.post(API_ENDPOINTS.CALLBACK_REQUEST, formData);
      return response.data;
    },
  });
};

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
