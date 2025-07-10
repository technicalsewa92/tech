'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  HiArrowRightOnRectangle,
  HiMiniWrenchScrewdriver,
} from 'react-icons/hi2';
import { FaBars, FaDoorOpen, FaHome, FaTimes } from 'react-icons/fa';
import { LiaBlogSolid } from 'react-icons/lia';
import { BsFillPersonCheckFill, BsFillTelephoneFill } from 'react-icons/bs';
import { MdLogin, MdOutlineHomeRepairService } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { LuMailWarning } from 'react-icons/lu';
import { MdModelTraining } from 'react-icons/md';
import useAuthStore from '@/store/useAuthStore';
import Search from './Search';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdownmenu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avtar';
import { IoIosArrowDown } from 'react-icons/io';
import dynamic from 'next/dynamic';
import { MdOutlineDashboard } from 'react-icons/md';
const NavUserDropdown = dynamic(() => import('./NavUserDropdown'), {
  ssr: false,
});
import { getAssetUrl } from '@/lib/cdn';

interface TrainingCategory {
  id: string;
  category_name: string;
  category_slug: string;
  // Legacy properties for backward compatibility
  text?: string;
  value?: string;
}

interface ServiceCategory {
  brand_id: string;
  brand_name: string;
  brand_slug: string;
  // Legacy properties for backward compatibility
  image_url?: string;
  alt?: string;
}

