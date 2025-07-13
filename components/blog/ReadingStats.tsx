import React from 'react';
import { FiClock, FiFileText } from 'react-icons/fi';

interface ReadingStatsProps {
  readingTime: string;
  wordCount?: number;
  className?: string;
}

const ReadingStats: React.FC<ReadingStatsProps> = ({
  readingTime,
  wordCount,
  className = '',
}) => {
  return (
    <div
      className={`flex items-center gap-4 text-sm text-gray-600 ${className}`}
    >
      <div className="flex items-center">
        <FiClock className="mr-1 text-[#2591b2]" />
        <span>{readingTime}</span>
      </div>

      {wordCount && (
        <div className="flex items-center">
          <FiFileText className="mr-1 text-[#2591b2]" />
          <span>{wordCount.toLocaleString()} words</span>
        </div>
      )}
    </div>
  );
};

export default ReadingStats;
