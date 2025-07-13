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
import NepaliDate from 'nepali-date-converter';

export default function NewComplains({ status, title }: any) {
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
    setLoading(true);
    const fdata = new FormData();
    const todayAD = new Date();

    // Convert today's AD date to Nepali date (BS)
    const todayBS = new NepaliDate(todayAD);
    const nepaliYear = todayBS.getYear();
    const nepaliMonth = todayBS.getMonth();

    // First day of the Nepali month in BS and convert to AD
    const firstDayBS = new NepaliDate(nepaliYear, nepaliMonth, 1);
    const firstDateAD = firstDayBS.toJsDate();

    // Find the last day of the Nepali month by incrementing day
    let day = 1;
    let lastValidDateBS;
    while (true) {
      try {
        const testDateBS = new NepaliDate(nepaliYear, nepaliMonth, day);
        lastValidDateBS = testDateBS; // Store the last valid date
        day++;
      } catch (error) {
        break; // Stop when we reach an invalid date
      }
    }

    // Convert the last valid Nepali date to AD if it's defined
    const lastDateAD = lastValidDateBS
      ? lastValidDateBS.toJsDate()
      : new Date();

    // Format dates to "YYYY-MM-DD"
    const formatADDate = (date: any) =>
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    const firstADFormatted = formatADDate(firstDateAD);
    const lastADFormatted = lastValidDateBS
      ? formatADDate(lastDateAD)
      : 'Invalid date';

    fdata.append('page', '1');
    user?.id && fdata.append('id', user?.id);
    user?.type && fdata.append('type', user?.type);
    if (status == '1' || status == '5') {
    } else {
      fdata.append('from_date', firstADFormatted);
      fdata.append('to_date', lastADFormatted);
    }
    fdata.append('call_status', status);
    for (const key of Object.keys(searchQuery)) {
      searchQuery[key] && fdata.append(key, searchQuery[key]);
    }

    const { data } = await api.post(
      '/techsewa/publiccontrol/getComplain',
      fdata
    );
    setTotalData(data?.total);
    setData(data?.list);
    // console.log("data", data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) getComplainsData();
  }, [user, page, searchQuery]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) push('/');
  }, [isAuthenticated, isLoading]);
  console.log('Id', user?.id);
  console.log(user?.type);
  return (
    <div className="container mx-auto py-10 px-5">
      <h1 className="text-xl">{title} </h1>
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
  );
}
