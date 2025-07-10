import { GA_MEASUREMENT_ID } from '@/public/baseUrl';

// Export the GA_MEASUREMENT_ID for use in components
export { GA_MEASUREMENT_ID };

// Google Analytics tracking functions
export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag(...args);
  }
};

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track conversions
export const trackConversion = (conversionId: string, value?: number) => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    gtag('event', 'conversion', {
      send_to: conversionId,
      value: value,
    });
  }
};

// Track service requests
export const trackServiceRequest = (serviceType: string, location?: string) => {
  trackEvent('service_request', 'engagement', `${serviceType}_${location || 'unknown'}`);
};

// Track phone calls
export const trackPhoneCall = () => {
  trackEvent('phone_call', 'contact', 'header_phone_click');
};

// Track form submissions
export const trackFormSubmission = (formType: string) => {
  trackEvent('form_submit', 'lead_generation', formType);
};
