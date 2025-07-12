'use client';
import Faqlist from '@/features/service/Faqlist';
import ServiceReviews from '@/features/service/reviews';
import ReviewsDisplay from '@/components/ReviewsDisplay';
import RecommendedServices from '@/components/RecommendedServices';
import { baseUrl } from '@/public/baseUrl';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { AiFillStar, AiOutlinePhone, AiOutlineWhatsApp } from 'react-icons/ai';
import { createSanitizedHtml } from '../../utils/htmlSanitizer';
import { BsFillTelephoneFill, BsCheckCircleFill } from 'react-icons/bs';
import { SlArrowRight } from 'react-icons/sl';
import {
  FiClock,
  FiMapPin,
  FiShield,
  FiTool,
  FiPhone,
  FiMail,
} from 'react-icons/fi';
import { MdVerified } from 'react-icons/md';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Link from 'next/link';
import GetFreeQuoteSidebar from '../GetFreeQuoteSidebar';

const ServiceSlug1Enhanced = ({ data }: any) => {
  const [selectCategoryData, setSelectCategoryData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);

  const params = useParams();
  const router = useRouter();

  // Filter data based on URL params
  const filterData =
    data &&
    data?.filter((val: any) => {
      const slug = Array.isArray(params.slug1) ? params.slug1[0] : params.slug1;
      return val.url_product_name === decodeURIComponent(slug || '');
    });

  const filteredId: any = filterData?.map((element: any) => element.product_id);

  // Fetch category data
  const fetchedData1 = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('product_id', filteredId);
      const result = await axios.post(
        `${baseUrl}/techsewa/publicControl/GetProductcategiryByProduct`,
        formData
      );
      setSelectCategoryData(result?.data);
    } catch (error) {
      console.error('Error fetching category data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (filteredId) {
      fetchedData1();
    }
  }, [data]);

  useMemo(() => {
    if (Array.isArray(filterData) && filterData.length === 0) {
      router.push('/');
    }
  }, [filterData]);

  if (!filterData || filterData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const serviceData = filterData[0];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden viewport-safe">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:py-16 lg:py-24 overflow-hidden safe-area-padding">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-3 sm:space-y-4 lg:space-y-6 order-2 lg:order-1">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-1 sm:space-x-2 text-blue-200 text-xs sm:text-sm overflow-x-auto pb-1 scrollbar-hide">
                <Link
                  href="/"
                  className="hover:text-white transition-colors whitespace-nowrap flex-shrink-0"
                >
                  Home
                </Link>
                <SlArrowRight className="w-2 h-2 sm:w-3 sm:h-3 flex-shrink-0" />
                <Link
                  href="/service"
                  className="hover:text-white transition-colors whitespace-nowrap flex-shrink-0"
                >
                  Services
                </Link>
                <SlArrowRight className="w-2 h-2 sm:w-3 sm:h-3 flex-shrink-0" />
                <span className="hover:text-white transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 max-w-16 sm:max-w-none truncate">
                  {serviceData?.brand_name?.toLowerCase()}
                </span>
                <SlArrowRight className="w-2 h-2 sm:w-3 sm:h-3 flex-shrink-0" />
                <span className="text-white font-medium whitespace-nowrap flex-shrink-0 max-w-20 sm:max-w-none truncate">
                  {serviceData?.product_name?.toLowerCase()}
                </span>
              </nav>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight break-words">
                {serviceData?.title}
              </h1>

              {/* Description */}
              <div
                className="text-blue-100 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl break-words"
                dangerouslySetInnerHTML={createSanitizedHtml(
                  serviceData?.product_desc
                )}
              />

              {/* Rating and Contact */}
              <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1.5 sm:py-2">
                  <AiFillStar className="text-yellow-400 w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="ml-1 font-semibold text-xs sm:text-sm">
                    4.65
                  </span>
                  <span className="ml-1 text-blue-200 text-xs hidden sm:inline">
                    out of 5
                  </span>
                </div>

                <div className="flex items-center bg-green-500/20 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1.5 sm:py-2">
                  <span className="text-green-300 font-semibold text-xs sm:text-sm">
                    From NPR 500
                  </span>
                </div>
              </div>

              {/* Contact Buttons - Mobile Optimized */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 w-full mobile-flex-wrap">
                <a
                  href="tel:9851201580"
                  className="flex items-center justify-center gap-2 bg-white text-blue-900 px-3 sm:px-4 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors text-xs sm:text-sm flex-1 sm:flex-initial mobile-button mobile-touch-response"
                >
                  <AiOutlinePhone className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">Call:</span>
                  <span className="truncate mobile-text">9851201580</span>
                </a>

                <a
                  href="https://wa.me/9779851201580"
                  className="flex items-center justify-center gap-2 bg-green-600 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-green-700 transition-colors text-xs sm:text-sm flex-1 sm:flex-initial mobile-button mobile-touch-response"
                >
                  <AiOutlineWhatsApp className="w-7 h-7 flex-shrink-0" />
                  <span className="truncate mobile-text">WhatsApp</span>
                </a>

                <button
                  onClick={() => setShowInquiryForm(true)}
                  className="flex items-center justify-center gap-2 bg-purple-600 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors text-xs sm:text-sm flex-1 sm:flex-initial mobile-button mobile-touch-response"
                >
                  <FiMail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate mobile-text">Get Quote</span>
                </button>
              </div>

              {/* Service Features */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-2 lg:gap-4 pt-2 sm:pt-4">
                <div className="flex items-center gap-1 text-blue-200 min-w-0">
                  <FiClock className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm truncate">
                    24/7 Service
                  </span>
                </div>
                <div className="flex items-center gap-1 text-blue-200 min-w-0">
                  <FiShield className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm truncate">Warranty</span>
                </div>
                <div className="flex items-center gap-1 text-blue-200 min-w-0">
                  <MdVerified className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm truncate">Certified</span>
                </div>
                <div className="flex items-center gap-1 text-blue-200 min-w-0">
                  <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm truncate">On-site</span>
                </div>
              </div>
            </div>

            {/* Right Content - Service Image */}
            <div className="relative order-1 lg:order-2">
              <div className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={serviceData?.image_url?.replace(
                    'https://www.technicalsewa.com/multiservice/',
                    'https://www.technicalsewa.com/multiservice/test/'
                  )}
                  alt={serviceData?.title}
                  width={600}
                  height={400}
                  className="w-full h-40 sm:h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8 min-w-0">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide">
                {[
                  { id: 'overview', label: 'Overview', icon: FiTool },
                  { id: 'details', label: 'Details', icon: BsCheckCircleFill },
                  { id: 'pricing', label: 'Pricing', icon: FiPhone },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 lg:py-4 font-medium transition-colors whitespace-nowrap text-xs sm:text-sm lg:text-base flex-shrink-0 ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-3 sm:p-4 lg:p-6 xl:p-8">
                {activeTab === 'overview' && (
                  <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                    <div
                      className="prose prose-blue max-w-none text-gray-600 leading-relaxed text-sm sm:text-base break-words content-container"
                      dangerouslySetInnerHTML={createSanitizedHtml(
                        serviceData?.content
                      )}
                    />
                  </div>
                )}

                {activeTab === 'details' && (
                  <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                      Service Details
                    </h2>
                    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                      <div className="space-y-3 sm:space-y-4 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                          What&apos;s Included
                        </h3>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 min-w-0">
                            <BsCheckCircleFill className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                            <span className="text-gray-600 text-sm sm:text-base break-words">
                              Professional diagnosis
                            </span>
                          </li>
                          <li className="flex items-center gap-2 min-w-0">
                            <BsCheckCircleFill className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                            <span className="text-gray-600 text-sm sm:text-base break-words">
                              Quality parts & tools
                            </span>
                          </li>
                          <li className="flex items-center gap-2 min-w-0">
                            <BsCheckCircleFill className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                            <span className="text-gray-600 text-sm sm:text-base break-words">
                              Service warranty
                            </span>
                          </li>
                          <li className="flex items-center gap-2 min-w-0">
                            <BsCheckCircleFill className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                            <span className="text-gray-600 text-sm sm:text-base break-words">
                              Follow-up support
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-3 sm:space-y-4 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                          Service Areas
                        </h3>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 min-w-0">
                            <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                            <span className="text-gray-600 text-sm sm:text-base break-words">
                              Kathmandu Valley
                            </span>
                          </li>
                          <li className="flex items-center gap-2 min-w-0">
                            <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                            <span className="text-gray-600 text-sm sm:text-base break-words">
                              Pokhara
                            </span>
                          </li>
                          <li className="flex items-center gap-2 min-w-0">
                            <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                            <span className="text-gray-600 text-sm sm:text-base break-words">
                              Chitwan
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'pricing' && (
                  <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                      Service Pricing
                    </h2>
                    <div className="grid gap-3 sm:gap-4 lg:gap-6 md:grid-cols-2">
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border border-blue-200">
                        <h3 className="font-bold text-base sm:text-lg lg:text-xl text-gray-900 mb-2 sm:mb-3 lg:mb-4">
                          Basic Service
                        </h3>
                        <div className="space-y-2 sm:space-y-3">
                          <div className="flex justify-between text-xs sm:text-sm lg:text-base">
                            <span className="text-gray-600 break-words">
                              Diagnosis & Inspection
                            </span>
                            <span className="font-semibold flex-shrink-0 ml-2">
                              NPR 500
                            </span>
                          </div>
                          <div className="flex justify-between text-xs sm:text-sm lg:text-base">
                            <span className="text-gray-600 break-words">
                              Basic Repair
                            </span>
                            <span className="font-semibold flex-shrink-0 ml-2">
                              NPR 1,000+
                            </span>
                          </div>
                          <div className="flex justify-between text-xs sm:text-sm lg:text-base">
                            <span className="text-gray-600 break-words">
                              Home Visit
                            </span>
                            <span className="font-semibold flex-shrink-0 ml-2">
                              Free
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border border-green-200">
                        <h3 className="font-bold text-base sm:text-lg lg:text-xl text-gray-900 mb-2 sm:mb-3 lg:mb-4">
                          Premium Service
                        </h3>
                        <div className="space-y-2 sm:space-y-3">
                          <div className="flex justify-between text-xs sm:text-sm lg:text-base">
                            <span className="text-gray-600 break-words">
                              Complete Repair
                            </span>
                            <span className="font-semibold flex-shrink-0 ml-2">
                              NPR 2,000+
                            </span>
                          </div>
                          <div className="flex justify-between text-xs sm:text-sm lg:text-base">
                            <span className="text-gray-600 break-words">
                              1 Year Warranty
                            </span>
                            <span className="font-semibold text-green-600 flex-shrink-0 ml-2">
                              Included
                            </span>
                          </div>
                          <div className="flex justify-between text-xs sm:text-sm lg:text-base">
                            <span className="text-gray-600 break-words">
                              Priority Support
                            </span>
                            <span className="font-semibold text-green-600 flex-shrink-0 ml-2">
                              Included
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
                      <p className="text-xs sm:text-sm text-yellow-800 break-words">
                        <BsCheckCircleFill className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600 inline mr-2 flex-shrink-0" />
                        Final pricing depends on the specific issue and parts
                        required. Get a free quote by contacting us!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar & Mobile Dropdown */}
          <div className="space-y-4 sm:space-y-6 min-w-0">
            {/* Mobile Select Dropdown */}
            <div className="sm:hidden">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-4">
                <div className="font-bold text-lg mb-2 text-blue-700">
                  Service Categories
                </div>
                {isLoading ? (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {[1, 2, 3, 4].map(i => (
                      <div
                        key={i}
                        className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"
                      ></div>
                    ))}
                  </div>
                ) : selectCategoryData && selectCategoryData.length > 0 ? (
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {selectCategoryData.map((val: any, index: number) => (
                      <button
                        key={val.text || index}
                        onClick={() =>
                          router.push(
                            `/service/${params.slug1}/${val.category_url || serviceData.model}`
                          )
                        }
                        className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 whitespace-nowrap font-medium hover:bg-gray-100 focus:bg-blue-50 focus:text-blue-700 transition-colors shadow-sm"
                        style={{ minWidth: '140px' }}
                      >
                        {val.text}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="text-gray-400 mb-2">
                      <FiTool className="w-6 h-6 mx-auto" />
                    </div>
                    <p className="text-gray-500 text-sm break-words">
                      No service categories available
                    </p>
                    <button
                      onClick={() => setShowInquiryForm(true)}
                      className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Contact us for custom service
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Service Categories Pills */}
            <div className="hidden sm:block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-4 mb-4">
                <div className="font-bold text-lg mb-2 text-blue-700">
                  Service Categories
                </div>
                {isLoading ? (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {[1, 2, 3, 4].map(i => (
                      <div
                        key={i}
                        className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"
                      ></div>
                    ))}
                  </div>
                ) : selectCategoryData && selectCategoryData.length > 0 ? (
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {selectCategoryData.map((val: any, index: number) => (
                      <button
                        key={val.text || index}
                        onClick={() =>
                          router.push(
                            `/service/${params.slug1}/${val.category_url || serviceData.model}`
                          )
                        }
                        className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 whitespace-nowrap font-medium hover:bg-gray-100 focus:bg-blue-50 focus:text-blue-700 transition-colors shadow-sm"
                        style={{ minWidth: '140px' }}
                      >
                        {val.text}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="text-gray-400 mb-2">
                      <FiTool className="w-6 h-6 mx-auto" />
                    </div>
                    <p className="text-gray-500 text-sm break-words">
                      No service categories available
                    </p>
                    <button
                      onClick={() => setShowInquiryForm(true)}
                      className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Contact us for custom service
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Contact Card */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">
                Need Help? Get App Download Link
              </h3>
              <p className="text-green-100 text-sm break-words">
                Get instant support from our experts
              </p>
            </div>

            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <a
                href="tel:9851201580"
                className="flex items-center gap-3 p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group min-w-0"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors flex-shrink-0">
                  <BsFillTelephoneFill className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">
                    Call Now
                  </p>
                  <p className="text-blue-600 font-medium text-sm sm:text-base break-words">
                    9851201580
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me/9779851201580"
                className="flex items-center gap-3 p-3 sm:p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group min-w-0"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 text-white rounded-full flex items-center justify-center group-hover:bg-green-700 transition-colors flex-shrink-0">
                  <AiOutlineWhatsApp className="w-7 h-7 sm:w-9 sm:h-9" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">
                    WhatsApp
                  </p>
                  <p className="text-green-600 font-medium text-sm sm:text-base break-words">
                    Chat with us
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Service Stats */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
              Service Stats
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-blue-600">
                  500+
                </div>
                <div className="text-xs sm:text-sm text-gray-600 break-words">
                  Happy Customers
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-green-600">
                  4.8
                </div>
                <div className="text-xs sm:text-sm text-gray-600 break-words">
                  Average Rating
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-purple-600">
                  24/7
                </div>
                <div className="text-xs sm:text-sm text-gray-600 break-words">
                  Support
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-orange-600">
                  1 Year
                </div>
                <div className="text-xs sm:text-sm text-gray-600 break-words">
                  Warranty
                </div>
              </div>
            </div>
          </div>
          {/* Get Free Quote Sidebar */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 w-full">
            <GetFreeQuoteSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSlug1Enhanced;
