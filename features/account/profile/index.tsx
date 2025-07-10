'use client';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { api } from '@/lib/api';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import TechnicianProfile from './technicianProfile';
import CustomerProfile from './customerProfile';
import Loader from '@/features/loader';

export default function UserProfile() {
  const { push } = useRouter();
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<any>({});
  const handleEditClick = () => push('/profile/edit');
  const handleChangePassClick = () => push('/account/change-password');
  const [loading, setLoading] = useState(true);
  const isTechnician = user?.type === 'Technician';
  const getProfile = async () => {
    const fdata = new FormData();
    // console.log(user)
    if (isTechnician) fdata.append('tech_id', `${user?.id}`);
    else fdata.append('id', `${user?.id === null ? user.cust_id : user?.id}`);
    const { data } = await api.post(
      `/techsewa/publiccontrol/${
        isTechnician ? 'getTechnicianProfile' : 'getCustomerProfile'
      }`,
      fdata
    );
    setProfile(data);
    setLoading(false);
  };
  useEffect(() => {
    if (user) getProfile();
  }, [user, getProfile]);

  return (
    <div className="container py-4 mx-auto md:max-w-6xl px-4 ">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-xl  font-semibold text-gray-800 ">My Profile</h1>
        </div>
      </div>

      <div className="w-full rounded-md bg-gradient-to-r p-3 from-[#faf7f0] to-[#ebedf9]  mt-2">
        <div className="flex md:flex-row flex-col justify-between items-center">
          <div>
            <div className="flex gap-1 items-center">
              <div className="h-20 w-20 rounded-full  ml-5">
                <ImageWithFallback
                  src={profile.photo}
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                  width={80}
                  height={80}
                />
              </div>
              <div className="flex mt-1 pl-5 flex-col">
                <h1 className="font-semibold text-lg">{user?.name}</h1>
                <p className="text-xs text-gray-500">{user?.mobile}</p>
              </div>
            </div>
          </div>
          <div className="flex  space-x-1 mt-3">
            <button
              disabled={loading}
              className="px-4 py-2 h-[40px] w-[100px] font-bold text-white rounded shadow transition-all duration-150 ease-linear outline-none bg-primary hover:shadow-md focus:outline-none sm:mr-2 disabled:opacity-60"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              disabled={loading}
              className=" py-2 h-[40px] w-[170px] font-bold rounded border transition-all duration-100 border-primary hover:text-white hover:!bg-primary disabled:opacity-60"
              onClick={handleChangePassClick}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      <hr className="my-2" />
      <div className="pl-5 rounded-sm   w-full  ">
        {loading ? (
          <Loader />
        ) : isTechnician ? (
          <TechnicianProfile profile={profile} />
        ) : (
          <CustomerProfile profile={profile} />
        )}
      </div>

      {/* action btns */}

      <div></div>
    </div>
  );
}
