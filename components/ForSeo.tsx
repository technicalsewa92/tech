import Head from 'next/head';
import React from 'react';
import { staticHomeSeo } from '@/lib/staticHomeSeo';

const ForSeo = () => {
  const seo = staticHomeSeo;

  return (
    <Head>
      <title>{seo.meta_title}</title>
      <meta name="description" content={seo.meta_description} />
      <meta name="keywords" content={seo.key_words} />
      <link rel="canonical" href={seo.canonical} />
      <meta name="robots" content={seo.robots} />
      {/* Open Graph */}
      <meta property="og:title" content={seo.og_title} />
      <meta property="og:description" content={seo.og_desc} />
      <meta property="og:type" content={seo.og_type} />
      <meta property="og:url" content={seo.og_url} />
      <meta property="og:site_name" content={seo.og_site_name} />
      <meta property="og:image" content={seo.og_image} />
      {/* Twitter */}
      <meta name="twitter:title" content={seo.twitter_title} />
      <meta name="twitter:description" content={seo.twitter_desc} />
      <meta name="twitter:image" content={seo.twitter_image} />
      <meta name="twitter:card" content={seo.twitter_card} />
      {/* JSON-LD */}
      {seo.json_ld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: seo.json_ld }}
        />
      )}
    </Head>
  );
};

export default ForSeo;
