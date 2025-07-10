"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPasswordForm() {
  const { push } = useRouter();
  const [accountType, setAccountType] = useState("");
  const [input, setInput] = useState({
    mobile: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSignIn = async () => {
    let data = new FormData();
    data.append("type", accountType);
    data.append("username", input.mobile);
    await axios
      .post(
        `https://www.technicalsewa.com/techsewa/publiccontrol/resetpassword`,
        data
      )
      .then(({ data }) => {
        if ((!data?.status || data?.status === "False") && data?.msg) {
          toast(`❌ ${data?.msg}`);
        } else if (data?.status === "Success") {
          toast(
            data?.msg ?? `New password has been sent to your mobile number.`
          );
          push("/login");
        }
      });
  };

  return (
    <div className="bg-white  pt-10 pb-[79px]">
      <div className="flex flex-col justify-center pt-[50px] w-[80%] lg:w-[33.33%]  mx-auto px-4 md:p-0">
        <div className="flex flex-col">
          <div className="py-2">
            <h2 className="text-xl leading-[19.5px] font-semibold mt-[12px]">
              Reset your password
            </h2>

            {accountType && (
              <p className="text-gray-500">
                Enter your registered phone number to reset password.
              </p>
            )}
          </div>
        </div>

        {!accountType && (
          <div className="mt-5">
            <div className="mb-2 w-full border-2 border-b border-gray-300"></div>
            <p className="">
              Please specify forgot password is for customer or technician
            </p>
            <div className="py-2 max-md:space-y-2 md:space-x-2 md:flex">
              <button
                onClick={() => setAccountType("Customer")}
                className="text-white text-lg leading-[18px] bg-primary font-normal rounded-sm w-full py-[15px]"
              >
                Customer
              </button>
              <button
                onClick={() => setAccountType("Technician")}
                className="text-white text-lg leading-[18px] bg-primary font-normal rounded-sm w-full py-[15px]"
              >
                Technician
              </button>
            </div>
          </div>
        )}

        {accountType && (
          <>
            <input
              type="text"
              name="mobile"
              required
              onChange={handleChange}
              placeholder="Phone Number"
              className="border w-full border-[#D9D9D9] py-[12px] pl-[20px] mt-[20px] placeholder:text-[#666666]/[0.4] placeholder:italic placeholder:font-normal rounded-[2px] outline-none"
            />

            <button
              onClick={handleSignIn}
              className="text-white text-[15px] leading-[18px] bg-primary font-normal rounded-[2px] w-full py-[15px]
        mt-[44px]"
            >
              Reset Password
            </button>
          </>
        )}

        <div className="flex items-center justify-center mt-[57px] mb-[10px] space-x-1">
          <p className="text-[13px] text-[#666666] leading-[10.72px] font-normal">
            Return to
          </p>
          <Link
            href="/login"
            className="text-[13px] text-[#BB243F] leading-[10px] font-bold underline decoration-[#BB243F] cursor-pointer"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
