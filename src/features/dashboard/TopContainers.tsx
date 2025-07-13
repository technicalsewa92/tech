import { api } from '@/lib/api';
import useAuthStore from '@/store/useAuthStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import NepaliDate from 'nepali-date-converter';
import { useCustomerSales } from '@/lib/api';

interface OrderStatus {
  data: Array<any>;
  length: number;
}

interface OrderList {
  pending: OrderStatus;
  confirmed: OrderStatus;
  delivered: OrderStatus;
  cancelled: OrderStatus;
  onway: OrderStatus;
  processing: OrderStatus;
  length: number;
}

interface StatusMetrics {
  total_pending: string | null;
  total_part_pending: string | null;
  total_closed: string | null;
  total_cancelled: string | null;
  total_temp_closed: string | null;
  total_billed: string | null;
  total_dispatched: string | null;
  total_warranty_complains: string | null;
  total_recomplain: string | null;
  total_non_warranty_complains: string | null;
  total_verified_complains: string | null;
  total_generated_comission: string | null;
  total_received_comission: string | null;
  total_loyalty_in: string | null;
  total_loyalty_out: string | null;
}

export default function TopContainers() {
  const router = useRouter();
  const [data, setData] = useState<StatusMetrics | undefined>(undefined);
  const { user, isAuthenticated, isLoading } = useAuthStore();

  // ✅ Use React Query for customer sales data
  const { data: salesData, isLoading: salesLoading } = useCustomerSales(
    user?.id
  );

  const getComplainsData = async () => {
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
    const fdata = new FormData();

    user?.id && fdata.append('id', user?.id);
    user?.type &&
      fdata.append('user_type', user.type === 'Customer' ? 'cust' : 'tech');
    fdata.append('from_date', firstADFormatted);
    fdata.append('to_date', lastADFormatted);

    const { data } = await api.post(
      '/techsewa/publiccontrol/publiccomplain/getdashboard',
      fdata
    );
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    if (user) getComplainsData();
  }, [user]);

  const [counters, setcounters] = useState<OrderList | undefined>(undefined);

  useEffect(() => {
    if (salesData) {
      setcounters(salesData);
    }
  }, [salesData]);

  const getSalesStatusCount = (newdata: any, salesStatus: string): number => {
    return newdata.list.filter((item: any) => item.sales_status === salesStatus)
      .length;
  };

  return (
    <>
      {data === undefined ? (
        <div className="flex items-center justify-center p-10">Loading</div>
      ) : (
        <>
          <h1 className="px-4 font-medium text-xl">Repair History</h1>
          <div className="flex flex-wrap items-center gap-2 px-4 py-2">
            <NewContainer
              title={'Pending'}
              Icon={Clock}
              value={data?.total_pending}
              firstcolor={'#fe9b5c'}
              secondcolor={'#f3b564'}
              link={`/allcomplains?id=${1}&title=Pending`}
              router={router}
            />
            <NewContainer
              title={'Part Pending'}
              Icon={Clock}
              value={data?.total_part_pending}
              firstcolor={'#01abae'}
              secondcolor={'#00dade'}
              link={`/allcomplains?id=${2}&title=Part Pending`}
              router={router}
            />
            <NewContainer
              title={'Closed'}
              Icon={Clock}
              value={data?.total_closed}
              firstcolor={'#5e62fe'}
              secondcolor={'#8089f7'}
              link={`/allcomplains?id=${3}&title=Closed`}
              router={router}
            />
            <NewContainer
              title={'Temp Closed'}
              Icon={Clock}
              value={data?.total_temp_closed}
              firstcolor={'#9c939c'}
              secondcolor={'#484eb1'}
              link={`/allcomplains?id=${5}&title=Temp Closed`}
              router={router}
            />
            <NewContainer
              title={'Cancelled'}
              Icon={Clock}
              value={data?.total_cancelled}
              firstcolor={'#34bc60'}
              secondcolor={'#5cfc80'}
              link={`/allcomplains?id=${4}&title=Cancelled`}
              router={router}
            />
            <NewContainer
              title={'Billed'}
              Icon={Clock}
              value={data?.total_billed}
              link={`/allcomplains?id=${14}`}
              firstcolor={'#fd5deb'}
              secondcolor={'#f78efd'}
              router={router}
            />
            <NewContainer
              title={'Dispatched'}
              Icon={Clock}
              value={data?.total_dispatched}
              link={`/allcomplains?id=${15}`}
              firstcolor={'#fd5deb'}
              secondcolor={'#f78efd'}
              router={router}
            />
            <NewContainer
              title={'Warranty Complains'}
              Icon={Clock}
              value={data?.total_warranty_complains}
              link={`/allcomplains?id=${6}&title=Warranty Complains`}
              firstcolor={'#fd5deb'}
              secondcolor={'#f78efd'}
              router={router}
            />
            <NewContainer
              title={'Recomplain'}
              Icon={Clock}
              value={data?.total_recomplain}
              link={`/allcomplains?id=${7}&title=Recomplain`}
              firstcolor={'#fd5deb'}
              secondcolor={'#f78efd'}
              router={router}
            />
            <NewContainer
              title={'Non Warranty Complains'}
              Icon={Clock}
              value={data?.total_non_warranty_complains}
              link={`/allcomplains?id=${8}&title=Non Warranty Complains`}
              firstcolor={'#fd5deb'}
              secondcolor={'#f78efd'}
              router={router}
            />
            <NewContainer
              title={'Verified Complains'}
              Icon={Clock}
              value={data?.total_verified_complains}
              link={`/allcomplains?id=${9}&title=Verified Complains`}
              firstcolor={'#fd5deb'}
              secondcolor={'#f78efd'}
              router={router}
            />
            <NewContainer
              title={'Generated Comission'}
              Icon={Clock}
              value={data?.total_generated_comission}
              link={`/allcomplains?id=${10}&title=Generated Comission`}
              firstcolor={'#fd5deb'}
              secondcolor={'#f78efd'}
              router={router}
            />
            <NewContainer
              title={'Received Comission'}
              Icon={Clock}
              value={data?.total_received_comission}
              link={`/allcomplains?id=${11}&title=Received Comission`}
              firstcolor={'#fd5deb'}
              secondcolor={'#f78efd'}
              router={router}
            />
            <NewContainer
              title={'Loyalty In'}
              Icon={Clock}
              value={data?.total_loyalty_in}
              link={`/allcomplains?id=${12}&title=Loyalty In`}
              firstcolor={'#fd5deb'}
              secondcolor={'#f78efd'}
              router={router}
            />
            <NewContainer
              title={'Loyalty Out'}
              Icon={Clock}
              value={data?.total_loyalty_out}
              link={`/allcomplains?id=${13}&title=Loyalty Out`}
              firstcolor={'#fd5deb'}
              secondcolor={'#f78efd'}
              router={router}
            />
          </div>
        </>
      )}
    </>
  );
}

function NewContainer({
  title,
  Icon,
  value,
  firstcolor,
  secondcolor,
  link,
  router,
}: any) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer hover:scale-105 transition-all duration-200"
      style={{
        background: `linear-gradient(135deg, ${firstcolor} 0%, ${secondcolor} 100%)`,
      }}
      onClick={() => router.push(link)}
    >
      <Icon className="text-white text-xl" />
      <div className="text-white">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-lg font-bold">{value || '0'}</div>
      </div>
    </div>
  );
}
