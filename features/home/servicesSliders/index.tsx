'use client';

import React from 'react';
import ServiceSlider from './slider';
import Slider from '@/components/slider/Slider';

export default function ServicesSLiders({
  brands,
  data,
}: {
  brands: any[];
  data: any[];
}) {
  // let pairBrands = brands?.length > 1 ? [...brands].slice(1) : [];
  let pairBrands = brands?.length > 1 ? [...brands] : [];

  // remove for appliances, popular brands, warranty repair
  pairBrands = pairBrands.filter((b: any) => b?.id !== 62);
  pairBrands = pairBrands.filter((b: any) => b?.id !== 76);
  pairBrands = pairBrands.filter((b: any) => b?.id !== 61);
  pairBrands = pairBrands.filter((b: any) => b?.id !== 67);
  // remove E-Commerce since it doesn't have image associated with it.
  pairBrands = pairBrands.filter((b: any) => b?.id !== 78);

  const numberOfPairs = Math.ceil(pairBrands.length / 2);

  const warrantyRepairServices = [...data]?.filter(
    (d: any) => +d?.brand_id === 61 // "warranty Repairs"
  );
  const appliancesServices = [...data]?.filter(
    (d: any) => +d?.brand_id === 62 // "Appliances Repairs"
  );
  const popularBrandsServices = [...data]?.filter(
    (d: any) => +d?.brand_id === 76 // specified id for "Popular Brands Repair"
  );
  const medicalEquipmentServices = [...data]?.filter(
    (d: any) => +d?.brand_id === 67 // specified id for "Medical Equipment Repair"
  );

  const popularBrand = brands?.find((b: any) => b?.id === 76);
  const applianceRepair = brands?.find((b: any) => b?.id === 62);
  const warrantyRepair = brands?.find((b: any) => b?.id === 61);
  const medicalEquipmentRepair = brands?.find((b: any) => b?.id === 67);

  console.log('appliancesServices', appliancesServices);

  return (
    <div className="w-full bg-inherit">
      <div className="max-w-[1280px] mx-auto w-full px-4">
        {/* ...existing code... */}
        {/* {[
        brands?.length > 0 &&
          [brands[0]].map((b: any, k) => {
            const services = data?.filter((d: any) => +d?.brand_id === b?.id);
            return (
              <ServiceSlider key={k} index={k} service={b?.name} data={services} />
            );
          }),
      ]} */}

        {appliancesServices.length > 0 && (
          <>
            <h4
              className="text-primary font-bold text-[20px] leading-tight text-left m-0 p-0 mb-2"
              style={{
                marginBottom: 8,
                marginTop: 10,
                paddingBottom: 0,
                paddingTop: 0,
              }}
            >
              {applianceRepair?.name}
            </h4>
            <Slider data={appliancesServices} />
          </>
        )}

        {popularBrandsServices.length > 0 && (
          <>
            <h4
              className="text-primary font-bold text-[20px] leading-tight text-left m-0 p-0 mb-2"
              style={{
                marginBottom: 8,
                marginTop: 10,
                paddingBottom: 0,
                paddingTop: 0,
              }}
            >
              {popularBrand?.name}
            </h4>
            <Slider data={popularBrandsServices} />
          </>
        )}

        {warrantyRepairServices.length > 0 && (
          <>
            <h4
              className="text-primary font-bold text-[20px] leading-tight text-left m-0 p-0 mb-2"
              style={{
                marginBottom: 8,
                marginTop: 10,
                paddingBottom: 0,
                paddingTop: 0,
              }}
            >
              {warrantyRepair?.name}
            </h4>
            <Slider data={warrantyRepairServices} />
          </>
        )}

        {medicalEquipmentServices.length > 0 && (
          <>
            <h4
              className="text-primary font-bold text-[20px] leading-tight text-left m-0 p-0 mb-2"
              style={{
                marginBottom: 8,
                marginTop: 10,
                paddingBottom: 0,
                paddingTop: 0,
              }}
            >
              {medicalEquipmentRepair?.name}
            </h4>
            <Slider data={medicalEquipmentServices} />
          </>
        )}

        <div className="w-full">
          {/* Group brands into pairs for side-by-side rendering if both have <=2 items */}
          {(() => {
            const pairs = [];
            for (let i = 0; i < pairBrands.length; i += 2) {
              pairs.push([pairBrands[i], pairBrands[i + 1]].filter(Boolean));
            }
            return pairs.map((pair, pairIdx) => {
              // Get services for each brand in the pair
              const brandServicesArr = pair.map(brand =>
                data?.filter((d: any) => +d?.brand_id === brand?.id)
              );
              // If both brands exist and both have 2 or fewer items, render side by side
              const brandServices0 = brandServicesArr[0] || [];
              const brandServices1 = brandServicesArr[1] || [];
              if (
                pair.length === 2 &&
                brandServices0.length <= 2 &&
                brandServices1.length <= 2
              ) {
                return (
                  <div
                    key={pair.map(b => b.id).join('-')}
                    className="flex flex-row gap-x-12 w-full mb-8"
                  >
                    <div key={pair[0].id} className="flex-1">
                      <h4
                        className="text-primary font-bold text-[20px] leading-tight text-left m-0 p-0 mb-2"
                        style={{
                          marginBottom: 8,
                          marginTop: 10,
                          paddingBottom: 0,
                          paddingTop: 0,
                        }}
                      >
                        {pair[0]?.name}
                      </h4>
                      <Slider data={brandServices0} />
                    </div>
                    <div key={pair[1].id} className="flex-1">
                      <h4
                        className="text-primary font-bold text-[20px] leading-tight text-left m-0 p-0 mb-2"
                        style={{
                          marginBottom: 8,
                          marginTop: 10,
                          paddingBottom: 0,
                          paddingTop: 0,
                        }}
                      >
                        {pair[1]?.name}
                      </h4>
                      <Slider data={brandServices1} />
                    </div>
                  </div>
                );
              } else {
                // Otherwise, render each brand as a full row
                return pair.map((brand, idx) => {
                  const brandServices = brandServicesArr[idx] || [];
                  if (!brandServices.length) return null;
                  return (
                    <div
                      key={brand.id}
                      className="w-full m-0"
                      style={{
                        marginTop: pairIdx === 0 && idx === 0 ? 20 : 0,
                        marginBottom: 20,
                      }}
                    >
                      <h4
                        className="text-primary font-bold text-[20px] leading-tight text-left m-0 p-0 mb-2"
                        style={{
                          marginBottom: 8,
                          marginTop: 10,
                          paddingBottom: 0,
                          paddingTop: 0,
                        }}
                      >
                        {brand?.name}
                      </h4>
                      <Slider data={brandServices} />
                    </div>
                  );
                });
              }
            });
          })()}
        </div>
      </div>
    </div>
  );
}
// <ServicePairs numberOfPairs={numberOfPairs} data={data} pairBrands={pairBrands}/>
// single slider
// {brands?.length > 1 &&
//   [...brands].slice(1)?.map((b: any, k) => {
//     const services = data?.filter((d: any) => d?.brand_name === b);
//     return (
//       <ServiceSlider key={k} index={k} service={b} data={services} />
//     );
//   })}
