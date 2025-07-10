import React from 'react';
import { FiCalendar } from 'react-icons/fi';
import { formatDate } from '@/utils/blogUtils';

interface LastUpdatedProps {
  date: string;
  className?: string;
}

const LastUpdated: React.FC<LastUpdatedProps> = ({ date, className = '' }) => {
  if (!date) return null;

  const formattedDate = formatDate(date);

  return (
    <div className={`text-sm text-gray-600 italic ${className}`}>
      <div className="flex items-center">
        <FiCalendar className="mr-1 text-[#2591b2]" />
        <span>Last updated on {formattedDate}</span>
      </div>
    </div>
  );
};

export default LastUpdated;
