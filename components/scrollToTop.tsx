"use client";
import { usePathname } from "next/navigation";
import React from "react";

export default function AutoScrollToTop() {
  const pathname = usePathname();

  React.useEffect(() => {
    // Check if the current URL is not "/service"
    if (pathname !== "/service") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <></>;
}
