'use client';
import usePagination from '@/hooks/usePagination';
import { api } from '@/lib/api';
import { apiClient } from '@/lib/catchfn';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ComplainsTable from './complainsTable';
import { Complain } from './types';
import ComplainsFilter from './complainsFilter';
import { Filter } from 'lucide-react';
import { Grid } from 'lucide-react';
import { List } from 'lucide-react';
import TabularComplains from './tabularComplains';
import SideNav from '@/features/dashboard/SideNavBar';
import { Menu } from 'lucide-react';

export default function UserComplains() {
  const { push } = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const { page, setPage } = usePagination();
  const [totalData, setTotalData] = useState(0);
  const [data, setData] = useState<Complain[]>([]);
  const [searchQuery, setSearchQuery] = useState<any>({});
  const [isFilter, setisFilter] = useState(false);
  const [listype, setlistype] = useState('list');

  useEffect(() => setPage(0), []);

  const getComplainsData = async () => {
    if (!user) return;
    console.log('page', page);
    // setPage(0)
    if (page != 0) {
      setLoading(true);
      const fdata = new FormData();
      fdata.append('page', `${page}`);
      user?.id && fdata.append('id', user?.id);
      user?.type && fdata.append('type', user?.type);
      for (const key of Object.keys(searchQuery)) {
        searchQuery[key] && fdata.append(key, searchQuery[key]);
      }

      try {
        const { data } = await api.post(
          '/techsewa/publiccontrol/getComplain',
          fdata
        );
        setData(data?.list || []);
        setTotalData(data?.total || 0);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (user) {
      getComplainsData();
    }
  }, [user, page, searchQuery]);

  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated) push("/");
  // }, [isAuthenticated, isLoading]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-gray-800 bg-opacity-50 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
        onClick={toggleSidebar}
      >
        <div className="w-64 bg-white h-full shadow-lg pt-16">
          <SideNav />
        </div>
      </div>

      <div className="container mx-auto py-10 px-5">
        <div className="flex gap-2">
          <Menu className="text-2xl md:hidden" onClick={toggleSidebar} />

          <h1 className="text-xl">Complains List </h1>
        </div>
        <p className="text-xs text-gray-500">
          All the complains are listed below
        </p>
        <hr className="my-4" />
        <div className="flex justify-between flex-wrap items-center pb-4 lg:px-0 px-4 gap-3">
          <div className="flex md:gap-5 gap-1 flex-wrap">
            <div className="flex gap-2 items-center">
              <p className="text-sm">All</p>
              <div className="flex items-center justify-center rounded-lg border-primary border-2 text-xs p-2 bg-[#c1e7ef] text-primary font-semibold">
                {totalData}
              </div>
            </div>
          </div>
          <div className="flex gap-5">
            <div
              className={`flex items-center gap-1 justify-center rounded-lg ${isFilter === true ? 'border-primary border-2 bg-[#c1e7ef] text-primary' : 'border-gray-300 border bg-white'}  text-xs p-2 cursor-pointer   font-normal`}
              onClick={() => {
                setisFilter(!isFilter);
              }}
            >
              <Filter className="text-base" />
              <p className="text-xs">Filter</p>
            </div>
            <div
              className={`flex items-center gap-1 justify-center rounded-lg  text-xs p-2 ${listype === 'grid' ? 'border-primary border-2 bg-[#c1e7ef] text-primary' : 'border-gray-300 border bg-white'}  cursor-pointer font-normal`}
              onClick={() => setlistype('grid')}
            >
              <Grid className="text-base" />
            </div>
            <div
              className={`flex items-center gap-1 justify-center rounded-lg   text-xs p-2 ${listype === 'list' ? 'border-primary border-2 bg-[#c1e7ef] text-primary' : 'border-gray-300 border bg-white'}  cursor-pointer font-normal`}
              onClick={() => setlistype('list')}
            >
              <List className="text-base" />
            </div>
          </div>
        </div>
        {isFilter && (
          <ComplainsFilter
            onSearch={setSearchQuery}
            onReset={() => setSearchQuery({})}
          />
        )}
        {listype === 'grid' ? (
          <ComplainsTable
            loading={loading}
            data={data}
            page={page}
            setPage={setPage}
            total={totalData}
          />
        ) : (
          <TabularComplains
            loading={loading}
            data={data}
            page={page}
            setPage={setPage}
            total={totalData}
          />
        )}
      </div>
    </>
  );
}
