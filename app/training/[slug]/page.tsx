import ImageWithFallback from '@/components/ui/ImageWithFallback';
import TrainingCategorylist from '@/components/Categorylist';
import Nav from '@/components/Nav';
import { SEOBase } from '@/components/SEOBase';
import Footer from '@/components/footer/Footer';
import RecommendedServices from '@/components/RecommendedServices';
import { createSanitizedHtml } from '../../../utils/htmlSanitizer';
import {
  fetchServerClient,
  getSEOByPageURL,
  getTrainingCategoriesData,
} from '@/lib/api';
import { baseUrl } from '@/public/baseUrl';
import { redirect } from 'next/navigation';
import React from 'react';
async function getData(id: string) {
  const formData = new FormData();
  formData.append('title', id);

  // console.log("training_id ? ", id);

  const res = await fetch(
    `${baseUrl}/techsewa/publiccontrol/publicmasterconfig/gettrainingDetails`,
    {
      method: 'POST',
      body: formData,
      headers: {
        'Cache-Control': `max-age=${2 * 60}`, // max 2 min cache
      },
    }
  );

  if (!res.ok) {
    alert('Failed to fetch data');
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  // console.log("res", data);

  return data;
}

const page = async ({ params }: any) => {
  const { slug } = await params;
  const trainingId = slug;

  // //console.log("trainingId", trainingId);
  // //console.log("params", params);

  const data1 = await fetchServerClient(
    '/techsewa/publiccontrol/publicmasterconfig/gettrainingcategories'
  );

  let data = await getData(trainingId);
  //console.log("data", data);
  data = data?.[0] || data;

  if (!data || (Array.isArray(data) && data.length === 0)) {
    redirect('/');
  }

  const finddata = data1.find((i: any) => +i?.value === +trainingId);

  const trainingCategories = await getTrainingCategoriesData();

  // Fetch SEO data for this training page using the new API endpoint
  const seoRes = await fetch(
    `https://crm.technicalsewa.com/techsewa/publiccontrol/publicmasterconfig/getSeoContent?url=/training/${trainingId}`,
    { next: { revalidate: 60 } }
  );
  const seoContent = await seoRes.json();
  // --- Robust schema extraction ---
  // JSON-LD (course/training)
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
        {/* JSON-LD Schema (course/training) */}
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
      {/* Modernized Training Detail Layout */}
      <div className="max-w-5xl mx-auto px-2 md:px-6 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl shadow p-6 mb-8 flex flex-col md:flex-row md:items-center gap-6">
          {data?.image_url && (
            <div className="flex-shrink-0 w-full md:w-72 h-48 md:h-56 rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm">
              <ImageWithFallback
                src={data?.image_url}
                alt={`${data?.training_title} image`}
                className="object-cover w-full h-full"
                width={288}
                height={224}
              />
            </div>
          )}
          <div className="flex-1 flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
              {data?.training_title}
            </h1>
            {data?.short_desc && (
              <p className="text-lg text-gray-700 mb-2">{data.short_desc}</p>
            )}
            {/* CTA Button - WhatsApp redirect */}
            <a
              href={`https://wa.me/9851201580?text=${encodeURIComponent(`I'm interested in the training: ${data?.training_title || ''}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-max bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
            >
              Call Us Now →
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Video Section */}
            {data?.video_link && (
              <div className="mb-6 rounded-lg overflow-hidden border border-blue-100 shadow-sm">
                <iframe
                  className="w-full h-64 md:h-80"
                  src={`https://www.youtube.com/embed/${data?.video_link?.replace('https://www.youtube.com/watch?v=', '')}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            {/* Description */}
            {data?.detail && (
              <div
                className="prose max-w-none mb-6"
                dangerouslySetInnerHTML={createSanitizedHtml(data?.detail)}
              />
            )}
            {/* Additional Image */}
            {data?.image_2 && (
              <div className="w-full h-72 rounded-lg overflow-hidden mb-6 border border-gray-200 bg-white">
                <ImageWithFallback
                  src={data?.image_2}
                  alt={`${data?.training_title} image #2}`}
                  className="object-cover w-full h-full"
                  width={800}
                  height={288}
                />
              </div>
            )}
            {/* FAQ Accordion (if FAQ present) */}
            {faqSchema &&
              faqSchema.mainEntity &&
              faqSchema.mainEntity.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 text-blue-800">
                    Frequently Asked Questions
                  </h2>
                  <div className="divide-y divide-gray-200 rounded-lg border border-gray-100 bg-white">
                    {faqSchema.mainEntity.map((faq: any, i: number) => (
                      <details key={i} className="group p-4 cursor-pointer">
                        <summary className="font-medium text-gray-900 group-open:text-blue-700 transition">
                          {faq.name}
                        </summary>
                        <div className="mt-2 text-gray-700">
                          {faq.acceptedAnswer.text}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}
          </div>
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-24 py-4 px-4 rounded-xl border-2 border-gray-100 bg-white shadow-sm">
              <h2 className="text-xl font-bold pb-3 text-blue-800">
                Categories
              </h2>
              <TrainingCategorylist
                categories={trainingCategories}
                activeId={finddata}
              />
            </div>
          </aside>
        </div>

        {/* Recommended Services Section */}
        <div className="mt-12">
          <RecommendedServices
            title="Professional Services Available"
            limit={6}
            className="mt-8"
          />
        </div>
      </div>
    </>
  );
};

export default page;

export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const trainingSlug = slug;

  // fetch seo data for page based on slug using the new API endpoint
  const seoRes = await fetch(
    `https://crm.technicalsewa.com/techsewa/publiccontrol/publicmasterconfig/getSeoContent?url=/training/${trainingSlug}`,
    { next: { revalidate: 60 } }
  );
  const seoContent = await seoRes.json();
  if (
    seoContent &&
    typeof seoContent === 'object' &&
    !Array.isArray(seoContent)
  ) {
    // Prefer backend-provided schema (jsonld), fallback to Course schema
    const schemaData = seoContent?.jsonld
      ? JSON.parse(seoContent.jsonld)
      : {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: seoContent?.page_title,
          description: seoContent?.description,
          image: seoContent?.image,
          url: `https://technicalsewa.com/training/${trainingSlug}`,
          ...((seoContent?.video_jsonld && {
            video: JSON.parse(seoContent.video_jsonld),
          }) ||
            {}),
        };
    return {
      title: seoContent?.page_title || `Training | Technical sewa`,
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
    title: `${trainingSlug} - Training | Technical sewa`,
  };
}
