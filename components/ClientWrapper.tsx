"use client";

import dynamic from "next/dynamic";

const LazyClientRenderer = dynamic(
  () => import("@/features/lazyClientRenderer"),
  { ssr: false }
);

export default function ClientWrapper() {
  return <LazyClientRenderer />;
}
