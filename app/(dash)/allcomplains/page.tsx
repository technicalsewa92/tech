"use client"
import UserComplains from "@/features/complain/my-complains";
import NewComplains from "@/features/complain/my-complains/newcomplains";
import { useSearchParams } from "next/navigation";

const AllComplains = () => {
const params=useSearchParams();
const data=params.get("id");
const title=params.get("title");
console.log("All ID:",data)
    return <>
      <NewComplains status={data} title={title}/>
    </>;
};

export default AllComplains;


