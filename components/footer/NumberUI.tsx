'use client';

import React from 'react';
import dynamic from 'next/dynamic';
const CountUp = dynamic(() => import('react-countup'), { ssr: false });

const NumberUI = ({ numbers }: any) => {
  return (
    <section className="relative bg-gradient-to-r from-[#2591b2]/10 to-[#2591b2]/5 overflow-hidden">
      {/* Hero-style decorative SVG blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <svg
          className="absolute -top-24 -right-24 text-[#2591b2]/10 w-64 h-64 md:w-96 md:h-96"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-1.5C87,13.4,81.4,26.8,73.6,38.6C65.8,50.5,55.7,60.8,43.3,67.4C30.9,74,15.4,76.8,0.4,76.2C-14.7,75.6,-29.4,71.6,-41.6,64.4C-53.8,57.2,-63.5,46.8,-70.8,34.4C-78.1,22,-83,7.7,-83.2,-6.8C-83.4,-21.3,-78.9,-35.9,-70.1,-47.4C-61.3,-58.9,-48.3,-67.3,-34.7,-74.5C-21.1,-81.7,-7,-87.7,7.2,-89.1C21.3,-90.5,42.7,-87.3,44.7,-76.4Z"
            transform="translate(100 100)"
          />
        </svg>
        <svg
          className="absolute -bottom-24 -left-24 text-[#2591b2]/10 w-64 h-64 md:w-96 md:h-96"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M39.9,-65.7C54.1,-60,69.5,-53.1,77.9,-41.3C86.3,-29.5,87.6,-12.7,85.9,3.1C84.1,18.9,79.1,33.7,70.1,45.9C61.1,58.1,48,67.7,33.5,74.3C19,80.9,3.1,84.5,-12.4,82.6C-27.9,80.7,-43,73.3,-55.8,63C-68.6,52.7,-79.1,39.4,-83.2,24.5C-87.3,9.6,-85,-6.9,-79.2,-21.3C-73.4,-35.7,-64.1,-48,-52.1,-54.4C-40.1,-60.8,-25.4,-61.3,-11.5,-65.1C2.4,-68.9,16.2,-76,25.7,-73.9C35.2,-71.8,40.4,-60.5,39.9,-65.7Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      {/* Gradient overlay */}
      {/* Removed extra overlay for a cleaner brand look */}

      <div className="relative container mx-auto py-20 md:py-28 px-4 bg-gradient-to-r from-[#2591b2]/10 to-[#2591b2]/5 rounded-3xl">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-0.5 w-8 bg-brand-primary rounded-full"></div>
            <span className="text-brand-primary font-medium text-sm tracking-wide uppercase">
              Our Impact
            </span>
            <div className="h-0.5 w-8 bg-brand-primary rounded-full"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
            Trusted by Thousands Across Nepal
          </h2>
          <p className="text-brand-primary max-w-2xl mx-auto opacity-80">
            Join our growing community of satisfied customers who trust us with
            their appliance repair needs.
          </p>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-brand-primary">
          {/* Service Requests */}
          <div className="group text-center">
            <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-brand-primary/20 hover:border-brand-primary overflow-hidden">
              <div className="relative">
                <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-brand-primary group-hover:scale-110 transition-transform duration-300">
                  <CountUp
                    end={numbers?.complains || 500}
                    duration={2}
                    enableScrollSpy
                  />
                  <span className="text-brand-primary">+</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-brand-primary group-hover:text-brand-primary-dark transition-colors duration-300">
                  Service Requests
                </h3>
                <p className="text-brand-primary-light text-sm mt-2 group-hover:text-brand-primary transition-colors duration-300">
                  Successfully completed
                </p>
              </div>
            </div>
          </div>
          {/* Happy Customers */}
          <div className="group text-center">
            <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-brand-primary/20 hover:border-brand-primary overflow-hidden">
              <div className="relative">
                <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-brand-primary group-hover:scale-110 transition-transform duration-300">
                  <CountUp
                    end={numbers?.customers || 1000}
                    duration={2.2}
                    enableScrollSpy
                  />
                  <span className="text-brand-primary">+</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-brand-primary group-hover:text-brand-primary-dark transition-colors duration-300">
                  Happy Customers
                </h3>
                <p className="text-brand-primary-light text-sm mt-2 group-hover:text-brand-primary transition-colors duration-300">
                  Nationwide satisfaction
                </p>
              </div>
            </div>
          </div>
          {/* Expert Technicians */}
          <div className="group text-center">
            <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-brand-primary/20 hover:border-brand-primary overflow-hidden">
              <div className="relative">
                <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-brand-primary group-hover:scale-110 transition-transform duration-300">
                  <CountUp
                    end={numbers?.technicians || 50}
                    duration={1.8}
                    enableScrollSpy
                  />
                  <span className="text-brand-primary">+</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-brand-primary group-hover:text-brand-primary-dark transition-colors duration-300">
                  Expert Technicians
                </h3>
                <p className="text-brand-primary-light text-sm mt-2 group-hover:text-brand-primary transition-colors duration-300">
                  Certified professionals
                </p>
              </div>
            </div>
          </div>
          {/* Service Areas */}
          <div className="group text-center">
            <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-brand-primary/20 hover:border-brand-primary overflow-hidden">
              <div className="relative">
                <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-brand-primary group-hover:scale-110 transition-transform duration-300">
                  <CountUp end={15} duration={1.5} enableScrollSpy />
                  <span className="text-brand-primary">+</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-brand-primary group-hover:text-brand-primary-dark transition-colors duration-300">
                  Service Areas
                </h3>
                <p className="text-brand-primary-light text-sm mt-2 group-hover:text-brand-primary transition-colors duration-300">
                  Cities covered
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional trust indicators */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <span className="text-2xl">⭐</span>
            <span className="text-brand-primary font-semibold">
              4.9/5 Average Rating
            </span>
            <span className="text-brand-primary">•</span>
            <span className="text-brand-primary">
              99% Customer Satisfaction
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NumberUI;
