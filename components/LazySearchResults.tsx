import dynamic from 'next/dynamic';

const SearchResults = dynamic(() => import('./SearchResults'), {
  loading: () => <div className="h-32 bg-gray-200 animate-pulse rounded" />,
  ssr: false,
});

export default SearchResults;
