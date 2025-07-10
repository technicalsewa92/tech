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
      <div className=" border border-solid border-white font-semibold text-[12px] md:text-base leading-[19px] text-[#FFF] font-Roboto text-center bg-primary shadow-xl max-w-[300px] flex justify-center items-center px-[40px] h-[43px] absolute left-[50%] tranform translate-x-[-50%] top-[-4%] md:top-[-9%] rounded-md">
        We Are Available in
      </div>
      {/* link of location */}
      <div className="">
        <div className=" font-Roboto font-normal text-[12px] md:text-base leading-[24px] text-[#FFF] pt-[8px]">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 px-[10px] md:px-[0px] gap-[10px] my-2">
            {allLocation.map((place: any) => (
              <Link
                key={place?.id}
                href={{
                  pathname: `/location/technicalsewa-service-center-${place?.location
                    ?.toLowerCase()
                    .split(' ')
                    .join('-')} `,
                }}
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
