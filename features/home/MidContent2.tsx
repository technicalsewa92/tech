import { baseUrl } from '@/public/baseUrl';
import axios from 'axios';
import React from 'react';
import parse from 'html-react-parser';

const MidContent2 = async () => {
  let desc = null;
  let paragraphs = '';
  let updatedParagraphs = '';
  try {
    desc = await axios.get(`${baseUrl}techsewa/publicControl/bottomcontent`);
    paragraphs = desc?.data?.description
      .replace(/<li>\s*<p>/g, '<li>')
      .replace(/<\/p>\s*<\/li>/g, '</li>')
      .replace(/<ul>/g, '<ul class="list-disc pl-5 space-y-1">');
    updatedParagraphs = paragraphs.replace(
      '<h4><span style="font-size: 14pt;">Your One-Stop Solution for Appliance Repair &amp; Maintenance</span></h4>',
      '<h1 class="text-2xl md:text-3xl font-bold text-white mb-4 text-center">Your One-Stop Solution for Appliance Repair &amp; Maintenance</h1>'
    );
    // Optionally log for debugging
    // console.log('paragraphs', paragraphs, desc.data);
    // console.log('updatedparagraphs', updatedParagraphs);
  } catch (error) {
    console.error('Failed to fetch bottom content:', error);
    // Optionally set updatedParagraphs to fallback content
    updatedParagraphs =
      '<p class="text-white">Content is currently unavailable. Please try again later.</p>';
  }

  return (
    <section className="bg-primary py-16 w-full" id="tsewa_about_ex">
      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
          <div className="font-normal leading-relaxed text-white footerup">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* About Text */}
              <div className="flex-1 mid-content2-content">
                <h2
                  className="text-2xl md:text-4xl font-extrabold text-white mb-6 text-center md:text-left px-5"
                  style={{ paddingLeft: 20, paddingRight: 20 }}
                >
                  About Technical Sewa
                </h2>
                <p className="mb-4">
                  <strong>Technical Sewa</strong> is Nepals leading provider of
                  professional repair and maintenance services for home
                  appliances, electronics, and more. With a commitment to
                  quality, reliability, and customer satisfaction, we have built
                  a reputation as the trusted choice for thousands of households
                  and businesses across the country.
                </p>
                <p className="mb-4">
                  Our team of certified technicians brings years of experience
                  and technical expertise to every job, ensuring that your
                  devices and appliances are repaired quickly and correctly. We
                  use only genuine parts and the latest diagnostic tools to
                  deliver lasting solutions for washing machines, refrigerators,
                  TVs, mobiles, and a wide range of other products.
                </p>
              </div>
              {/* Responsive Video */}
              <div className="flex-1 w-full max-w-xl mx-auto">
                <div className="rounded-xl overflow-hidden shadow-lg border-2 border-white/20 w-full min-h-[220px] md:min-h-[340px] flex items-center justify-center bg-black">
                  <iframe
                    src="https://www.youtube.com/embed/9gbBDQHrOBk"
                    title="Technical Sewa Introduction Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full min-h-[220px] md:min-h-[340px] aspect-video"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MidContent2;
