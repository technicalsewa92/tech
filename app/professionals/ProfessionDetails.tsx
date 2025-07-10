'use client';

import ProfessionalsCardButton from '@/components/ProfessionalsCardButton';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import NewSkillDetail from './NewSkillDetail';
interface ProductDetails {
  display_type: string;
  ordering: string;
  second_ordering: string;
  descp2: string;
  brand_id: string;
  brand_name: string;
  alt: string;
  image_url: string;
  title: string;
  product_id: string;
  url_product_name: string;
  product_name: string;
  alt2: string;
  prod_sec_content: string;
}
export default function ProfessionDetails({ professionalsData }: any) {
  const [brands, setBrands] = useState<ProductDetails[]>([]);
  const [searchQuery, setSearchQuery] = useState(''); // State to capture search input
  const [filteredProfessionals, setFilteredProfessionals] = useState(
    professionalsData.sort((a: any, b: any) => {
      const orderA = a.ordering ? parseInt(a.ordering) : Infinity;
      const orderB = b.ordering ? parseInt(b.ordering) : Infinity;
      return orderA - orderB;
    })
  );
  // console.log(filteredProfessionals);
  // Example: Comma-separated string of brand_ids

  // Fetch the brands from the API
  const fetchBrands = async () => {
    try {
      const response = await axios.get(
        `https://www.technicalsewa.com/techsewa/masterconfig/publicmasterconfig/getSliderListpop1`
      );
      const result = response?.data;
      const fetchNewBrands = result?.brands || [];
      setBrands(fetchNewBrands);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  // Function to filter brands by brand IDs

  useEffect(() => {
    fetchBrands();
  }, []);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = professionalsData.filter(
      (professional: any) =>
        professional.sc_name.toLowerCase().includes(query) ||
        professional.tech_name?.toLowerCase().includes(query) // Optional chaining for null safety
    );
    setFilteredProfessionals(filtered);
  };
  // Use effect to filter brands when the brandIds state changes

  return (
    <>
      <div className="flex w-full gap-10 flex-wrap items-center">
        <h2 className="text-sm md:text-[31px] text-center md:text-left">
          Our Professionals
        </h2>
        <input
          type="text"
          placeholder="Search professionals by name..."
          value={searchQuery}
          onChange={handleSearch}
          className="border px-3 py-2 rounded md:w-[40vw] w-[50vw]"
        />
      </div>
      <div className="grid grid-cols-1 gap-10 px-2 py-4 md:grid-cols-3 md:py-8 md:px-0">
        {filteredProfessionals.map((s: any, index: any) => (
          <div
            key={index}
            className="flex flex-col border-[1px] rounded-xl p-2 md:px-8 shadow-lg shadow-gray-400"
          >
            <div className="flex items-center   md:py-4 gap-3 lg:gap-8 ">
              {/* image  */}
              <div className="flex-1">
                <ImageWithFallback
                  src={s.photo}
                  alt="image"
                  className="w-full h-[180px] object-cover rounded-xl "
                  width={200}
                  height={180}
                />
              </div>
              <div className="flex flex-col flex-1 gap-2 md:gap-5">
                <h3 className="text-primary text-[17px] font-bold">
                  {s.sc_name}
                </h3>
                {/* three small button */}
                {/* <div className="flex text-[15px] text-primary">
            {s?.skill?.split(",")?.map((skill: string, i: number) => (
              <button
                key={i}
                className="bg-[#e8ebf4] px-[9px] py-[2px] rounded-sm"
              >
                {skill}
              </button>
            ))}
            <a
              href="tel:9851201580"
              className="flex items-center justify-center  gap-[5px] h-[40px] w-full border border-[#2591B2] rounded-[2px] text-black"
            >
              <BsFillTelephoneFill className="text-primary" size={20} />
              {s?.mobile}
            </a>
          </div> */}
                <div className="gap-0 flex flex-col">
                  <p>{s.tech_name}</p>
                </div>
                <div className="gap-0 flex flex-col">
                  <p>{s.sc_address}</p>
                </div>

                {/* <p>{s.}</p> */}
                {/* book now and view button */}
                <div className="flex gap-2 text-[12px]">
                  <a
                    href="/service"
                    className="text-white whitespace-nowrap bg-primary rounded-md px-2 py-1 md:px-[17px] md:py-[6px] hover:scale-105"
                  >
                    Book Now
                  </a>
                  <ProfessionalsCardButton
                    name={s.sc_name}
                    address={s.sc_address}
                    email={s.sc_email}
                    image={s.photo}
                    lat={s.lat}
                    long={s.long}
                    id={s.sc_id}
                    skills={s.skill}
                    brands={brands}
                  />
                </div>
              </div>
            </div>
            <NewSkillDetail skills={s.skill} brands={brands} />
          </div>
        ))}
      </div>
    </>
  );
}
