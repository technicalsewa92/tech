import React from 'react';
import Footer from '@/components/footer/Footer';
import Nav from '@/components/Nav';
import Image from 'next/image';
import PageTitle from '@/components/ui/PageTitle';
import RecommendedServicesServer from '@/components/RecommendedServicesServer';
import ReviewsDisplay from '@/components/ReviewsDisplay';
import { createSanitizedHtml } from '../../utils/htmlSanitizer';
import { getAssetUrl } from '@/lib/cdn';
import './about.css';

const About = async () => {
  let aboutUsData = {
    brands: [
      {
        description: `
        <h2>About Technical Sewa</h2>
        <p>Technical Sewa is a premier service provider for home appliance repair and maintenance. 
        We specialize in professional repair services for all major appliance brands including Samsung, LG, Sony, and many more.</p>
        
        <p>Our team of certified technicians brings years of experience and expertise to every service call. 
        We are committed to providing reliable, affordable, and high-quality repair services for our customers.</p>
        
        <h3>Our Services</h3>
        <ul>
          <li>Appliance Repair and Maintenance</li>
          <li>AC Installation and Servicing</li>
          <li>Electronic Device Repairs</li>
          <li>Professional Training Programs</li>
        </ul>
        
        <p>We believe in providing excellent customer service and ensuring complete satisfaction with every repair job.</p>
      `,
      },
    ],
  };

  try {
    const response = await fetch(
      'https://www.technicalsewa.com/techsewa/masterconfig/publicmasterconfig/GetAboutUs',
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
        signal: AbortSignal.timeout(5000), // 5 second timeout
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const text = await response.text();
    try {
      const data = JSON.parse(text);
      if (data?.brands?.[0]?.description) {
        aboutUsData = data;
      }
    } catch (parseError) {
      throw new Error(`Invalid JSON response`);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        'About us data unavailable, using fallback:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
    // aboutUsData already has fallback content
  }

  return (
    <div>
      <div className="relative h-[200px] md:h-[350px]">
        <Image
          src={getAssetUrl('/assets/Aboutus.jpg')}
          alt="About Us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] text-white font-semibold text-[40px] md:text-[60px]">
          <h1>About Us</h1>
        </div>
      </div>
      <div className="w-full px-10 lg:px-0 m-auto text-justify content my-10 max-w-[70rem] text-lg">
        <div
          className="about"
          dangerouslySetInnerHTML={createSanitizedHtml(
            aboutUsData?.brands[0].description
          )}
        />
      </div>

      {/* Customer Reviews Section */}
      <div className="max-w-[1280px] mx-auto px-4 py-16">
        <ReviewsDisplay
          limit={4}
          showStats={true}
          title="What Our Customers Say About Technical Sewa"
          layout="grid"
          className=""
        />
      </div>

      {/* Recommended Services Section */}
      <RecommendedServicesServer
        title="Our Professional Services"
        limit={6}
        className="bg-gray-50"
      />
    </div>
  );
};

export default About;

export async function generateMetadata() {
  // const seocontet = await fetch(
  //   "https://www.technicalsewa.com/techsewa/publiccontrol/publicmasterconfig/getSeoContent?url=https://www.technicalsewa.com/blogs"
  // );
  // const seocontetdata:[] = await seocontet.json();

  return {
    title: `About Us | Technical sewa`,
  };
}
