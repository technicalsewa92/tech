import Nav from '@/components/Nav';
import Footer from '@/components/footer/Footer';
import ChildService from '@/features/service/child-service/ChildService';
import { fetchServerClient, getSEOByPageURL } from '@/lib/api';
import React from 'react';

const page = async (context: any) => {
  console.log('Dynamic route context.params:', context.params);
  const params = await context.params;
  const slug = params.slug1;

  const data = await fetchServerClient(
    `/techsewa/masterconfig/publicmasterconfig/getSliderListpop`
  );
  // fetch seo data for page based on slug
  const seoData = await getSEOByPageURL(
    `/service/${slug}/${params['child-service-slug']}`
  );
  const seoExists = seoData?.content && !Array.isArray(seoData?.content);

  const seoContent = seoData?.content;
  console.log('seo', seoData);
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://technicalsewa.com/service/${slug}/${params['child-service-slug']}`,
    },
    headline: seoContent?.key_words,
    description: seoContent?.description,
    image: seoContent?.image,
    author: {
      '@type': 'Organization',
      name: 'Technical Sewa',
      url: 'https://technicalsewa.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Technical Sewa',
      logo: {
        '@type': 'ImageObject',
        url: seoContent?.image,
      },
    },
  };

  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <ChildService data={data.brands} />
    </>
  );
};

export default page;

export async function generateMetadata(context: any) {
  const params = await context.params;
  const slug = params.slug1;

  // fetch seo data for page based on slug
  const seoData = await getSEOByPageURL(
    `/service/${slug}/${params['child-service-slug']}`
  );

  const seoExists = seoData?.content && !Array.isArray(seoData?.content);

  const seoContent = seoData?.content;
  if (seoExists) {
    return {
      title: `${
        seoExists ? seoContent?.page_title : `${slug} | Technical sewa`
      } `,
      description: `${seoContent?.description}`,
      keywords: `${seoContent?.key_words}`,
      openGraph: {
        title: `${
          seoExists ? seoContent?.og_title : `${slug} | Technical sewa`
        } `,
        type: 'website',
        description: `${seoContent?.og_desc} `,
        url: seoContent?.og_url,
      },
    };
  }

  return {
    title: `${params.slug1} ${params['child-service-slug']} | Technical sewa`,
  };
}
