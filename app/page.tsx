// import { getSEOByPageURL } from '@/lib/api';
import { generateEnhancedMetadata } from '@/lib/seo';
import { logger } from '@/lib/logger';
import NewFeature from '@/features/NewFeature';
import PopupBanner from '@/components/pop-up/PopUp';

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

export async function generateMetadata() {
  // fetch seo data for homepage using the new API endpoint with better error handling
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
    console.error('Error fetching SEO content for metadata:', error);
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

  if (
    seoContent &&
    typeof seoContent === 'object' &&
    !Array.isArray(seoContent)
  ) {
    // Prefer backend-provided schema (jsonld), fallback to LocalBusiness schema
    const schemaData = seoContent?.jsonld
      ? JSON.parse(seoContent.jsonld)
      : {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: seoContent?.page_title,
          description: seoContent?.description,
          image: seoContent?.image,
          url: 'https://www.technicalsewa.com',
          ...((seoContent?.video_jsonld && {
            video: JSON.parse(seoContent.video_jsonld),
          }) ||
            {}),
        };
    return {
      title:
        seoContent?.page_title ||
        `Technical Sewa - Expert Technical Services in Nepal`,
      description: seoContent?.description,
      keywords: seoContent?.key_words,
      robots: seoContent?.robots,
      alternates: seoContent?.canonical
        ? { canonical: seoContent.canonical }
        : undefined,
      openGraph: {
        title: seoContent?.og_title || seoContent?.page_title,
        description: seoContent?.og_desc || seoContent?.description,
        url: seoContent?.og_url || seoContent?.canonical,
        type: seoContent?.og_type || 'website',
        siteName: seoContent?.og_site_name,
        images: seoContent?.og_image
          ? [{ url: seoContent.og_image }]
          : undefined,
        videos: seoContent?.og_video
          ? [{ url: seoContent.og_video }]
          : undefined,
      },
      twitter: {
        title: seoContent?.twitter_title,
        description: seoContent?.twitter_desc,
        images: seoContent?.twitter_image
          ? [seoContent.twitter_image]
          : undefined,
        card: seoContent?.twitter_card,
      },
      other: {
        ...(seoContent?.youtube && { 'video:youtube': seoContent.youtube }),
        ...(seoContent?.free_tags && Array.isArray(seoContent.free_tags)
          ? Object.assign({}, ...seoContent.free_tags)
          : seoContent?.free_tags),
        'application/ld+json': JSON.stringify(schemaData),
        ...(seoContent?.video_jsonld && {
          'video:jsonld': seoContent.video_jsonld,
        }),
      },
    };
  }

  // Fallback metadata for home page
  return {
    title: 'Technical Sewa - Expert Technical Services in Nepal',
    description:
      'Professional technical services in Nepal. We provide expert solutions for all your technical needs with skilled professionals.',
    keywords:
      'technical services, Nepal, professional, expert, repair, maintenance',
    alternates: { canonical: 'https://www.technicalsewa.com' },
    openGraph: {
      title: 'Technical Sewa - Expert Technical Services in Nepal',
      description:
        'Professional technical services in Nepal. We provide expert solutions for all your technical needs with skilled professionals.',
      url: 'https://www.technicalsewa.com',
      type: 'website',
      images: [{ url: '/default-og-image.png' }],
    },
  };
}
