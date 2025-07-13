'use client';

import { useEffect, useState } from 'react';
import { createSanitizedHtml } from '../../utils/htmlSanitizer';
import { ImageWithFallback } from '@/components/ui';

const PartPurjaSlug1 = ({ slug, data }: { slug?: string; data?: any }) => {
  return (
    <div className="pt-[20px] pb-[79px] max-w-[1280px] mx-auto  ">
      <div className="sm:w-[60%] w-[80%]  mx-auto border-[2px] border-[#2591b2] rounded-lg flex flex-col gap-2 p-4 md:p-10 text-[14px] text-[#a6adbb] font-bold">
        <ImageWithFallback
          className=" self-center w-[600px] h-[200px] md:h-[400px]"
          src={data?.filename}
          alt={data?.features}
          width={600}
          height={400}
        />
        <div
          className="bg-primary self-center text-center w-[80%] sm:w-auto text-white font-normal rounded-xl px-4 py-2"
          dangerouslySetInnerHTML={createSanitizedHtml(data?.blog_name)}
        ></div>
        <h2>{data?.features}</h2>
        <hr />
        <h2>Market Price: {data?.market_rate}</h2>
        <hr />
        <h3 className="text-primary">Our Offer: {data?.our_rate}</h3>
        <hr />

        <h2>Contact: {data?.contact_info}</h2>
        <hr />

        <h2>Description</h2>
        <div
          className="text-[#ced2d9]"
          dangerouslySetInnerHTML={createSanitizedHtml(data?.blog_desc)}
        ></div>
        <hr />
      </div>
    </div>
  );
};

export default PartPurjaSlug1;
