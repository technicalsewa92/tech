import React from "react";

export default function CustomerProfile({ profile }: { profile: any }) {
  console.log(profile)
  return (
    <>
      <div className="py-2 mt-4 flex flex-wrap gap-3 w-full">
        <div className=" bg-gray-100 rounded-sm border p-1 flex gap-2 px-5 md:w-[45%] w-[100%]">
          <strong>Name: </strong>
          <span>
            {`${profile?.first_name} ${profile?.last_name}`}
          </span>
        </div>
        <div className="p-1 flex gap-2 px-5 md:w-[45%] w-[100%] bg-gray-100 rounded-sm border">
          <strong>Email: </strong>
          <span>{profile?.email}</span>
        </div>
        <div className="p-1 flex gap-2 px-5 md:w-[45%] w-[100%] bg-gray-100 rounded-sm border">
          <strong>Mobile: </strong>
          <span>{profile?.mobile_number}</span>
        </div>
        <div className="p-1 flex gap-2 px-5 md:w-[45%] w-[100%] bg-gray-100 rounded-sm border">
          <strong>Address: </strong>
          <span>{profile?.address}</span>
        </div>
      </div>
    </>
  );
}
