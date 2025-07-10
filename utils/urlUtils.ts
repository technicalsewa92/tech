/**
 * Utility functions to ensure all URLs use HTTPS and proper formatting
 */

export function ensureHttps(url: string): string {
  if (!url) return url;

  // If it's a relative URL, keep it as is
  if (url.startsWith('/')) {
    return url;
  }

  // If it's already HTTPS, keep it as is
  if (url.startsWith('https://')) {
    return url;
  }

  // Convert HTTP to HTTPS for technicalsewa.com domains
  if (
    url.startsWith('http://technicalsewa.com') ||
    url.startsWith('http://www.technicalsewa.com')
  ) {
    return url.replace('http://', 'https://');
  }

  return url;
}

export function ensureInternalLinksAreRelative(url: string): string {
  if (!url) return url;

  // Convert absolute technicalsewa.com URLs to relative URLs
  if (url.includes('technicalsewa.com')) {
    try {
      const urlObj = new URL(url);
      if (
        urlObj.hostname === 'technicalsewa.com' ||
        urlObj.hostname === 'www.technicalsewa.com'
      ) {
        return urlObj.pathname + urlObj.search + urlObj.hash;
      }
    } catch (e) {
      // If URL parsing fails, return original
      return url;
    }
  }

  return url;
}

export function sanitizeInternalLinks(content: string): string {
  if (!content) return content;

  // Replace HTTP technicalsewa.com links with HTTPS
  content = content.replace(
    /http:\/\/(www\.)?technicalsewa\.com/gi,
    'https://www.technicalsewa.com'
  );

  // Convert absolute technicalsewa.com links to relative links for better SEO
  content = content.replace(
    /https:\/\/(www\.)?technicalsewa\.com(\/[^"'\s]*)/gi,
    '$2'
  );

  return content;
}
