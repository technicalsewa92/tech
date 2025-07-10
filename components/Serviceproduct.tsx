import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Element as ScrollElement } from "react-scroll";

interface IProps {
  id: string;
  icon: React.ReactElement;
  brandname: string;
  data: any[];
}

const ServiceProducts = ({ id, icon, brandname, data }: IProps) => {
  return (
    <ScrollElement
      name={id}
      id={id}
      className="hidden md:block service-section"
    >
      <div className="service-section-header">
        <div className="service-section-title">
          {icon}
          <span>{brandname}</span>
        </div>
        <p className="service-section-description">
          Professional {brandname.toLowerCase()} services with expert technicians and genuine parts.
        </p>
      </div>

      <div className="service-products-grid">
        {data?.map((value: any, index: any) => (
          <a
            key={index}
            href={`/service/${value?.url_product_name}`}
            className={`service-product-card ${
              !value.product_name ? "hidden" : ""
            }`}
          >
            {value.image_url && (
              <Image
                width={100}
                height={100}
                className="service-product-image"
                src={value.image_url}
                alt={value.alt2 || value.product_name}
                loading="lazy"
              />
            )}
            <h3 className="service-product-name">{value.product_name}</h3>
          </a>
        ))}
      </div>
    </ScrollElement>
  );
};

export default ServiceProducts;
