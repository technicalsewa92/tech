import React from 'react';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  centerAlign?: boolean;
}

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  subtitle,
  className = '',
  centerAlign = true,
}) => {
  const baseClasses = centerAlign ? 'text-center mb-6' : 'mb-6';

  return (
    <div className={`page-title-container ${baseClasses} ${className}`}>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        {title}
      </h1>
      {subtitle && <p className="text-lg text-gray-600 mt-2">{subtitle}</p>}
    </div>
  );
};

export default PageTitle;
