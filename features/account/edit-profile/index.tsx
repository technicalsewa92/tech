'use client';
import Loader from '@/features/loader';
import { api } from '@/lib/api';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import MapPicker from '../profile/pickmap';
import axios from 'axios';
import SearchableList from './SelectedItem';
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
export default function EditProfile() {
  const { push } = useRouter();
  const { user } = useAuthStore();
  const [profileLoading, setProfileLoading] = useState(true);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const isTechnician = user?.type === 'Technician';
  const [selectedPhoto, setSelectedPhoto] = useState<any>('');
  // technician attachments
  const [selectedCertificate, setSelectedCertificate] = useState<any>('');
  const [selectedContract, setSelectedContract] = useState<any>('');
  const [selectedCitzn, setSelectedCitzn] = useState<any>('');
  const [position, setposition] = useState({ lat: '', lng: '' });
  const getProfile = async () => {
    const fdata = new FormData();
    if (isTechnician) fdata.append('tech_id', `${user?.id}`);
    else fdata.append('id', `${user?.id === null ? user.cust_id : user?.id}`);
    const { data } = await api.post(
      `/techsewa/publiccontrol/${
        isTechnician ? 'getTechnicianProfile' : 'getCustomerProfile'
      }`,
      fdata
    );
    console.log(data);
    setFormData({
      ...(isTechnician
        ? {
            id: user?.id,
            name: data.sc_name,
            // skill: data?.skill ?? "",
            ctzn: data?.ctzn ?? '',
            certificate: data?.certificate ?? '',
            contract: data?.contract ?? '',
            phone: data?.sc_phone1 ?? '',
            mobile: data?.mobile ?? '',
            email: data?.sc_email ?? '',
            address: data?.sc_address ?? '',
          }
        : {
            firstname: data.first_name,
            lastname: data.last_name,
            cust_id: user?.id,
            phone: data?.mobile_number ?? '',
            address: data?.address ?? '',
            email: data?.email,
          }),
    });
    setProfileLoading(false);
  };
  useEffect(() => {
    if (!user) return;
    getProfile();
    fetchBrands();
  }, [user]);
  const [selectedbrandId, setselectedbrandId] = useState<string[]>([]);
  const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fdata = new FormData();
      for (const key of Object.keys(formData)) {
        fdata.append(key, formData[key]);
      }

      console.log(position?.lat);
      if (user?.type === 'Technician') {
        fdata.append('lat', position?.lat);
        fdata.append('long', position.lng);

        fdata.append('skill', selectedbrandId.join(','));
      }

      if (selectedPhoto) fdata.append('photo', selectedPhoto);
      if (selectedCertificate) fdata.append('certificate', selectedCertificate);
      selectedCitzn && fdata.append('ctzn', selectedCitzn);
      selectedContract && fdata.append('contract', selectedContract);
      if (user?.type === 'Technician') {
        await api.post('/techsewa/publiccontrol/updateTechnician', fdata);
      } else {
        await api.post('/techsewa/publiccontrol/updateCustomer', fdata);
      }

      toast('Profile data updated!');
      push('/userprofile');
    } catch (error: any) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePhotoField = (e: any) => {
    const file = e.target.files[0];
    setSelectedPhoto(file);
  };
  const [brands, setBrands] = useState<ProductDetails[]>([]);
  const fetchBrands = async () => {
    try {
      const response = await axios.get(
        `https://www.technicalsewa.com/techsewa/masterconfig/publicmasterconfig/getSliderListpop1`
      );
      const result = response?.data;
      const fetchNewBrands = result?.brands;
      setBrands(fetchNewBrands);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };
  const [selectedOptions, setSelectedOptions] = useState<ProductDetails[]>([]);

  // const options: Option[] = [
  //   { label: 'Item 1', value: 'item1' },
  //   { label: 'Item 2', value: 'item2' },
  //   { label: 'Item 3', value: 'item3' },
  //   { label: 'Item 4', value: 'item4' },
  // ];

  return (
    <div className="container py-4 mx-auto mb-10 md:max-w-3xl lg:!max-w-4xl">
      <div className="flex mb-2 space-x-3 space-y-2 max-md:flex-col max-md:!space-y-4 max-md:px-2">
        <div className="p-4 w-full rounded-sm border max-md:mt-3 max-sm:order-2 border-primary">
          <h2 className="text-2xl font-semibold">Update Profile</h2>
          {profileLoading && <Loader />}
          <div className="mt-4">
            <form
              onSubmit={handleUpdateProfile}
              className="grid grid-cols-6 gap-2 mt-2"
            >
              {isTechnician ? (
                <>
                  <div className="col-span-3">
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>

                    <input
                      type="text"
                      id="fullName"
                      name="name"
                      placeholder="Name"
                      className="py-2 pl-1 mt-1 w-full text-gray-700 rounded-sm border-b border-gray-200 shadow-sm outline-none placeholder:text-gray-600"
                      value={formData?.name}
                      onChange={handleChangeField}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="col-span-3 sm:col-span-3">
                    <label
                      htmlFor="FirstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>

                    <input
                      type="text"
                      id="FirstName"
                      name="firstname"
                      placeholder="First Name"
                      className="py-2 pl-1 mt-1 w-full text-gray-700 rounded-sm border-b border-gray-200 shadow-sm outline-none placeholder:text-gray-600"
                      value={formData?.firstname}
                      onChange={handleChangeField}
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-3">
                    <label
                      htmlFor="LastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>

                    <input
                      type="text"
                      id="LastName"
                      name="lastname"
                      className="py-2 pl-1 mt-1 w-full text-gray-700 rounded-sm border-b border-gray-200 shadow-sm outline-none placeholder:text-gray-600"
                      onChange={handleChangeField}
                      value={formData?.lastname}
                    />
                  </div>
                </>
              )}

              <div className="col-span-3">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  className="py-2 pl-1 mt-1 w-full text-gray-700 rounded-sm border-b border-gray-200 shadow-sm outline-none placeholder:text-gray-600"
                  onChange={handleChangeField}
                  value={formData?.email}
                />
              </div>

              {/* profile photo */}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Photo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profile
                </label>

                <input
                  type="file"
                  id="Photo"
                  name="photo"
                  className="py-2 pl-1 mt-1 w-full text-gray-700 rounded-sm border-b border-gray-200 shadow-sm outline-none placeholder:text-gray-600"
                  onChange={handleChangePhotoField}
                  // value={formData?.phone}
                />
              </div>

              {isTechnician && (
                <>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="citzn"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Citizenship
                    </label>

                    <input
                      type="file"
                      id="citzn"
                      name="citzn"
                      className="py-2 pl-1 mt-1 w-full text-gray-700 rounded-sm border-b border-gray-200 shadow-sm outline-none placeholder:text-gray-600"
                      onChange={e => setSelectedCitzn(e.target.files?.[0])}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="certficate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Certificate
                    </label>

                    <input
                      type="file"
                      id="certficate"
                      name="certficate"
                      className="py-2 pl-1 mt-1 w-full text-gray-700 rounded-sm border-b border-gray-200 shadow-sm outline-none placeholder:text-gray-600"
                      onChange={e =>
                        setSelectedCertificate(e.target.files?.[0])
                      }
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="contract"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contract
                    </label>

                    <input
                      type="file"
                      id="contract"
                      name="contract"
                      className="py-2 pl-1 mt-1 w-full text-gray-700 rounded-sm border-b border-gray-200 shadow-sm outline-none placeholder:text-gray-600"
                      onChange={e => setSelectedContract(e.target.files?.[0])}
                    />
                  </div>
                </>
              )}

              <div className="col-span-3">
                <label
                  htmlFor="Phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>

                <input
                  type="number"
                  id="Phone"
                  name="phone"
                  className="py-2 pl-1 mt-1 w-full text-gray-700 rounded-sm border-b border-gray-200 shadow-sm outline-none placeholder:text-gray-600 appearance-none"
                  onChange={handleChangeField}
                  value={formData?.phone}
                />
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="Mobile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile Number
                </label>

                <input
                  type="number"
                  id="Mobile"
                  name="mobile"
                  className="py-2 pl-1 mt-1 w-full text-gray-700 rounded-sm border-b border-gray-200 shadow-sm outline-none placeholder:text-gray-600"
                  onChange={handleChangeField}
                  value={formData?.mobile}
                />
              </div>
              {isTechnician && (
                <div className="col-span-6">
                  <label
                    htmlFor="Address"
                    className="block text-sm font-medium text-gray-700 pb-5"
                  >
                    Store Location
                  </label>
                  <MapPicker setNewPosition={setposition} />
                </div>
              )}

              <div className="col-span-3">
                <label
                  htmlFor="Address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>

                <input
                  id="Address"
                  name="address"
                  className="py-2 pl-1 mt-1 w-full text-gray-700 rounded-sm border-b border-gray-200 shadow-sm outline-none placeholder:text-gray-600"
                  onChange={handleChangeField}
                  value={formData?.address}
                />
              </div>

              {isTechnician && (
                <>
                  <div className="col-span-6">
                    <label
                      htmlFor="Address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Skill
                    </label>

                    <SearchableList setselectedbrandId={setselectedbrandId} />
                  </div>
                </>
              )}
              <div className="col-span-6">
                <button
                  disabled={loading}
                  type="submit"
                  className="px-4 py-2 max-w-max font-bold rounded border transition-all duration-100 border-primary hover:text-white hover:!bg-primary"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
