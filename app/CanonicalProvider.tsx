"use client";

import { usePathname } from "next/navigation";
import Head from "next/head";

const CanonicalProvider = () => {
  const pathname = usePathname();
  console.log("pathname",pathname)
  const canonicalUrl = `https://www.technicalsewa.com${pathname}`;

  return (
    <>
      {/* <Head> */}
        <link rel="canonical" href={canonicalUrl} />
      {/* </Head> */}

    </>
  );
};

export default CanonicalProvider;
