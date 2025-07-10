import React, { Suspense } from 'react';
import SearchResults from '@/components/SearchResults';
import Skeleton from '@/components/ui/Skeleton';

const SearchPage = () => {
  return (
    <Suspense fallback={<Skeleton className="w-full h-16 rounded-md mb-4" />}>
      <SearchResults />
    </Suspense>
  );
};

export default SearchPage;
