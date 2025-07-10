'use client';

import dynamic from 'next/dynamic';

// Dynamically import client components with ssr: false
export const TableOfContents = dynamic(
  () => import('@/components/blog/EnhancedTableOfContents'),
  { ssr: false }
);

export const SocialShare = dynamic(
  () => import('@/components/blog/SocialShare'),
  { ssr: false }
);

export const ReadingProgressBar = dynamic(
  () => import('@/components/blog/ReadingProgressBar'),
  { ssr: false }
);

export const FloatingShareButton = dynamic(
  () => import('@/components/blog/FloatingShareButton'),
  { ssr: false }
);

export const BackToTopButton = dynamic(
  () => import('@/components/blog/BackToTopButton'),
  { ssr: false }
);

export const PrintButton = dynamic(
  () => import('@/components/blog/PrintButton'),
  { ssr: false }
);
