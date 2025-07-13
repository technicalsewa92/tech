'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { CustomTable } from '@/features/dashboard/CustomerTable';
import useAuthStore from '@/store/useAuthStore';
import { useCustomerSales } from '@/lib/api';
import { useSearchParams } from 'next/navigation';

export const OrderHistoryPage = () => {
  const [filterData, setFilterData] = useState<any>([]);
  const [currentState, setCurrentState] = useState('Pending');
  const [qrShow, setQrShow] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuthStore();

  const params = useSearchParams();
  console.log(params.get('id'), params.get('state'));

  // ✅ Use React Query for customer sales data
  const { data: salesData, isLoading: salesLoading } = useCustomerSales(
    user?.id
  );

  // Transform data when it changes
  const data = useMemo(() => {
    if (!salesData?.list) return [];

    return salesData.list.map((item: any) => ({
      date: item.sales_date,
      amt: item.sales_calc_price,
      salesId: item.sales_id,
      salesNum: item.sales_number,
      salesStatus: item.sales_status,
    }));
  }, [salesData]);

  const handleTableTabClick = (state: any, statenum: any = 0) => {
    if (state !== 'Pay Online') {
      setQrShow(false);
    }
    setCurrentState(state);
    if (statenum == 0) {
      setFilterData(data);
      return;
    }

    const filterdata = data.filter((item: any) => item.salesStatus == statenum);
    setFilterData(filterdata);
  };

  useEffect(() => {
    if (params.get('id') != null) {
      handleTableTabClick(params.get('state'), params.get('id'));
      setCurrentState(params.get('state') ?? '');
    }
  }, [params]);

  useEffect(() => {
    if (data.length > 0) {
      if (params.get('id') != null) {
        const filterdata = data.filter(
          (item: any) => item.salesStatus == params.get('id')
        );
        setFilterData(filterdata);
      } else {
        const filterdata = data.filter((item: any) => item.salesStatus == 1);
        setFilterData(filterdata);
      }
      console.log('All Data', data);
    }
  }, [data, params]);

  return (
    <div className="flex flex-col gap-4 text-sm">
      <div className="flex gap-5 items-center w-[100%] overflow-auto">
        <button
          className={`w-24 h-10 p-2 ${currentState === 'Pending' ? 'border-[1px] rounded-lg bg-[#2591B1] text-white font-medium ' : ''}`}
          onClick={() => handleTableTabClick('Pending', 1)}
        >
          Pending
        </button>
        <button
          className={`w-24 h-10 p-2 ${currentState === 'Confirm' ? 'border-[1px] rounded-lg bg-[#2591B1] text-white font-medium ' : ''}`}
          onClick={() => handleTableTabClick('Confirm', 2)}
        >
          Confirm
        </button>
        <button
          className={`w-24 h-10 p-2 ${currentState === 'Processing' ? 'border-[1px] rounded-lg bg-[#2591B1] text-white font-medium ' : ''}`}
          onClick={() => handleTableTabClick('Processing', 3)}
        >
          Processing
        </button>
        <button
          className={`w-24 h-10 p-2 ${currentState === 'OntheWay' ? 'border-[1px] rounded-lg bg-[#2591B1] text-white font-medium ' : ''}`}
          onClick={() => handleTableTabClick('OntheWay', 4)}
        >
          OntheWay
        </button>
        <button
          className={`w-24 h-10 p-2 ${currentState === 'Delivered' ? 'border-[1px] rounded-lg bg-[#2591B1] text-white font-medium ' : ''}`}
          onClick={() => handleTableTabClick('Delivered', 5)}
        >
          Delivered
        </button>
        <button
          className={`w-24 h-10 p-2 ${currentState === 'Cancelled' ? 'border-[1px] rounded-lg bg-[#2591B1] text-white font-medium ' : ''}`}
          onClick={() => handleTableTabClick('Cancelled', 6)}
        >
          Cancelled
        </button>
        <button
          className={`w-24 h-10 p-2 whitespace-nowrap  ${qrShow ? 'bg-[#2591B1] border-[1px] rounded-lg text-white font-medium' : ''} `}
          onClick={() => {
            setQrShow(true);
            handleTableTabClick('Pay Online', 7);
          }}
        >
          Pay Online
        </button>
        <button
          className={`w-24 h-10 p-2 ${currentState === 'All' ? 'border-[1px] rounded-lg bg-[#2591B1] text-white font-medium ' : ''}`}
          onClick={() => handleTableTabClick('All')}
        >
          All
        </button>
      </div>
      <hr className="h-1 bg-black" />

      <div className="flex justify-center items-center">
        {/* {qrShow && <PaymentPage />} */}
      </div>

      <CustomTable data={filterData} status={currentState} />
    </div>
  );
};
