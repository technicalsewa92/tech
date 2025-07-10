'use client';

import React from 'react';
import Search from './Search';
import { motion } from 'framer-motion';

const CustomHeroSection = ({ data }: { data: any }) => {
  return (
    <div className="relative bg-gradient-to-r from-[#2591b2]/10 to-[#2591b2]/5 min-h-[91vh] flex items-center justify-center overflow-hidden">
      {/* Background SVG Elements */}
      <div className="absolute inset-0 overflow-hidden">
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

        {/* Floating Device Icons */}
        <div className="hidden md:block">
          {/* AC */}
          <motion.div
            className="absolute top-10 right-[15%] bg-white p-3 rounded-full shadow-lg"
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              className="w-8 h-8 text-[#2591b2]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </motion.div>

          {/* Washing Machine */}
          <motion.div
            className="absolute bottom-20 right-[25%] bg-white p-3 rounded-full shadow-lg"
            initial={{ y: 0 }}
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          >
            <svg
              className="w-8 h-8 text-[#2591b2]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="7" strokeWidth={1.5} />
              <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                strokeWidth={1.5}
              />
            </svg>
          </motion.div>

          {/* Refrigerator */}
          <motion.div
            className="absolute top-24 left-[15%] bg-white p-3 rounded-full shadow-lg"
            initial={{ y: 0 }}
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          >
            <svg
              className="w-8 h-8 text-[#2591b2]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="4"
                y="2"
                width="16"
                height="20"
                rx="2"
                strokeWidth={1.5}
              />
              <line x1="4" y1="10" x2="20" y2="10" strokeWidth={1.5} />
              <line
                x1="14"
                y1="6"
                x2="14"
                y2="6"
                strokeWidth={3}
                strokeLinecap="round"
              />
              <line
                x1="14"
                y1="16"
                x2="14"
                y2="16"
                strokeWidth={3}
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          {/* TV */}
          <motion.div
            className="absolute bottom-16 left-[25%] bg-white p-3 rounded-full shadow-lg"
            initial={{ y: 0 }}
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5,
            }}
          >
            <svg
              className="w-8 h-8 text-[#2591b2]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="2"
                y="7"
                width="20"
                height="15"
                rx="2"
                strokeWidth={1.5}
              />
              <polyline points="17 2 12 7 7 2" strokeWidth={1.5} />
            </svg>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center w-full">
        <div className="max-w-4xl w-full text-center mb-12 flex flex-col items-center justify-center">
          <motion.h1
            className="text-3xl md:text-5xl font-extrabold mb-6 text-[#2591b2]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Expert Appliance & Electronics Repair Services in Nepal
          </motion.h1>

          <motion.h2
            className="text-lg md:text-2xl font-semibold mb-8 text-[#2591b2]/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Fast, Reliable, and Professional Repairs for All Your Devices
          </motion.h2>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Search data={data} />

            {/* Call to Action */}
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="tel:9851201580"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#2591b2] hover:bg-[#1a7a96] transition-colors shadow-md"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call Now: 9851201580
              </a>
              <a
                href="/service"
                className="inline-flex items-center justify-center px-6 py-3 border border-[#2591b2] text-base font-medium rounded-md text-[#2591b2] bg-white hover:bg-[#2591b2]/5 transition-colors shadow-md"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                View All Services
              </a>
            </div>
          </motion.div>
        </div>

        {/* Service Highlights removed as requested */}
      </div>
    </div>
  );
};

export default CustomHeroSection;
