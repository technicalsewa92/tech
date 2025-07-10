import BlogCategorylist from '@/components/BlogCategorylist';
import Nav from '@/components/Nav';
import Footer from '@/components/footer/Footer';
import BlogCard from '@/components/pageHelperComponents.js/BlogCard';
import {
  getBlogsByCategoryId,
  getSEOByPageURL,
  getTrainingCategoriesData,
} from '@/lib/api';
import Image from 'next/image';
import React from 'react';
import { GiGloves } from 'react-icons/gi';
import { ImPhone } from 'react-icons/im';
import { MdMasks, MdSanitizer } from 'react-icons/md';
import { URLSearchParams } from 'url';

const BlogsByCategoriesPage = async ({ params }: any) => {
  const { category_name } = await params;
  const categoryId = category_name;

  let blogs = [];
  let trainingCategories = [];

  try {
    blogs = await getBlogsByCategoryId(categoryId);
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }

  try {
    trainingCategories = await getTrainingCategoriesData();
  } catch (error) {
    console.error('Error fetching training categories:', error);
  }

  // Ensure blogs is an array
  if (!Array.isArray(blogs)) {
    blogs = [];
  }

  return (
    <>
      <div className="bg-[#FBFBFB] py-2 px-2 md:px-0">
        <div className="container mx-auto xl:w-[80rem] sm:w-full sm-w-full m-auto">
          <h1 className="text-[25px] md:text-[35px] text-black my-[10px] text-left font-bold">
            {category_name} - Blogs
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Expert insights and guides about {category_name}
          </p>
          <div className="flex flex-wrap md:justify-between">
            <div className="w-full md:basis-[78%]">
              <div className="grid gap-4 md:grid-cols-1">
                {blogs.map((blog: any, i: number) => (
                  <BlogCard key={i} blog={blog} />
                ))}
                {blogs?.length < 1 && (
                  <h3>No any blogs available for requested category!</h3>
                )}
              </div>
            </div>
            <div className="w-full md:basis-[19%] py-12 px-10 rounded-[10px] border-[2px] border-gray-200 text-[#3d4145] font-normal">
              <h2 className="text-[24px] leading-[29px] pb-3">CATEGORIES</h2>
              <BlogCategorylist categories={trainingCategories} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogsByCategoriesPage;

export async function generateMetadata({ params }: any) {
  const { category_name, id } = await params;
  const category = category_name;
  const slug = id;

  // fetch seo data for page based on slug
  const seoData = await getSEOByPageURL(`/blogs/${category}/${slug}`);

  const seoExists = seoData?.content && !Array.isArray(seoData?.content);

  const seoContent = seoData?.content;

  if (seoExists) {
    return {
      title: `${
        seoExists ? seoContent?.page_title : 'Blogs | Technical sewa'
      } `,
      description: `${seoContent?.description}`,
      keywords: `${seoContent?.key_words}`,
      openGraph: {
        title: `${
          seoExists ? seoContent?.og_title : 'Blogs | Technical sewa'
        } `,
        // ...(seoContent?.og_type ? {type: seoContent?.og_type}:{}),
        type: 'website',
        description: `${seoContent?.og_desc} `,
        url: seoContent?.og_url,
      },
    };
  }

  return {
    title: `${category} - Blogs | Technical sewa`,
  };
}
