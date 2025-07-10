/**
 * CDN Configuration for Technical Sewa
 *
 * This file contains configuration for using jsDelivr CDN to serve static assets.
 * jsDelivr is a free, fast, and reliable CDN that can significantly improve website performance.
 */

// Use jsDelivr CDN for assets if repo is public, otherwise fallback to local
const GITHUB_USER =
  process.env.NEXT_PUBLIC_CDN_GITHUB_USER || 'technicalsewa92';
const GITHUB_REPO = process.env.NEXT_PUBLIC_CDN_GITHUB_REPO || 'tech';
const GITHUB_BRANCH = process.env.NEXT_PUBLIC_CDN_GITHUB_BRANCH || 'main';
export const CDN_BASE_URL = `https://cdn.jsdelivr.net/gh/${GITHUB_USER}/${GITHUB_REPO}@${GITHUB_BRANCH}`;

export function getCdnUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${CDN_BASE_URL}/${cleanPath}`;
}

export function shouldUseCdn(path: string): boolean {
  // Add support for fonts and other common static assets
  const staticAssetRegex =
    /\.(jpg|jpeg|png|gif|svg|webp|avif|css|js|woff|woff2|ttf|eot|otf|ico|json|xml)$/i;
  return staticAssetRegex.test(path);
}

export function getAssetUrl(path: string): string {
  // Always use local for tslogo-final1.png if CDN is broken or for fallback
  if (path.includes('tslogo-final1.png')) {
    return path;
  }
  // Always use CDN for static assets if they match the pattern
  return shouldUseCdn(path) ? getCdnUrl(path) : path;
}

/**
 * List of critical assets to preload for performance.
 * You can use these with the preload helper below in _document.tsx or _app.tsx.
 */
export const CRITICAL_ASSETS = [
  // Images
  '/assets/ts-final-logo.png',
  '/assets/favlogo.png',
  // Styles (public and src/styles)
  '/public/tailwind.min.css',
  '/styles/main.css',
  '/styles/brand-colors.css',
  '/styles/service-pages.css',
  '/styles/service-pages-enhanced.css',
  '/styles/service-card-compact.css',
  '/styles/optimizations.css',
  '/styles/mobile-optimizations.css',
  '/styles/homepage-sections-fix.css',
  '/styles/homepage-layout-fixes.css',
  '/styles/homepage-layout-fixes-new.css',
  '/styles/homepage-enhancements.css',
  '/styles/blog-enhanced.css',
  // Scripts
  '/public/scripts/pixel.js',
  '/public/sw.js',
];

/**
 * Generates <link rel="preload"> tags for critical assets (for use in _document.tsx).
 */
export function getPreloadLinks(): string {
  return CRITICAL_ASSETS.map(asset => {
    const url = getAssetUrl(asset);
    const asType = asset.endsWith('.css')
      ? 'style'
      : asset.match(/\.(png|jpg|jpeg|gif|svg|webp|avif)$/)
        ? 'image'
        : 'script';
    return `<link rel="preload" href="${url}" as="${asType}" />`;
  }).join('\n');
}
