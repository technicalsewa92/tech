// import { getSEOByPageURL } from '@/lib/api';
import { generateEnhancedMetadata } from '@/lib/seo';
import { logger } from '@/lib/logger';
import NewFeature from '@/features/NewFeature';
import PopupBanner from '@/components/pop-up/PopUp';

export default async function Home() {
  // Fetch SEO data for homepage using the new API endpoint
  const seoRes = await fetch(
    `https://crm.technicalsewa.com/techsewa/publiccontrol/publicmasterconfig/getSeoContent?url=/`,
    { next: { revalidate: 60 } }
  );
  const seoContent = await seoRes.json();
  // --- Robust schema extraction ---
  // JSON-LD (business/homepage)
  let jsonLd = null;
  if (seoContent.json_ld || seoContent.jsonld) {
    try {
      jsonLd = JSON.parse(seoContent.json_ld || seoContent.jsonld);
    } catch (e) {
      jsonLd = seoContent.json_ld || seoContent.jsonld;
    }
  }

  // FAQ Schema (future-proof)
  let faqSchema = null;
  if (
    seoContent.faq &&
    Array.isArray(seoContent.faq) &&
    seoContent.faq.length > 0
  ) {
    faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: seoContent.faq.map((item: any) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };
  }

  // Video JSON-LD
  let videoJsonLd = null;
  if (seoContent.video_json) {
    const match = seoContent.video_json.match(/{[\s\S]*}/);
    if (match) {
      try {
        videoJsonLd = JSON.parse(match[0]);
      } catch (e) {
        videoJsonLd = null;
      }
    }
  }

  return (
    <main className="relative bg-gradient-to-b from-white via-blue-50 to-gray-50 min-h-screen">
      <head>
        {/* Meta tags from backend */}
        {seoContent?.page_title && <title>{seoContent.page_title}</title>}
        {seoContent?.description && (
          <meta name="description" content={seoContent.description} />
        )}
        {seoContent?.key_words && (
          <meta name="keywords" content={seoContent.key_words} />
        )}
        {seoContent?.robots && (
          <meta name="robots" content={seoContent.robots} />
        )}
        {seoContent?.canonical && (
          <link rel="canonical" href={seoContent.canonical} />
        )}
        {/* Open Graph */}
        {seoContent?.og_title && (
          <meta property="og:title" content={seoContent.og_title} />
        )}
        {seoContent?.og_desc && (
          <meta property="og:description" content={seoContent.og_desc} />
        )}
        {seoContent?.og_type && (
          <meta property="og:type" content={seoContent.og_type} />
        )}
        {seoContent?.og_url && (
          <meta property="og:url" content={seoContent.og_url} />
        )}
        {seoContent?.og_site_name && (
          <meta property="og:site_name" content={seoContent.og_site_name} />
        )}
        {seoContent?.og_image && (
          <meta property="og:image" content={seoContent.og_image} />
        )}
        {seoContent?.og_video && (
          <meta property="og:video" content={seoContent.og_video} />
        )}
        {/* Twitter Card */}
        {seoContent?.twitter_title && (
          <meta name="twitter:title" content={seoContent.twitter_title} />
        )}
        {seoContent?.twitter_desc && (
          <meta name="twitter:description" content={seoContent.twitter_desc} />
        )}
        {seoContent?.twitter_image && (
          <meta name="twitter:image" content={seoContent.twitter_image} />
        )}
        {seoContent?.twitter_card && (
          <meta name="twitter:card" content={seoContent.twitter_card} />
        )}
        {/* YouTube/Video */}
        {seoContent?.youtube && (
          <meta property="video:youtube" content={seoContent.youtube} />
        )}
        {/* Free tags */}
        {seoContent?.free_tags &&
          (Array.isArray(seoContent.free_tags) ? (
            seoContent.free_tags.map((tag: any, i: number) => (
              <meta key={i} {...tag} />
            ))
          ) : (
            <meta {...seoContent.free_tags} />
          ))}
        {/* JSON-LD Schema (business/homepage) */}
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html:
                typeof jsonLd === 'string' ? jsonLd : JSON.stringify(jsonLd),
            }}
          />
        )}
        {/* FAQ JSON-LD */}
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}
        {/* Video JSON-LD */}
        {videoJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
          />
        )}
      </head>
      {/* Popup Banner */}
      <PopupBanner />
      {/* Main content with all features - Original NewFeature component */}
      <section className="w-full px-0 md:px-0 pb-8 md:pb-16 pt-0">
        <NewFeature />
      </section>
    </main>
  );
}

export async function generateMetadata() {
  // fetch seo data for homepage using the new API endpoint
  const seoRes = await fetch(
    `https://crm.technicalsewa.com/techsewa/publiccontrol/publicmasterconfig/getSeoContent?url=/`,
    { next: { revalidate: 60 } }
  );
  const seoContent = await seoRes.json();
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
