import './globals.css';
import '../styles/brand-colors.css';
import { Inter } from 'next/font/google';
import AutoScrollToTop from '@/components/scrollToTop';
import Footer from '@/components/footer/Footer';
import Nav from '@/components/Nav';
import CanonicalProvider from './CanonicalProvider';
import ClientWrapper from '@/components/ClientWrapper';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import WebVitals from '@/components/WebVitals';
import ServiceWorkerProvider from '@/components/ServiceWorkerProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import ReactQueryProvider from '@/lib/react-query';
import { logger, performanceLogger } from '@/lib/logger';
import { fetchLayoutData } from '@/lib/api';
import { getAssetUrl, CRITICAL_ASSETS } from '@/lib/cdn';

// Optimized font loading - only load required weights
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Reduced from all weights to only essential ones
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

// Enhanced caching with TTL (Time To Live)
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
let servicesCache: { data: any[]; timestamp: number } | null = null;
let trainingCategoriesCache: { data: any[]; timestamp: number } | null = null;

// Cache validation function
function isCacheValid(
  cache: { data: any[]; timestamp: number } | null
): boolean {
  return !!cache && Date.now() - cache.timestamp < CACHE_TTL;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Optimized services fetching with better caching
  let services: any[] = [];
  if (!isCacheValid(servicesCache)) {
    const fallbackServices = [
      { brand_id: '1', brand_name: 'Samsung', brand_slug: 'samsung' },
      { brand_id: '2', brand_name: 'LG', brand_slug: 'lg' },
      { brand_id: '3', brand_name: 'Sony', brand_slug: 'sony' },
      { brand_id: '4', brand_name: 'Apple', brand_slug: 'apple' },
      { brand_id: '5', brand_name: 'Panasonic', brand_slug: 'panasonic' },
      { brand_id: '6', brand_name: 'Whirlpool', brand_slug: 'whirlpool' },
      { brand_id: '7', brand_name: 'Bosch', brand_slug: 'bosch' },
      { brand_id: '8', brand_name: 'Haier', brand_slug: 'haier' },
    ];

    try {
      const result = await performanceLogger.measureAsync(
        'fetch-services',
        async () => {
          return await fetchLayoutData(
            'https://crm.technicalsewa.com/techsewa/masterconfig/publicmasterconfig/getServiceList',
            fallbackServices
          );
        }
      );

      if (result.success && result.data?.brands) {
        services =
          result.data.brands.filter((b: any) => b?.brand_id !== '78') || [];
      } else {
        services = result.data;
      }

      servicesCache = { data: services, timestamp: Date.now() };
    } catch (error) {
      logger.error(
        'Critical error in services fetch:',
        error instanceof Error ? error.message : 'Unknown error'
      );
      services = fallbackServices;
      servicesCache = { data: services, timestamp: Date.now() };
    }
  } else {
    services = servicesCache!.data;
  }

  // Optimized training categories fetching
  let trainingCategories: any[] = [];
  if (!isCacheValid(trainingCategoriesCache)) {
    const fallbackCategories = [
      {
        id: '1',
        category_name: 'Electronics Repair',
        category_slug: 'electronics-repair',
      },
      { id: '2', category_name: 'AC Services', category_slug: 'ac-services' },
      {
        id: '3',
        category_name: 'Appliance Repair',
        category_slug: 'appliance-repair',
      },
      {
        id: '4',
        category_name: 'Mobile Repair',
        category_slug: 'mobile-repair',
      },
      {
        id: '5',
        category_name: 'Computer Repair',
        category_slug: 'computer-repair',
      },
    ];

    try {
      const result = await fetchLayoutData(
        'https://crm.technicalsewa.com/techsewa/publiccontrol/publicmasterconfig/gettrainingcategories',
        fallbackCategories
      );

      trainingCategories = result.data || fallbackCategories;
      trainingCategoriesCache = {
        data: trainingCategories,
        timestamp: Date.now(),
      };
    } catch (error) {
      logger.warn(
        'Training categories API error:',
        error instanceof Error ? error.message : 'Unknown error'
      );
      trainingCategories = fallbackCategories;
      trainingCategoriesCache = {
        data: trainingCategories,
        timestamp: Date.now(),
      };
    }
  } else {
    trainingCategories = trainingCategoriesCache!.data;
  }

  return (
    <html lang="en">
      <head>
        {/* Optimized DNS prefetch and preconnect */}
        <link rel="dns-prefetch" href="//www.technicalsewa.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        <link
          rel="preconnect"
          href="https://www.technicalsewa.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Optimized favicon and app icons */}
        <link
          rel="icon"
          href={
            process.env.NODE_ENV === 'production'
              ? getAssetUrl('/favicon.ico')
              : '/favicon.ico'
          }
          sizes="any"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={getAssetUrl('/assets/favlogo.png')}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={getAssetUrl('/assets/favlogo.png')}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={getAssetUrl('/assets/favlogo.png')}
        />

        {/* Preload critical assets only in production */}
        {process.env.NODE_ENV === 'production' &&
          CRITICAL_ASSETS.slice(0, 5).map(
            (
              asset // Limit to 5 most critical assets
            ) => (
              <link
                key={asset}
                rel="preload"
                href={getAssetUrl(asset)}
                as={
                  asset.endsWith('.css')
                    ? 'style'
                    : asset.endsWith('.js')
                      ? 'script'
                      : 'image'
                }
                crossOrigin="anonymous"
              />
            )
          )}

        {/* Optimized PWA Meta Tags */}
        <meta name="theme-color" content="#1e40af" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Technical Sewa" />

        {/* Enhanced SEO Meta Tags */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* Optimized Open Graph */}
        <meta
          property="og:image"
          content={getAssetUrl('/assets/ts-final-logo.png')}
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Technical Sewa" />

        {/* Canonical Provider */}
        <CanonicalProvider />
      </head>
      <body className={inter.className}>
        {/* Optimized analytics loading */}
        <GoogleAnalytics />

        {/* Web Vitals Monitoring */}
        <WebVitals />

        {/* Error Boundary and React Query Provider */}
        <ErrorBoundary>
          <ReactQueryProvider>
            {/* Optimized component loading */}
            <Nav services={services} trainingCategories={trainingCategories} />
            {children}
            <Footer />
            <ClientWrapper />
          </ReactQueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
