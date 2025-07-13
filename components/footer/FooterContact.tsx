'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { BsFillTelephoneFill } from 'react-icons/bs';
import CallbackFormModal from './Request';
const FooterContact = () => {
  const [open, setopen] = useState(false);
  const onClose = () => {
    setopen(false);
  };
  return (
    <section className="footer-contact-section bg-white-100 md:block hidden py-20 w-full">
      <CallbackFormModal open={open} onClose={onClose} />
      <div className="max-w-[1280px] mx-auto w-full px-4 flex flex-col md:flex-row items-stretch gap-8">
        {/* Left: Contact Info and CTA */}
        <div className="flex-1 flex flex-col justify-center text-center md:text-left">
          {/* Section Header */}
          <div className="mb-10 w-full">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="h-0.5 w-8 bg-primary rounded-full"></div>
              <span className="text-primary font-medium text-sm uppercase tracking-wide">
                Need Help?
              </span>
              <div className="h-0.5 w-8 bg-primary rounded-full"></div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight mb-4">
              Can't find your desired service?
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Let us know 24/7 and we'll help you find the perfect solution for
              your repair needs. Our team is always ready to assist you with any
              technical issue—big or small.
            </p>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center md:justify-start mb-6">
            <button
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow"
              onClick={() => setopen(true)}
            >
              🛠️ Request a Service
            </button>
            <a
              href="tel:9851201580"
              className="bg-white border border-primary text-primary hover:bg-primary/10 px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow flex items-center justify-center gap-2"
            >
              <BsFillTelephoneFill size={20} />
              Call Us
            </a>
          </div>
          {/* Contact Info */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm flex flex-col items-center md:items-start w-full max-w-md mx-auto md:mx-0 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <BsFillTelephoneFill className="text-white" size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Call Us Now</h4>
                <p className="text-primary font-semibold text-lg">9851201580</p>
              </div>
            </div>
            <span className="text-gray-500 text-sm">
              Available 24/7 for your convenience
            </span>
          </div>
        </div>
        {/* Right: Google Map */}
        <div className="flex-1 flex items-center justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113072.89921964439!2d85.1674291972656!3d27.670068299999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb191011dd10b1%3A0x92f063afe7e0a48f!2sTechnical%20Sewa%20%26%20Solution!5e0!3m2!1sen!2snp!4v1751969676343!5m2!1sen!2snp"
            width="100%"
            height="350"
            className="border-0 rounded-xl max-w-[600px] min-w-[250px]"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Technical Sewa Location Map"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default FooterContact;
