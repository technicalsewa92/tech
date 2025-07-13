'use client';

import ImageWithFallback from '@/components/ui/ImageWithFallback';
import React, { useState } from 'react';
import { EyeOff } from 'lucide-react';
import { Eye } from 'lucide-react';
import axios from 'axios';
import { baseUrl } from '@/public/baseUrl';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import toast from 'react-hot-toast';
import { getAssetUrl } from '@/lib/cdn';

const StandardSignUp = () => {
  const { push } = useRouter();
  const { signin } = useAuthStore();
  const [input, setInput] = useState({
    mobilenumber: '',
    firstname: '',
    lastname: '',
    emailaddress: '',
    address: '',
    password: '',
    confirmpassword: '',
    refferedby: '',
  });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    if (input.password === input.confirmpassword) {
      data.append('phone', input.mobilenumber);
      data.append('firstname', input.firstname);
      data.append('lastname', input.lastname);
      data.append('email', input.emailaddress);
      data.append('address', input.address);
      data.append('password', input.password);
      data.append('confirm_password', input.confirmpassword);
      data.append('reffered_by', input.refferedby);

      await axios
        .post(`${baseUrl}techsewa/masterConfig/publicLogin/Signup`, data)
        .then(({ data }) => {
          toast('✅ You have successfully signed up!');
          signin(data);
          push('/');
        });
    } else {
      alert('Password and confirm password do not match');
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  const isValidForm =
    input.firstname &&
    input.password &&
    input.confirmpassword &&
    input.mobilenumber;

  return (
    // sign up page started..
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
      <div className="w-[80%] lg:w-[40%]">
        <form onSubmit={handleSignUp} className="flex flex-col gap-5 w-full">
          <input
            minLength={10}
            name="mobilenumber"
            className=" w-full px-4 py-3 border-[1px] text-[14px] italic outline-none"
            type="number"
            placeholder="Mobile Number"
            onChange={handleChange}
            required
          />
          <div className="lg:space-x-4 max-lg:space-y-5 lg:grid lg:grid-cols-2">
            <input
              name="firstname"
              className="max-lg:w-full px-4 py-3 border-[1px] text-[14px] italic outline-none"
              type="text"
              placeholder="First Name"
              onChange={handleChange}
              required
            />
            <input
              name="lastname"
              className="max-lg:w-full  px-4 py-3 border-[1px] text-[14px] italic outline-none"
              type="text"
              placeholder="Last Name"
              onChange={handleChange}
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
                className="w-full px-4 py-3   pl-[20px]   placeholder:italic placeholder:font-normal rounded-[2px] outline-none text-[14px]"
                type={`${showPassword === false ? 'password' : 'text'}`}
                placeholder="Password"
                onChange={handleChange}
                required
              />

              <div
                className=" border-l-[1px] p-4"
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

          <div className="lg:space-x-4 max-lg:space-y-5 lg:grid lg:grid-cols-2">
            <input
              name="address"
              className="max-lg:w-full px-4 py-3 border-[1px] text-[14px] italic outline-none"
              type="text"
              placeholder="Address"
              onChange={handleChange}
              required
            />
            <input
              name="refferedby"
              className="max-lg:w-full px-4 py-3 border-[1px] text-[14px] italic outline-none"
              type="text"
              placeholder="Reffered By"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={!isValidForm}
            className={`p-4 w-full text-white rounded-md bg-primary disabled:bg-opacity-60`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default StandardSignUp;
