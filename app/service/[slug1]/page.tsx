import Nav from '@/components/Nav';
import Footer from '@/components/footer/Footer';
import ServiceSlug1Enhanced from '@/components/pageHelperComponents.js/ServiceSlug1Enhanced';
import { fetchServerClient } from '@/lib/api';
import React from 'react';

const page = async ({ params }: any) => {
  const { slug1 } = await params;
  const slug = slug1;

  const data = await fetchServerClient(
    `/techsewa/masterconfig/publicmasterconfig/getSliderListpop`
  );

  // fetch seo data for page based on slug using the new API endpoint
  const seoRes = await fetch(
    `https://crm.technicalsewa.com/techsewa/publiccontrol/publicmasterconfig/getSeoContent?url=/service/${slug}`,
    { next: { revalidate: 60 } }
  );
  const seoData = await seoRes.json();
  const seoExists =
    seoData && typeof seoData === 'object' && !Array.isArray(seoData);
  // Use .content if present, fallback to root
  const seoContent = seoData.content || seoData;

  // --- Robust schema extraction ---
  // JSON-LD (business/service, FAQ, etc.)
  const jsonLdList = [];
  if (seoContent.json_ld) {
    // Can be a string with multiple <script> tags or just JSON
    const scripts = seoContent.json_ld.match(
      /<script[^>]*>([\s\S]*?)<\/script>/gi
    );
    if (scripts) {
      scripts.forEach((script: string) => {
        const match = script.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
        if (match && match[1]) {
          try {
            jsonLdList.push(JSON.parse(match[1]));
          } catch {
            jsonLdList.push(match[1]);
          }
        }
      });
    } else {
      // Try to parse as JSON, fallback to string
      try {
        jsonLdList.push(JSON.parse(seoContent.json_ld));
      } catch {
        jsonLdList.push(seoContent.json_ld);
      }
    }
  }
  // Video JSON-LD
  let videoJsonLd = null;
  if (seoContent.video_json) {
    const scripts = seoContent.video_json.match(
      /<script[^>]*>([\s\S]*?)<\/script>/gi
    );
    if (scripts) {
      // If multiple video scripts, just use the first one (or extend to array if needed)
      const match = scripts[0].match(/<script[^>]*>([\s\S]*?)<\/script>/i);
      if (match && match[1]) {
        try {
          videoJsonLd = JSON.parse(match[1]);
        } catch {
          videoJsonLd = match[1];
        }
      }
    } else {
      try {
        videoJsonLd = JSON.parse(seoContent.video_json);
      } catch {
        videoJsonLd = seoContent.video_json;
      }
    }
  }
  // FAQ Schema (if provided as array)
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
  // ...existing code...
  return (
    <>
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
        {/* JSON-LD Schema (business/service, FAQ, etc.) */}
        {jsonLdList.map((item, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: typeof item === 'string' ? item : JSON.stringify(item),
            }}
          />
        ))}
        {/* FAQ JSON-LD (from array) */}
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
            dangerouslySetInnerHTML={{
              __html:
                typeof videoJsonLd === 'string'
                  ? videoJsonLd
                  : JSON.stringify(videoJsonLd),
            }}
          />
        )}
      </head>
      <ServiceSlug1Enhanced data={data.brands} />
    </>
  );
};

export default page;

export async function generateMetadata({ params }: any) {
  const { slug1 } = await params;
  const slug = slug1;

  // fetch seo data for page based on slug using the new API endpoint
  const seoRes = await fetch(
    `https://crm.technicalsewa.com/techsewa/publiccontrol/publicmasterconfig/getSeoContent?url=/service/${slug}`,
    { next: { revalidate: 60 } }
  );
  const seoData = await seoRes.json();
  const seoExists =
    seoData && typeof seoData === 'object' && !Array.isArray(seoData);
  const seoContent = seoData.content || seoData;

  // Prefer backend-provided schema (json_ld), fallback to Service schema
  let schemaData = null;
  if (seoContent?.json_ld) {
    // Try to extract all <script> blocks or parse as JSON
    const scripts = seoContent.json_ld.match(
      /<script[^>]*>([\s\S]*?)<\/script>/gi
    );
    if (scripts) {
      schemaData = scripts
        .map((script: string) => {
          const match = script.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
          if (match && match[1]) {
            try {
              return JSON.parse(match[1]);
            } catch {
              return match[1];
            }
          }
          return null;
        })
        .filter(Boolean);
    } else {
      try {
        schemaData = [JSON.parse(seoContent.json_ld)];
      } catch {
        schemaData = [seoContent.json_ld];
      }
    }
  } else {
    schemaData = [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: seoContent?.page_title,
        description: seoContent?.description,
        image: seoContent?.image,
        url: `https://technicalsewa.com/service/${slug}`,
        ...((seoContent?.video_jsonld && {
          video: JSON.parse(seoContent.video_jsonld),
        }) ||
          {}),
      },
    ];
  }

  if (seoExists) {
    return {
      title: `${seoExists ? seoContent?.page_title : `${slug} | Technical sewa`}`,
      description: `${seoContent?.description}`,
      keywords: `${seoContent?.key_words}`,
      openGraph: {
        title: `${seoContent?.og_title} `,
        description: `${seoContent?.og_desc} `,
        url: seoContent?.og_url,
        image: seoContent.image || `/default-og-image.png`,
        type: seoContent?.og_type?.toLowerCase() || 'website',
      },
      link: [
        {
          rel: 'apple-touch-icon',
          type: 'image/x-icon',
          sizes: '180x180',
          href: `${seoContent.image}`,
        },
      ],
      other: {
        'application/ld+json':
          schemaData.length === 1
            ? JSON.stringify(schemaData[0])
            : schemaData
                .map((s: string | object) =>
                  typeof s === 'string' ? s : JSON.stringify(s)
                )
                .join('\n'),
      },
    };
  }

  return {
    title: `${slug} | Technical sewa`,
  };
}
