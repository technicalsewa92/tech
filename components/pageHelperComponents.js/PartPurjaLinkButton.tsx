"use client";

import { postSinglPartPurjaData } from "../HelperFuncion/PartpurjaDataFile";

const LinkButton = (data: any) => {
  const setData = () => {
    postSinglPartPurjaData(data);
  };
  return <div className="w-full h-full absolute z-10" onClick={setData}></div>;
};

export default LinkButton;