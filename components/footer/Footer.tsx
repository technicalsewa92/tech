import React from 'react';
import { ImFacebook } from 'react-icons/im';
import { BiLogoInstagramAlt } from 'react-icons/bi';
import { BsYoutube, BsTwitter } from 'react-icons/bs';
import { IoLocationOutline, IoLocationSharp } from 'react-icons/io5';
import './footer.css';
import Link from 'next/link';
import Image from 'next/image';
import Locations from './Locations';
import { fetchLayoutData } from '@/lib/api';
import { createSanitizedHtml } from '../../utils/htmlSanitizer';
import { getAssetUrl } from '@/lib/cdn';

const Footer = async () => {
  const fallbackDescription =
    'Expert appliance repair and maintenance services in Nepal';

  try {
    const result = await fetchLayoutData(
      'https://crm.technicalsewa.com/techsewa/masterconfig/publicmasterconfig/GetContactUs',
      { brands: [{ description: fallbackDescription }] }
    );

    const description =
      result.success && result.data?.brands?.[0]?.description
        ? result.data.brands[0].description
        : fallbackDescription;
  } catch (error) {
    // Fallback handled in fetchLayoutData
  }

  const description = fallbackDescription; // Always use fallback for now

  return (
    <footer
      className="bg-primary text-white pt-6 pb-0 px-0 md:px-0"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Service Areas */}
        <Locations />
        <hr className="border-white/20 my-4" />
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-12 lg:gap-20">
          {/* Brand & Social */}
          <div className="flex flex-col items-center md:items-start gap-4 md:gap-6 flex-1 min-w-[200px] mb-4 md:mb-0">
            <Link
              href="/"
              className="w-[180px] h-[48px] bg-white p-1 rounded-md flex items-center justify-center shadow-md"
              aria-label="Technical Sewa Home"
            >
              <Image
                height={48}
                width={180}
                loading="lazy"
                src={getAssetUrl('/assets/tslogo-final1.png')}
                alt="Technical Sewa Logo - Expert Appliance Repair Services"
                className="object-contain w-full h-full"
              />
            </Link>
            <p className="text-xs text-white/80 text-center md:text-left max-w-xs leading-relaxed">
              Expert appliance repair and maintenance services in Nepal. Fast,
              reliable, and trusted by thousands.
            </p>
            <div className="flex gap-3 mt-2">
              <a
                href="https://www.facebook.com/61551939094429"
                target="_blank"
                rel="noopener"
                aria-label="Facebook"
                className="bg-white text-primary rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors mobile-button"
              >
                <ImFacebook className="text-primary" size={20} />
              </a>
              <a
                href="https://www.instagram.com/technicalsewa.np/"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
                className="bg-white text-primary rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors mobile-button"
              >
                <BiLogoInstagramAlt className="text-primary" size={20} />
              </a>
              <a
                href="https://www.youtube.com/channel/UCw2U7K_AKEkws0uzyI4T_kA"
                target="_blank"
                rel="noopener"
                aria-label="YouTube"
                className="bg-white text-primary rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors mobile-button"
              >
                <BsYoutube className="text-primary" size={20} />
              </a>
              <a
                href="https://twitter.com/technicals2023"
                target="_blank"
                rel="noopener"
                aria-label="Twitter"
                className="bg-white text-primary rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors mobile-button"
              >
                <BsTwitter className="text-primary" size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links & Contact */}
          <div className="flex flex-row gap-8 md:gap-12 flex-1 justify-center md:justify-start flex-wrap">
            <nav
              className="flex flex-col gap-2 min-w-[120px]"
              aria-label="Footer navigation"
            >
              <h3 className="font-bold text-base mb-2 text-white">
                Quick Links
              </h3>
              <Link
                href="/"
                className="text-sm text-white/90 hover:underline hover:text-blue-100 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-sm text-white/90 hover:underline hover:text-blue-100 transition-colors"
              >
                About
              </Link>
              <Link
                href="/service"
                className="text-sm text-white/90 hover:underline hover:text-blue-100 transition-colors"
              >
                Services
              </Link>
              <Link
                href="/privacy-policy"
                className="text-sm text-white/90 hover:underline hover:text-blue-100 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-white/90 hover:underline hover:text-blue-100 transition-colors"
              >
                Terms & Conditions
              </Link>
            </nav>
            {/* Popular Services */}
            <nav
              className="flex flex-col gap-2 min-w-[160px]"
              aria-label="Popular Services"
            >
              <h3 className="font-bold text-base mb-2 text-white">
                Popular Services
              </h3>
              <Link
                href="/service/air-conditioner"
                className="text-sm text-white/90 hover:underline hover:text-blue-100 transition-colors"
              >
                AC Repair
              </Link>
              <Link
                href="/service/washing-machine"
                className="text-sm text-white/90 hover:underline hover:text-blue-100 transition-colors"
              >
                Washing Machine Repair
              </Link>
              <Link
                href="/service/fridge"
                className="text-sm text-white/90 hover:underline hover:text-blue-100 transition-colors"
              >
                Refrigerator Repair
              </Link>
              <Link
                href="/service/microwave-oven"
                className="text-sm text-white/90 hover:underline hover:text-blue-100 transition-colors"
              >
                Microwave Repair
              </Link>
              <Link
                href="/service/lcd-led-tv"
                className="text-sm text-white/90 hover:underline hover:text-blue-100 transition-colors"
              >
                LED TV Repair
              </Link>
              <Link
                href="/service/vacuum-cleaner"
                className="text-sm text-white/90 hover:underline hover:text-blue-100 transition-colors"
              >
                Vacuum Cleaner Repair
              </Link>
              <Link
                href="/service/geyser"
                className="text-sm text-white/90 hover:underline hover:text-blue-100 transition-colors"
              >
                Geyser Repair
              </Link>
              <Link
                href="/service/ro-water-purifier"
                className="text-sm text-white/90 hover:underline hover:text-blue-100 transition-colors"
              >
                Water Purifier Repair
              </Link>
            </nav>
            {/* Contact Us section removed to avoid duplication */}
          </div>

          {/* Newsletter Signup */}
          <div className="flex flex-col items-start md:items-start flex-1 min-w-[220px] mt-6 md:mt-0">
            <h4 className="font-bold text-base mb-2 text-white">Contact Us</h4>
            <address className="not-italic text-sm text-white/90 leading-relaxed text-left">
              <span className="block font-semibold">
                Technicalsewa and Solution
              </span>
              <span className="block">
                Kumaripati, Lalitpur, Near Bluebird Collage, Nepal
              </span>
              <span className="block mt-2 font-semibold">Contact Number</span>
              <span className="block">
                977-1-5970066, 9802074555, 9851201580
              </span>
              <span className="block mt-2 font-semibold">Email Address</span>
              <span className="block">
                <a
                  href="mailto:technicalsewa.np@gmail.com"
                  className="underline hover:text-blue-100 ml-1"
                >
                  technicalsewa.np@gmail.com
                </a>
              </span>
            </address>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 py-3 bg-[#054355] px-2 md:px-0">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-light text-xs sm:text-sm text-white/60 tracking-wide leading-tight">
            © {new Date().getFullYear()} Technical Sewa. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
