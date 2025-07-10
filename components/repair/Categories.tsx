'use client';
import React, { useEffect, useState, useMemo } from 'react';
import CategoryCard from './CategoryCard';
import axios from 'axios';
import { normalizeImageUrl } from '@/utils/imageUtils';
// import { fetchServerClient } from "@/lib/api";

const Categories = ({ allBrands }: any) => {
  const [data, setData] = useState<any[]>([]);
  const [brands, setBrands] = useState(allBrands);
  const [loading, setLoading] = useState(true);

  // Memoized fallback categories data
  const fallbackCategories = useMemo(
    () => [
      {
        brand_id: '1',
        brand_name: 'Popular Brand Repairs',
        image_url:
          'https://crm.technicalsewa.com/techsewa/uploads/brands_image/Popular_Brand_Repairs_761.png',
        alt2: 'Popular Brand Repairs',
      },
      {
        brand_id: '2',
        brand_name: 'Appliances Repairs',
        image_url:
          'https://crm.technicalsewa.com/techsewa/uploads/brands_image/Appliances_Repairs_762.png',
        alt2: 'Appliances Repairs',
      },
      {
        brand_id: '3',
        brand_name: 'Mobile & Tabs Repair',
        image_url:
          'https://crm.technicalsewa.com/techsewa/uploads/brands_image/Mobile_Tabs_Repair_763.png',
        alt2: 'Mobile & Tabs Repair',
      },
      {
        brand_id: '4',
        brand_name: 'CCTV Repair Sewa',
        image_url:
          'https://crm.technicalsewa.com/techsewa/uploads/brands_image/CCTV_Repair_Sewa_764.png',
        alt2: 'CCTV Repair Sewa',
      },
      {
        brand_id: '5',
        brand_name: 'Medical Equipment Repair',
        image_url:
          'https://crm.technicalsewa.com/techsewa/uploads/brands_image/Medical_Equipment_Repair_765.png',
        alt2: 'Medical Equipment Repair',
      },
      {
        brand_id: '6',
        brand_name: 'Purifiers Repair',
        image_url:
          'https://crm.technicalsewa.com/techsewa/uploads/brands_image/Purifiers_Repair_766.png',
        alt2: 'Purifiers Repair',
      },
    ],
    []
  );

  // Memoized filtered data
  const filteredData = useMemo(() => {
    return data.filter((category: any) => category.image_url !== null);
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      if (data.length > 0) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          'https://crm.technicalsewa.com/techsewa/masterconfig/publicmasterconfig/getServiceList',
          { timeout: 10000 }
        );

        if (res?.data?.brands) {
          const filteredData = res?.data?.brands.filter(
            (b: any) => b?.brand_id !== '78'
          );
          setData(filteredData);
        } else {
          console.log('No categories data received, using fallback');
          setData(fallbackCategories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        console.log('Using fallback categories data');
        setData(fallbackCategories);
      } finally {
        setLoading(false);
      }
    };

    const fetchBrands = async () => {
      if (!brands && allBrands === undefined) {
        try {
          const response = await axios.get(
            `https://crm.technicalsewa.com/techsewa/masterconfig/publicmasterconfig/getSliderListpop1`,
            { timeout: 10000 }
          );

          if (response?.data?.brands) {
            const result = response?.data;
            const fetchNewBrands = result?.brands;
            fetchNewBrands?.sort(
              (a: any, b: any) => +a?.ordering - +b?.ordering
            );
            setBrands(fetchNewBrands);
          } else {
            console.log('No brands data received');
            setBrands([]);
          }
        } catch (error) {
          console.error('Error fetching brands:', error);
          setBrands([]);
        }
      }
    };

    fetchData();
    fetchBrands();
  }, [brands, allBrands, data.length, fallbackCategories]);

  // Loading state
  if (loading) {
    return (
      <div className="professional-services-compact">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Loading Title */}
          <div className="text-center mb-4">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-1 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-24 h-6 bg-gray-200 rounded-full animate-pulse mx-4"></div>
              <div className="w-8 h-1 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="w-80 h-6 bg-gray-200 rounded-lg mx-auto animate-pulse mb-2"></div>
            <div className="w-96 h-4 bg-gray-200 rounded-lg mx-auto animate-pulse"></div>
          </div>

          {/* Square Loading Cards */}
          <div className="professional-services-grid">
            {[...Array(16)].map((_, index) => (
              <div key={index} className="professional-service-loading">
                <div className="w-[30px] h-[30px] md:w-[35px] md:h-[35px] bg-gray-300 rounded-full mx-auto mb-1"></div>
                <div className="w-10 h-2 bg-gray-300 rounded mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="professional-services-compact component-spacer-large relative overflow-x-hidden bg-gradient-to-b from-yellow-50 via-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 relative z-10">
        {/* Compact Section Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-3">
            <div className="h-0.5 w-8 bg-primary rounded-full"></div>
            <span className="px-4 text-sm text-primary font-medium uppercase tracking-wide">
              Our Services
            </span>
            <div className="h-0.5 w-8 bg-primary rounded-full"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary text-center mb-8">
            Professional Repair Services
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Expert technicians, genuine parts, and reliable solutions for all
            your devices.
          </p>
        </div>

        {/* Responsive Categories Grid: 2 on xs, 3 on sm, 4 on md+ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-6 w-full">
          {filteredData.map((category: any, index: number) => (
            <div key={`${category.brand_id}-${index}`} className="w-full">
              <CategoryCard
                id={category.brand_id}
                allBrands={brands}
                imageUrl={normalizeImageUrl(category?.image_url)}
                brandName={category.brand_name}
                imgAlt={
                  category?.imageUrl || category.alt2 || category.brand_name
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;

// import React from "react";
// import CategoryCard from "./CategoryCard";
// import axios from "axios";
// import { fetchServerClient } from "@/lib/api";

// const Categories = async ({ allBrands }: any) => {

//   const data = await axios
//   .get(
//     "https://www.technicalsewa.com/techsewa/masterconfig/publicmasterconfig/getServiceList"
//   )
//   .then((res) => {
//     //set others brands and removing E-Commerce since it doesn't have image associated with it.
//     return res?.data?.brands.filter((b: any) => b?.brand_id !== "78");
//   });

//   // fetch allBrands.
//   if (allBrands === undefined) {
//     const result = await fetchServerClient(
//       `techsewa/masterconfig/publicmasterconfig/getSliderListpop1`
//     );
//     let fetchNewBrands = result?.brands;

//     // allBrands?.sort((a: any, b: any) => +a?.brand_id - +b?.brand_id);
//     fetchNewBrands?.sort((a: any, b: any) => +a?.ordering - +b?.ordering);
//     allBrands = fetchNewBrands;
//   }

//   return (
//     <div className="pt-[40px] pb-[40px]  flex justify-around md:justify-center items-center flex-wrap  ">
//       <div className="lg:!container md:max-w-[1140px] mx-auto flex justify-around items-center flex-wrap gap-5 md:gap-4 rightbordre">
//         {data
//           ?.filter((category: any) => category.image_url !== null)
//           .map((category: any) => (
//             <CategoryCard
//               id={category.brand_id}
//               allBrands={allBrands}
//               key={category?.imageUrl}
//               imageUrl={category?.image_url?.replace(
//                 "https://www.technicalsewa.com/multiservice/",
//                 "https://www.technicalsewa.com/techsewa/"
//               )}
//               brandName={category.brand_name}
//               imgAlt={
//                 category?.imageUrl || category.alt2 || category.brand_name
//               }
//             />
//           ))}
//       </div>
//     </div>
//   );
// };

// export default Categories;
