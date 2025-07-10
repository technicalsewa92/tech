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

// Only load required Inter font weights/styles for optimization
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Only load regular, medium, bold
  display: 'swap',
});

// Cache for API responses to avoid repeated calls
let servicesCache: any[] | null = null;
let trainingCategoriesCache: any[] | null = null;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Fetch services with improved error handling and performance monitoring
  let services: any[] = [];
  if (!servicesCache) {
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

      servicesCache = services; // Cache the result
    } catch (error) {
      logger.error(
        'Critical error in services fetch:',
        error instanceof Error ? error.message : 'Unknown error'
      );
      services = fallbackServices;
      servicesCache = services;
    }
  } else {
    services = servicesCache;
  }

  // Fetching training categories with error handling and caching
  let trainingCategories: any[] = [];
  if (!trainingCategoriesCache) {
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
      trainingCategoriesCache = trainingCategories;
    } catch (error) {
      logger.warn(
        'Training categories API error:',
        error instanceof Error ? error.message : 'Unknown error'
      );
      trainingCategories = fallbackCategories;
      trainingCategoriesCache = trainingCategories;
    }
  } else {
    trainingCategories = trainingCategoriesCache;
  }

  // Using the `usePathname` hook to generate the canonical link

  return (
    <html lang="en">
      <head>
        {/* DNS Prefetch for better performance */}
        <link rel="dns-prefetch" href="//www.technicalsewa.com" />
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
        <link
          rel="preconnect"
          href="https://www.technicalsewa.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />

        {/* Favicon and App Icons */}
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

        {/* Preload critical assets from CDN */}
        {process.env.NODE_ENV === 'production' &&
          CRITICAL_ASSETS.map(asset => (
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
          ))}

        {/* PWA Meta Tags */}
        <meta name="theme-color" content="#1e40af" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Technical Sewa" />
        {/* PWA Manifest - Temporarily disabled to prevent install prompts */}
        {/* <link rel="manifest" href="/manifest.json" /> */}

        {/* Additional SEO Meta Tags */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* Open Graph base image */}
        <meta
          property="og:image"
          content={getAssetUrl('/assets/ts-final-logo.png')}
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Technical Sewa" />

        {/* Preconnect for faster critical resource fetching */}
        <link
          rel="preconnect"
          href="https://www.technicalsewa.com"
          crossOrigin="anonymous"
        />
        {/* Optionally, preload main CSS if you know the path: */}
        {/* <link rel="preload" as="style" href="/path/to/main.css" /> */}

        {/* Canonical Provider */}
        <CanonicalProvider />
      </head>
      <body className={inter.className}>
        {/* Google Analytics */}
        <GoogleAnalytics />

        {/* Web Vitals Monitoring */}
        <WebVitals />

        {/* Service Worker for PWA - Temporarily disabled to remove install prompts */}
        {/* <ServiceWorkerProvider /> */}

        {/* Error Boundary and React Query Provider */}
        <ErrorBoundary>
          <ReactQueryProvider>
            {/* Components */}
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
