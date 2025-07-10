// HTML Content Sanitizer for SEO and Security
// This utility sanitizes HTML content from APIs to ensure all internal links use HTTPS

import { ensureHttps, ensureInternalLinksAreRelative } from './urlUtils';

/**
 * Sanitizes HTML content by converting internal HTTP links to HTTPS
 * and relative URLs, while preserving external links
 */
export function sanitizeHtmlContent(
  htmlContent: string | null | undefined
): string {
  if (!htmlContent || typeof htmlContent !== 'string') {
    return '';
  }

  // Replace href attributes in anchor tags
  let sanitizedHtml = htmlContent.replace(
    /href\s*=\s*["']([^"']+)["']/gi,
    (match, url) => {
      const httpsUrl = ensureHttps(url);
      const relativeUrl = ensureInternalLinksAreRelative(httpsUrl);
      return `href="${relativeUrl}"`;
    }
  );

  // Replace src attributes in images, iframes, and other media
  sanitizedHtml = sanitizedHtml.replace(
    /src\s*=\s*["']([^"']+)["']/gi,
    (match, url) => {
      const httpsUrl = ensureHttps(url);
      return `src="${httpsUrl}"`;
    }
  );

  // Replace action attributes in forms
  sanitizedHtml = sanitizedHtml.replace(
    /action\s*=\s*["']([^"']+)["']/gi,
    (match, url) => {
      const httpsUrl = ensureHttps(url);
      const relativeUrl = ensureInternalLinksAreRelative(httpsUrl);
      return `action="${relativeUrl}"`;
    }
  );

  // Replace any remaining HTTP technicalsewa.com references in text content
  sanitizedHtml = sanitizedHtml.replace(
    /http:\/\/(www\.)?technicalsewa\.com/gi,
    'https://www.technicalsewa.com'
  );

  return sanitizedHtml;
}

/**
 * Higher-order component helper to sanitize dangerouslySetInnerHTML content
 */
export function createSanitizedHtml(htmlContent: string | null | undefined) {
  return {
    __html: sanitizeHtmlContent(htmlContent),
  };
}

/**
 * Sanitizes an array of HTML content items
 */
export function sanitizeHtmlArray(
  htmlArray: (string | null | undefined)[]
): string[] {
  return htmlArray.map(sanitizeHtmlContent);
}

/**
 * Sanitizes HTML content in object properties
 */
export function sanitizeObjectHtml<T extends Record<string, any>>(
  obj: T,
  htmlFields: (keyof T)[]
): T {
  const sanitized = { ...obj };

  htmlFields.forEach(field => {
    if (sanitized[field] && typeof sanitized[field] === 'string') {
      (sanitized[field] as any) = sanitizeHtmlContent(
        sanitized[field] as string
      );
    }
  });

  return sanitized;
}