const Nav = ({ services = [], trainingCategories: categories = [] }: any) => {
  //state for navbar
  const [nav, setNav] = useState(false);

  // Transform training categories to ensure consistent data structure
  const transformedCategories = categories.map((cat: any) => ({
    ...cat,
    text: cat.text || cat.category_name,
    value: cat.value || cat.id,
    category_name: cat.category_name || cat.text,
    category_slug:
      cat.category_slug || cat.text?.toLowerCase().replace(/\s+/g, '-'),
  }));

  // Ensure services have the required properties
  const transformedServices = services.map((service: any) => ({
    ...service,
    alt: service.alt || service.brand_name,
    image_url:
      service.image_url ||
      `/assets/brands/${service.brand_slug || service.brand_name.toLowerCase()}.png`,
  }));
  const [showinput, setShowinput] = useState(false);
  const { isAuthenticated, user, signout } = useAuthStore();
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  const handleLogout = () => {
    localStorage.clear();
    window.addEventListener('message', event => {
      // Check the origin to ensure the request is from an allowed site
      if (event.origin !== 'https://www.technicalsewa.com') return;

      if (event.data === 'data') {
        // Clear the token from storage
        localStorage.clear();
      }
    });
    signout();
    window.location.href = '/';
  };

  // stop scrolling when side-navigation is open
  useEffect(() => {
    if (nav) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [nav]);
  useEffect(() => {
    const handlescroll = () => {
      setShowinput(window.scrollY > 80);
    };
    window.addEventListener('scroll', handlescroll);
    return () => {
      window.removeEventListener('scroll', handlescroll);
    };
  }, []);
  // handle navbar toggle
  const handleNavClick = () => {
    setNav(!nav);
  };

  // close navigation after clicking navigation links
  const handleNavclose = () => {
    setNav(false);
  };
  const router = useRouter();
  const newpathname = usePathname();
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav
        className="Navbar relative mx-auto max-w-[1280px] border-[#ededed] gap-[15px] flex justify-between max-lg:p-4 items-center bg-white h-[70px]"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center">
          <Link
            href="/"
            title="Technical Sewa - Home"
            className="flex items-center"
          >
            <Image
              loading="eager"
              src={getAssetUrl('/assets/tslogo-final1.png')}
              height={200}
              width={200}
              alt="Technical Sewa Logo - Expert Appliance Repair Services"
              priority
            />
          </Link>
        </div>

        {/* Search bar removed from header and moved to hero section */}

        {/* Phone button beside logo: show only on mobile, hide on desktop */}
        <a
          href="tel:9851201580"
          title="Phonenumber"
          className="flex items-center justify-center px-1 gap-[5px] h-[40px] w-[130px] border border-[#2591B2] rounded-[4px] text-sm text-black md:hidden"
        >
          <BsFillTelephoneFill className="text-primary" size={20} />
          <p>9851201580</p>
        </a>

        <div className="nav-links  hidden md:flex items-center gap-2 text-[#505056] ">
          <div className="group">
            <a
              href="/trainings"
              title="Training"
              className="hover:text-primary text-sm"
            >
              Training
            </a>
            {transformedCategories && transformedCategories.length > 0 && (
              <div className="hidden group-hover:block">
                <div className="absolute z-10 mt-0 bg-white rounded-md shadow-lg md:w-[350px]">
                  <div className="py-1 max-h-[400px] overflow-y-auto ">
                    <div className="py-1"></div>
                    {transformedCategories?.map(
                      (cat: TrainingCategory, i: number) => {
                        const slug =
                          cat?.category_slug ||
                          cat?.text?.replace(/\s+/g, '-').toLowerCase();
                        return (
                          <a
                            key={cat.id || i}
                            href={`/trainings/${slug}`}
                            title={cat.category_name || cat.text}
                            className="py-1"
                          >
                            <p className="block px-6 py-1 text-sm text-[grey] hover:bg-gray-100">
                              {cat.category_name || cat.text}
                            </p>
                            <hr />
                          </a>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="group">
            <Link className="hover:text-primary text-sm" href="/blogs">
              Blogs
            </Link>
            <div className="hidden group-hover:block">
              <div className="absolute z-10 mt-0 bg-white rounded-md shadow-lg md:w-[350px]">
                <div className="py-1 max-h-[400px] overflow-y-auto">
                  <div className="py-2"></div>
                  {transformedCategories?.map(
                    (cat: TrainingCategory, i: number) => {
                      const slug = `/blogs/${cat?.category_slug || cat?.text?.replaceAll(' ', '-').toLowerCase()}`;
                      return (
                        <a
                          key={cat.id || i}
                          href={slug}
                          className="py-1"
                          title={cat.category_name || cat.text}
                        >
                          <p className="block px-6 py-1 text-sm text-[grey] hover:bg-gray-100">
                            {cat.category_name || cat.text}
                          </p>
                          <hr />
                        </a>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* services  */}
          <div className="group">
            <Link className="hover:text-primary text-sm" href="/service">
              Services
            </Link>
            <div className="hidden group-hover:block">
              <div className="absolute z-10 mt-0 bg-white rounded-md shadow-lg md:w-[350px]">
                <div className="py-1 max-h-[400px] overflow-y-auto">
                  {transformedServices
                    .slice(1)
                    ?.map((service: ServiceCategory) => {
                      return (
                        <div key={service?.brand_id}>
                          <a
                            href={`/service#service_${service?.brand_id}`}
                            className="py-1"
                            title={service.brand_name}
                          >
                            <p className="block px-6 py-1 text-sm text-[grey] hover:bg-gray-100">
                              {service?.brand_name}
                            </p>
                          </a>
                          <hr />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>

          <Link className="hover:text-primary text-sm" href="/professionals">
            Professionals
          </Link>
          <Link className="hover:text-primary text-sm" href="/spareparts">
            Spare Parts
          </Link>

          {isAuthenticated && (
            <div className="flex space-x-3 items-center  rounded-3xl pr-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center">
                    <Avatar>
                      <AvatarImage
                        src={`${user?.photo !== null ? user?.photo : 'https://github.com/shadcn.png'}`}
                        alt="@shadcn"
                      />
                      <AvatarFallback className="text-black flex justify-center items-center">
                        IMG
                      </AvatarFallback>
                    </Avatar>
                    <IoIosArrowDown className="text-white ml-2" />
                  </div>
                </DropdownMenuTrigger>
                {/* Dynamically loaded dropdown with MUI */}
                <NavUserDropdown
                  user={user}
                  onDashboard={() => router.push('/dashboard')}
                  onLogout={handleLogout}
                />
              </DropdownMenu>
            </div>
          )}
          {/* Animated phone number before Sign In button (restored) */}
          <a
            href="tel:9851201580"
            className="flex items-center gap-2 px-4 py-2 border border-[#2591b2] rounded-md text-[#2591b2] font-semibold animate-pulse hover:bg-[#2591b2]/10 transition-colors mr-2 text-base"
          >
            <BsFillTelephoneFill className="text-[#2591b2] text-lg" />
            9851201580
          </a>
          {!isAuthenticated ? (
            <Link className="hover:text-primary" href="/login">
              <button className="flex gap-[5px] justify-center items-center bg-primary rounded-[3px] cursor-pointer text-white px-[13px] py-[8.5px] ">
                <HiArrowRightOnRectangle size={20} className="text-white" />
                Sign In
              </button>
            </Link>
          ) : (
            <></>
          )}
        </div>

        {/* ========toggle-menu-bar-click======== */}
        <div onClick={handleNavClick} className="menu-btn md:hidden">
          {!nav ? (
            <FaBars className="cursor-pointer text-primary" size={30} />
          ) : (
            <FaTimes className="cursor-pointer text-primary" size={30} />
          )}
        </div>

        {/* =========mobile-navigation======== */}
        {nav && (
          <div className="bg-white flex flex-col gap-[24px] shadow-lg z-10 absolute w-max   h-screen top-[70px] right-0 ">
            <a
              onClick={handleNavclose}
              title="Home"
              className="flex px-[16px] gap-4 text-[14px] font-normal items-center  w-full justify-starts"
              href="/"
            >
              <FaHome className="text-primary" />
              Home
            </a>

            {/* <Link
                onClick={handleNavclose}
                className="flex px-[30px] gap-4 text-[20px] font-normal items-center  w-full justify-starts"
                href="#"
              >
                <IoIosNotifications className="text-primary" />
                Notifications
              </Link>
               */}

            <a
              href="/trainings"
              className="hover:text-primary px-[14px] text-base font-normal flex items-center justify-start gap-4"
            >
              <MdModelTraining className="text-primary" />
              Training
            </a>

            {/* ! BUG */}
            {/* <div className="relative group">
                <Link
                  href="/trainings"
                  className="hover:text-primary px-[14px] text-[16px] font-normal flex items-center justify-start gap-4"
                  onClick={handleNavclose}
                >
                  <MdModelTraining className="text-primary" />
                  Training
                </Link>
                <div className="hidden group-hover:block">
                  <div className="absolute z-10 mt-0 bg-white rounded-md shadow-lg md:w-[350px]">
                    <div className="py-1 h-[400px] overflow-y-scroll ">
                      <div className="py-2 pt-1"></div>
                      {transformedCategories.map((cat, i) => {
                        const slug = cat?.category_slug || cat?.text?.replace(/\s+/g, "-").toLowerCase();
                        return (
                          <Link
                            key={cat.id || i}
                            href={`/trainings/${slug}`}
                            className="w-[full]"
                          >
                            <p className="block px-6 py-2 text-sm text-[grey] hover:bg-gray-100">
                              {cat.category_name || cat.text}
                            </p>
                            <hr />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div> */}

            <Link
              onClick={handleNavclose}
              className="flex px-[16px] gap-4 text-[14px] font-normal items-center  w-full justify-starts"
              href="/blogs"
              title="Blogs"
            >
              <LiaBlogSolid className="text-primary" />
              Blog
            </Link>

            <Link
              onClick={handleNavclose}
              className="flex px-[16px] gap-4 text-[14px] font-normal items-center  w-full justify-starts"
              href="/professionals"
            >
              <BsFillPersonCheckFill className="text-primary" />
              Professionals
            </Link>
            <Link
              onClick={handleNavclose}
              className="flex px-[16px] gap-4 text-[14px] font-normal items-center  w-full justify-starts"
              href="/spareparts"
            >
              <HiMiniWrenchScrewdriver className="text-primary" />
              Spare Parts
            </Link>

            {isAuthenticated ? (
              <div className="flex flex-col gap-[24px]">
                <a
                  onClick={handleNavclose}
                  className="flex px-[16px] gap-4 text-[14px] font-normal items-center  w-full justify-starts"
                  href="/service"
                >
                  <MdOutlineHomeRepairService className="text-primary" />
                  All services
                </a>
                <Link
                  onClick={handleNavclose}
                  className="flex px-[16px] gap-4 text-[14px] font-normal items-center  w-full justify-starts"
                  href="/profile"
                >
                  <CgProfile className="text-primary" />
                  profile
                </Link>
                <Link
                  onClick={handleNavclose}
                  className="flex px-[16px] gap-4 text-[14px] font-normal items-center  w-full justify-starts"
                  href="/dashboard"
                >
                  <LuMailWarning className="text-primary" />
                  Dashboard
                </Link>
              </div>
            ) : null}
            {!isAuthenticated ? (
              <Link
                onClick={handleNavclose}
                className="flex px-[16px] gap-4 text-[14px] font-normal items-center  w-full justify-starts"
                href="/login"
              >
                <MdLogin className="text-primary" />
                Login
              </Link>
            ) : (
              <Link
                onClick={() => {
                  handleNavclose();
                  handleLogout();
                }}
                className="flex px-[16px] gap-4 text-[14px] font-normal items-center  w-full justify-starts"
                href="#"
              >
                <MdLogin className="text-primary" />
                Logout
              </Link>
            )}

            <div className="h-[1px] bg-[#ededed] "></div>
            {/* <Link
                onClick={handleNavclose}
                className="flex px-[30px] gap-4 text-[20px] font-normal items-center  w-full justify-starts"
                href="/"
              >
                <BiSolidInfoCircle className="text-primary" />
                About Us
              </Link>
              <Link
                onClick={handleNavclose}
                className="flex px-[30px] gap-4 text-[20px] font-normal items-center  w-full justify-starts"
                href="/"
              >
                <IoMdCall className="text-primary" />
                Contact Us
              </Link> */}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Nav;
