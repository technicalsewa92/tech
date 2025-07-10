'use client';

import { useEffect } from 'react';
import { getAssetUrl } from '@/lib/cdn';

interface CdnScriptProps {
  src: string;
  async?: boolean;
  defer?: boolean;
  id?: string;
  onLoad?: () => void;
}

/**
 * Component to load scripts from CDN in client components
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
    script.src = getAssetUrl(src);
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
