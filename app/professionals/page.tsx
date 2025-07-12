import Nav from '@/components/Nav';
import ProfessionalsCardButton from '@/components/ProfessionalsCardButton';
import Footer from '@/components/footer/Footer';
import RecommendedServices from '@/components/RecommendedServices';
import ReviewsDisplay from '@/components/ReviewsDisplay';
import { fetchServerClient, getSEOByPageURL } from '@/lib/api';
import Link from 'next/link';
import React from 'react';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { RiLayoutGridFill } from 'react-icons/ri';
import { TfiLayoutColumn3Alt } from 'react-icons/tfi';
import ProfessionDetails from './ProfessionDetails';

// professionals page
const page = async () => {
  let professionalsData = [];

  try {
    const data = await fetchServerClient(
      '/techsewa/publiccontrol/getTechnicianProfilePublic'
    );

    if (Array.isArray(data)) {
      // Use JSON.parse(JSON.stringify()) to ensure the data is fully serializable
      professionalsData = JSON.parse(JSON.stringify(data));
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        'Professionals data unavailable:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
    // professionalsData already has fallback (empty array)
  }
  return (
    <>
      <div className="pt-[20px] pb-[79px] max-w-[1280px] mx-auto flex flex-col items-center justify-center">
        <div className="px-2 md:p-0 w-full">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Our Professionals
            </h1>
            <p className="text-lg text-gray-600">
              Connect with certified technicians and service professionals
            </p>
          </div>

          {/* Professionals Content */}
          <ProfessionDetails professionalsData={professionalsData} />
        </div>

        {/* Customer Reviews Section */}
        <div className="py-16 bg-white-100">
          <div className="max-w-[1280px] mx-auto px-4">
            <ReviewsDisplay
              limit={3}
              showStats={false}
              title="What Customers Say About Our Professionals"
              layout="grid"
              className=""
            />
          </div>
        </div>

        {/* Recommended Services Section */}
        <RecommendedServices
          title="Professional Services We Offer"
          limit={8}
          className="w-full"
        />

        {/* download app section  */}
        <div className="bg-[#fbfcfe] py-10">
          <div className="flex flex-col gap-4 justify-center items-center md:flex-row">
            <div className="flex flex-col flex-1 gap-4">
              <p className="md:text-[32px] text-[18px] text-[#a6adbb] font-semibold text-center md:text-left">
                Download our App
              </p>
              <p className="text-[14px] md:text-[27px]">
                Enter mobile number to get APP download Link
              </p>
            </div>

            {/* input and send button  */}
            <div className="flex flex-1 px-2 md:p-0">
              <input
                className="w-full border-[2px]  rounded-l-md p-3 md:p-4 outline-none text-[14px]"
                type="text"
                placeholder="Type your mobile number"
              />
              <button className="px-6 text-white rounded-r-md bg-primary md:px-10 md:py-4">
                SEND
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

export async function generateMetadata() {
  let seoData = null;

  try {
    seoData = await getSEOByPageURL(`/professionals`);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        'SEO data unavailable for professionals page:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  const seoExists = seoData?.content && !Array.isArray(seoData?.content);
  const seoContent = seoData?.content;

  if (seoExists) {
    return {
      title: `${seoExists ? seoContent?.page_title : 'Professionals | Technical sewa'} `,
      description: `${seoContent?.description}`,
      keywords: `${seoContent?.key_words}`,
      openGraph: {
        title: `${seoExists ? seoContent?.page_title : 'Professionals | Technical sewa'} `,
        description: `${seoContent?.description} `,
        url: seoContent?.page_url,
        type: 'website',
      },
    };
  }
  return {
    title: `Professionals | Technical sewa`,
    description:
      'Find qualified professionals for appliance repair and maintenance services.',
  };
}
