import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  noIndex?: boolean;
  structuredData?: any;
}

export function generateEnhancedMetadata({
  title,
  description,
  keywords,
  canonical,
  image,
  noIndex = false,
}: SEOProps): Metadata {
  const baseUrl = 'https://www.technicalsewa.com';
  const defaultImage = `${baseUrl}/default-og-image.png`;

  const fullTitle = title
    ? `${title} | TechnicalSewa`
    : 'TechnicalSewa - Professional Repair Services on Demand';
  const metaDescription =
    description ||
    'Professional repair services for appliances, electronics, and more. Expert technicians available on demand in Nepal.';

  return {
    title: fullTitle,
    description: metaDescription,
    keywords:
      keywords ||
      'repair services, technical support, appliances repair, electronics repair, Nepal',

    // ✅ Robots directive
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // ✅ Open Graph
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: canonical || baseUrl,
      siteName: 'TechnicalSewa',
      images: [
        {
          url: image || defaultImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },

    // ✅ Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: metaDescription,
      images: [image || defaultImage],
      creator: '@technicalsewa',
    },

    // ✅ Additional meta tags
    alternates: {
      canonical: canonical || baseUrl,
    },

    // ✅ App-specific meta
    applicationName: 'TechnicalSewa',
    category: 'Business',
    classification: 'Repair Services',

    // ✅ Verification tags
    verification: {
      google: 's4Xt-ttgXFwLDQmM-b_pAkaY52cuovGGAnlXMPIGZRA',
    },
  };
}

// ✅ Enhanced structured data generator
export function generateStructuredData(
  type: 'LocalBusiness' | 'Service' | 'Article',
  data: any
) {
  const baseStructure = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  switch (type) {
    case 'LocalBusiness':
      return {
        ...baseStructure,
        name: 'Technical Sewa',
        description:
          'Professional repair services for appliances and electronics',
        url: 'https://www.technicalsewa.com',
        telephone: '+977-9851201580',
        email: 'info@technicalsewa.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Kumaripati, Near Bluebird College',
          addressLocality: 'Lalitpur',
          addressCountry: 'Nepal',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '27.6701114',
          longitude: '85.3198698',
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Sunday',
          ],
          opens: '10:00',
          closes: '19:00',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '150',
        },
        ...data,
      };

    case 'Service':
      return {
        ...baseStructure,
        provider: {
          '@type': 'LocalBusiness',
          name: 'Technical Sewa',
          url: 'https://www.technicalsewa.com',
        },
        areaServed: {
          '@type': 'Place',
          name: 'Nepal',
        },
        ...data,
      };

    case 'Article':
      return {
        ...baseStructure,
        publisher: {
          '@type': 'Organization',
          name: 'Technical Sewa',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.technicalsewa.com/logo.png',
          },
        },
        author: {
          '@type': 'Organization',
          name: 'Technical Sewa',
        },
        ...data,
      };

    default:
      return { ...baseStructure, ...data };
  }
}
