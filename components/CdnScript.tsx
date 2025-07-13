'use client';

import { useEffect } from 'react';

interface CdnScriptProps {
  src: string;
  async?: boolean;
  defer?: boolean;
  id?: string;
  onLoad?: () => void;
}

/**
 * Component to load scripts in client components
 * CDN functionality disabled - uses local paths only
 */
export default function CdnScript({
  src,
  async = true,
  defer = true,
  id,
  onLoad,
}: CdnScriptProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = src; // Use local path directly
    script.async = async;
    script.defer = defer;
    if (id) script.id = id;

    if (onLoad) {
      script.onload = onLoad;
    }

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [src, async, defer, id, onLoad]);

  return null;
}
