import React, { useEffect, useRef, useState } from 'react';
import { ImageWithFallback } from '@/components/ui';
import { X } from 'lucide-react';
import { Star } from 'lucide-react';
import StoreLocation from '@/features/account/profile/userLocation';
import { api } from '@/lib/api';
import useAuthStore from '@/store/useAuthStore';
import NewSkillDetail from '@/app/professionals/NewSkillDetail';
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

const ProfessionalsCardModal = ({
  email,
  address,
  name,
  image,
  lat,
  long,
  id,
  skills,
  brands,
}: any) => {
  const myDialog = useRef<HTMLDialogElement>(null);
  const { user, isAuthenticated, isLoading } = useAuthStore();
  // console.log(id)
  // console.log(lat)
  const [tab, settab] = useState('rating');
  useEffect(() => {
    if (myDialog) {
      myDialog?.current?.showModal();
    }
  }, []);
  const [data, setData] = useState<ReviewList | undefined>(undefined);

  const getComplainsData = async () => {
    try {
      // console.log(user?.type)
      const fdata = new FormData();

      fdata.append('id', id);
      fdata.append('type', 'Technician');

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
  // console.log(skills)
  return (
    <div>
      <dialog
        ref={myDialog}
        id="myDialog"
        data-modal
        className="border-none  bg-[white] md:w-[45vw] w-full md:px-[24px] md:py-[10px] rounded-md "
      >
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-1 w-full items-start">
            <h3 className="text-primary text-[18px] lg:text-[24px] font-bold">
              {name}
            </h3>
            <div className="flex gap-4 items-center w-full ">
              <div className="p-0.5  w-[20%]">
                <ImageWithFallback
                  src={image}
                  alt=""
                  className="object-cover w-24 h-24 rounded-md  border border-primary"
                  width={96}
                  height={96}
                />
              </div>
              <div className="w-[70%]">
                <p className="text-black font-medium text-[14px]">
                  <span className="font-bold">Address: </span>
                  {address}
                </p>

                <div>
                  {skills === null ? (
                    <></>
                  ) : (
                    <>
                      <p className="text-black font-medium text-[14px] w-full ">
                        <span className="font-bold">
                          Expert for Repair and Maintenance Services:{' '}
                        </span>
                        <NewSkillDetail
                          skills={skills}
                          brands={brands}
                          isDetails={true}
                        />
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-4 w-full items-center justify-center">
              <p
                className={`text-[16px]  px-2 py-1 border-[2px] ${tab === 'rating' ? 'bg-primary cursor-pointer text-white' : 'text-primary'} border-[#2591b2] hover:text-white hover:bg-primary`}
                onClick={() => {
                  settab('rating');
                }}
              >
                Ratings
              </p>
              <p
                className={`text-[16px]   px-2 py-1 border-[2px] ${tab === 'map' ? 'bg-primary cursor-pointer text-white' : 'text-primary'} border-[#2591b2] cursor-pointer hover:text-white hover:bg-primary`}
                onClick={() => {
                  settab('map');
                }}
              >
                Locations
              </p>
            </div>
            {tab === 'rating' ? (
              <div className="w-full flex flex-wrap justify-start items-start gap-2">
                {data !== undefined ? (
                  <>
                    {data.list.map((e, i) => {
                      return (
                        <div
                          key={i}
                          className="flex gap-3 mt-2 border rounded-md p-2 w-[48%]"
                        >
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
                              {[...Array(parseInt(e.rating))].map((e, i) => {
                                return (
                                  <Star
                                    key={i}
                                    className="text-yellow-500 text-base"
                                  />
                                );
                              })}
                            </div>
                            <p className="text-sm text-gray-500">{e.review} </p>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <div className="w-full">
                {lat === null ? <></> : <StoreLocation lat={lat} long={long} />}
              </div>
            )}
          </div>

          <X
            size={16}
            className="text-[#8C8C8C]"
            onClick={() => myDialog?.current?.close()}
          />
        </div>
      </dialog>
    </div>
  );
};

export default ProfessionalsCardModal;
