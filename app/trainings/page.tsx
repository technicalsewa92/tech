import Categorylist from '@/components/Categorylist';
import Nav from '@/components/Nav';
import Footer from '@/components/footer/Footer';
import RecommendedServices from '@/components/RecommendedServices';
import { getTrainingCategoriesData, getTrainings } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const Page = async () => {
  let trainings = null;
  let trainingCategories = null;

  try {
    trainings = await getTrainings();
  } catch (error) {
    console.error('Error fetching trainings:', error);
  }

  try {
    trainingCategories = await getTrainingCategoriesData();
  } catch (error) {
    console.error('Error fetching training categories:', error);
  }

  // Ensure trainings is an array
  if (!trainings || !Array.isArray(trainings)) {
    trainings = [];
  }

  // Ensure trainingCategories is an array
  if (!trainingCategories || !Array.isArray(trainingCategories)) {
    trainingCategories = [];
  }

  trainings.sort(
    (a: any, b: any) =>
      new Date(b?.created_date || 0).getTime() -
      new Date(a?.created_date || 0).getTime()
  );
  return (
    <>
      <div className="bg-[#FBFBFB] py-4 px-2 md:px-0">
        <div className="container mx-auto xl:w-[80rem] sm:w-full sm-w-full m-auto">
          <h1 className="text-[25px] md:text-[35px] text-black my-[10px] text-left font-bold">
            Training Programs
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Professional technical training courses and certification programs
          </p>
          <div className="flex flex-wrap md:justify-between mb-[36px]">
            <div className="w-full md:basis-[81%]">
              <div className="grid gap-4 md:grid-cols-1">
                {trainings &&
                  trainings.length > 0 &&
                  trainings.map((item: any, i: number) => {
                    // //console.log("item",item.training_title);
                    // const slug = item?.training_title
                    //   ?.toLowerCase().replace(/[|,-]/g,' ').split(" ").filter((p:string) => p.length > 0).join("-")
                    // .replace(/[^a-zA-Z0-9\s]/g, "-") // Replace special characters with -
                    // .replace(/\s+/g, "-");
                    // //console.log("slug", slug);
                    const slug = item?.slug_name;
                    return (
                      <div
                        key={i}
                        className="flex justify-between flex-wrap gap-4 rounded-[10px] border-[2px] border-gray-200 p-4 items-center"
                      >
                        <div className="w-full md:basis-[25%] h-[160px] md:h-[120px] order-2 md:order-1">
                          <Image
                            className="object-cover w-full h-full"
                            src={item?.image_url ?? '/assets/no-image.jpg'}
                            alt={item?.training_title || 'Training image'}
                            width={300}
                            height={160}
                          />
                        </div>
                        <div className="w-full md:basis-[73%] order-1 md:order-2">
                          <a
                            href={`/training/${slug}`}
                            //${item?.training_id}`}
                            className="  font-bold hover:text-primary text-[19px] md:text-[27px] mb-3 h-[40px] "
                          >
                            {item?.training_title}
                          </a>

                          <div className="h-[50px] overflow-hidden text-black font-normal">
                            {item?.short_detail}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                {(!trainings || trainings.length < 1) && (
                  <div className="text-base font-medium">
                    No trainings found
                  </div>
                )}
              </div>
            </div>
            <div className="w-full md:basis-[15%]">
              <div className="py-1 px-4 rounded-[10px] border-[2px] border-gray-200 text-[#3d4145] font-normal">
                <h2 className="text-[24px] leading-[29px] pb-3">CATEGORIES</h2>
                <Categorylist categories={trainingCategories} />
              </div>
            </div>
          </div>

          {/* Recommended Services Section */}
          <RecommendedServices
            title="Related Services"
            limit={6}
            className="mt-8"
          />
        </div>
      </div>
    </>
  );
};

export default Page;

export async function generateMetadata() {
  return {
    title: `Trainings | Technical sewa`,
  };
}
