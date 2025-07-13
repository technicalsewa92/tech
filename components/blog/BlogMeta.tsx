import React from 'react';
import { FiCalendar, FiUser, FiClock, FiFileText } from 'react-icons/fi';

interface BlogMetaProps {
  author?: string;
  date?: string;
  readingTime?: string;
  wordCount?: number;
  className?: string;
}

const BlogMeta: React.FC<BlogMetaProps> = ({
  author = 'Technicalsewa',
  date,
  readingTime,
  wordCount,
  className = '',
}) => {
  // Format date if provided
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <div
      className={`flex flex-wrap items-center gap-4 text-sm text-gray-600 ${className}`}
    >
      <div className="flex items-center gap-4 flex-wrap">
        {author && (
          <div className="flex items-center">
            <FiUser className="mr-1 text-[#2591b2]" />
            <span className="text-[#2591b2] font-medium">{author}</span>
          </div>
        )}

        {formattedDate && (
          <div className="flex items-center">
            <FiCalendar className="mr-1 text-[#2591b2]" />
            <span>{formattedDate}</span>
          </div>
        )}

        {readingTime && (
          <div className="flex items-center">
            <FiClock className="mr-1 text-[#2591b2]" />
            <span>{readingTime}</span>
          </div>
        )}

        {wordCount && (
          <div className="flex items-center">
            <FiFileText className="mr-1 text-[#2591b2]" />
            <span>{wordCount.toLocaleString()} words</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogMeta;
