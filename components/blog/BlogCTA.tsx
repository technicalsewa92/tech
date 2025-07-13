import React from 'react';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';

interface BlogCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  phoneNumber?: string;
  className?: string;
}

const BlogCTA: React.FC<BlogCTAProps> = ({
  title = 'Need Professional Help?',
  description = 'Our expert technicians are ready to assist you with all your technical needs.',
  buttonText = 'Book a Service',
  buttonLink = 'tel:9851201580',
  phoneNumber = '9851201580',
  className = '',
}) => {
  return (
    <div
      className={`bg-[#2591b2]/10 rounded-lg p-6 border border-[#2591b2]/20 ${className}`}
    >
      <h3 className="text-xl font-bold text-white bg-[#2591b2] inline-block px-4 py-2 rounded-md mb-3">
        {title}
      </h3>
      <p className="text-gray-600 mb-4">{description}</p>

      <div className="flex flex-wrap gap-4">
        <Link
          href={buttonLink}
          className="inline-flex items-center gap-2 bg-[#2591b2] text-white px-4 py-2 rounded-md hover:bg-[#1a7a96] transition-colors"
        >
          {buttonText} <ArrowRight />
        </Link>

        {phoneNumber && (
          <a
            href={`tel:${phoneNumber}`}
            className="inline-flex items-center gap-2 bg-white text-[#2591b2] border border-[#2591b2]/30 px-4 py-2 rounded-md hover:bg-[#2591b2]/5 transition-colors"
          >
            <Phone /> Call {phoneNumber}
          </a>
        )}
      </div>
    </div>
  );
};

export default BlogCTA;
