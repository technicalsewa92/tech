'use client';

import React, { useEffect, useState } from 'react';

interface ReadingProgressBarProps {
  targetElement?: string;
  color?: string;
  height?: number;
  zIndex?: number;
  position?: 'top' | 'bottom';
}

const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({
  targetElement = '#blog-content',
  color = '#2591b2', // brand color
  height = 4,
  zIndex = 50,
  position = 'top',
}) => {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const content = document.querySelector(targetElement);
    if (!content) return;

    const scrollListener = () => {
      const element = content;
      const totalHeight = element.clientHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      // How far have we scrolled in the content element
      const offset = element.getBoundingClientRect().top;
      const readableHeight = totalHeight - windowHeight;
      const currentProgress =
        (scrollTop - (scrollTop + offset - windowHeight)) / readableHeight;

      // Ensure progress is between 0 and 100
      setReadingProgress(Math.min(100, Math.max(0, currentProgress * 100)));
    };

    window.addEventListener('scroll', scrollListener);
    return () => window.removeEventListener('scroll', scrollListener);
  }, [targetElement]);

  return (
    <div
      className="fixed left-0 transition-all duration-100 ease-linear"
      style={{
        [position]: 0,
        height: `${height}px`,
        width: `${readingProgress}%`,
        backgroundColor: color,
        zIndex: zIndex,
      }}
      aria-hidden="true"
    />
  );
};

export default ReadingProgressBar;
