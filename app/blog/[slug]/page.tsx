import ImageWithFallback from '@/components/ui/ImageWithFallback';
import BlogCategorylist from '@/components/BlogCategorylist';
import RecommendedServices from '@/components/RecommendedServices';
import Link from 'next/link';
import { createSanitizedHtml } from '../../../utils/htmlSanitizer';
import {
  getBlogDataById,
  getSEOByPageURL,
  getTrainingCategoriesData,
  getBlogsByCategoryId,
} from '@/lib/api';
import React from 'react';
import {
  processBlogContent,
  estimateReadingTime,
  calculateWordCount,
  formatDate,
} from '@/utils/blogUtils';
import { Metadata } from 'next';
import { ArrowLeft, Bookmark } from 'lucide-react';
import dynamic from 'next/dynamic';

// Import client components
import BlogMeta from '@/components/blog/BlogMeta';
import RelatedArticles from '@/components/blog/RelatedArticles';
import ReadingStats from '@/components/blog/ReadingStats';
import {
  TableOfContents,
  SocialShare,
  ReadingProgressBar,
  FloatingShareButton,
  BackToTopButton,
  PrintButton,
} from '@/components/blog/ClientComponents';
import LastUpdated from '@/components/blog/LastUpdated';
import BlogCTA from '@/components/blog/BlogCTA';
import AuthorBio from '@/components/blog/AuthorBio';

const BlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  // Await the params object to properly access its properties
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || '';

  let blogData = null;
  let trainingCategories = [];
  let relatedBlogs = [];

  try {
    // Only fetch if we have a valid slug
    if (slug) {
      blogData = await getBlogDataById(slug);
    }
  } catch (error) {
    console.error('Error fetching blog data:', error);
  }

  try {
    trainingCategories = await getTrainingCategoriesData();
  } catch (error) {
    console.error('Error fetching training categories:', error);
  }

  const data = blogData?.[0] || blogData;

  // If no valid data and there's an error, show 404
  if (!data || data.error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Blog Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The requested blog post could not be found.
          </p>
          <Link
            href="/blogs"
            className="bg-[#2591b2] text-white px-6 py-3 rounded-lg hover:bg-[#1a7a96] transition-colors inline-flex items-center"
          >
            <ArrowLeft className="mr-2" /> Browse All Blogs
          </Link>
        </div>
      </div>
    );
  }

  // Fetch related blogs if we have a category ID
  if (data.category_id) {
    try {
      const categoryBlogs = await getBlogsByCategoryId(data.category_id);
      if (categoryBlogs && !categoryBlogs.error) {
        relatedBlogs = categoryBlogs;
      }
    } catch (error) {
      console.error('Error fetching related blogs:', error);
    }
  }

  // Process blog content to add IDs to headings and improve formatting
  const processedContent = processBlogContent(data.blog_desc || '');

  // Calculate reading stats
  const wordCount = calculateWordCount(data.blog_desc || '');
  const readTime = estimateReadingTime(data.blog_desc || '');

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Floating Share Button */}
      <FloatingShareButton
        url={`https://technicalsewa.com/blog/${slug}`}
        title={data.blog_name}
      />

      {/* Back to Top Button */}
      <BackToTopButton />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-[#2591b2]">
              Home
            </Link>
            <span className="mx-2">›</span>
            <Link href="/blogs" className="hover:text-[#2591b2]">
              Blogs
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800 font-medium truncate">
              {data.blog_name}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <article className="bg-white rounded-xl shadow-sm overflow-hidden blog-article blog-content-wrapper">
                {/* Featured Image */}
                {data?.filename && (
                  <div className="relative">
                    <div className="aspect-video w-full overflow-hidden">
                      <ImageWithFallback
                        className="object-cover w-full h-full"
                        src={data.filename}
                        alt={data.blog_name}
                        width={1200}
                        height={675}
                        priority
                      />
                    </div>
                    {data.category_name && (
                      <div className="absolute top-4 left-4">
                        <Link
                          href={`/blogs/${data.category_slug || ''}`}
                          className="bg-[#2591b2] text-white text-sm font-medium px-3 py-1 rounded-full hover:bg-[#1a7a96] transition-colors"
                        >
                          {data.category_name}
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                <div className="p-6 md:p-8">
                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {data?.blog_name}
                  </h1>

                  {/* Meta information */}
                  <div className="mb-6">
                    <BlogMeta
                      author={data.author_name || 'Technicalsewa'}
                      date={data.created_date || data.updated_date}
                      readingTime={readTime}
                      wordCount={wordCount}
                      className="border-b border-gray-100 pb-4"
                    />
                  </div>

                  {/* Table of Contents - Only shown on larger screens */}
                  <div className="hidden md:block mb-8">
                    <TableOfContents contentSelector="#blog-content" />
                  </div>

                  {/* YouTube Video */}
                  {data?.youtube && (
                    <div className="mb-8 rounded-lg overflow-hidden shadow-md">
                      <iframe
                        className="w-full aspect-video"
                        src={`https://www.youtube.com/embed/${data?.youtube?.replace(
                          'https://www.youtube.com/watch?v=',
                          ''
                        )}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}

                  {/* Blog Content */}
                  <div
                    id="blog-content"
                    className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-[#2591b2] prose-img:rounded-lg"
                    dangerouslySetInnerHTML={{ __html: processedContent }}
                  />

                  {/* Last Updated */}
                  {data.updated_date && (
                    <LastUpdated
                      date={data.updated_date}
                      className="mt-6 text-right"
                    />
                  )}

                  {/* Tags */}
                  {data.tags && typeof data.tags === 'string' && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h3 className="text-sm font-medium text-gray-500 mb-3">
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {data.tags
                          .split(',')
                          .map((tag: string, index: number) => (
                            <Link
                              key={`${tag}-${index}`}
                              href={`/blogs?tag=${encodeURIComponent(tag.trim())}`}
                              className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                            >
                              {tag.trim()}
                            </Link>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Social Share and Print */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex flex-wrap justify-between items-center">
                      <SocialShare
                        url={`https://technicalsewa.com/blog/${slug}`}
                        title={data.blog_name}
                      />
                      <PrintButton className="mt-4 sm:mt-0" />
                    </div>
                  </div>
                </div>
              </article>

              {/* Author Bio */}
              {data.author_name && (
                <AuthorBio name={data.author_name} className="mt-8" />
              )}

              {/* Call to Action */}
              <BlogCTA
                title={`Need Professional ${data.category_name || 'Technical'} Services?`}
                description="Our expert technicians are ready to assist you with all your technical needs. Contact us today for a free consultation."
                className="mt-8"
              />

              {/* Related Articles */}
              {relatedBlogs.length > 0 && (
                <RelatedArticles
                  articles={relatedBlogs}
                  currentArticleId={data.id}
                  className="mt-8"
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3 space-y-6">
              {/* Table of Contents - Mobile */}
              <div className="md:hidden">
                <TableOfContents contentSelector="#blog-content" />
              </div>

              {/* Categories */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-[#2591b2]/20">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Bookmark className="mr-2 text-[#2591b2]" /> Categories
                </h2>
                <BlogCategorylist categories={trainingCategories} />
              </div>

              {/* Sticky CTA */}
              <div className="bg-[#2591b2] text-white rounded-xl shadow-sm p-6 sticky top-24">
                <h3 className="text-xl font-bold text-white mb-3">
                  Need Professional Help?
                </h3>
                <p className="mb-4 text-white">
                  Our experts are ready to assist you with any technical issues.
                </p>
                <Link
                  href="/service"
                  className="block w-full bg-white text-[#2591b2] text-center font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Explore Our Services
                </Link>
              </div>
            </div>
          </div>

          {/* Recommended Services Section */}
          <RecommendedServices
            title="Popular Services"
            limit={6}
            className="mt-12"
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; blogId?: string }>;
}): Promise<Metadata> {
  // Await the params object to properly access its properties
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || '';
  const blogId = resolvedParams?.blogId || '';

  // Fetch blog data to get title and description
  let blogData = null;
  try {
    if (slug) {
      blogData = await getBlogDataById(slug);
    }
  } catch (error) {
    console.error('Error fetching blog data for metadata:', error);
  }

  const data = blogData?.[0] || blogData;

  // Fetch SEO data for the page
  const seoData = await getSEOByPageURL(`/blogs/${slug}/${blogId}`);
  const seoExists = seoData?.content && !Array.isArray(seoData?.content);
  const seoContent = seoData?.content;

  // If we have SEO data, use it
  if (seoExists) {
    return {
      title: seoContent?.page_title || 'Blog | Technical Sewa',
      description: seoContent?.description,
      keywords: seoContent?.key_words,
      openGraph: {
        title: seoContent?.page_title || 'Blog | Technical Sewa',
        description: seoContent?.description,
        url: `https://technicalsewa.com/blog/${slug}`,
        type: 'article',
        publishedTime: data?.created_date,
        modifiedTime: data?.updated_date,
        authors: data?.author_name
          ? [`${data.author_name}`]
          : ['Technical Sewa'],
        images: [
          {
            url:
              data?.filename ||
              'https://technicalsewa.com/assets/ts-final-logo.png',
            width: 1200,
            height: 630,
            alt: data?.blog_name || 'Technical Sewa Blog',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: seoContent?.page_title || 'Blog | Technical Sewa',
        description: seoContent?.description,
        images: [
          data?.filename ||
            'https://technicalsewa.com/assets/ts-final-logo.png',
        ],
      },
    };
  }

  // If no SEO data but we have blog data, create metadata from blog data
  if (data && !data.error) {
    return {
      title: `${data.blog_name} | Technical Sewa Blog`,
      description:
        data.meta_description ||
        `Read about ${data.blog_name} on Technical Sewa's blog.`,
      openGraph: {
        title: `${data.blog_name} | Technical Sewa Blog`,
        description:
          data.meta_description ||
          `Read about ${data.blog_name} on Technical Sewa's blog.`,
        url: `https://technicalsewa.com/blog/${slug}`,
        type: 'article',
        publishedTime: data.created_date,
        modifiedTime: data.updated_date,
        authors: data.author_name
          ? [`${data.author_name}`]
          : ['Technical Sewa'],
        images: [
          {
            url:
              data.filename ||
              'https://technicalsewa.com/assets/ts-final-logo.png',
            width: 1200,
            height: 630,
            alt: data.blog_name,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${data.blog_name} | Technical Sewa Blog`,
        description:
          data.meta_description ||
          `Read about ${data.blog_name} on Technical Sewa's blog.`,
        images: [
          data.filename || 'https://technicalsewa.com/assets/ts-final-logo.png',
        ],
      },
    };
  }

  // Fallback metadata
  return {
    title: 'Blog | Technical Sewa',
    description:
      'Read the latest articles and guides from Technical Sewa experts.',
  };
}
