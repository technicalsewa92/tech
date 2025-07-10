'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

import { Link as ScrollLink } from 'react-scroll';
import ServiceProducts from '../Serviceproduct';

interface ServiceItem {
  name: string;
  id: number;
  icon: string;
}

const Service = ({ services, data = [] }: any) => {
  const [activeviewId, setActiveviewId] = useState<number>(0);
  const sidebarRef = useRef<HTMLDivElement>(null);

  let servicesList = services.map((i: any) => ({
    name: i?.brand_name,
    id: +i?.brand_id,
    icon: i?.image_url,
  })) as ServiceItem[];
  // removing E_commerce from the list.
  servicesList = servicesList.filter((b: any) => b?.id !== 78);

  const activeService = servicesList.find(s => s.id === activeviewId);
  const activeServiceData = [...data]?.filter(
    (s: any) => +s?.brand_id === activeviewId
  );
  activeServiceData?.sort(
    (a: any, b: any) => +a?.second_ordering - +b?.second_ordering
  );

  const handleTabClick = (id: any) => setActiveviewId(id);

  // Auto-scroll sidebar to keep active item visible
  useEffect(() => {
    if (!sidebarRef.current) return;
    const activeEl = sidebarRef.current.querySelector(
      '.service-nav-item.active'
    );
    if (activeEl && sidebarRef.current) {
      const sidebarRect = sidebarRef.current.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();
      // If active item is out of view, scroll it into view
      if (
        activeRect.top < sidebarRect.top ||
        activeRect.bottom > sidebarRect.bottom
      ) {
        activeEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }
  }, [activeviewId]);

  return (
    <div className="service-main-container">
      {/* Page Title */}
      <div className="service-page-header text-center mb-8 pt-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Our Services
        </h1>
        <p className="text-lg text-gray-600">
          Professional repair and maintenance services for all your appliances
        </p>
      </div>

      <div className="service-layout">
        {/* Service Sidebar Navigation */}
        <div
          className="service-sidebar"
          ref={sidebarRef}
          style={{ overflowY: 'auto', maxHeight: '80vh' }}
        >
          <div className="service-sidebar-header">
            <h2>Service Categories</h2>
          </div>
          <nav className="service-navigation mb-8">
            {servicesList.slice(1)?.map((item, index: number) => (
              <ScrollLink
                key={index}
                activeClass="active"
                onSetActive={() => setActiveviewId(item.id)}
                className={`service-nav-item ${
                  activeviewId === item.id ? 'active' : ''
                }`}
                to={`service_${item.id}`}
                spy={true}
                smooth={true}
                duration={500}
                onClick={() => handleTabClick(item.id)}
                offset={-120}
              >
                {item.name}
              </ScrollLink>
            ))}
          </nav>
          {/* Get Free Quote Sidebar removed as per request */}
        </div>

        {/* Service Content */}
        <div className="service-content">
          {/* Mobile Active Service Display */}
          {activeServiceData.length >= 1 && (
            <div className="md:hidden service-section">
              <div className="service-section-header">
                <div className="service-section-title">
                  {activeService?.icon && (
                    <Image
                      width={32}
                      height={32}
                      src={activeService.icon}
                      alt={activeService.name}
                      className="w-8 h-8 object-contain"
                    />
                  )}
                  <span>{activeService?.name}</span>
                </div>
              </div>
              <div className="service-products-grid">
                {activeServiceData?.map((value: any, index: any) => (
                  <a
                    href={`/service/${value?.url_product_name}`}
                    key={index}
                    className={`service-product-card ${
                      !value.image_url ? 'hidden' : ''
                    }`}
                  >
                    {value.image_url && (
                      <>
                        <Image
                          width={100}
                          height={100}
                          className="service-product-image"
                          src={value.image_url}
                          alt={value.alt2 || value.product_name}
                        />
                        <p className="service-product-name">
                          {value.product_name}
                        </p>
                      </>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Desktop Service Sections */}
          {servicesList.slice(1).map((s, k) => {
            const serviceData = [...data]?.filter(
              (i: any) => +i?.brand_id === s.id
            );
            serviceData?.sort(
              (a: any, b: any) => +a?.second_ordering - +b?.second_ordering
            );
            return (
              <ServiceProducts
                key={k}
                id={`service_${s.id}`}
                icon={
                  s?.icon ? (
                    <Image width={32} height={32} src={s.icon} alt={s.name} />
                  ) : (
                    <></>
                  )
                }
                brandname={s.name}
                data={serviceData || []}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Service;
