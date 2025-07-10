
"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HiOutlineDocumentReport } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { LuHistory } from "react-icons/lu";
import { MdPersonOutline } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
import { TbReportAnalytics } from "react-icons/tb";
import useAuthStore from "@/store/useAuthStore";

const defaultNavigationItems = [
  {
    icon: <MdOutlineDashboard className="text-xl" />,
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: <LuHistory className="text-xl" />,
    label: "Order History",
    link: "/order-history",
  },
  {
    icon: <MdPersonOutline className="text-xl" />,
    label: "My Profile",
    link: "/userprofile",
  },
  {
    icon: <GrCompliance className="text-xl" />,
    label: "Repair history",
    link: "/complains",
  },
 
  // {
  //   icon: <IoLocationOutline className="text-xl" />,
  //   label: "Manage Address",
  //   link: "/manage-address",
  // },
  {
    label: "Pay Online",
    link: "/pay-online",
    icon: <MdPayment className="text-xl" />,
  },
]

const SideNav = () => {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const router = usePathname()
  const [navigationItems, setNavigationItems] = useState(defaultNavigationItems)
const [isDealer, setisDealer] = useState(false)
  useEffect(() => {
    console.log(user?.type)
    const complianceItem = 
    {
      icon: <HiOutlineDocumentReport className="text-xl" />,
      label: "Commission",
      link: "/commission",
    };
    const storedData = localStorage.getItem("data");
    const parsedData = storedData ? JSON.parse(storedData) : null;

    if (parsedData?.dealer === "1") {
      setisDealer(true)
      // setNavigationItems([...defaultNavigationItems, complianceItem]);
    }
  if(user?.type==="Technician"){
    const newcomplianceItem = 
    {
      icon: <TbReportAnalytics className="text-xl" />,
      label: "Ledger",
      link: "/ledger",
    };
    setNavigationItems([...defaultNavigationItems, newcomplianceItem]);
  }
  }, [user]);

  return (
    <aside className="flex flex-col bg-white  h-screen sticky top-0 z-50 ">
      <nav className="mt-8 flex flex-col gap-3 pr-3">
        <Container 
    icon={ <MdOutlineDashboard className="text-xl" />}
    label={ "Dashboard"}
    link={ "/dashboard"}
    router={router}
/>
<Container 
    icon={ <LuHistory className="text-xl" />}
    label={ "Order History"}
    link={ "/order-history"}
    router={router}
/>
<Container 
    icon={ <GrCompliance className="text-xl" />}
    label={ "Repair history"}
    link={ "/complains"}
    router={router}
/>
{user?.type==="Technician" || isDealer ? <Container 
    icon={ <TbReportAnalytics className="text-xl" />}
    label={ "Ledger"}
    link={ "/ledger"}
    router={router}
/>:<></>}
{isDealer&&
<Container 
    icon={ <HiOutlineDocumentReport className="text-xl" />}
    label={ "Commission"}
    link={ "/commission"}
    router={router}
/>}

<Container 
    icon={ <MdPayment className="text-xl" />}
    label={ "Pay Online"}
    link={ "/pay-online"}
    router={router}
/>
<Container 
    icon={ <MdPersonOutline className="text-xl" />}
    label={ "My Profile"}
    link={ "/userprofile"}
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



 function Container({link,router,icon,label}:any) {
  return (
    <Link  href={link}>
    <div
      className={`flex items-center space-x-2 px-4 py-3 ${
        router === link ? "text-gray-900" : "text-gray-600"
      } ${
        router === link
          ? "rounded-lg bg-[#e2f3f8]"
          : "hover:bg-[#e2f3f8] rounded-lg"
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  </Link>
  )
}

