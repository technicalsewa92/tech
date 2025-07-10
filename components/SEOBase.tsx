export const SEOBase = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => {
  return (
    <>
      <title>{title ? `${title} | ` : ''} TechnicalSewa</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href="https://www.technicalsewa.com/" />

      <meta
        name="google-site-verification"
        content="s4Xt-ttgXFwLDQmM-b_pAkaY52cuovGGAnlXMPIGZRA"
      />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta
        name="keywords"
        content="technicalsewa, Technicalsewa and solution, Appliances Repair, popular Brands, Warranty Products, Electrician & Plumber, Air-Purifier/Humidifier, Mobiles & Tabs, cctv Repair Service, Computer/Printer, Medical Equipment, Drone Repair, Carpenter Service, Cleaning & Pest Control"
      />
      <meta
        name="author"
        content="TechnicalSewa,Professional Repair Services on Demand"
      />

      <meta property="og:locale" content="en_US" />
      <meta
        property="og:site_name"
        content=" technicalsewa.com Repair Services on Demand "
      />

      <meta charSet="UTF-8" />
      <meta name="theme-color" content="#005ae0" />

      <meta
        name="description"
        content={
          description ||
          'Welcome to Technical Sewa, a one-stop-shop for all of electronic repair needs. We specialize in repairing a wide range of appliances. '
        }
      />
    </>
  );
};
