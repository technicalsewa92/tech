'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Brand {
  image_url: string;
  alt: string;
  image_type: string;
}

interface ClientsProps {
  clients: {
    brands: Brand[];
  };
}

export default function ClientsSlider({ clients }: ClientsProps) {
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    setShowSlider(clients?.brands?.length > 0);
  }, [clients?.brands]);

  const clientsImage = clients?.brands?.filter(
    (item: Brand) => item.image_type === 'clients'
  );

  const breakpoints = {
    0: { slidesPerView: 3.5, spaceBetween: 2 }, // 3.5 on all mobile, less gap
    480: { slidesPerView: 4, spaceBetween: 4 },
    640: { slidesPerView: 5, spaceBetween: 8 },
    992: { slidesPerView: 7, spaceBetween: 12 },
    1280: { slidesPerView: clientsImage?.length || 7, spaceBetween: 18 },
  };

  if (!showSlider || !clientsImage?.length) return null;

  return (
    <div className="bg-[#2591b2]/5 py-12 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-1 w-10 bg-[#2591b2] rounded-full"></div>
            <span className="text-[#2591b2] font-bold text-sm uppercase tracking-wide">
              Our Clients
            </span>
            <div className="h-1 w-10 bg-[#2591b2] rounded-full"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2591b2] text-center mb-8">
            Trusted by Leading Brands
          </h2>
        </div>

        {/* Clients Slider */}
        <div className="relative w-full">
          <Swiper
            className="clients-swiper flex overflow-hidden justify-center items-center px-2 py-6 cursor-pointer"
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              reverseDirection: false,
              stopOnLastSlide: false,
              waitForTransition: false,
            }}
            speed={2500}
            breakpoints={breakpoints}
            resizeObserver
            allowTouchMove={false}
            modules={[Autoplay, Pagination, Navigation]}
            wrapperClass="pb-6 justify-center"
            loop={true}
          >
            {clientsImage?.map((ele: Brand, index: number) => (
              <SwiperSlide key={index}>
                <div className="client-card p-4 h-[100px] w-[100px] sm:h-[140px] sm:w-[140px] md:h-[160px] md:w-[160px] border border-[#2591b2]/20 bg-white rounded-xl shadow flex justify-center items-center">
                  <div className="relative w-full h-full flex justify-center items-center">
                    <Image
                      src={ele.image_url}
                      alt={ele.alt || 'Client logo'}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Bottom Stats or Call to Action */}
        <div className="text-center mt-12">
          <p className="text-[#2591b2] text-base font-medium">
            Join our growing list of satisfied clients. Experience the
            difference with <span className="font-bold">Technical Sewa</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
