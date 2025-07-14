import React from 'react';
import { fetchServerClient } from '@/lib/api';
import HeroSection from '@/components/HeroSection';
import Categories from '@/components/repair/Categories';
import ServicesSLiders from './home/servicesSliders';
import dynamic from 'next/dynamic';

// Loading component - defined before dynamic imports
const LoadingSection = ({ height = 'h-48' }: { height?: string }) => (
  <div
    className={`w-full ${height} bg-gray-200 animate-pulse rounded-lg mb-4`}
  />
);

// Error wrapper component for Server Components
const SafeComponentWrapper = ({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) => {
  try {
    return <div>{children}</div>;
  } catch (error) {
    console.warn('Component failed to render, using fallback:', error);
    return <div>{fallback}</div>;
  }
};

// Dynamic imports with proper error handling
const Number = dynamic(() => import('@/components/Number'), {
  loading: () => <LoadingSection height="h-32" />,
  ssr: true,
});

const FooterContact = dynamic(
  () => import('@/components/footer/FooterContact'),
  {
    loading: () => <LoadingSection height="h-48" />,
    ssr: true,
  }
);

const MidContent2 = dynamic(() => import('./home/MidContent2'), {
  loading: () => <LoadingSection height="h-48" />,
  ssr: true,
});

const ClientsSlider = dynamic(() => import('./home/clients'), {
  loading: () => <LoadingSection height="h-32" />,
  ssr: true,
});

const ReviewsDisplay = dynamic(() => import('@/components/ReviewsDisplay'), {
  loading: () => <LoadingSection height="h-96" />,
  ssr: true,
});

let cachedResult: any = null;

async function fetchBrandsData() {
  if (!cachedResult) {
    try {
      // Fetch the data if it's not cached - use consistent URL
      const result = await fetchServerClient(
        `techsewa/masterconfig/publicmasterconfig/getSliderListpop1`
      );

      if (!result || !result.brands) {
        console.log('No brands data received, using fallback');
        cachedResult = {
          allBrands: getFallbackBrands(),
          brands: getFallbackBrandsList(),
        };
        return cachedResult;
      }

      const allBrands = result?.brands || [];

      allBrands?.sort((a: any, b: any) => +a?.ordering - +b?.ordering);

      const brands: { [key: string]: any }[] = [];
      allBrands.forEach((b: any) => {
        const brandExists =
          brands.findIndex(i => i?.id === +b?.brand_id) !== -1;
        if (!brandExists) {
          brands.push({
            id: +b?.brand_id,
            name: b?.brand_name,
            order: +(b?.ordering || 0),
          });
        }
      });

      brands?.sort((a: any, b: any) => a?.order - b?.order);

      // Store the result in cache
      cachedResult = { allBrands, brands };
    } catch (error) {
      console.error('Failed to fetch brands data:', error);
      // Return fallback data
      cachedResult = {
        allBrands: getFallbackBrands(),
        brands: getFallbackBrandsList(),
      };
    }
  }
  return cachedResult;
}

// Fallback data functions
function getFallbackBrands() {
  return [
    // Banner items
    {
      brand_id: 'banner1',
      brand_name: 'Technical Sewa - Professional Repair Services',
      product_name: 'Professional Repair Services',
      url_product_name: 'repair-services',
      image_url:
        'https://crm.technicalsewa.com/techsewa/uploads/brands_image/Website_slider_75.webp',
      image_type: 'banner',
      ordering: '1',
    },
    {
      brand_id: 'banner2',
      brand_name: 'Technical Sewa - Home Appliance Repairs',
      product_name: 'Home Appliance Repairs',
      url_product_name: 'home-appliance-repairs',
      image_url:
        'https://crm.technicalsewa.com/techsewa/uploads/brands_image/home_appliance_banner.webp',
      image_type: 'banner',
      ordering: '2',
    },
    {
      brand_id: 'banner3',
      brand_name: 'Technical Sewa - Mobile & Electronics Repair',
      product_name: 'Mobile & Electronics Repair',
      url_product_name: 'mobile-electronics-repair',
      image_url:
        'https://crm.technicalsewa.com/techsewa/uploads/brands_image/mobile_repair_banner.webp',
      image_type: 'banner',
      ordering: '3',
    },
    // Brand items
    {
      brand_id: '1',
      brand_name: 'Samsung',
      product_name: 'Samsung Repairs',
      url_product_name: 'samsung',
      image_url:
        'https://crm.technicalsewa.com/techsewa/uploads/brands_image/samsung.png',
      image_type: 'brand',
      ordering: '1',
    },
    {
      brand_id: '2',
      brand_name: 'LG',
      product_name: 'LG Repairs',
      url_product_name: 'lg',
      image_url:
        'https://crm.technicalsewa.com/techsewa/uploads/brands_image/lg.png',
      image_type: 'brand',
      ordering: '2',
    },
    {
      brand_id: '3',
      brand_name: 'Sony',
      product_name: 'Sony Repairs',
      url_product_name: 'sony',
      image_url:
        'https://crm.technicalsewa.com/techsewa/uploads/brands_image/sony.png',
      image_type: 'brand',
      ordering: '3',
    },
    {
      brand_id: '4',
      brand_name: 'Panasonic',
      product_name: 'Panasonic Repairs',
      url_product_name: 'panasonic',
      image_url:
        'https://crm.technicalsewa.com/techsewa/uploads/brands_image/panasonic.png',
      image_type: 'brand',
      ordering: '4',
    },
    {
      brand_id: '5',
      brand_name: 'Professional Services',
      product_name: 'Professional Services',
      url_product_name: 'professional-services',
      image_url:
        'https://crm.technicalsewa.com/techsewa/uploads/brands_image/Website_slider_75.webp',
      image_type: 'banner',
      ordering: '1',
    },
  ];
}

function getFallbackBrandsList() {
  return [
    { id: 1, name: 'Samsung', order: 1 },
    { id: 2, name: 'LG', order: 2 },
    { id: 3, name: 'Sony', order: 3 },
    { id: 4, name: 'Panasonic', order: 4 },
  ];
}

export default async function NewFeature() {
  // Fetch brands data with proper error handling
  const { allBrands, brands } = await fetchBrandsData();

  // Ensure we have valid data - add safety checks
  const safeAllBrands = Array.isArray(allBrands)
    ? allBrands
    : getFallbackBrands();
  const safeBrands = Array.isArray(brands) ? brands : getFallbackBrandsList();

  // getConfiglist with error handling
  let configlist = null;
  try {
    const result = await fetchServerClient(
      `techsewa/masterconfig/publicmasterconfig/getConfigList`
    );

    if (result && result.brands) {
      configlist = result;
    } else {
      console.log('No config data received, using fallback');
      configlist = {
        brands: getFallbackBrands(),
      };
    }
  } catch (error) {
    console.error('Failed to fetch config list:', error);
    configlist = {
      brands: getFallbackBrands(),
    };
  }

  // Ensure configlist has valid structure
  if (!configlist || !configlist.brands || !Array.isArray(configlist.brands)) {
    configlist = {
      brands: getFallbackBrands(),
    };
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Technical Sewa',
    address: 'Kumaripati, Lalitpur, Near Bluebird Collage, Nepal',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '12',
      reviewCount: '4',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '27.6701114',
      longitude: '85.3198698',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      validFrom: '2022-01-01T00:00:00.000Z',
      validThrough: '2024-01-01T00:00:00.000Z',
      opens: '10:00',
      closes: '19:00',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Sunday',
      ],
    },
    telephone: '9851201580',
    priceRange: '$',
    url: 'www.technicalsewa.com',
  };

  return (
    <div className="space-y-8">
      {/* Hero Section with safe wrapper */}
      <SafeComponentWrapper fallback={<LoadingSection height="h-64" />}>
        <HeroSection data={configlist} allBrands={safeAllBrands} />
      </SafeComponentWrapper>

      {/* Popular Products Grid */}
      <div className="max-w-5xl mx-auto px-4 pb-8">
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-1 w-10 bg-[#2591b2] rounded-full"></div>
            <span className="text-[#2591b2] font-bold text-lg uppercase tracking-wide">
              Popular Services
            </span>
            <div className="h-1 w-10 bg-[#2591b2] rounded-full"></div>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#2591b2] mb-2">
            What Can We Help You With?
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {[
            { name: 'AC Repair', icon: '❄️', link: '/service/air-conditioner' },
            {
              name: 'Washing Machine Repair',
              icon: '🧺',
              link: '/service/washing-machine',
            },
            {
              name: 'Refrigerator Repair',
              icon: '🧊',
              link: '/service/fridge',
            },
            {
              name: 'Microwave Repair',
              icon: '🍲',
              link: '/service/microwave-oven',
            },
            { name: 'LED TV Repair', icon: '📺', link: '/service/lcd-led-tv' },
            {
              name: 'Vacuum Cleaner Repair',
              icon: '🧹',
              link: '/service/vacuum-cleaner',
            },
            { name: 'Geyser', icon: '🚿', link: '/service/geyser' },
            {
              name: 'Water Purifier Repair',
              icon: '💧',
              link: '/service/ro-water-purifier',
            },
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="feature-service-card flex flex-col items-center justify-center bg-[#2591b2]/10 border border-[#2591b2]/30 rounded-xl shadow p-5 hover:bg-[#2591b2]/20 hover:shadow-lg transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-[#2591b2]"
            >
              <div className="text-3xl md:text-4xl mb-2 text-[#2591b2]">
                {item.icon}
              </div>
              <div className="text-base md:text-lg font-semibold text-[#2591b2] text-center">
                {item.name}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Categories with safe wrapper */}
      <SafeComponentWrapper fallback={<LoadingSection height="h-48" />}>
        <Categories allBrands={safeAllBrands} />
      </SafeComponentWrapper>

      {/* Services Sliders with safe wrapper */}
      <SafeComponentWrapper fallback={<LoadingSection height="h-48" />}>
        <ServicesSLiders brands={safeBrands} data={safeAllBrands} />
      </SafeComponentWrapper>

      {/* Number Section with safe wrapper */}
      <SafeComponentWrapper fallback={<LoadingSection height="h-32" />}>
        <Number />
      </SafeComponentWrapper>

      {/* Why Choose Us */}
      {/*
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-0.5 w-8 bg-primary rounded-full"></div>
              <span className="text-primary font-medium text-sm uppercase tracking-wide">
                Why Choose Us
              </span>
              <div className="h-0.5 w-8 bg-primary rounded-full"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary text-center mb-8">
              Trusted by Thousands Across Nepal, Because We Care About Your Safety
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
              Your trust is our priority. We follow strict safety protocols and
              deliver exceptional service quality.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center">
            <div className="flex-1 max-w-lg mx-auto md:mx-0">
              <div className="bg-gray-50 rounded-xl shadow p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-primary mb-4 text-center">
                  Get a Free Quote
                </h3>
                <div className="space-y-4">
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto md:mx-0">
              {Array.from({ length: 4 }, (_, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 text-center"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-3 animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Google Business Reviews Section */}
      <SafeComponentWrapper fallback={<LoadingSection height="h-96" />}>
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ReviewsDisplay
              limit={6}
              showStats={true}
              title="What Our Customers Say"
              layout="grid"
              className=""
            />
          </div>
        </section>
      </SafeComponentWrapper>

      {/* Mid Content removed as per request */}

      {/* Footer Contact with safe wrapper */}
      <SafeComponentWrapper fallback={<LoadingSection height="h-48" />}>
        <FooterContact />
      </SafeComponentWrapper>

      {/* Mid Content 2 with safe wrapper */}
      <SafeComponentWrapper fallback={<LoadingSection height="h-48" />}>
        <MidContent2 />
      </SafeComponentWrapper>

      {/* Clients Slider with safe wrapper */}
      <SafeComponentWrapper fallback={<LoadingSection height="h-32" />}>
        <ClientsSlider clients={configlist} />
      </SafeComponentWrapper>

      {/* Floating WhatsApp and Call Buttons */}
      <div className="fixed z-50 bottom-6 right-4 flex flex-col gap-3 items-end">
        <a
          href="https://wa.me/9779851201580"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-lg text-white text-2xl transition-colors"
          aria-label="WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-7 h-7"
          >
            <path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 5.98L0 24l6.18-1.62A12.13 12.13 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.77 0-3.5-.46-5.02-1.33l-.36-.21-3.67.96.98-3.58-.23-.37A9.94 9.94 0 0 1 2 12C2 6.48 6.48 2 12 2c2.54 0 4.93.99 6.73 2.77A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.41-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.62-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.43 0 1.43 1.03 2.81 1.18 3.01.15.2 2.03 3.1 5.02 4.23.7.24 1.25.38 1.68.48.71.17 1.36.15 1.87.09.57-.07 1.65-.67 1.89-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z" />
          </svg>
        </a>
        <a
          href="tel:9851201580"
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center shadow-lg text-white text-2xl transition-colors"
          aria-label="Call"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-2.25a2.25 2.25 0 0 0-2.25-2.25h-1.125a2.25 2.25 0 0 1-2.25-2.25V9.375a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 9.375v2.25A2.25 2.25 0 0 0 6.75 13.875H7.875a2.25 2.25 0 0 1 2.25 2.25v2.25A2.25 2.25 0 0 0 12.375 20.25H15a2.25 2.25 0 0 0 2.25-2.25v-2.25"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
