'use client';
import ComplainForm from '@/features/complain/complain-form/complainForm';
import { baseUrl } from '@/public/baseUrl';
import useComplainFormStore from '@/store/useComplainInquiryStore';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Phone } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import Faqlist from '../Faqlist';
import { createSanitizedHtml } from '../../../utils/htmlSanitizer';

const ChildService = ({ data }: any) => {
  const params = useParams();
  const router = useRouter();
  // Debug logs
  useEffect(() => {
    console.log('ChildService params:', params);
    console.log('ChildService data:', data);
  }, [params, data]);
  const [complainForm, setComplainForm] = useState(false);
  const [selectCategoryData, setSelectCategoryData] = useState<any>();
  const [serviceCategoryData, setServiceCategoryData] = useState<any>();
  // (params and router already declared above)

  // filter data based on URL params and stored to filterData variables
  const filterData = useMemo(() => {
    const currentSlug = params['child-service-slug'];
    const allSlugs = data?.map((val: any) => val.url_product_name);
    console.log('Filtering data for child-service-slug:', currentSlug);
    console.log('All available url_product_name:', allSlugs);
    // Try to find the matching item (case-insensitive, URI-decoded)
    const match = data?.find((val: any) => {
      if (!val.url_product_name || !currentSlug) return false;
      return (
        decodeURIComponent(String(val.url_product_name)).toLowerCase() ===
        decodeURIComponent(String(currentSlug)).toLowerCase()
      );
    });
    if (!match) {
      console.warn(
        'No exact match found for child-service-slug:',
        currentSlug,
        'in',
        allSlugs
      );
    }
    return match ? [match] : [];
  }, [data, params]);

  //  ===============================
  const filteredId: any = filterData?.map((element: any) => element.product_id);
  const fetchedData1 = async () => {
    if (!filteredId || filteredId.length === 0) {
      console.warn(
        'No filteredId found for product. Params:',
        params,
        'Data:',
        data
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append('product_id', filteredId);
      const result = await axios.post(
        `${baseUrl}/techsewa/publicControl/GetProductcategiryByProduct`,
        formData
      );
      setSelectCategoryData(result?.data);
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  useMemo(() => {
    fetchedData1();
  }, [data, filteredId]);
  //  ===============================

  const finalData = selectCategoryData?.filter((val: any) => {
    const slug = params['child-service-slug'];
    const decodedSlug =
      typeof slug === 'string' ? decodeURIComponent(slug) : '';
    return val.model === decodedSlug;
  });

  // ===========================================
  const serviceCategoryId: any = finalData?.map(
    (element: any) => element.value
  );
  const serviceDataFetched = async () => {
    if (!serviceCategoryId || serviceCategoryId.length === 0) {
      console.warn(
        'No serviceCategoryId found. finalData:',
        finalData,
        'Params:',
        params
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append('brand_id', serviceCategoryId);
      const result = await axios.post(
        `${baseUrl}/techsewa/publicControl/getServicesByProductCategory`,
        formData
      );
      setServiceCategoryData(result?.data);
    } catch (error) {
      console.error('Error fetching service data:', error);
    }
  };

  const [value, setvalue] = useState('');

  useMemo(() => {
    serviceDataFetched();
  }, [selectCategoryData, serviceCategoryId]);
  // ==================================================
  const { setInquiryData } = useComplainFormStore();

  // prp inquiry form data
  useMemo(() => {
    const item = data?.find(
      (val: any) => val.url_product_name === params.slug1
    );
    if (!item || !serviceCategoryId) {
      console.warn(
        'No item or serviceCategoryId for inquiryData. item:',
        item,
        'serviceCategoryId:',
        serviceCategoryId,
        'params:',
        params
      );
      return;
    }

    console.log('memo', serviceCategoryData);
    const inquiryData = {
      service_category: item?.brand_id,
      product_category: serviceCategoryId?.[0],
      brand_product_id: item?.product_id,
      service_id: value,
    };
    setInquiryData(inquiryData);
  }, [data, params.slug1, selectCategoryData, value, serviceCategoryData]);

  const childService = finalData?.[0];

  useMemo(() => {
    if (Array.isArray(filterData) && filterData.length === 0) {
      console.warn(
        'No matching data found for child-service-slug:',
        params['child-service-slug']
      );
      router.push('/');
    }
  }, [filterData, router]);

  return (
    <div>
      {!complainForm ? (
        <div>
          {filterData &&
            filterData.map((val: any, index: any) => {
              return (
                <div key={index} className="child-service-page">
                  {/* Hero Section */}
                  <div
                    className="child-service-hero"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${(
                        childService?.image_url ?? val?.image_url
                      )?.replace(
                        'https://www.technicalsewa.com/multiservice/',
                        'https://www.technicalsewa.com/multiservice/test/'
                      )})`,
                    }}
                  >
                    <div className="child-service-hero-content">
                      {/* Breadcrumb */}
                      <nav className="child-service-breadcrumb">
                        <span>{val?.brand_name.toLowerCase()}</span>
                        <span>/</span>
                        <span>{val?.product_name.toLowerCase()}</span>
                        <span>/</span>
                        <span>
                          {typeof params['child-service-slug'] === 'string'
                            ? decodeURIComponent(params['child-service-slug'])
                            : ''}
                        </span>
                      </nav>

                      {/* Title */}
                      <h1 className="child-service-title">
                        {childService?.title}
                      </h1>

                      {/* Rating and Contact */}
                      <div className="flex flex-col md:flex-row gap-4 mt-6">
                        <div className="child-service-rating">
                          <div className="child-service-stars">
                            <Star />
                            <span className="font-semibold">4.65</span>
                            <span className="child-service-rating-text">
                              out of 5
                            </span>
                          </div>
                        </div>
                        <a
                          href="tel:9851201580"
                          className="contact-button contact-button-secondary flex items-center justify-center gap-2 w-fit"
                        >
                          <Phone size={16} />
                          9851201580
                        </a>
                      </div>

                      {/* Description */}
                      {childService && (
                        <div
                          className="child-service-description mt-6 prose prose-invert max-w-none"
                          dangerouslySetInnerHTML={createSanitizedHtml(
                            childService?.description
                          )}
                        />
                      )}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="child-service-content">
                    {/* Main Content */}
                    <div className="child-service-main">
                      <div className="service-details-card">
                        <div className="service-details-header">
                          <h2 className="service-details-title">
                            Service Details
                          </h2>
                        </div>
                        <div className="service-details-content">
                          {finalData &&
                            finalData.map((val: any, index: any) => {
                              return (
                                <div
                                  key={index}
                                  dangerouslySetInnerHTML={createSanitizedHtml(
                                    val?.content
                                  )}
                                />
                              );
                            })}
                        </div>
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="child-service-sidebar">
                      {/* Contact Card */}
                      <div className="contact-card">
                        <div className="contact-card-header">
                          <h3 className="contact-card-title">Hire an Expert</h3>
                          {finalData?.map((val: any, index: any) => (
                            <p key={index} className="contact-card-subtitle">
                              for {val?.text}
                            </p>
                          ))}
                        </div>
                        <div className="contact-card-content">
                          <div className="contact-buttons">
                            {serviceCategoryData?.map((val: any, i: number) => (
                              <button
                                key={i}
                                onClick={() => {
                                  setvalue(val.value);
                                  setComplainForm(true);
                                }}
                                className="contact-button contact-button-primary flex items-center justify-between"
                              >
                                <span>{val.text}</span>
                                <ArrowRight />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          <div className="section-spacing-large">
            <Faqlist filteredId={filteredId} />
          </div>
        </div>
      ) : (
        <ComplainForm />
      )}
    </div>
  );
};

export default ChildService;
