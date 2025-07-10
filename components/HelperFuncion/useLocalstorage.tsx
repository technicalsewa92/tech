"use client"

import React, { useEffect, useState } from 'react'

const useLocalstorage = () => {
  const [token, setToken] = useState<any>(null);

  useEffect(() => {
    const credObj: any = localStorage && localStorage.getItem("loginKey"); 
    const data: any = credObj ? JSON.parse(credObj) : null; 
    setToken(data);
  }, []);

  return { token };
}

export default useLocalstorage