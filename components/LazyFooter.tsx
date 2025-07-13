import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('./footer/Footer'), {
  loading: () => <footer className="h-32 bg-gray-200 animate-pulse rounded" />,
  ssr: true,
});

export default Footer;
