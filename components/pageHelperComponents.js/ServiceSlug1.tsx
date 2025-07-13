'use client';

import Faqlist from '@/features/service/Faqlist';
import ServiceReviews from '@/features/service/reviews';
import RecommendedServices from '@/components/RecommendedServices';
import { baseUrl } from '@/public/baseUrl';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Star, Phone, ArrowRight } from 'lucide-react';
import { createSanitizedHtml } from '../../utils/htmlSanitizer';

const ServiceSlug1 = ({ data }: any) => {
  //state variable
  // const [data, setData] = useState<any>(null);
  const [selectCategoryData, setSelectCategoryData] = useState<any>();

  const params = useParams(); // getting params from URL
  const router = useRouter();

  // filter data based on URL params and stored to fitlerData vaiables
  const filterData =
    data &&
    data?.filter((val: any) => {
      const slug = Array.isArray(params.slug1) ? params.slug1[0] : params.slug1;
      return val.url_product_name === decodeURIComponent(slug || '');
    });

  // filtering product_id from data
  const filteredId: any = filterData?.map((element: any) => element.product_id);

  // =====data fetched for selectProductCategory====
  const fetchedData1 = async () => {
    const formData = new FormData();
    formData.append('product_id', filteredId);
    const result = await axios.post(
      `${baseUrl}/techsewa/publicControl/GetProductcategiryByProduct`,
      formData
    );
    setSelectCategoryData(result?.data);
  };

  // call fetchData() function once when components renders
  // useEffect(() => {
  //   if (data === null) {
  //     fetchedData();
  //   }
  // }, []);

  useEffect(() => {
    fetchedData1();
  }, [data]);
  // ===============================================

  useMemo(() => {
    if (Array.isArray(filterData) && filterData.length === 0) {
      router.push('/');
      ``;
    }
  }, [filterData]);

  return (
    <div>
      {
        filterData && (
          // filterData.map((val: any) => (
          <div key={filterData[0]?.title}>
            <div className="mb-[20px] overflow-hidden max-md:p-4 flex flex-col gap-4 relative">
              <div
                className="bg-white h-[350px] bg-contain bg-no-repeat bg-center w-full relative py-[20px]"
                style={{
                  backgroundImage: `url(${filterData[0]?.image_url?.replace(
                    'https://www.technicalsewa.com/multiservice/',
                    'https://www.technicalsewa.com/multiservice/test/'
                  )})`,
                  backgroundPosition: 'center top',
                }}
              >
                <div className="absolute top-0 left-0 z-0 w-full h-full bg-black/50"></div>

                {/* banner product description paragraph */}
                <div className="absolute left-0 w-full">
                  <div className=" max-w-[1280px] mx-auto px-[14px] md:px-[2px]">
                    <div className="flex flex-col">
                      <nav className="text-[#cdcecf] font-[600] text-[16px]">
                        {filterData[0]?.brand_name.toLowerCase()} /
                        <span className="text-white font-[600] text-[16px]">
                          {filterData[0]?.product_name.toLowerCase()}
                        </span>
                      </nav>
                      <h1 className="md:w-[66%] text-white leading-[1.2] tracking-[0.5px] md:text-[25px] text-[20px] font-bold">
                        {filterData[0]?.title}
                      </h1>
                    </div>

                    <div className="flex flex-row gap-[10px] mt-4">
                      <div className="h-[40px] bg-[#1D738D] flex itmes-center  text-white py-[5px] px-[15px] rounded-[6px] mt-[5px]">
                        <div className="flex items-center text-[12px] md:text-[14px] lg:text-[16px]">
                          <Star className="" />
                          <p className="pl-[2px] md:pl-[5px] font-semibold">
                            4.65
                          </p>
                          <p className="pl-[2px] md:pl-[5px] mb-[3.5px]">
                            Out of 5
                          </p>
                        </div>
                      </div>
                      <a
                        href="tel:9851201580"
                        className="flex items-center justify-center bg-white gap-[8px] h-[40px] w-[160px] border border-[#2591B2] rounded-[6px] text-[#1D738D] mt-[5px] text-[12px] md:text-[14px] lg:text-[16px]"
                      >
                        <Phone className="text-primary " />
                        9851201580
                      </a>
                    </div>

                    <div className="  flex flex-col mt-[11px] md:mt-[20px]  md:gap-[14px] ">
                      <div className="flex gap-2 items-center">
                        <div className="flex gap-2 items-center">
                          <div
                            className="flex pb-4 text-white text-justify flex-col gap-1 md:gap-3 text-[12px] md:text-[14px] listpoint"
                            dangerouslySetInnerHTML={createSanitizedHtml(
                              filterData[0]?.product_desc
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* side select product category  */}
              <div className="w-[30%] lg:px-4 z-40 lg:absolute top-5 right-[5%]">
                <div className="bg-primary rounded-md shadow-md w-[340px] md:w-[355px] p-4">
                  <div className="text-white mb-4 text-[22px] font-medium text-center">
                    Select product Category
                  </div>
                  <div className="flex flex-col gap-2 justify-center items-center px-2">
                    {selectCategoryData?.map((val: any) => (
                      <a
                        href={`/service/${params.slug1}/${filterData[0].model}`}
                        key={val.text}
                        className=" hover:bg-gray-500 cursor-pointer flex justify-between items-center px-4 py-[12px] bg-white w-full text-black rounded-md "
                      >
                        {val.text}
                        <ArrowRight />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* description of product paragraph  */}
              <div className="servercontent my-[50px] max-w-[1280px] mx-auto px-[2px]">
                <div
                  className="flex lg:text-justify md:w-[66%] flex-col gap-2 service"
                  dangerouslySetInnerHTML={createSanitizedHtml(
                    filterData[0]?.content
                  )}
                />
              </div>
            </div>

            <div className="section-spacing-large">
              <Faqlist filteredId={filteredId} />
            </div>

            <ServiceReviews productId={filteredId} />

            {/* Recommended Services */}
            <RecommendedServices
              title="Related Services You Might Need"
              limit={8}
              excludeCurrentService={filterData?.[0]?.url_product_name}
              className="section-spacing-large"
            />
          </div>
        )
        // ))
      }
    </div>
  );
};

export default ServiceSlug1;
