"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const BlogCategorylist = ({ categories = [] }: { categories: string[] }) => {
  const handleCatClick = (id: any) => {
    window.location.href = `/blogs/category/${id}`;
  };
  return (
    <div>
      {categories.map((cat: any, index: number) => (
        <Link
          
          // onClick={() => handleCatClick(cat?.value)}
          // href={`/blogs/${cat.text
          //   ?.replaceAll(" ", "-")
          //   .toLowerCase()}
          //   /${cat?.value}`}
          href={`/blogs/${cat?.text
            ?.toLowerCase().trim()
            .replace(/[^a-zA-Z0-9-\s]/g, "") // Replace special characters with -
            .replace(/\s+/g, "-")}`}
          key={index}
          className="cursor-pointer hover:text-primary hover:font-semibold flex  items-center justify-between py-1 border-b-[1px] border-solid border-[#3d4145]"
        >
          <h3 className=" text-[base]">{cat?.text}</h3>
          {/* <div className="rounded-full hover:bg-primary bg-gray-400 w-[30px] h-[30px] flex items-center justify-center">
              <h3 className="text-center">{cat.number}</h3>
            </div> */}
        </Link>
      ))}
    </div>
  );
};

export default BlogCategorylist;
