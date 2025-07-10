import ImageWithFallback from '@/components/ui/ImageWithFallback';
import React, { useEffect, useState } from 'react';
import Storelocation from './userLocation';
import { IoMdStar } from 'react-icons/io';
import { api } from '@/lib/api';
import useAuthStore from '@/store/useAuthStore';
import axios from 'axios';
interface ReviewList {
  list: {
    complain_id: string;
    review: string;
    rating: string;
    tech_name: string;
    tech_id: string;
    cust_id: string;
    customer_name: string;
    customer_image: string;
    tech_image: string;
  }[];
  total: string;
}
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
export default function TechnicianProfile({ profile }: { profile: any }) {
  const { user } = useAuthStore();

  const [data, setData] = useState<ReviewList | undefined>(undefined);

  const getComplainsData = async () => {
    try {
      // console.log(user?.type)
      const fdata = new FormData();

      user?.id && fdata.append('id', user.id);
      user?.type && fdata.append('type', 'Technician');

      const { data } = await api.post(
        '/techsewa/publiccontrol/publicComplain/getRatingDetails',
        fdata
      );
      // console.log(data)
      setData(data);
    } catch (error) {
      // console.log(error)
    }
    // console.log("data", data);
  };

  useEffect(() => {
    getComplainsData();
  }, [user, getComplainsData]);
  const [brands, setBrands] = useState<ProductDetails[]>([]);
  const [brandIds, setBrandIds] = useState<string>(profile.skill); // Example: Comma-separated string of brand_ids
  const [matchedBrands, setMatchedBrands] = useState<ProductDetails[]>([]);

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
  const filterBrandsByIds = (brandIdsString: string | null | undefined) => {
    const idsArray = (brandIdsString ?? '').split(','); // Use an empty string if null/undefined
    const matched = brands.filter(brand => idsArray.includes(brand.product_id)); // Find matching brands
    setMatchedBrands(matched);
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Use effect to filter brands when the brandIds state changes
  useEffect(() => {
    filterBrandsByIds(brandIds);
  }, [brandIds, brands, filterBrandsByIds]);
  return (
    <>
      <div className="py-2 mt-1 flex flex-wrap gap-3 text-sm w-full pb-10">
        <div className=" bg-gray-100 rounded-sm border p-1 flex gap-2 px-5 md:w-[45%] w-[100%]">
          <strong>Name: </strong>
          <span>{profile?.sc_name}</span>
        </div>
        <div className=" bg-gray-100 rounded-sm border  p-1 flex gap-2 px-5 md:w-[45%] w-[100%]">
          <strong>Email: </strong>
          <span>{profile?.sc_email}</span>
        </div>
        <div className=" p-1 flex gap-2 px-5 bg-gray-100 rounded-sm border md:w-[45%] w-[100%]">
          <strong>Mobile: </strong>
          <span>{profile?.mobile}</span>
        </div>
        {profile?.sc_phone1 && (
          <div className=" p-1 flex gap-2 px-5 bg-gray-100 rounded-sm border md:w-[45%] w-[100%]">
            <strong>Phone: </strong>
            <span>{profile?.sc_phone1}</span>
          </div>
        )}
        <div className=" p-1 flex gap-2 px-5 bg-gray-100 rounded-sm border md:w-[45%] w-[100%]">
          <strong>Address: </strong>
          <span>{profile?.sc_address}</span>
        </div>
        <div className=" p-1 flex flex-col gap-2 px-5 bg-gray-100 rounded-sm border md:w-[45%] w-[100%]">
          <strong>Skill: </strong>
          <div className="flex flex-wrap gap-3">
            {matchedBrands.map((e, i) => {
              return <span key={i}>{e.product_name}</span>;
            })}
          </div>
        </div>
        {profile?.certificate !== null ? (
          <div className=" p-1 flex flex-col gap-2 px-5 bg-gray-100 rounded-sm border md:w-[45%] w-[100%]">
            <strong>Certificate: </strong>
            <ImageWithFallback
              src={profile?.certificate}
              alt=""
              className="w-full h-[200px] object-cover"
              width={200}
              height={200}
            />
          </div>
        ) : (
          <></>
        )}
        {profile?.certificate !== null ? (
          <div className=" p-1 flex flex-col gap-2 px-5 bg-gray-100 rounded-sm border md:w-[45%] w-[100%]">
            <strong>contract: </strong>
            <ImageWithFallback
              src={profile?.contract}
              alt=""
              className="w-full h-[200px] object-cover"
              width={200}
              height={200}
            />
          </div>
        ) : (
          <></>
        )}
        {profile?.ctzn !== null ? (
          <div className=" p-1 flex flex-col gap-2 px-5 bg-gray-100 rounded-sm border md:w-[45%] w-[100%]">
            <strong>Citizenship: </strong>
            <ImageWithFallback
              src={profile?.ctzn}
              alt=""
              className="w-full h-[200px] object-cover"
              width={200}
              height={200}
            />
          </div>
        ) : (
          <></>
        )}
        {profile.lat === null || profile.lat === undefined ? (
          <></>
        ) : (
          <div className=" p-1 flex flex-col gap-2 px-5 bg-gray-100 rounded-sm border md:w-[45%] w-[100%]">
            <strong>Store Location: </strong>
            <Storelocation lat={profile.lat} long={profile.long} />
          </div>
        )}
        <div className=" p-1 flex flex-col gap-2 px-5 bg-gray-100 rounded-sm border md:w-[45%] w-[100%]">
          <strong>Reveiws: </strong>
          {data !== undefined ? (
            <>
              {data.list.map((e, i) => {
                return (
                  <div key={i} className="flex gap-3 mt-2">
                    <ImageWithFallback
                      src={e.customer_image}
                      alt=""
                      className="w-[70px] h-[70px] object-cover rounded-full"
                      width={70}
                      height={70}
                    />
                    <div className="flex flex-col ">
                      <p>{e.customer_name}</p>
                      <div className="flex gap-1">
                        {[...Array(e.rating)].map((e, i) => {
                          return (
                            <IoMdStar
                              key={i}
                              className="text-yellow-500 text-base"
                            />
                          );
                        })}
                      </div>
                      <p className="text-sm text-gray-500">{e.review}</p>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
