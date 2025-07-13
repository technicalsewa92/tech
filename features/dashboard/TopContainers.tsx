import { api } from '@/lib/api';
import useAuthStore from '@/store/useAuthStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import NepaliDate from 'nepali-date-converter';

interface OrderStatus {
  data: Array<any>; // You can replace 'any' with a more specific type if you know the structure of objects in 'data'
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
    // console.log("data", data);
  };

  useEffect(() => {
    if (user) getComplainsData();
  }, [user]);
  const [counters, setcounters] = useState<OrderList | undefined>(undefined);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fdata = new FormData();
        // fdata.append("cust_id", "626");
        user?.id && fdata.append('cust_id', user?.id);
        const response = await api.post(
          '/techsewa/publiccontrol/publicsales/getsalesbyCustomer',
          fdata
        );
        console.log(response.data, 'ALL DATA2');
        if (response.status == 200) {
          setcounters(response.data);
        } else {
          localStorage.clear();
          router.push('/');
        }
        // setData(alldata)
        // dateCounters(alldata);
      } catch (error) {
        localStorage.clear();
        router.push('/');
        console.error('Error fetching data:', error);
      }
    };

    if (user) fetchData();
  }, [user]);
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
          {/* {user?.type === "Technician"|| ? <> */}
          <h1 className="px-4 font-medium text-xl">Repair History</h1>
          <div className="flex flex-wrap items-center gap-2 px-4 py-2">
            <NewContainer
              title={'Pending'}
              Icon={AlertCircle}
              value={data?.total_pending}
              firstcolor={'#fe9b5c'}
              secondcolor={'#f3b564'}
              link={`/allcomplains?id=${1}&title=Pending`}
              router={router}
            />
            <NewContainer
              title={'Part Pending'}
              Icon={AlertCircle}
              value={data?.total_part_pending}
              firstcolor={'#01abae'}
              secondcolor={'#00dade'}
              link={`/allcomplains?id=${2}&title=Part Pending`}
              router={router}
            />
            <NewContainer
              title={'Closed'}
              Icon={AlertCircle}
              value={data?.total_closed}
              firstcolor={'#5e62fe'}
              secondcolor={'#8089f7'}
              link={`/allcomplains?id=${3}&title=Closed`}
              router={router}
            />
            {/* <NewContainer title={"Open"} Icon={AlertCircle} value={data.} firstcolor={"#5e62fe"} secondcolor={"#8089f7"} link={`/allcomplains?id=${0}&title=Open`} router={router} /> */}
            <NewContainer
              title={'Temp Closed'}
              Icon={AlertCircle}
              value={data?.total_temp_closed}
              firstcolor={'#9c939c'}
              secondcolor={'#484eb1'}
              link={`/allcomplains?id=${5}&title=Temp Closed`}
              router={router}
            />
            <NewContainer
              title={'Cancelled'}
              Icon={AlertCircle}
              value={data?.total_cancelled}
              firstcolor={'#34bc60'}
              secondcolor={'#5cfc80'}
              link={`/allcomplains?id=${4}&title=Cancelled`}
              router={router}
            />
            <NewContainer
              title={'Billed'}
              Icon={AlertCircle}
              value={data?.total_billed}
              link={`/allcomplains?id=${14}`}
              firstcolor={'#fd5deb'}
              secondcolor={'#f78efd'}
              router={router}
            />
            <NewContainer
              title={'Warranty Complains'}
              Icon={AlertCircle}
              value={data?.total_warranty_complains}
              firstcolor={'#8364d3'}
              secondcolor={'#a1592e'}
              router={router}
            />
            <NewContainer
              title={'Non-Warranty Complains'}
              Icon={AlertCircle}
              value={data?.total_non_warranty_complains}
              firstcolor={'#8364d3'}
              secondcolor={'#3faf68'}
              router={router}
            />
            <NewContainer
              title={'Verified Complains'}
              Icon={AlertCircle}
              value={data?.total_verified_complains}
              firstcolor={'#fd5deb'}
              link={`/allcomplains?id=${13}&title=Verified Complains`}
              router={router}
              secondcolor={'#fe7686'}
            />
            {/* <NewContainer title={"Generated Comissions"} Icon={AlertCircle} value={data.total_generated_comission} firstcolor={"#47db6f"} secondcolor={"#f78efd"} /> */}
            {/* <NewContainer title={"Received Commissions"} Icon={AlertCircle} value={data.total_received_comission} firstcolor={"#fd5deb"} secondcolor={"#906092"} /> */}
            <NewContainer
              title={'Dispached'}
              Icon={AlertCircle}
              value={data?.total_dispatched}
              firstcolor={'#ff5d70'}
              link={`/allcomplains?id=${12}&title=Dispached`}
              secondcolor={'#fe909d'}
              router={router}
            />
            <NewContainer
              title={'Recomplain'}
              Icon={AlertCircle}
              value={data?.total_recomplain}
              firstcolor={'#fe9365'}
              secondcolor={'#feb798'}
              link={`/allcomplains?id=${16}&title=Recomplain`}
              router={router}
            />
            <NewContainer
              title={'Loyalty In'}
              Icon={AlertCircle}
              value={
                data?.total_loyalty_in == null ? '0' : data.total_loyalty_in
              }
              firstcolor={'#fe9b5c'}
              secondcolor={'#f3b564'}
              router={router}
            />
            <NewContainer
              title={'Loyalty Out'}
              Icon={AlertCircle}
              value={
                data?.total_loyalty_out == null ? '0' : data.total_loyalty_out
              }
              firstcolor={'#fe9b5c'}
              secondcolor={'#f3b564'}
              router={router}
            />
          </div>
          {/* </> : <> */}
          <h1 className="px-4 font-medium text-xl mt-3">Order History</h1>

          {counters === undefined ? (
            <></>
          ) : (
            <div className="flex flex-wrap items-center gap-2 px-4 py-2">
              <NewContainer
                title={'Pending'}
                Icon={AlertCircle}
                value={getSalesStatusCount(counters, '1')}
                firstcolor={'#fe9b5c'}
                secondcolor={'#f3b564'}
                link={'/order-history?id=1&state=Pending'}
                router={router}
              />
              <NewContainer
                title={'Confirm'}
                Icon={AlertCircle}
                value={getSalesStatusCount(counters, '2')}
                firstcolor={'#01abae'}
                secondcolor={'#00dade'}
                link={'/order-history?id=2&state=Confirm'}
                router={router}
              />
              <NewContainer
                title={'Processing'}
                Icon={AlertCircle}
                value={getSalesStatusCount(counters, '3')}
                firstcolor={'#5e62fe'}
                secondcolor={'#8089f7'}
                link={'/order-history?id=3&state=Processing'}
                router={router}
              />
              <NewContainer
                title={'OntheWay'}
                Icon={AlertCircle}
                value={getSalesStatusCount(counters, '4')}
                firstcolor={'#9c939c'}
                secondcolor={'#484eb1'}
                link={'/order-history?id=4&state=OntheWay'}
                router={router}
              />
              <NewContainer
                title={'Delivered'}
                Icon={AlertCircle}
                value={getSalesStatusCount(counters, '5')}
                firstcolor={'#34bc60'}
                secondcolor={'#5cfc80'}
                link={'/order-history?id=5&state=Delivered'}
                router={router}
              />
              <NewContainer
                title={'Cancelled'}
                Icon={AlertCircle}
                value={getSalesStatusCount(counters, '6')}
                firstcolor={'#fd5deb'}
                secondcolor={'#f78efd'}
                link={'/order-history?id=6&state=Cancelled'}
                router={router}
              />
              <NewContainer
                title={'Returned'}
                Icon={AlertCircle}
                value={getSalesStatusCount(counters, '7')}
                firstcolor={'#8364d3'}
                secondcolor={'#a1592e'}
                link={'/order-history?id=7&state=Returned'}
                router={router}
              />
            </div>
          )}

          {/* </>} */}
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
      onClick={() => {
        if (link === null) {
        } else {
          router.push(link);
        }
      }}
      className={`py-2 px-2 text-white rounded-md max-w-[400px] cursor-pointer bg-gradient-to-r`}
      style={{
        backgroundImage: `linear-gradient(to right, ${firstcolor}, ${secondcolor})`,
      }}
    >
      <div className="flex w-full justify-between items-center gap-2">
        <p className="font-semibold text-xs">{title}</p>
        <h1 className="text-xs  font-semibold">{value}</h1>
        {/* <Icon /> */}
      </div>
    </div>
  );
}
