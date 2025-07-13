import dynamic from 'next/dynamic';

const Search = dynamic(() => import('./Search'), {
  loading: () => <div className="h-12 bg-gray-200 animate-pulse rounded" />,
  ssr: false,
});

export default Search;
