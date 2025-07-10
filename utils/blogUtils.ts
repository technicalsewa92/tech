import * as cheerio from 'cheerio';

/**
 * Processes blog content to add IDs to headings for the table of contents
 * and improves formatting
 */
export function processBlogContent(htmlContent: string): string {
  if (!htmlContent) return '';

  try {
    // Simple regex-based approach for adding IDs to headings
    // This is a fallback method that doesn't require cheerio
    let processedContent = htmlContent;

    // Add IDs to headings
    processedContent = processedContent.replace(
      /<(h[2-4])>(.*?)<\/h[2-4]>/gi,
      (match, tag, content) => {
        const id = content
          .trim()
          .toLowerCase()
          .replace(/<[^>]*>/g, '') // Remove any HTML tags inside the heading
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');

        return `<${tag} id="heading-${id}">${content}</${tag}>`;
      }
    );

    // Add classes to paragraphs
    processedContent = processedContent.replace(
      /<p>(.*?)<\/p>/gi,
      '<p class="mb-4">$1</p>'
    );

    // Add classes to lists
    processedContent = processedContent.replace(
      /<ul>(.*?)<\/ul>/gis,
      '<ul class="ml-6 mb-4 list-disc">$1</ul>'
    );

    processedContent = processedContent.replace(
      /<ol>(.*?)<\/ol>/gis,
      '<ol class="ml-6 mb-4 list-decimal">$1</ol>'
    );

    // Add classes to list items
    processedContent = processedContent.replace(
      /<li>(.*?)<\/li>/gi,
      '<li class="mb-2">$1</li>'
    );

    // Style blockquotes
    processedContent = processedContent.replace(
      /<blockquote>(.*?)<\/blockquote>/gis,
      '<blockquote class="border-l-4 border-blue-500 pl-4 italic my-4">$1</blockquote>'
    );

    // Style tables
    processedContent = processedContent.replace(
      /<table>(.*?)<\/table>/gis,
      '<div class="overflow-x-auto"><table class="w-full border-collapse mb-4">$1</table></div>'
    );

    // Style table headers
    processedContent = processedContent.replace(
      /<th>(.*?)<\/th>/gi,
      '<th class="border border-gray-300 bg-gray-100 px-4 py-2 text-left">$1</th>'
    );

    // Style table cells
    processedContent = processedContent.replace(
      /<td>(.*?)<\/td>/gi,
      '<td class="border border-gray-300 px-4 py-2">$1</td>'
    );

    // Style code blocks
    processedContent = processedContent.replace(
      /<pre>(.*?)<\/pre>/gis,
      '<pre class="bg-gray-800 text-white p-4 rounded-md overflow-x-auto mb-4">$1</pre>'
    );

    // Add target="_blank" to external links
    processedContent = processedContent.replace(
      /<a\s+href="(https?:\/\/[^"]+)"([^>]*)>/gi,
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline"$2>'
    );

    return processedContent;
  } catch (error) {
    console.error('Error processing blog content:', error);
    return htmlContent; // Return original content if processing fails
  }
}

/**
 * Calculates word count for a given HTML content
 */
export function calculateWordCount(htmlContent: string): number {
  if (!htmlContent) return 0;

  // Strip HTML tags to get plain text
  const text = htmlContent.replace(/<[^>]*>/g, '');

  // Count words
  return text.trim().split(/\s+/).length;
}

/**
 * Estimates reading time for a given HTML content
 */
export function estimateReadingTime(htmlContent: string): string {
  if (!htmlContent) return '1 min read';

  // Average reading speed: 200 words per minute
  const wordsPerMinute = 200;
  const wordCount = calculateWordCount(htmlContent);
  const readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

  return `${readingTime} min read`;
}

/**
 * Extracts a short excerpt from HTML content
 */
export function extractExcerpt(
  htmlContent: string,
  maxLength: number = 160
): string {
  if (!htmlContent) return '';

  // Strip HTML tags to get plain text
  const text = htmlContent.replace(/<[^>]*>/g, '');

  // Truncate to maxLength
  if (text.length <= maxLength) return text;

  // Find the last space before maxLength
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  return lastSpace > 0
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
}

/**
 * Formats a date string
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
