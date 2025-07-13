'use client';
import React, { useEffect } from 'react';
import * as pixel from '@/lib/fpixel';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

export default function FacebookPixel() {
  const [loaded, setLoaded] = React.useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!loaded) return;

    pixel.pageview();
  }, [pathname, loaded]);

  return (
    <div>
      <Script
        id="fb-pixel"
        src="/scripts/pixel.js"
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
        data-pixel-id={pixel.FB_PIXEL_ID}
      />
    </div>
  );
}
