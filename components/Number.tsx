"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NumberUI from "./footer/NumberUI";
import useAuthStore from "@/store/useAuthStore";

const Number = () => {
  const [data, setData] = useState<any>(null);

  const getTotalFooter = async () => {
    const data = await axios.get(
      "https://www.technicalsewa.com/techsewa/publiccontrol/getGetTotalFooter"
    );
    setData(data);
  };

  const { isAuthenticated, signin } = useAuthStore();

  useEffect(() => {
    getTotalFooter();
    if (!isAuthenticated) {
      const localdata = localStorage.getItem("data");
      if (localdata !== null) {
        signin(JSON.parse(localdata));
      }
    }
  }, [isAuthenticated, signin]);

  return (
    <>
      <NumberUI numbers={data?.data} />
    </>
  );
};

export default Number;
