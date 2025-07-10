'use client';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { ResponsiveLine } from '@nivo/line';
import { AxiosCorsInstance } from '@/axios_config/Axios';
import OrderTracking from '@/features/dashboard/OrderTraking';
import TopContainers from '@/features/dashboard/TopContainers';
import useAuthStore from '@/store/useAuthStore';
import { api } from '@/lib/api';
import { IoMenu } from 'react-icons/io5';
import SideNav from '@/features/dashboard/SideNavBar';
import { useRouter } from 'next/navigation';

export default function Component() {
  const [userType, setUserType] = useState('');

  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const id = localStorage.getItem('id') ?? '{}';

      const storedData = localStorage.getItem('data');
      if (storedData) {
        // console.log("Stored data", storedData);
        try {
          const parsedData = JSON.parse(storedData);
          // setData(parsedData)
          console.log('Parsed data', parsedData);
          if (parsedData.dealer == '1') {
            setUserType('Dealer');
          } else {
            setUserType(parsedData.type);
          }
        } catch (error) {
          // console.error("Failed to parse stored data", error)
        }
      } else {
        alert('Please login to continue');
        router.push('/login');
      }
    }
  }, []);

  const [data, setData] = useState<any>([]);

  const [counters, setCounters] = useState({
    pending: { data: [{}], length: 0 },
    confirmed: { data: [{}], length: 0 },
    delivered: { data: [{}], length: 0 },
    cancelled: { data: [{}], length: 0 },
    onway: { data: [{}], length: 0 },
    processing: { data: [{}], length: 0 },
    length: 0,
  });

  const dateCounters = (data: any) => {
    const statusLengths = {
      pending: 0,
      confirmed: 0,
      processing: 0,
      onway: 0,
      delivered: 0,
      cancelled: 0,
    };

    const statusCounts = data.reduce(
      (acc: any, item: { salesStatus: number; date: string }) => {
        const statusKeyMap: { [key: number]: string } = {
          1: 'pending',
          2: 'confirmed',
          3: 'processing',
          4: 'onway',
          5: 'delivered',
          6: 'cancelled',
        };

        const statusKey = statusKeyMap[item.salesStatus];
        const date = item.date;

        if (statusKey) {
          statusLengths[statusKey as keyof typeof statusLengths] += 1;

          if (!acc[statusKey]) {
            acc[statusKey] = {};
          }

          if (acc[statusKey][date]) {
            acc[statusKey][date] += 1;
          } else {
            acc[statusKey][date] = 1;
          }
        }

        return acc;
      },
      {}
    );

    const pending = statusCounts.pending || {};
    const confirmed = statusCounts.confirmed || {};
    const processing = statusCounts.processing || {};
    const onway = statusCounts.onway || {};
    const delivered = statusCounts.delivered || {};
    const cancelled = statusCounts.cancelled || {};

    console.log(statusLengths);

    setCounters({
      pending: { data: pending, length: statusLengths.pending },
      confirmed: { data: confirmed, length: statusLengths.confirmed },
      processing: { data: processing, length: statusLengths.processing },
      onway: { data: onway, length: statusLengths.onway },
      delivered: { data: delivered, length: statusLengths.delivered },
      cancelled: { data: cancelled, length: statusLengths.cancelled },
      length: data.length,
    });
  };

  const { user, isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await api.post(
    //       "/techsewa/publiccontrol/publicsales/getsalesbyCustomer",
    //       {
    //         cust_id: user?.id,
    //         // cust_type: localStorage?.getItem("type")
    //       },
    //     )
    //     const alldata = response.data.list?.map((item: any) => ({
    //       date: item.sales_date,
    //       amt: item.sales_calc_price,
    //       salesId: item.sales_id,
    //       salesNum: item.sales_number,
    //       salesStatus: item.sales_status,
    //     }))
    //     console.log(alldata, "ALL DATA");
    //     // setData(alldata)
    //     dateCounters(alldata);
    //   } catch (error) {
    //     console.error("Error fetching data:", error)
    //   }
    // }
    // console.log(data, "CUST DATA")
    // fetchData()
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="relative flex w-full md:max-w-[1280px]">
      {/* Sidebar: Visible only in mobile view when toggled */}
      <div
        className={`fixed inset-0 z-40 bg-gray-800 bg-opacity-50 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
        onClick={toggleSidebar}
      >
        <div className="w-64 bg-white h-full shadow-lg pt-16">
          <SideNav />
        </div>
      </div>

      <main className="overflow-y-scroll w-full md:pb-0 pb-20">
        <div className="flex w-full px-5 py-3 justify-between items-center">
          <IoMenu className="text-2xl md:hidden" onClick={toggleSidebar} />
          <h1 className="text-xl font-semibold text-gray-800">My Dashboard</h1>
          <div className="px-5 py-2 rounded-md bg-primary text-white items-center justify-center">
            {userType}
          </div>
        </div>
        <hr className="py-2" />
        <TopContainers />

        {/* Additional sections here */}
      </main>
    </div>
  );
}

// .....................icons.....................

function CurvedlineChart({
  counters,
  ...props
}: {
  counters: any;
  [key: string]: any;
}) {
  console.log(counters, 'COUNTERS');

  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: 'Order Onway',
            data:
              //   [
              //   { x: "2024-09-18", y: 9 },
              //   { x: "2024-09-18", y: 8 },
              //   { x: "2024-09-18", y: 10 },
              //   { x: "2024-09-18", y: 60 },
              //   { x: "2024-09-16", y: 81 },
              //   { x: "2024-09-17", y: 104 },
              //   { x: "2024-10-07", y: 101 },
              //   { x: "2024-10-08", y: 120 },
              // ],
              counters.onway.length > 0
                ? Object.entries(counters.onway.data).map(([key, value]) => ({
                    x: key,
                    y: value as number,
                  }))
                : [
                    { x: '2024-09-15', y: 9 },
                    // { x: "2024-09-15", y: 8 },
                    // { x: "2024-09-16", y: 10 },
                    // { x: "2024-09-17", y: 60 },
                    // { x: "2024-09-16", y: 81 },
                    // { x: "2024-09-17", y: 104 },
                    // { x: "2024-10-07", y: 101 },
                    // { x: "2024-10-08", y: 120 },
                  ],
          },

          {
            id: 'Order Processing',
            data:
              //   [
              //   { x: "2024-09-18", y: 79 },
              //   { x: "2024-09-18", y: 28 },
              //   { x: "2024-09-18", y: 113 },
              //   { x: "2024-09-18", y: 36 },
              //   { x: "2024-09-16", y: 28 },
              //   { x: "2024-09-17", y: 114 },
              //   { x: "2024-10-07", y: 141 },
              //   { x: "2024-10-08", y: 182 },
              // ],
              counters.processing.length > 0
                ? Object.entries(counters.processing.data).map(
                    ([key, value]) => ({
                      x: key,
                      y: value as number,
                    })
                  )
                : [
                    { x: '2024-09-18', y: 79 },
                    // { x: "2024-09-19", y: 28 },
                    // { x: "2024-09-20", y: 113 },
                    // { x: "2024-09-21", y: 36 },
                    // { x: "2024-09-16", y: 28 },
                    // { x: "2024-09-17", y: 114 },
                    // { x: "2024-10-07", y: 141 },
                    // { x: "2024-10-08", y: 182 },
                  ],
          },

          {
            id: 'Order Cancelled',
            data:
              //   [
              //   { x: "2024-09-18", y: 95 },
              //   { x: "2024-09-18", y: 18 },
              //   { x: "2024-09-18", y: 103 },
              //   { x: "2024-09-18", y: 46 },
              //   { x: "2024-09-16", y: 18 },
              //   { x: "2024-09-17", y: 154 },
              //   { x: "2024-10-07", y: 141 },
              //   { x: "2024-10-08", y: 112 },
              // ],

              counters.cancelled.length > 0
                ? Object.entries(counters.cancelled.data).map(
                    ([key, value]) => ({
                      x: key,
                      y: value as number,
                    })
                  )
                : [
                    { x: '2024-09-22', y: 95 },
                    // { x: "2024-09-23", y: 24 },
                    // { x: "2024-09-18", y: 103 },
                    // { x: "2024-09-15", y: 46 },
                    // { x: "2024-09-16", y: 18 },
                    // { x: "2024-09-17", y: 154 },
                    // { x: "2024-10-07", y: 141 },
                    // { x: "2024-10-08", y: 112 },
                  ],
          },
          {
            id: 'Order Delivered',
            data:
              //   [
              //   { x: "2024-09-18", y: 19 },
              //   { x: "2024-09-18", y: 18 },
              //   { x: "2024-09-18", y: 103 },
              //   { x: "2024-09-18", y: 61 },
              //   { x: "2024-09-16", y: 80 },
              //   { x: "2024-09-17", y: 104 },
              //   { x: "2024-10-07", y: 114 },
              //   { x: "2024-10-08", y: 142 },
              // ],
              counters.delivered.length > 0
                ? Object.entries(counters.delivered.data).map(
                    ([key, value]) => ({
                      x: key,
                      y: value as number,
                    })
                  )
                : [
                    { x: '2024-09-18', y: 19 },
                    // { x: "2024-09-20", y: 18 },
                    // { x: "2024-09-15", y: 103 },
                    // { x: "2024-09-18", y: 61 },
                    // { x: "2024-09-16", y: 80 },
                    // { x: "2024-09-17", y: 104 },
                    // { x: "2024-10-07", y: 114 },
                    // { x: "2024-10-08", y: 142 },
                  ],
          },
          {
            id: 'Order Confirmed',
            data:
              //   [
              //   { x: "2024-09-18", y: 90 },
              //   { x: "2024-09-18", y: 80},
              //   { x: "2024-09-18", y: 131 },
              //   { x: "2024-09-18", y: 65 },
              //   { x: "2024-09-16", y: 84 },
              //   { x: "2024-09-17", y: 124 },
              //   { x: "2024-10-07", y: 111 },
              //   { x: "2024-10-08", y: 121 },
              // ],

              counters.confirmed.length > 0
                ? Object.entries(counters.confirmed.data).map(
                    ([key, value]) => ({
                      x: key,
                      y: value as number,
                    })
                  )
                : [
                    { x: '2024-09-18', y: 90 },
                    // { x: "2024-09-21", y: 80},
                    // { x: "2024-09-24", y: 131 },
                    // { x: "2024-09-15", y: 65 },
                    // { x: "2024-09-16", y: 84 },
                    // { x: "2024-09-17", y: 124 },
                    // { x: "2024-10-07", y: 111 },
                    // { x: "2024-10-08", y: 121 },
                  ],
          },

          {
            id: 'Order Pending',
            data:
              // [
              // // { x: "2024-09-18", y: 7 },
              // // { x: "2024-09-18", y: 5 },
              // // { x: "2024-09-18", y: 11 },
              // // { x: "2024-09-18", y: 9 },
              // // { x: "2024-09-16", y: 12 },
              // // { x: "2024-09-17", y: 16 },
              // // { x: "2024-10-07", y: 13 },
              //   // { x: "2024-10-08", y: 13 },
              // ],

              counters.pending.length > 0
                ? Object.entries(counters.pending.data).map(([key, value]) => ({
                    x: key,
                    y: value as number,
                  }))
                : [
                    { x: '2024-09-18', y: 7 },
                    // { x: "2024-09-25", y: 5 },
                    // { x: "2024-09-23", y: 11 },
                    // { x: "2024-09-18", y: 9 },
                    // { x: "2024-09-16", y: 12 },
                    // { x: "2024-09-17", y: 16 },
                    // { x: "2024-10-07", y: 13 },
                    //   { x: "2024-10-08", y: 13 },
                  ],
          },
        ]}
        enableCrosshair={false}
        margin={{ top: 50, right: 130, bottom: 55, left: 60 }}
        xScale={{
          type: 'time',
          format: '%Y-%m-%d',
          useUTC: false,
          precision: 'day',
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
          type: 'linear',
          min: 0,
          max: 'auto',
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Sales Day',
          legendOffset: 45,
          legendPosition: 'middle',
          format: '%b %d',
          tickValues: 'every 1 day',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Number Of Orders',
          legendOffset: -45,
          legendPosition: 'middle',
        }}
        colors={{ scheme: 'paired' }}
        pointSize={5}
        pointColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        pointBorderWidth={2}
        pointBorderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        pointLabelYOffset={-12}
        useMesh={true}
        curve="monotoneX"
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            symbolSize: 14,
            symbolShape: 'circle',
          },
        ]}
        theme={{
          tooltip: {
            container: {
              fontSize: '12px',
            },
          },
        }}
        role="application"
      />
    </div>
  );
}
