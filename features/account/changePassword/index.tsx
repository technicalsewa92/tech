"use client";
import useAuthStore from "@/store/useAuthStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ChangePasswordForm() {
  const { user, signout, isLoading, isAuthenticated } = useAuthStore();
  const { push } = useRouter();
  const [input, setInput] = useState({
    old_password: "",
    new_password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidForm) {
      toast("Please fill all the fields");
      return;
    }
    const data = new FormData();
    // params: old_password , new_password,type,id
    data.append("id", `${user?.id}`);
    data.append("type", `${user?.type}`);
    data.append("old_password", input.old_password);
    data.append("new_password", input.new_password);
    await axios
      .post(
        `https://www.technicalsewa.com/techsewa/publiccontrol/changePassword`,
        data
      )
      .then(({ data }) => {
        if ((!data?.status || data?.status === "False") && data?.msg) {
          toast(`❌ ${data?.msg}`);
        } else if (data?.status === "Success") {
          toast(`Password changed successfully!`);
          signout();
          window.location.href = "/login";
        }
      });
  };

  const isValidForm = input.old_password && input.new_password;

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = "/login";
    }
  }, [isLoading, isAuthenticated]);

  return (
    <div className="bg-white  pt-10 pb-[79px]">
      <div className="flex flex-col justify-center pt-[50px] w-[80%] lg:w-[33.33%]  mx-auto px-4 md:p-0">
        <div className="flex flex-col">
          <div className="py-2">
            <h2 className="text-xl leading-[19.5px] font-semibold mt-[12px]">
              Change password
            </h2>

            <p className="text-gray-500">
              Enter your old password to change password.
            </p>
          </div>
        </div>

        <form onSubmit={handleChangePassword}>
          <input
            type="password"
            name="old_password"
            required
            onChange={handleChange}
            placeholder="Old Password"
            className="border w-full border-[#D9D9D9] py-[12px] pl-[20px] mt-[20px] placeholder:text-[#666666]/[0.4] placeholder:italic placeholder:font-normal rounded-[2px] outline-none"
            minLength={6}
          />

          {input.old_password && input.old_password?.length < 6 && (
            <div
              className="px-4 py-1 my-1 text-orange-700 bg-orange-100 border-l-4 border-orange-500"
              role="alert"
            >
              <p>Password must be at least 6 characters</p>
            </div>
          )}

          <input
            type="password"
            name="new_password"
            required
            onChange={handleChange}
            placeholder="New Password"
            className="border w-full border-[#D9D9D9] py-[12px] pl-[20px] mt-[20px] placeholder:text-[#666666]/[0.4] placeholder:italic placeholder:font-normal rounded-[2px] outline-none"
            minLength={6}
          />

          {input.new_password && input.new_password?.length < 6 && (
            <div
              className="px-4 py-1 my-1 text-orange-700 bg-orange-100 border-l-4 border-orange-500"
              role="alert"
            >
              <p>Password must be at least 6 characters</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!isValidForm}
            className="text-white text-[15px] leading-[18px] bg-primary font-normal rounded-[2px] w-full py-[15px]
        mt-[44px] disabled:bg-opacity-60 disabled:cursor-not-allowed"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
