import React from 'react';
import ServiceSlider from '@/components/slider/Slider';

interface Brand {
  id: number;
  name: string;
}

interface Data {
  brand_id: number;
  // Add other properties as needed
}

export default function ServicesSliders({
  brands,
  data,
}: {
  brands: Brand[];
  data: Data[];
}) {
  // Filter out specific brands
  const filteredBrands =
    brands?.filter((b: Brand) => ![62, 76, 61, 67, 78].includes(b?.id)) || [];

  // Helper to get services for a brand
  const servicesByBrandId = (brandId: number) =>
    data?.filter((d: Data) => +d?.brand_id === brandId) || [];

  // Modern card style for each brand slider
  return (
    <section className="w-full py-16 min-h-[30vh] bg-inherit">
      <div className="max-w-[1280px] mx-auto w-full px-4">
        {/* Top Sliders for special categories */}
        {/* Show only one service type (first with data) and 5 services under it */}
        {(() => {
          const topItems = [
            { id: 62, name: 'Appliances Repairs' },
            { id: 76, name: 'Popular Brands Repair' },
            { id: 61, name: 'Warranty Repairs' },
            { id: 67, name: 'Medical Equipment Repair' },
          ];
          const firstWithData = topItems.find(
            item => servicesByBrandId(item.id).length
          );
          if (!firstWithData) return null;
          const services = servicesByBrandId(firstWithData.id).slice(0, 5);
          return (
            <div style={{ paddingTop: 40, margin: 40 }}>
              <h3
                className="text-primary font-bold text-[20px] leading-tight text-left m-0 p-0 mb-2"
                style={{
                  marginBottom: 10,
                  marginTop: 30,
                  paddingBottom: 10,
                  paddingTop: 10,
                }}
              >
                {firstWithData.name}
              </h3>
              <ServiceSlider
                data={services}
                service={
                  <span className="text-primary font-bold text-[20px] leading-tight">
                    {firstWithData.name}
                  </span>
                }
                topSliders
              />
            </div>
          );
        })()}
        {/* Brand Sliders */}
        <div className="flex flex-col gap-0 m-0 p-0">
          {filteredBrands.map(brand => {
            const services = servicesByBrandId(brand.id);
            if (!services.length) return null;
            return (
              <div key={brand.id} className="w-full m-0 p-0">
                <h4
                  className="text-primary font-bold text-[20px] leading-tight text-left m-0 p-0 mb-2"
                  style={{
                    marginBottom: 10,
                    marginTop: 30,
                    paddingBottom: 10,
                    paddingTop: 10,
                  }}
                >
                  {brand.name}
                </h4>
                <div style={{ height: 245, margin: 0, padding: 0 }}>
                  <ServiceSlider data={services} service={brand.name} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
