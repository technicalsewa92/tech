import '@/styles/service-pages.css';
import Nav from '@/components/Nav';
import Footer from '@/components/footer/Footer';
import Service from '@/components/pageHelperComponents.js/Service';
import { fetchServerClient } from '@/lib/api';
import React from 'react';

const page = async () => {
  let servicesData = { brands: [] };
  let data = [];

  try {
    const response = await fetchServerClient(
      `/techsewa/masterconfig/publicmasterconfig/getServiceList`
    );
    if (response?.brands && Array.isArray(response.brands)) {
      servicesData = response;
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        'Services data unavailable:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
    // servicesData already has fallback
  }

  try {
    const result = await fetchServerClient(
      `/techsewa/masterconfig/publicmasterconfig/getSliderListpop1`
    );
    if (result?.brands && Array.isArray(result.brands)) {
      data = result.brands;
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        'Slider data unavailable:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
    // data already has fallback (empty array)
  }

  return (
    <>
      <Service services={servicesData?.brands} data={data} />
    </>
  );
};

export default page;

export async function generateMetadata() {
  return {
    title: `Service | Technical sewa`,
  };
}
