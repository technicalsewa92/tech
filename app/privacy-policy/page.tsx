import Nav from '@/components/Nav';
import Footer from '@/components/footer/Footer';
import React from 'react';
import Image from 'next/image';
import './page.css';
import { fetchServerClient } from '@/lib/api';
import { createSanitizedHtml } from '../../utils/htmlSanitizer';
import { getAssetUrl } from '@/lib/cdn';

const page = async () => {
  let privacyPolicyData = `
    <h2>Privacy Policy</h2>
    <p>At Technical Sewa, we are committed to protecting your privacy and ensuring the security of your personal information.</p>
    
    <h3>Information We Collect</h3>
    <p>We collect information you provide directly to us, such as when you contact us for services, create an account, or request information about our repair services.</p>
    
    <h3>How We Use Your Information</h3>
    <p>We use the information we collect to:</p>
    <ul>
      <li>Provide, maintain, and improve our repair services</li>
      <li>Process and complete service requests</li>
      <li>Send you technical notices and support messages</li>
      <li>Respond to your comments and questions</li>
    </ul>
    
    <h3>Information Sharing</h3>
    <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this privacy policy.</p>
    
    <h3>Contact Us</h3>
    <p>If you have any questions about this Privacy Policy, please contact us at info@technicalsewa.com</p>
  `;

  try {
    const data = await fetchServerClient('/techsewa/publicControl/privacy');

    if (data && typeof data === 'string' && data.trim().length > 0) {
      privacyPolicyData = data;
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        'Privacy policy data unavailable, using fallback:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
    // privacyPolicyData already has fallback content
  }
  return (
    <div>
      {/* <div className="  md:h-[200px] xsm:h-[100px] text-white text-5xl flex items-center">
        <h2 className="xsm:w- md:w-[800px] m-auto text-center font-extrabold xsm:text-2xl  lg:text-4xl">
          Privacy Policy
        </h2>
      </div> */}
      <div className="relative h-[200px] md:h-[350px]">
        <Image
          src={getAssetUrl('/assets/Aboutus.jpg')}
          alt="Privacy Policy"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] text-white font-semibold text-[40px] md:text-[60px]">
          <h1>Privacy Policy</h1>
        </div>
      </div>

      <div className="w-full px-10 lg:px-0 m-auto text-justify content text-lg  my-10 max-w-[70rem]">
        <div dangerouslySetInnerHTML={createSanitizedHtml(privacyPolicyData)} />
      </div>
    </div>
  );
};

export default page;

export async function generateMetadata() {
  return {
    title: `Privacy Policy | Technical sewa`,
  };
}
