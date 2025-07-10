import Nav from '@/components/Nav';
import Footer from '@/components/footer/Footer';
import Image from 'next/image';
import { fetchServerClient } from '@/lib/api';
import { getAssetUrl } from '@/lib/cdn';
import React from 'react';
import { createSanitizedHtml } from '../../utils/htmlSanitizer';

const page = async () => {
  let termsData = `
    <h2>Terms and Conditions</h2>
    <p>Welcome to Technical Sewa. These terms and conditions outline the rules and regulations for the use of our services.</p>
    
    <h3>Acceptance of Terms</h3>
    <p>By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement.</p>
    
    <h3>Service Terms</h3>
    <p>Our repair and maintenance services are provided subject to the following terms:</p>
    <ul>
      <li>Services are provided by qualified technicians</li>
      <li>All repairs come with a warranty period</li>
      <li>Payment is due upon completion of service</li>
      <li>We use only genuine spare parts when available</li>
    </ul>
    
    <h3>Limitation of Liability</h3>
    <p>Technical Sewa shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
    
    <h3>Contact Information</h3>
    <p>For questions about these Terms and Conditions, please contact us at info@technicalsewa.com</p>
  `;

  try {
    const data = await fetchServerClient('/techsewa/publicControl/terms');

    if (data && typeof data === 'string' && data.trim().length > 0) {
      termsData = data;
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        'Terms data unavailable, using fallback:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
    // termsData already has fallback content
  }
  return (
    <>
      <div>
        <div className="relative h-[200px] md:h-[350px]">
          <Image
            src={getAssetUrl('/assets/Aboutus.jpg')}
            alt="Terms and Conditions"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] text-white font-semibold text-[40px] md:text-[60px]">
            <h1>Terms and Conditions</h1>
          </div>
        </div>
        <div className="w-full px-10 lg:px-0 m-auto text-justify content text-lg  my-10 max-w-[70rem]">
          <div dangerouslySetInnerHTML={createSanitizedHtml(termsData)} />
        </div>
      </div>
    </>
  );
};

export default page;

export async function generateMetadata() {
  return {
    title: `Terms and Conditions | Technical sewa`,
  };
}
