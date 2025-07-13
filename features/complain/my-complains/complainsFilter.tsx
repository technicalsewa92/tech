import { api } from '@/lib/api';
import React, { useEffect, useState } from 'react';

interface Iprops {
  onSearch: (q: any) => void;
  onReset: () => void;
}
export default function ComplainsFilter({ onSearch, onReset }: Iprops) {
  const [formData, setFormData] = useState<any>({});
  const [serviceData, setServiceData] = useState([]);
  const [productCategories, setProductCategories] = useState<any[]>([]);
  const getFilterPropsData = async () => {
    const { data: servicesData } = await api.get(
      '/techsewa/masterconfig/publicmasterconfig/getSliderListpop'
    );
    setServiceData(servicesData?.brands);
  };

  const getProductCategory = async (productId: string) => {
    const fdata = new FormData();
    fdata.append('product_id', productId);
    const { data: productCategories } = await api.post(
      '/techsewa/publicControl/GetProductcategiryByProduct',
      fdata
    );
    setProductCategories(productCategories);
  };

  useEffect(() => {
    getFilterPropsData();
  }, []);

  const handleChangeField = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const queryFormData = { ...formData, [name]: value };
    // reset product/product category on service change
    if (name === 'service_category') {
      delete queryFormData.product;
      delete queryFormData.product_category;
    }
    if (name === 'product') {
      delete queryFormData.product;
      setProductCategories([]);
      getProductCategory(value);
    }
    setFormData(queryFormData);
  };

  const handleSearchForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const query: any = {};
    for (const key of Object.keys(formData)) {
      formData[key] && (query[key] = formData[key]);
    }
    onSearch(query);
  };

  const uniqueServiceCatList = new Set();
  const serviceCatList = serviceData.filter((s: any) => {
    if (!uniqueServiceCatList.has(s.brand_name)) {
      uniqueServiceCatList.add(s.brand_name);
      return true;
    }
    return false;
  });

  const productsList = [...serviceData]?.filter(
    (s: any) => +s?.brand_id === +formData?.service_category
  );

  return (
    <div>
      <div className="p-5 bg-[#f0f1f5] rounded-lg">
        <form onSubmit={handleSearchForm}>
          <div className="space-x-2 flex flex-wrap">
            <div className="flex flex-col w-[180px]">
              <label
                className="block font-normal font-inter text-sm mb-2"
                htmlFor="call_id"
              >
                Call ID
              </label>
              <input
                className="p-2 border  h-[40px] rounded-lg text-base  border-[#A3A3A3]"
                type="text"
                name="call_id"
                id="call_id"
                onChange={handleChangeField}
              />
            </div>

            <div className="flex flex-col w-[180px]">
              <label
                className="block font-normal font-inter text-sm mb-2"
                htmlFor="customer_name"
              >
                Name
              </label>
              <input
                className="p-2 border  h-[40px] rounded-lg text-base  border-[#A3A3A3]"
                type="text"
                name="customer_name"
                id="customer_name"
                onChange={handleChangeField}
              />
            </div>
            {/* <div className="flex space-x-2">
              <label className="w-2/5" htmlFor="product">
                Product
              </label>
              <select
                name="product"
                id="product"
                className="flex-grow bg-white border-gray-300"
                onChange={handleChangeField}
              >
                {productsList?.map((i: any, k) => (
                  <option key={k} value={i?.product_id}>
                    {i?.product_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex space-x-2">
              <label className="w-2/5" htmlFor="reason">
                Reason
              </label>
              <input
                className="px-1 w-3/5"
                type="text"
                name="reason"
                id="reason"
                onChange={handleChangeField}
              />
            </div> */}
            <div className="flex flex-col w-[180px]">
              <label
                className="block font-normal font-inter text-sm mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                className="p-2 border  h-[40px] rounded-lg text-base  border-[#A3A3A3]"
                type="text"
                name="phone"
                id="phone"
                onChange={handleChangeField}
              />
            </div>
            {/* <div className="flex space-x-2">
              <label className="w-2/5" htmlFor="product_category">
                Product Category
              </label>
              <select
                name="product_category"
                id="product_category"
                className="flex-grow bg-white border-gray-300"
                onChange={handleChangeField}
              >
                {productCategories?.map((i: any, k) => (
                  <option key={k} value={i?.value}>
                    {i?.text}
                  </option>
                ))}
              </select>
            </div> */}
            <div className="flex flex-col">
              <label
                className="block font-normal font-inter text-sm mb-2"
                htmlFor="from_date"
              >
                From Date
              </label>
              <input
                className="p-2 border  h-[40px] rounded-lg text-base  border-[#A3A3A3]"
                type="date"
                name="from_date"
                id="from_date"
                onChange={handleChangeField}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block font-normal font-inter text-sm mb-2"
                htmlFor="to_date"
              >
                To Date
              </label>
              <input
                className="p-2 border  h-[40px] rounded-lg text-base  border-[#A3A3A3]"
                type="date"
                name="to_date"
                id="to_date"
                onChange={handleChangeField}
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              className="px-8 py-2 font-medium text-white rounded shadow transition-all duration-150 ease-linear outline-none bg-primary hover:shadow-md focus:outline-none sm:mr-2"
              type="submit"
            >
              Search
            </button>
            <button
              className="px-8 py-2 font-medium text-white bg-red-500 rounded shadow transition-all duration-150 ease-linear outline-none hover:shadow-md focus:outline-none sm:mr-2"
              type="reset"
              onClick={() => {
                setFormData({});
                setProductCategories([]);
                onReset();
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
