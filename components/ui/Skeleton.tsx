import React from 'react';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
  rounded?: string; // e.g. "rounded", "rounded-lg"
}

/**
 * Universal Skeleton Loader
 * Usage: <Skeleton className="w-32 h-6" rounded="rounded-lg" />
 *
 * For a lighter, YouTube-like effect, we use bg-gray-100/80 and a subtle gradient.
 */
const Skeleton = ({
  className = '',
  style = {},
  rounded = 'rounded-md',
}: SkeletonProps) => (
  <div
    className={`animate-pulse bg-gray-100/80 dark:bg-gray-700/30 bg-gradient-to-r from-gray-100/80 via-gray-200/60 to-gray-100/80 ${rounded} ${className}`}
    style={style}
  />
);

export default Skeleton;
