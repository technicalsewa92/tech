// import { getSEOByPageURL } from '@/lib/api';
import { generateEnhancedMetadata } from '@/lib/seo';
import { logger } from '@/lib/logger';
import NewFeature from '@/features/NewFeature';
import PopupBanner from '@/components/pop-up/PopUp';
import { staticHomeSeo } from '@/lib/staticHomeSeo';

export default async function Home() {
  // Fetch SEO data for homepage using the new API endpoint with better error handling
  let seoContent = null;
  try {
    const seoRes = await fetch(
      `https://crm.technicalsewa.com/techsewa/publiccontrol/publicmasterconfig/getSeoContent?url=/`,
      {
        next: { revalidate: 60 },
        headers: {
          'Cache-Control': 'no-cache',
        },
      }
    );

    if (!seoRes.ok) {
      throw new Error(`SEO fetch failed: ${seoRes.status}`);
    }

    seoContent = await seoRes.json();
  } catch (error) {
    console.error('Error fetching SEO content:', error);
    // Use fallback SEO content
    seoContent = {
      page_title: 'Technical Sewa - Expert Technical Services in Nepal',
      description:
        'Professional technical services in Nepal. We provide expert solutions for all your technical needs with skilled professionals.',
      key_words:
        'technical services, Nepal, professional, expert, repair, maintenance',
      robots: 'index, follow',
      canonical: 'https://www.technicalsewa.com',
      og_title: 'Technical Sewa - Expert Technical Services in Nepal',
      og_desc:
        'Professional technical services in Nepal. We provide expert solutions for all your technical needs with skilled professionals.',
      og_type: 'website',
      og_url: 'https://www.technicalsewa.com',
      og_site_name: 'Technical Sewa',
      og_image: 'https://www.technicalsewa.com/assets/ts-final-logo.png',
      twitter_title: 'Technical Sewa - Expert Technical Services in Nepal',
      twitter_desc:
        'Professional technical services in Nepal. We provide expert solutions for all your technical needs with skilled professionals.',
      twitter_image: 'https://www.technicalsewa.com/assets/ts-final-logo.png',
      twitter_card: 'summary_large_image',
    };
  }

  return (
    <main className="relative bg-gradient-to-b from-white via-blue-50 to-gray-50 min-h-screen">
      {/* Popup Banner */}
      <PopupBanner />

      {/* Main content with all features - Original NewFeature component */}
      <section className="w-full px-0 md:px-0 pb-8 md:pb-4 pt-0">
        <NewFeature />
      </section>
    </main>
  );
}

export const metadata = {
  title: staticHomeSeo.meta_title,
  description: staticHomeSeo.meta_description,
  keywords: staticHomeSeo.key_words,
  alternates: { canonical: staticHomeSeo.canonical },
  openGraph: {
    title: staticHomeSeo.og_title,
    description: staticHomeSeo.og_desc,
    url: staticHomeSeo.og_url,
    siteName: staticHomeSeo.og_site_name,
    images: [{ url: staticHomeSeo.og_image }],
    type: staticHomeSeo.og_type,
  },
  twitter: {
    card: staticHomeSeo.twitter_card,
    title: staticHomeSeo.twitter_title,
    description: staticHomeSeo.twitter_desc,
    images: [staticHomeSeo.twitter_image],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
