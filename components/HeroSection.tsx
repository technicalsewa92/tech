import React from 'react';
import CustomHeroSection from './CustomHeroSection';

const HeroSection = async ({ data, allBrands }: any) => {
  // Get banners from data - now fully dynamic
  let banners =
    data?.brands?.filter((item: any) => item.image_type === 'banner') || [];

  // If no banners from config, try to get from allBrands
  if (!banners || banners.length === 0) {
    banners =
      allBrands?.filter((item: any) => item.image_type === 'banner') || [];
  }

  // Sort banners by ordering if available
  if (banners && banners.length > 0) {
    banners.sort((a: any, b: any) => {
      const orderA = parseInt(a.ordering) || 0;
      const orderB = parseInt(b.ordering) || 0;
      return orderA - orderB;
    });
  }

  // Debug logging
  console.log('HeroSection - Available banners:', banners?.length || 0);
  console.log('HeroSection - Banner data:', banners?.slice(0, 2)); // Log first 2 banners

  return <CustomHeroSection data={data?.brands || allBrands} />;
};

export default HeroSection;
