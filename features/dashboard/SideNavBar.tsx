'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FileText,
  LayoutDashboard,
  History,
  User,
  CreditCard,
  BadgePercent,
  BarChart,
} from 'lucide-react';
import useAuthStore from '@/store/useAuthStore';

const defaultNavigationItems = [
  {
    icon: <LayoutDashboard className="text-xl" />,
    label: 'Dashboard',
    link: '/dashboard',
  },
  {
    icon: <History className="text-xl" />,
    label: 'Order History',
    link: '/order-history',
  },
  {
    icon: <User className="text-xl" />,
    label: 'My Profile',
    link: '/userprofile',
  },
  {
    icon: <BadgePercent className="text-xl" />,
    label: 'Repair history',
    link: '/complains',
  },

  // {
  //   icon: <IoLocationOutline className="text-xl" />,
  //   label: "Manage Address",
  //   link: "/manage-address",
  // },
  {
    label: 'Pay Online',
    link: '/pay-online',
    icon: <CreditCard className="text-xl" />,
  },
];

const SideNav = () => {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const router = usePathname();
  const [navigationItems, setNavigationItems] = useState(
    defaultNavigationItems
  );
  const [isDealer, setisDealer] = useState(false);
  useEffect(() => {
    console.log(user?.type);
    const complianceItem = {
      icon: <FileText className="text-xl" />,
      label: 'Commission',
      link: '/commission',
    };
    const storedData = localStorage.getItem('data');
    const parsedData = storedData ? JSON.parse(storedData) : null;

    if (parsedData?.dealer === '1') {
      setisDealer(true);
      // setNavigationItems([...defaultNavigationItems, complianceItem]);
    }
    if (user?.type === 'Technician') {
      const newcomplianceItem = {
        icon: <BarChart className="text-xl" />,
        label: 'Ledger',
        link: '/ledger',
      };
      setNavigationItems([...defaultNavigationItems, newcomplianceItem]);
    }
  }, [user]);

  return (
    <aside className="flex flex-col bg-white  h-screen sticky top-0 z-50 ">
      <nav className="mt-8 flex flex-col gap-3 pr-3">
        <Container
          icon={<LayoutDashboard className="text-xl" />}
          label={'Dashboard'}
          link={'/dashboard'}
          router={router}
        />
        <Container
          icon={<History className="text-xl" />}
          label={'Order History'}
          link={'/order-history'}
          router={router}
        />
        <Container
          icon={<BadgePercent className="text-xl" />}
          label={'Repair history'}
          link={'/complains'}
          router={router}
        />
        {user?.type === 'Technician' || isDealer ? (
          <Container
            icon={<BarChart className="text-xl" />}
            label={'Ledger'}
            link={'/ledger'}
            router={router}
          />
        ) : (
          <></>
        )}
        {isDealer && (
          <Container
            icon={<FileText className="text-xl" />}
            label={'Commission'}
            link={'/commission'}
            router={router}
          />
        )}

        <Container
          icon={<CreditCard className="text-xl" />}
          label={'Pay Online'}
          link={'/pay-online'}
          router={router}
        />
        <Container
          icon={<User className="text-xl" />}
          label={'My Profile'}
          link={'/userprofile'}
          router={router}
        />
        {/* {navigationItems.map((item, index) => (
          <Link key={index} href={item.link}>
            <div
              className={`flex items-center space-x-2 px-4 py-3 ${
                router === item.link ? "text-gray-900" : "text-gray-600"
              } ${
                router === item.link
                  ? "rounded-lg bg-[#e2f3f8]"
                  : "hover:bg-[#e2f3f8] rounded-lg"
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </div>
          </Link>
        ))} */}
      </nav>
    </aside>
  );
};

export default SideNav;

function Container({ link, router, icon, label }: any) {
  return (
    <Link href={link}>
      <div
        className={`flex items-center space-x-2 px-4 py-3 ${
          router === link ? 'text-gray-900' : 'text-gray-600'
        } ${
          router === link
            ? 'rounded-lg bg-[#e2f3f8]'
            : 'hover:bg-[#e2f3f8] rounded-lg'
        }`}
      >
        {icon}
        <span className="text-sm">{label}</span>
      </div>
    </Link>
  );
}
