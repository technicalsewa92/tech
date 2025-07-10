import React from 'react';
import Skeleton from './Skeleton';

/**
 * SkeletonServiceCard - Skeleton loader for a single service card (e.g. for Professional Repair Services)
 * Usage: <SkeletonServiceCard />
 */
const SkeletonServiceCard = () => (
  <div className="flex flex-col gap-3 p-4 bg-white rounded-lg shadow h-full">
    <Skeleton className="w-full h-32 mb-2" rounded="rounded-md" />
    <Skeleton className="w-2/3 h-5 mb-1" rounded="rounded" />
    <Skeleton className="w-1/2 h-4 mb-2" rounded="rounded" />
    <div className="flex gap-2 mt-auto">
      <Skeleton className="w-1/4 h-4" rounded="rounded" />
      <Skeleton className="w-1/4 h-4" rounded="rounded" />
    </div>
  </div>
);

export default SkeletonServiceCard;
