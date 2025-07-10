'use client';
import Image from 'next/image';
import React, { useState, memo } from 'react';
import Modal from '../Modal';

// Memoized CategoryCard component for better performance
const CategoryCard = memo(
  ({ imageUrl, brandName, imgAlt, allBrands, id }: any) => {
    const [show, setShow] = useState(false);

    const filterData = allBrands?.filter((val: any) => {
      return val.brand_id === id;
    });

    filterData?.sort(
      (a: any, b: any) => +a?.second_ordering - +b?.second_ordering
    );

    return (
      <div className="professional-service-card-wrapper">
        <div
          onClick={() => setShow(!show)}
          className="professional-service-card group cursor-pointer transform hover:scale-105 transition-all duration-300"
        >
          {/* Square Icon container for uniform layout */}
          <div className="relative w-[40px] h-[40px] md:w-[50px] md:h-[50px] flex-shrink-0 group-hover:scale-110 transition-transform duration-300 mx-auto mb-2">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
            <Image
              src={imageUrl}
              alt={imgAlt}
              fill
              className="professional-service-card-image object-contain hover:scale-110 transition-transform duration-300 relative z-10"
              sizes="(max-width: 768px) 40px, 50px"
              loading="lazy"
            />
          </div>

          {/* Compact Text for square layout */}
          <div className="text-center">
            <p className="professional-service-card-title text-visible text-xs font-semibold text-gray-700 leading-tight line-clamp-2">
              {brandName}
            </p>
          </div>

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl"></div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-xl"></div>
        </div>
        {show && (
          <Modal
            imageUrl={imageUrl}
            brandName={brandName}
            filterData={filterData}
            imgAlt={imgAlt}
            onClose={() => setShow(false)}
          />
        )}
      </div>
    );
  }
);

CategoryCard.displayName = 'CategoryCard';

export default CategoryCard;
