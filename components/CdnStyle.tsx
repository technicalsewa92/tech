'use client';

import { useEffect } from 'react';
import { getAssetUrl } from '@/lib/cdn';

interface CdnStyleProps {
  href: string;
  id?: string;
  media?: string;
}

/**
 * Component to load CSS from CDN in client components
 */
export default function CdnStyle({ href, id, media = 'all' }: CdnStyleProps) {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = getAssetUrl(href);
    link.type = 'text/css';
    link.media = media;
    if (id) link.id = id;

    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [href, id, media]);

  return null;
}
