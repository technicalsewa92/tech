"use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react'
interface ProductDetails {
    display_type: string;
    ordering: string;
    second_ordering: string;
    descp2: string;
    brand_id: string;
    brand_name: string;
    alt: string;
    image_url: string;
    title: string;
    product_id: string;
    url_product_name: string;
    product_name: string;
    alt2: string;
    prod_sec_content: string;
  }
export default function NewSkillDetail({skills,brands,isDetails}:any) {
    const [matchedBrands, setMatchedBrands] = useState<ProductDetails[]>([]);
    const [brandIds, setBrandIds] = useState<string>(skills);
    const filterBrandsByIds = (brandIdsString: string) => {
        const idsArray = brandIdsString.split(","); // Convert string to array
        const matched = brands.filter((brand:any) => idsArray.includes(brand.product_id)); // Find matching brands
        setMatchedBrands(matched);
      };
      useEffect(() => {
        filterBrandsByIds(brandIds??"");
      }, [brandIds, brands]);
  return (
    <div className="flex flex-wrap w-full">
{isDetails===true?<>
  {matchedBrands.map((e,i)=>{
      return  <Link href={`service/${e.url_product_name}`} key={i} className='text-blue-600 hover:underline text-xs px-1 cursor-pointer'>{e.product_name}</Link>
    })}
</>:<>

    </>
}
  </div>
  )
}
