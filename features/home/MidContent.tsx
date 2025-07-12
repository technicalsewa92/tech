import { baseUrl } from '@/public/baseUrl';
import axios from 'axios';
import React from 'react';
import { createSanitizedHtml } from '../../utils/htmlSanitizer';

const MidContent = async () => {
  const desc = await axios.get(`${baseUrl}techsewa/publicControl/midcontent`);

  const paragraphs = desc?.data?.description?.split('</p>');
  return (
    <section className="bg-blue-600 py-16 w-full">
      <div className="max-w-[1280px] mx-auto w-full px-4">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6 text-white">
          {paragraphs?.map((paragraph: any, index: any) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
            >
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-sm font-semibold text-white">
                  {index + 1}
                </span>
              </div>
              <div
                className="text-white leading-relaxed mid-content-text"
                dangerouslySetInnerHTML={createSanitizedHtml(
                  `${paragraph}</p>`
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MidContent;
