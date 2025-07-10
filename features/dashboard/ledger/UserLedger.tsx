'use client';
import usePagination from '@/hooks/usePagination';
import { api } from '@/lib/api';
import { apiClient } from '@/lib/catchfn';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { VscFilter } from 'react-icons/vsc';
import { CiGrid41 } from 'react-icons/ci';
import { FaList } from 'react-icons/fa6';
import { Complain } from '@/features/complain/my-complains/types';
import ComplainsFilter from '@/features/complain/my-complains/complainsFilter';
import TabularLedger from './TableLedger';
interface Transaction {
  description: string;
  amount_in: string;
  amount_out: string;
  created_on: string;
  username: string;
  call_id: string | null;
  cid: string | null;
}

export default function UserLedger() {
  const { push } = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const { page, setPage } = usePagination();
  const [totalData, setTotalData] = useState(0);
  const [data, setData] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState<any>({});
  const [isFilter, setisFilter] = useState(false);
  const [listype, setlistype] = useState('grid');
  const [profile, setProfile] = useState<any>({});
  const [profileLoaded, setProfileLoaded] = useState(false);
  useEffect(() => setPage(0), []);

  const getComplainsData = async () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0] as string;
    setLoading(true);
    const fdata = new FormData();
    fdata.append('page', `${page + 1}`);
    if (profile.dealer == '1') {
      user?.type &&
        fdata.append(
          'accounthead',
          `${profile.first_name} ${profile.last_name}`
        );
    } else {
      user?.type && fdata.append('accounthead', profile.sc_name);
    }
    fdata.append('fromdate', '2024-01-01');
    fdata.append('todate', formattedDate);

    const { data } = await api.post(
      '/techsewa/publiccontrol/getLedgerReportPublic',
      fdata
    );
    setTotalData(data.length);
    setData(data);
    setLoading(false);
  };

  const getProfile = async () => {
    const fdata = new FormData();
    if (user?.type === 'Technician') {
      fdata.append('tech_id', `${user.id}`);
    } else {
      fdata.append('id', `${user?.id === null ? user.cust_id : user?.id}`);
    }

    const { data } = await api.post(
      `/techsewa/publiccontrol/${user?.type === 'Technician' ? 'getTechnicianProfile' : 'getCustomerProfile'}`,
      fdata
    );

    setProfile(data);
    setProfileLoaded(true);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      getProfile(); // Call getProfile once user is set
    }
  }, [user]);

  useEffect(() => {
    if (profileLoaded) {
      getComplainsData(); // Call getComplainsData only after profile is loaded
    }
  }, [page, searchQuery, profileLoaded]); // Ensure it only depends on these

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      push('/');
    }
  }, [isAuthenticated, isLoading]);

  return (
    <div className="container mx-auto py-10 px-5">
      <div className="flex justify-between items-center w-full">
        <div>
          <h1 className="text-xl">Ledger Report</h1>
          <p className="text-xs text-gray-500">
            All the ledger are listed below
          </p>
        </div>
        <div className="flex justify-end flex-wrap items-center pb-4 lg:px-0 px-4 gap-3">
          <div className="flex gap-5">
            <div
              className={`flex items-center gap-1 justify-center rounded-lg ${isFilter === true ? 'border-primary border-2 bg-[#c1e7ef] text-primary' : 'border-gray-300 border bg-white'}  text-xs p-2 cursor-pointer   font-normal`}
              onClick={() => {
                setisFilter(!isFilter);
              }}
            >
              <VscFilter className="text-base" />
              <p className="text-xs">Filter</p>
            </div>
            <div
              className={`flex items-center gap-1 justify-center rounded-lg  text-xs p-2 ${listype === 'grid' ? 'border-primary border-2 bg-[#c1e7ef] text-primary' : 'border-gray-300 border bg-white'}  cursor-pointer font-normal`}
              onClick={() => setlistype('grid')}
            >
              <CiGrid41 className="text-base" />
            </div>
            <div
              className={`flex items-center gap-1 justify-center rounded-lg   text-xs p-2 ${listype === 'list' ? 'border-primary border-2 bg-[#c1e7ef] text-primary' : 'border-gray-300 border bg-white'}  cursor-pointer font-normal`}
              onClick={() => setlistype('list')}
            >
              <FaList className="text-base" />
            </div>
          </div>
        </div>
      </div>
      <hr className="my-4" />

      {isFilter && (
        <ComplainsFilter
          onSearch={setSearchQuery}
          onReset={() => setSearchQuery({})}
        />
      )}
      <TabularLedger
        loading={loading}
        data={data}
        page={page}
        setPage={setPage}
        total={totalData}
      />
    </div>
  );
}
