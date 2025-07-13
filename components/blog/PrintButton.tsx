'use client';

import React from 'react';
import { Printer } from 'lucide-react';

interface PrintButtonProps {
  className?: string;
  buttonText?: string;
}

const PrintButton: React.FC<PrintButtonProps> = ({
  className = '',
  buttonText = 'Print Article',
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className={`flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors ${className}`}
      aria-label="Print this article"
    >
      <Printer />
      <span>{buttonText}</span>
    </button>
  );
};

export default PrintButton;
