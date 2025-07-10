'use client';

import Nav from '@/components/Nav';
import RecommendedServices from '@/components/RecommendedServices';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Link from 'next/link';
import React from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { getAssetUrl } from '@/lib/cdn';

const page = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-16 py-10">
        <div className="text-center">
          <div className="flex flex-col items-center">
            <ImageWithFallback
              className="w-[100px] md:w-[150px]"
              src={getAssetUrl('/assets/ts-final-logo.png')}
              alt="logo"
              width={150}
              height={150}
            />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4 mb-2">
              Sign Up on Technical Sewa
            </h1>
            <p className="text-[13px] text-[#747774] leading-9">
              Choose your registration type
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row  gap-10 ">
          {/* sign up to hire  */}
          <Link
            href="/sign-up-page/sign-up"
            className="flex flex-col items-center gap-4 text-center "
          >
            <FaUserPlus
              className="border-[2px] border-[#f87171] rounded-full p-2 "
              size="3.6rem"
              color="#2591b2"
            />

            <span className="text-[20px] text-[#a6adbb]">Sign Up to Hire</span>
            <p className="text-[13px] text-[#a6adbb]">
              Hire the right Professional for your project
            </p>
          </Link>

          {/* sign up as a professinal  */}
          <Link
            href="/sign-up-page/sign-up-pro"
            className="flex flex-col items-center gap-4 text-center"
          >
            <FaUserPlus
              className="border-[2px] border-[#f87171] rounded-full p-2 "
              size="3.6rem"
              color="#2591b2"
            />
            <span className="text-[20px] text-[#a6adbb]">
              Sign Up as a Professional
            </span>
            <p className="text-[13px] text-[#a6adbb]">
              Expand your service business with <br />
              <span className="font-bold">Technical Sewa</span>
            </p>
          </Link>
        </div>

        {/* Recommended Services */}
        <RecommendedServices
          title="Our Professional Services"
          limit={8}
          className="w-full max-w-6xl"
        />
      </div>
    </>

    // sign up page enededskjflks
    // sign up pro started...
  );
};

export default page;
