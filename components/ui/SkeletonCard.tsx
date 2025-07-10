import React from 'react';
import Skeleton from './Skeleton';

/**
 * SkeletonCard - Card-style skeleton for grid/list placeholders
 * Usage: <SkeletonCard />
 */
const SkeletonCard = () => (
  <div className="flex flex-col gap-2 w-full">
    <Skeleton className="w-full h-32 rounded-md" />
    <Skeleton className="w-3/4 h-5 rounded" />
    <div className="flex gap-2">
      <Skeleton className="w-1/3 h-4 rounded" />
      <Skeleton className="w-1/4 h-4 rounded" />
    </div>
  </div>
);

export default SkeletonCard;
