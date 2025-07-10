'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SideNav from '@/features/dashboard/SideNavBar';
import Skeleton from '@/components/ui/Skeleton';

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem('id');
    if (!id) {
      router.push('/login'); // Redirect to login if ID is not found
    } else {
      setIsLoading(false); // Only show children if ID is found
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Skeleton className="w-40 h-10 rounded" />
      </div>
    ); // Show skeleton loader while checking
  }

  return (
    <div className="flex bg-gray-50 mx-auto max-w-[1280px]">
      <div className="hidden md:block md:w-1/5 xl:w-1/6">
        <SideNav />
      </div>
      <div className="w-full md:w-4/5 xl:w-5/6 flex flex-col justify-between relative">
        <div>{children}</div>
      </div>
    </div>
  );
}
