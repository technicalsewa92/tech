/**
 * CDN Configuration for Technical Sewa
 *
 * This file contains configuration for using jsDelivr CDN to serve static assets.
 * jsDelivr is a free, fast, and reliable CDN that can significantly improve website performance.
 */

// Allow global override for CDN base URL (for flexibility in all environments)
const ENV_CDN_BASE_URL = process.env.NEXT_PUBLIC_CDN_BASE_URL;
const GITHUB_USER =
  process.env.NEXT_PUBLIC_CDN_GITHUB_USER || 'technicalsewa92';
const GITHUB_REPO = process.env.NEXT_PUBLIC_CDN_GITHUB_REPO || 'tech';
const GITHUB_BRANCH = process.env.NEXT_PUBLIC_CDN_GITHUB_BRANCH || 'main';
export const CDN_BASE_URL =
  ENV_CDN_BASE_URL ||
  `https://cdn.jsdelivr.net/gh/${GITHUB_USER}/${GITHUB_REPO}@${GITHUB_BRANCH}`;

// List of static asset extensions to serve via CDN
const STATIC_ASSET_REGEX =
  /\.(jpg|jpeg|png|gif|svg|webp|avif|css|js|woff|woff2|ttf|eot|otf|ico|json|xml|map|txt|webmanifest)$/i;

/**
 * Returns the CDN URL for a given asset path
 * @param path Asset path (relative to public/ or absolute)
 */
export function getCdnUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${CDN_BASE_URL}/${cleanPath}`;
}

/**
 * Determines if a path should be served from CDN
 * @param path Asset path
 * @param forceCdn Optional: force CDN usage regardless of extension
 */
export function shouldUseCdn(path: string, forceCdn = false): boolean {
  if (forceCdn) return true;
  return STATIC_ASSET_REGEX.test(path);
}

/**
 * Returns the correct asset URL (CDN or local) for any static asset
 * @param path Asset path (relative to public/ or absolute)
 * @param opts Options: { forceCdn?: boolean, fallbackToLocal?: boolean }
 */
export function getAssetUrl(
  path: string,
  opts?: { forceCdn?: boolean; fallbackToLocal?: boolean }
): string {
  // Always use local for tslogo-final1.png if CDN is broken or for fallback
  if (path.includes('tslogo-final1.png')) {
    return path;
  }
  // If forced, always use CDN
  if (opts?.forceCdn) {
    return getCdnUrl(path);
  }
  // Use CDN for static assets
  if (shouldUseCdn(path)) {
    return getCdnUrl(path);
  }
  // Optionally fallback to local if CDN fails (for SSR or dev)
  if (opts?.fallbackToLocal) {
    return path;
  }
  // Default: return as-is (local)
  return path;
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
