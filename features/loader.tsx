import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

export default function Loader() {
  return (
    <div role="status">
      <Skeleton className="w-8 h-8 rounded-full" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
