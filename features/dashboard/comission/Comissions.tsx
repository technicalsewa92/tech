"use client";
import usePagination from "@/hooks/usePagination";
import { api } from "@/lib/api";
import { apiClient } from "@/lib/catchfn";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { VscFilter } from "react-icons/vsc";
import { CiGrid41 } from "react-icons/ci";
import { FaList } from "react-icons/fa6";
import ComplainsFilter from "@/features/complain/my-complains/complainsFilter";
import ComplainsTable from "@/features/complain/my-complains/complainsTable";
import TabularComplains from "@/features/complain/my-complains/tabularComplains";
import { Complain } from "@/features/complain/my-complains/types";
import TabularCommission from "./ComissionDataTable";
import CommissionFilter from "./commission_filter";

export default function Commissions() {
  const { push } = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const { page, setPage } = usePagination();
  const [totalData, setTotalData] = useState(0);
  const [data, setData] = useState<ComissionsType[]>([]);
  const [searchQuery, setSearchQuery] = useState<any>(null);
const [isFilter, setisFilter] = useState(false);
const [listype, setlistype] = useState("grid")
  useEffect(() => setPage(0), []);

  const getComplainsData = async () => {
   
    setLoading(true);
    const fdata = new FormData();
    fdata.append("page", `${page + 1}`);

    user?.name && fdata.append("dealer_name", user?.id);
   
    if(searchQuery!=null){
      for (const key of Object.keys(searchQuery)) {
        searchQuery[key] && fdata.append(key, searchQuery[key]);
      }
    }else{
   fdata.append("paid_status", "1");
      
    }
    const { data } = await api.post( 
      "/techsewa/publiccontrol/publicaccount/getDealerReceipt",
      fdata
    );
    setTotalData(data?.total);
    setData(data?.list);
    // console.log("data", data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) getComplainsData();
  }, [user, page, searchQuery]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) push("/");
  }, [isAuthenticated, isLoading]);
  console.log("Id",user?.id);
  console.log(user?.type)
  return (
    <div className="container mx-auto py-10 px-5">
      <h1 className="text-xl">Commission List </h1>
      <p className="text-xs text-gray-500">All the commission are listed below</p>
      <hr className="my-4"/>
      <div className="flex justify-between flex-wrap items-center pb-4 lg:px-0 px-4 gap-3">
<div className="flex md:gap-5 gap-1 flex-wrap">
<div className="flex gap-2 items-center">
<p className="text-sm">All</p>
<div className="flex items-center justify-center rounded-lg border-primary border-2 text-xs p-2 bg-[#c1e7ef] text-primary font-semibold">
{totalData}
</div>
</div>


</div>
<div className="flex gap-5">


<div className={`flex items-center gap-1 justify-center rounded-lg ${isFilter===true?"border-primary border-2 bg-[#c1e7ef] text-primary":"border-gray-300 border bg-white"}  text-xs p-2 cursor-pointer   font-normal`} onClick={()=>{
  setisFilter(!isFilter)
}}>
<VscFilter className="text-base"/>
<p className="text-xs">Filter</p>
</div>
<div className={`flex items-center gap-1 justify-center rounded-lg  text-xs p-2 ${listype==="grid"?"border-primary border-2 bg-[#c1e7ef] text-primary":"border-gray-300 border bg-white"}  cursor-pointer font-normal`} onClick={(()=>setlistype("grid"))}>

<CiGrid41 className="text-base"/>
</div>
<div className={`flex items-center gap-1 justify-center rounded-lg   text-xs p-2 ${listype==="list"?"border-primary border-2 bg-[#c1e7ef] text-primary":"border-gray-300 border bg-white"}  cursor-pointer font-normal`}onClick={(()=>setlistype("list"))}>

<FaList className="text-base"/>
</div>
</div>
      </div>
      {isFilter &&(
        <CommissionFilter
        onSearch={setSearchQuery}
        onReset={() => setSearchQuery({})}
      />
      )}
      <TabularCommission
      loading={loading}
      data={data}
      page={page}
      setPage={setPage}
      total={totalData}
    />
     
    </div>
  );
}
