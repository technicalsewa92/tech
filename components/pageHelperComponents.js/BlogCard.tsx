'use client';
import Link from 'next/link';
import React from 'react';
import { generateBlogSlug } from '@/lib/api';
import { createSanitizedHtml } from '../../utils/htmlSanitizer';
import { ImageWithFallback } from '@/components/ui';

const BlogCard = ({ blog }: any) => {
  const finalSlug = generateBlogSlug(blog);
  return (
    //     <div className='flex gap-4 rounded-[10px] border-[2px] border-gray-200 p-4'>
    //         <div className='basis-[10%] dark:text-black font-bold'>
    //             {blog.created_ts}
    //         </div>
    //         <div className='basis-[90%]'>
    //             <h3 className='dark:text-black font-bold text-[20px] mb-3 '>
    //                 {blog.blog_name}
    //             </h3>
    //             <div className='flex gap-4'>
    //                 <div className='basis-[40%] h-[150px]'>
    //                     <img className='object-cover w-full h-full' src={blog.filename.replace(
    //                     "https://www.technicalsewa.com/multiservice/",
    //                     "https://www.technicalsewa.com/multiservice/test/")} />
    //                 </div>

    //                 <div className='basis-[60%] gap-2'>
    //                     <div className='h-[100px] overflow-hidden' dangerouslySetInnerHTML={{__html:blog.blog_desc.split('\n')[0]}} ></div>
    //                     <Link href={`blogs/${blog.blog_name}`}> <button  className='p-3 text-white bg-black rounded'>Readmore</button> </Link>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    <>
      <div className="flex flex-wrap gap-2 md:gap-0 md:justify-between rounded-[10px] border-[2px] border-gray-200 p-4">
        <div className="w-full md:basis-[40%]  h-[180px] hover:opacity-95 order-2 md:order-1">
          <Link href={`/blog/${finalSlug}`} className="w-full h-full">
            <ImageWithFallback
              className="object-contain w-full h-full"
              src={blog?.filename?.replace(
                'https://www.technicalsewa.com/multiservice/',
                'https://www.technicalsewa.com/multiservice/test/'
              )}
              alt={blog?.title || 'Blog image'}
              width={500}
              height={180}
            />
          </Link>
        </div>

        <div className="w-full md:basis-[54%] order-1 md:order-2">
          <Link href={`/blog/${finalSlug}`}>
            <div className="md:pb-[3px] text-gray-500 font-bold">
              {blog?.created_ts}
            </div>
            <h2 className="hover:text-primary font-bold text-[19px] md:text-[25px] mb-2 line-clamp-2">
              {blog?.blog_name}
            </h2>
          </Link>

          <div className="mt-4 md:mt-6 text-black font-normal">
            <div
              className="overflow-hidden"
              dangerouslySetInnerHTML={createSanitizedHtml(blog?.short_content)}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BlogCard;
