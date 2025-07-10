import Nav from '@/components/Nav';
import Footer from '@/components/footer/Footer';
import LinkButton from '@/components/pageHelperComponents.js/PartPurjaLinkButton';
import { fetchServerClient, getSEOByPageURL } from '@/lib/api';
import Link from 'next/link';
import { createSanitizedHtml } from '../../utils/htmlSanitizer';
import RecommendedServicesServer from '@/components/RecommendedServicesServer';
import ReviewsDisplay from '@/components/ReviewsDisplay';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const page = async () => {
  let partpurjadata: any[] = [];

  try {
    const data = await fetchServerClient(
      '/techsewa/publiccontrol/publicmasterconfig/getfeaturedDetails'
    );

    if (Array.isArray(data)) {
      partpurjadata = data;
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // console.log(
      //   'Part Purja data unavailable:',
      //   error instanceof Error ? error.message : 'Unknown error'
      // );
    }
    // partpurjadata already has fallback (empty array)
  }

  return (
    <>
      <div className=" pt-[20px] pb-[40px] max-w-[1280px] mx-auto overflow-hidden ">
        {/* Page Title and Option div */}
        <div className="flex justify-between items-center border-b-[1px] pb-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-[32px] leading-9">Part Purja</h1>
            <p className="text-[14px]">
              Find genuine spare parts and components for your appliances
            </p>
            <p className="text-[12px] text-gray-500">
              {/* page number */}
              Showing available parts
            </p>
          </div>

          <select
            name=""
            id=""
            className="shadow-sm outline-none text-[14px] border-[1px] border-gray-200 p-4"
          >
            <option className="" value="">
              Default Sorting
            </option>
            <option value="">Ascending</option>
            <option value="">Descending</option>
            <option value="">Default</option>
          </select>
        </div>

        {/* card */}

        <div className="flex relative flex-wrap gap-14 justify-center pt-10">
          {partpurjadata?.map((s: any, index: any) => (
            <Link
              key={index}
              href={{
                pathname: `/partpurja/${s.page_url?.replace(/ /g, '-')}`,
              }}
            >
              <LinkButton data={s} />
              <div
                key={index}
                className=" w-[250px] h-[380px] md:w-[200px] flex flex-col gap-4 border-[1px] rounded-md p-1 hover:border-[#ed1b26] hover:border-[1px]"
              >
                <ImageWithFallback
                  className="mix-blend-multiply h-[50%] md:h-[45%] border-[1px] rounded-t-md p-4"
                  src={s.filename}
                  alt={s.features}
                  width={200}
                  height={171}
                />
                <div className="flex flex-col gap-4 p-2">
                  <div className=" bg-[#e8ebf4] text-[#3293b2] rounded-full text-[10px] font-bold text-center py-4">
                    {s.features}
                  </div>
                  <div
                    dangerouslySetInnerHTML={createSanitizedHtml(s.blog_name)}
                    className="text-[12px] font-bold"
                  ></div>
                </div>
                <div className="flex justify-between px-2">
                  <p className="text-[#3293b2] text-[14px] font-bold">
                    {s.our_rate}
                  </p>
                  <p className="text-[#ed1b26] text-[10px] line-through">
                    {s.market_rate}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Google Business Reviews Section */}
        <div className="mt-16 mb-12">
          <ReviewsDisplay
            limit={3}
            showStats={false}
            title="What Our Customers Say About Our Parts"
            layout="grid"
            className=""
          />
        </div>

        {/* Recommended Services Section */}
        <div className="mt-16">
          <RecommendedServicesServer
            title="Related Services"
            limit={6}
            className="bg-gray-50 rounded-lg p-8"
          />
        </div>
      </div>
    </>
  );
};

export default page;

export async function generateMetadata() {
  let seoData = null;

  try {
    seoData = await getSEOByPageURL(`partpurja`);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // console.log(
      //   'SEO data unavailable for partpurja page:',
      //   error instanceof Error ? error.message : 'Unknown error'
      // );
    }
  }

  const seoExists = seoData?.content && !Array.isArray(seoData?.content);
  const seoContent = seoData?.content;

  if (seoExists) {
    return {
      title: `${
        seoExists ? seoContent?.page_title : 'PartPurja | Technical sewa'
      } `,
      description: `${seoContent?.description}`,
      keywords: `${seoContent?.key_words}`,
      openGraph: {
        title: `${
          seoExists ? seoContent?.page_title : 'PartPurja | Technical sewa'
        } `,
        description: `${seoContent?.description} `,
        url: seoContent?.page_url,
        type: 'website',
      },
    };
  }
  return {
    title: `PartPurja | Technical sewa`,
    description: 'Find genuine spare parts and components for your appliances.',
  };
}
