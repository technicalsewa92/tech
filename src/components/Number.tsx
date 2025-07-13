'use client';
import React, { useEffect } from 'react';
import NumberUI from '@/components/footer/NumberUI';
import useAuthStore from '@/store/useAuthStore';
import { useTotalFooter } from '@/lib/api';

const Number = () => {
  const { data, isLoading, error } = useTotalFooter();
  const { isAuthenticated, signin } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      const localdata = localStorage.getItem('data');
      if (localdata !== null) {
        signin(JSON.parse(localdata));
      }
    }
  }, [isAuthenticated, signin]);

  return (
    <>
      <NumberUI numbers={data} />
    </>
  );
};

export default Number;
