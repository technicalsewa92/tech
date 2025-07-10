'use client';

import React, { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

interface BackToTopButtonProps {
  threshold?: number;
  position?: 'left' | 'right';
  bottom?: number;
  zIndex?: number;
}

const BackToTopButton: React.FC<BackToTopButtonProps> = ({
  threshold = 400,
  position = 'right',
  bottom = 20,
  zIndex = 40,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed ${position === 'right' ? 'right-4' : 'left-4'} bottom-${bottom} bg-[#2591b2] hover:bg-[#1a7a96] text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-${zIndex}`}
      aria-label="Back to top"
      title="Back to top"
    >
      <FiArrowUp size={20} />
    </button>
  );
};

export default BackToTopButton;
