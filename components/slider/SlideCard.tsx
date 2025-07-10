'use client';

import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';
import './no-zoom-on-hover.css';
import { createSanitizedHtml } from '../../utils/htmlSanitizer';

const SlideCard = ({ length, data, top }: any) => {
  const breakpoints = {
    320: {
      slidesPerView: 1.2,
      spaceBetween: 30, // Increased gap between slides on mobile
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 28,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 32,
    },
    1280: {
      slidesPerView: 5,
      spaceBetween: 32,
    },
  };

  const swiperRef = useRef<any>(null);

  const handleMouseEnter = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.start();
    }
  };

  return (
    <Swiper
      ref={swiperRef}
      onSwiper={swiper => (swiperRef.current = swiper)}
      className="service-swiper-compact flex overflow-hidden justify-center items-center px-2 pt-3 pb-8 cursor-pointer"
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      breakpoints={breakpoints}
      resizeObserver
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      modules={[Autoplay, Pagination, Navigation]}
      loop={data?.length > 1}
      grabCursor={true}
    >
      {data?.map((ele: any, index: any) => (
        <SwiperSlide key={index}>
          <div
            className="p-0 m-0"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href={`/service/${ele?.url_product_name}`}
              className="service-card-compact flex flex-col items-stretch p-0 m-0 h-full min-h-[245px] h-[245px] w-[270px] max-w-full border border-[#2591b2]/10 rounded-2xl overflow-hidden bg-white
                sm:min-h-[245px] sm:h-[245px] sm:w-[270px]
                min-h-[170px] h-[170px] w-[170px]"
              style={{
                minWidth: 170,
                maxWidth: 270,
                height: 170,
                flex: '0 0 170px',
                ...(typeof window !== 'undefined' && window.innerWidth >= 640
                  ? {
                      minWidth: 270,
                      height: 245,
                      flex: '0 0 270px',
                    }
                  : {}),
              }}
            >
              <div className="relative w-full h-24 sm:h-36 md:h-40 overflow-hidden rounded-t-2xl flex items-center justify-center">
                <Image
                  height={176}
                  width={240}
                  src={
                    ele?.image_url
                      ? ele.image_url.replace(
                          'https://www.technicalsewa.com/multiservice',
                          'https://www.technicalsewa.com/techsewa'
                        )
                      : '/path-to-default-image.jpg'
                  }
                  alt={ele?.alt || 'Service Image'}
                  className="w-full h-full object-cover no-zoom-on-hover"
                  style={{ transform: 'none', transition: 'none' }}
                  sizes="(max-width: 600px) 90vw, (max-width: 1200px) 50vw, 240px"
                  priority={index < 4}
                />
              </div>

              <div className="flex flex-col items-start text-left space-y-2 flex-1 px-4 py-4 w-full">
                <h3 className="service-card-title-compact text-lg md:text-xl font-extrabold line-clamp-2 text-[#2176ae] mb-1">
                  {ele?.product_name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                  <span>Technicalsewa</span>
                  <svg
                    className="w-4 h-4 text-[#2591b2]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <circle
                      cx="10"
                      cy="10"
                      r="10"
                      fill="#2591b2"
                      fillOpacity=".15"
                    />
                    <path
                      d="M8.5 12.5l-2-2 1-1 1 1 3-3 1 1-4 4z"
                      fill="#2591b2"
                    />
                  </svg>
                </div>
                {/* Rating removed as per request */}
                {/* Price row, only if price exists */}
                {ele?.price && (
                  <div className="text-base font-semibold text-[#e65100] mb-1">
                    From Rs. {ele.price}
                  </div>
                )}
              </div>
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SlideCard;
