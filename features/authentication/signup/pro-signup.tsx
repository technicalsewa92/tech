'use client';

import ImageWithFallback from '@/components/ui/ImageWithFallback';
import React, { useState } from 'react';
import { EyeOff } from 'lucide-react';
import { Eye } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import { getAssetUrl } from '@/lib/cdn';

const SignUpPro = () => {
  const { push } = useRouter();
  const { signin } = useAuthStore();
  const [input, setInput] = useState({
    mobilenumber: '',
    name: '',
    address: '',
    emailaddress: '',
    password: '',
    confirmpassword: '',
    skill: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  const handleSignUpPro = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.password === input.confirmpassword) {
      const data = new FormData();
      data.append('name', input.name);
      data.append('address', input.address);
      data.append('mobile', input.mobilenumber);
      data.append('email', input.emailaddress);
      data.append('password', input.password);
      data.append('skill', input.skill);
      data.append('confirm_password', input.confirmpassword);

      await axios
        .post(
          'https://www.technicalsewa.com/techsewa/masterConfig/publicLogin/TechSignUp',
          data
        )
        .then(({ data }) => {
          toast('✅ You have successfully signed up');
          signin(data);
          push('/');
          // console.log(response.data.message);
        });
    } else {
      alert('Password and confirm password do not match');
    }
  };

  const isValidForm =
    input.name && input.password && input.confirmpassword && input.mobilenumber;

  return (
    <div className="flex flex-col gap-10 items-center py-10">
      {/* logo and text  */}
      <div className="flex flex-col items-center">
        <ImageWithFallback
          className="w-[100px] md:w-[150px]"
          src={getAssetUrl('/assets/ts-final-logo.png')}
          alt="logo"
          width={150}
          height={150}
        />

        <p className="text-[13px] text-[#747774] leading-9">
          Sign Up to use our services
        </p>
      </div>

      <h2 className="text-lg font-bold">Sign Up</h2>

      {/* input  */}
      <div className="w-[80%] lg:w-[40%] flex flex-col gap-5">
        <form onSubmit={handleSignUpPro} className="flex flex-col gap-5 w-full">
          <input
            name="mobilenumber"
            className=" w-full px-4 py-3 border-[1px] text-[14px] italic outline-none"
            type="number"
            placeholder="Mobile Number"
            onChange={handleChange}
            required
          />
          <div className="lg:space-x-4 max-lg:space-y-5 lg:grid lg:grid-cols-2">
            <input
              name="name"
              className="max-lg:w-full  px-4 py-3 border-[1px] text-[14px] italic outline-none"
              type="text"
              placeholder="Name"
              onChange={handleChange}
              required
            />
            <input
              name="address"
              className="max-lg:w-full  px-4 py-3 border-[1px] text-[14px] italic outline-none"
              type="text"
              placeholder="Address"
              required
            />
          </div>
          <input
            name="emailaddress"
            className=" w-full  px-4 py-3 border-[1px] text-[14px] italic outline-none"
            type="text"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />

          <div className="lg:space-x-4 max-lg:space-y-5 lg:grid lg:grid-cols-2">
            {/* password  */}
            <div className="flex items-center  border-[1px] justify-between">
              <input
                name="password"
                className="w-full px-4 py-3 pl-[20px]   placeholder:italic placeholder:font-normal rounded-[2px] outline-none text-[14px]"
                type={`${showPassword === false ? 'password' : 'text'}`}
                placeholder="Password"
                onChange={handleChange}
                required
              />

              <div
                className="border-l-[1px] p-4"
                onClick={() => setshowPassword(!showPassword)}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </div>
            </div>
            <div className="flex items-center  border-[1px] justify-between">
              <input
                name="confirmpassword"
                className=" w-full px-4 py-3 pl-[20px]   placeholder:italic placeholder:font-normal rounded-[2px] outline-none text-[14px]"
                type={`${showConfirmPassword === false ? 'password' : 'text'}`}
                placeholder="Confirm Password"
                onChange={handleChange}
                required
              />

              <div
                className=" border-l-[1px] p-4"
                onClick={() => setshowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <Eye /> : <EyeOff />}
              </div>
            </div>
          </div>

          <input
            name="skill"
            className=" w-full px-4 py-3 border-[1px] text-[14px] italic outline-none"
            type="text"
            placeholder="Skill"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={!isValidForm}
            className="p-4 w-full text-white rounded-md bg-primary disabled:bg-opacity-60"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPro;
