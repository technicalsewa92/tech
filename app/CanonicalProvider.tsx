'use client';

import { usePathname } from 'next/navigation';

const CanonicalProvider = () => {
  const pathname = usePathname();
  const canonicalUrl = `https://www.technicalsewa.com${pathname}`;

  return <link rel="canonical" href={canonicalUrl} />;
};

export default CanonicalProvider;
