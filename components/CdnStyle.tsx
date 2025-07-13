'use client';

import { useEffect } from 'react';

interface CdnStyleProps {
  href: string;
  id?: string;
  media?: string;
}

/**
 * Component to load CSS in client components
 * CDN functionality disabled - uses local paths only
 */
export default function CdnStyle({ href, id, media = 'all' }: CdnStyleProps) {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href; // Use local path directly
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
