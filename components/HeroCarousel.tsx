'use client';

import dynamic from 'next/dynamic';
import React, { memo, useEffect, useState, useCallback } from 'react';
const Image = dynamic(() => import('next/image'), { ssr: false });
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

const HeroCarousel = memo(({ banners }: any) => {
  const [banner, setBanner] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handlebanner = useCallback(
    (button: string) => {
      if (button === 'prev') {
        setBanner(
          prevCount => (prevCount - 1 + banners.length) % banners.length
        );
      } else {
        setBanner(prevCount => (prevCount + 1) % banners.length);
      }
    },
    [banners?.length]
  );

  useEffect(() => {
    if (banners && Array.isArray(banners) && banners.length > 1) {
      const interval = setInterval(() => {
        setBanner(prevCount => (prevCount + 1) % banners.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [banners]);

  // Early return if banners is not available or empty
  if (!banners || !Array.isArray(banners) || banners.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-2 animate-fade-in">
            Technical Sewa
          </h2>
          <p className="text-lg animate-fade-in-delay">
            Professional Repair Services at Your Doorstep
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Navigation buttons - only show if multiple banners */}
      {banners.length > 1 && (
        <>
          <button
            onClick={() => handlebanner('prev')}
            className="absolute z-20 left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Previous banner"
          >
            <BiLeftArrow className="text-2xl" />
          </button>

          <button
            onClick={() => handlebanner('next')}
            className="absolute z-20 right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Next banner"
          >
            <BiRightArrow className="text-2xl" />
          </button>
        </>
      )}

      {/* Banner indicators */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {banners.map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => setBanner(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === banner ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Main banner image */}
      <div className="relative w-full h-full">
        <Image
          src={banners[banner]?.image_url}
          alt={
            banners[banner]?.alt ||
            banners[banner]?.brand_name ||
            'Technical Sewa Banner'
          }
          fill
          className="object-cover transition-opacity duration-500"
          priority={banner === 0}
          loading={banner === 0 ? 'eager' : 'lazy'}
          onLoad={() => setIsLoading(false)}
          sizes="(max-width: 768px) 100vw, 100vw"
        />

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
      </div>
    </div>
  );
});

HeroCarousel.displayName = 'HeroCarousel';

export default HeroCarousel;
