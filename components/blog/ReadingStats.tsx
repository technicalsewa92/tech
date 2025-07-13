import React from 'react';
import { Clock, FileText } from 'lucide-react';

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
        <Clock className="mr-1 text-[#2591b2]" />
        <span>{readingTime}</span>
      </div>

      {wordCount && (
        <div className="flex items-center">
          <FileText className="mr-1 text-[#2591b2]" />
          <span>{wordCount.toLocaleString()} words</span>
        </div>
      )}
    </div>
  );
};

export default ReadingStats;
