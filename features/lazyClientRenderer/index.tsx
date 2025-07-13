'use client';
import FacebookPixel from '@/components/FacebookPixel';
import CallToWhatsapp from '@/components/CallToWhatsapp';
import React from 'react';
import { Toaster } from 'react-hot-toast';
// import FacebookMessenger from '@/components/FacebookMessenger';

export default function LazyClientRenderer() {
  return (
    <>
      <FacebookPixel />
      <Toaster />
      {/* <FacebookMessenger /> */}
      <CallToWhatsapp />
    </>
  );
}
