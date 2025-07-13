'use client';

import React, { useEffect, useState } from 'react';
import PopupBanner from './pop-up/PopUp';

export default function ClientWrapper() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render client-side components after hydration
  if (!isClient) {
    return null;
  }

  return (
    <>
      <PopupBanner />
    </>
  );
}
