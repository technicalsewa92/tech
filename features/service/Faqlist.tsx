'use client';

import { baseUrl } from '@/public/baseUrl';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { createSanitizedHtml } from '../../utils/htmlSanitizer';

const Faqlist = ({ filteredId }: any) => {
  // handling FAQ state.
  const [faqData, setFaqData] = useState([]);
  const [openIndex, setOpenIndex] = useState(0);

  // FAQ toggle function
  const handleToggle = (index: number) => {
    setOpenIndex(index === openIndex ? 0 : index);
  };

  const FAQ = async () => {
    const formData = new FormData();
    formData.append('product_id', filteredId);

    const result = await axios
      .post(`${baseUrl}/techsewa/publicControl/publicfaq/getFaqList`, formData)
      .then(res => res?.data.list);

    setFaqData(result);
  };

  useEffect(() => {
    FAQ();
  }, []);

  return (
    <div className="faq-section max-w-7xl mx-auto px-3 sm:px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-0.5 w-8 bg-primary rounded-full"></div>
          <span className="text-primary font-medium text-sm uppercase tracking-wide">
            FAQs
          </span>
          <div className="h-0.5 w-8 bg-primary rounded-full"></div>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary text-center mb-8">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="faq-content space-y-4">
        {faqData?.map((item: any, index) => (
          <div
            key={index}
            className={`faq-item bg-white rounded-xl shadow-sm transition-all duration-300 overflow-hidden ${openIndex === index ? 'ring-2 ring-primary' : ''}`}
          >
            <button
              className={`faq-question w-full text-left flex justify-between items-center px-4 py-4 sm:px-6 sm:py-5 font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary transition-none bg-transparent border-0 shadow-none`}
              onClick={() => handleToggle(index)}
            >
              <span>{item.question}</span>
              <span className="text-primary flex-shrink-0 ml-4">
                {openIndex === index ? (
                  <Minus className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </span>
            </button>
            <div
              className={`faq-answer px-4 pb-4 sm:px-6 transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
            >
              <div dangerouslySetInnerHTML={createSanitizedHtml(item.answer)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqlist;
