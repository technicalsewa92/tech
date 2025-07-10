import BlogCategorylist from '@/components/BlogCategorylist';
import Nav from '@/components/Nav';
import Footer from '@/components/footer/Footer';
import BlogCard from '@/components/pageHelperComponents.js/BlogCard';
import RecommendedServicesServer from '@/components/RecommendedServicesServer';
import {
  fetchServerClient,
  getSEOByPageURL,
  getTrainingCategoriesData,
} from '@/lib/api';
import React from 'react';
const page = async () => {
  let blogs: any[] = [];

  try {
    const data = await fetchServerClient(
      '/techsewa/publiccontrol/publicmasterconfig/getblogdetails'
    );

    if (Array.isArray(data)) {
      blogs = data;
      blogs.sort(
        (a: any, b: any) =>
          new Date(b?.created_ts).getTime() - new Date(a?.created_ts).getTime()
      );
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        'Blogs data unavailable:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
    // blogs already has fallback (empty array)
  }

  let trainingCategories: any[] = [];
  try {
    trainingCategories = await getTrainingCategoriesData();
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        'Training categories unavailable:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
    // trainingCategories already has fallback (empty array)
  }
  // Fetch SEO data for blogs page using the new API endpoint
  const seoRes = await fetch(
    `https://crm.technicalsewa.com/techsewa/publiccontrol/publicmasterconfig/getSeoContent?url=/blogs`,
    { next: { revalidate: 60 } }
  );
  const seoContent = await seoRes.json();
  // --- Robust schema extraction ---
  // JSON-LD (blogs/collection)
  let jsonLd = null;
  if (seoContent.json_ld || seoContent.jsonld) {
    try {
      jsonLd = JSON.parse(seoContent.json_ld || seoContent.jsonld);
    } catch (e) {
      jsonLd = seoContent.json_ld || seoContent.jsonld;
    }
  }

  // FAQ Schema (rare for blogs, but future-proof)
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
        {/* JSON-LD Schema (blogs/collection) */}
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
      <div className="bg-[#FBFBFB] py-[10px] px-2 md:px-0">
        <div className="container mx-auto xl:w-[80rem] sm:w-full sm-w-full m-auto">
          <h1 className="text-[25px] md:text-[30px] text-black my-[5px] text-left font-bold">
            Technical Blogs
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Expert insights, tips, and guides for appliance maintenance and
            repair
          </p>
          <div className="flex flex-wrap space-y-2 md:justify-between mb-[36px]">
            <div className="w-full md:basis-[81%]">
              <div className="grid gap-4 md:grid-cols-1">
                {blogs?.map((blog: any, i: number) => (
                  <BlogCard key={i} blog={blog} />
                ))}
              </div>
            </div>
            <div className="w-full  md:basis-[15%] py-1 px-4 rounded-[10px] border-[2px] border-gray-200 text-[#3d4145] font-normal">
              <h2 className="text-[24px] leading-[29px] pb-3">CATEGORIES</h2>
              <BlogCategorylist categories={trainingCategories} />
            </div>
          </div>

          {/* Recommended Services Section */}
          <RecommendedServicesServer
            title="Need Professional Help?"
            limit={6}
            className="mt-8"
          />
        </div>
      </div>
    </>
  );
};

export default page;

export async function generateMetadata() {
  // fetch seo data for page based on slug using the new API endpoint
  const seoRes = await fetch(
    `https://crm.technicalsewa.com/techsewa/publiccontrol/publicmasterconfig/getSeoContent?url=/blogs`,
    { next: { revalidate: 60 } }
  );
  const seoContent = await seoRes.json();
  if (
    seoContent &&
    typeof seoContent === 'object' &&
    !Array.isArray(seoContent)
  ) {
    // Prefer backend-provided schema (jsonld), fallback to CollectionPage schema
    const schemaData = seoContent?.jsonld
      ? JSON.parse(seoContent.jsonld)
      : {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: seoContent?.page_title,
          description: seoContent?.description,
          image: seoContent?.image,
          url: 'https://www.technicalsewa.com/blogs',
          ...((seoContent?.video_jsonld && {
            video: JSON.parse(seoContent.video_jsonld),
          }) ||
            {}),
        };
    return {
      title: seoContent?.page_title || `Blogs | Technical sewa`,
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

  return {
    title: `Blogs | Technical sewa`,
    description:
      'Read our latest blog posts about appliance repair, maintenance tips, and technical advice.',
  };
}
