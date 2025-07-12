import Link from 'next/link';
import React from 'react';
import { fetchLayoutData } from '@/lib/api';

const Locations = async () => {
  const fallbackLocations = [
    { id: 1, location: 'Kathmandu' },
    { id: 2, location: 'Lalitpur' },
    { id: 3, location: 'Bhaktapur' },
    { id: 4, location: 'Pokhara' },
    { id: 5, location: 'Chitwan' },
    { id: 6, location: 'Biratnagar' },
    { id: 7, location: 'Dharan' },
    { id: 8, location: 'Butwal' },
  ];

  try {
    const result = await fetchLayoutData(
      'https://crm.technicalsewa.com/techsewa/publiccontrol/publicfaq/getLocation',
      fallbackLocations
    );

    const allLocation = result.data || fallbackLocations;
  } catch (error) {
    // Fallback handled in fetchLayoutData
  }

  const allLocation = fallbackLocations; // Always use fallback for now

  return (
    <>
      <div className="font-bold text-[14px] md:text-lg leading-[19px] text-[#FFF] font-Roboto text-left md:text-center mb-2">
        We Are Available in
      </div>
      {/* link of location */}
      <div className="">
        <div className=" font-Roboto font-normal text-[12px] md:text-base leading-[24px] text-[#FFF] pt-[8px]">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 px-[10px] md:px-[0px] gap-[10px] my-2">
            {allLocation.map((place: any) => (
              <Link
                key={place?.id}
                href="https://maps.app.goo.gl/Amw1dkqJgrt3ijNh8"
                className="hover:underline whitespace-nowrap"
                target="_blank"
              >
                {place?.location}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Locations;
