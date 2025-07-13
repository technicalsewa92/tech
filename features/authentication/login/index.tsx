'use client';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { BsEyeSlashFill } from 'react-icons/bs';
import { AiOutlineEye } from 'react-icons/ai';
import axios from 'axios';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { loginWithFacebook, loginWithGoogle } from '../auth';
import { baseUrl } from '@/public/baseUrl';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const LoginForm = ({ cb }: { cb?: () => void }) => {
  const { push } = useRouter();
  const { isAuthenticated, signin } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [phonenumber, setphonenumber] = useState('');
  const [userdata, setuserdata] = useState(null);
  const [input, setInput] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handlePhoneNumber = (e: any) => {
    setphonenumber(e.target.value);
  };
  const handleCRMLogin = () => {
    const form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute(
      'action',
      'https://www.technicalsewa.com/techsewa/verify/signin'
    );

    const loginParams: any = { ...input };

    form.setAttribute('id', 'form');
    for (const key in loginParams) {
      const hiddenField = document.createElement('input');
      hiddenField.setAttribute('type', 'hidden');
      hiddenField.setAttribute('name', key);
      hiddenField.setAttribute('value', loginParams[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  const handleSignIn = async () => {
    setLoading(true);

    const data = new FormData();
    data.append('username', input.username);
    data.append('password', input.password);
    try {
      const loginRes = await axios.post(
        `https://www.technicalsewa.com/techsewa/masterconfig/publiclogin/signinlate`,
        data
      );

      // crm login if only success response
      if (loginRes.data === 'success') {
        toast('Loggining to CRM...');
        handleCRMLogin();
        return;
      }

      if (typeof loginRes.data === 'object' && loginRes.data !== null) {
        localStorage.setItem('data', JSON.stringify(loginRes.data));
        localStorage.setItem('id', loginRes.data.id);
        signin(loginRes.data);
        const redirectUrl = localStorage.getItem('redirectUrl');
        if (redirectUrl) {
          push(redirectUrl);
          return;
        }
        cb && cb?.();
        !cb && push('/');
      } else {
        toast('❌ Invalid login!');
        throw new Error('Login Failed');
      }
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setshowPassword] = useState(false);

  const isValidForm = input.username && input.password;
  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();

      // console.log('Google Login Success:', user);
      logincheckandLogin(user);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSignUp = async (userdata: any) => {
    const data = new FormData();
    if (userdata.phoneNumber == null) {
      openDialog();
      setuserdata(userdata);
    } else {
      const firstPart = userdata.accessToken.split('.')[0];
      const [firstName, lastName = ''] = userdata.displayName.trim().split(' ');
      data.append('phone', userdata.phoneNumber);
      data.append('first_name', firstName);
      data.append('last_name', lastName);
      data.append('email', userdata.email);
      // data.append("address", "input address");
      data.append('gtoken', firstPart);
      data.append('password', `${firstName}${userdata.phoneNumber}`);
      data.append('confirm_password', `${firstName}${userdata.phoneNumber}`);
      // data.append("reffered_by", input.refferedby);

      await axios
        .post(`${baseUrl}techsewa/masterConfig/publicLogin/Signup`, data)
        .then(({ data }) => {
          if (data.message && data.message.toLowerCase().includes('success')) {
            toast('✅ You have successfully signed up!');
            // Perform further actions like signin or redirect
            // console.log(data);
            logincheckandLogin(userdata);
            // push("/");
          } else {
            // Handle other responses or errors
            toast.error(
              `❌ ${data.message || 'Signup failed. Please try again.'}`
            );
            console.error(data);
          }
        })
        .catch(error => {
          // Handle request errors
          toast.error('❌ An error occurred during signup. Please try again.');
          console.error('Error:', error);
        });
    }
  };

  const addthePhonenumber = async ({ userdata, phonenumber }: any) => {
    const data = new FormData();

    const firstPart = userdata.accessToken.split('.')[0];
    const [firstName, lastName = ''] = userdata.displayName.trim().split(' ');
    data.append('phone', phonenumber);
    data.append('firstname', firstName);
    data.append('lastname', lastName);
    data.append('email', userdata.email);
    // data.append("address", "input address");
    data.append('gtoken', firstPart);
    data.append('password', `${firstName}${userdata.phoneNumber}`);
    data.append('confirm_password', `${firstName}${userdata.phoneNumber}`);
    data.append('photo', `${userdata.photoURL}`);
    // data.append("reffered_by", input.refferedby);
    await axios
      .post(`${baseUrl}techsewa/masterConfig/publicLogin/Signup`, data)
      .then(({ data }) => {
        if (data.message && data.message.toLowerCase().includes('success')) {
          toast('✅ You have successfully signed up!');
          // Perform further actions like signin or redirect
          // console.log(data);
          logincheckandLogin(userdata);
          // push("/");
        } else {
          // Handle other responses or errors
          toast.error(
            `❌ ${data.message || 'Signup failed. Please try again.'}`
          );
          console.error(data);
        }
      })
      .catch(error => {
        // Handle request errors
        toast.error('❌ An error occurred during signup. Please try again.');
        console.error('Error:', error);
      });
  };
  const logincheckandLogin = async (user: any) => {
    try {
      const data = new FormData();
      const firstPart = user.accessToken.split('.')[0];

      data.append('email', user.email);
      data.append('token', firstPart);

      const loginRes = await axios.post(
        `https://www.technicalsewa.com/techsewa/masterConfig/publiclogin/SigninbyGtoken`,
        data
      );

      // crm login if only success response

      // console.log('all data', loginRes);
      if (loginRes.data == 'No Records') {
        handleSignUp(user);
      } else {
        if (typeof loginRes.data === 'object' && loginRes.data !== null) {
          localStorage.setItem('data', JSON.stringify(loginRes.data));
          localStorage.setItem('id', loginRes.data.id);
          signin(loginRes.data);
          cb && cb?.();
          !cb && push('/');
        } else {
          toast('❌ Invalid login!');
          throw new Error('Login Failed');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleFacebookLogin = async () => {
    try {
      const user = await loginWithFacebook();
      logincheckandLogin(user);

      // console.log('Facebook Login Success:', user);
    } catch (error) {
      console.error(error);
    }
  };
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  // Function to open the dialog
  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  // Function to close the dialog
  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Removed phone number dialog and related UI as requested */}
      <div className="flex flex-col justify-center w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <div className="w-[150px] h-auto">
            <ImageWithFallback
              src="/../assets/logoofts.png"
              alt="image of logo"
              className="w-full h-full object-container"
              width={150}
              height={150}
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#3398b7] text-center mt-6 mb-3">
          Login
        </h1>

        <input
          type="text"
          name="username"
          required
          onChange={handleChange}
          placeholder="Username"
          className="border w-full border-[#666666]/[0.8] px-4 py-3 pl-[20px] mt-[20px] placeholder:text-[#666666]/[0.8] placeholder:italic placeholder:font-normal rounded outline-none"
        />

        <div className=" border border-[#666666]/[0.8] rounded-[2px] flex items-center mt-[24px]  w-full">
          <input
            type={`${showPassword === false ? 'password' : 'text'}`}
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 pl-[20px]  placeholder:text-[#666666]/[0.8] placeholder:italic placeholder:font-normal rounded outline-none"
          />
          <div
            className=" border-l-[1px] p-4"
            onClick={() => setshowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEye /> : <BsEyeSlashFill />}
          </div>
        </div>
        <Link
          href="/account/forgot-password"
          className="text-primary text-[13px] underline  leading-[10px] font-light mt-[20px]"
        >
          Forgot Password ?
        </Link>
        <button
          disabled={loading || !isValidForm}
          onClick={handleSignIn}
          className={`text-white text-[15px] leading-[18px] bg-primary hover:bg-[#1d7a95] font-bold rounded w-full py-[15px] mt-[44px] transition disabled:!text-gray-600 disabled:!bg-opacity-40 disabled:cursor-not-allowed`}
        >
          SIGN IN
        </button>

        <div className="flex items-center justify-center mt-5 mb-[10px] space-x-1">
          <p className="text-[13px] text-[#666666] leading-[10.72px] font-normal">
            Need an account?
          </p>
          <Link
            href="/sign-up-page"
            className="text-[13px] text-primary leading-[10px] font-bold underline decoration-primary cursor-pointer"
          >
            Sign up
          </Link>
        </div>

        <div className="text-center">or</div>

        <div className="flex items-center justify-center mt-5 mb-[10px] space-x-1 gap-4">
          <FcGoogle
            size={30}
            className="text-[#34A853] cursor-pointer"
            onClick={() => {
              handleGoogleLogin();
            }}
          />
          <FaFacebook
            size={30}
            className="text-[#1877F2] cursor-pointer"
            onClick={() => {
              handleFacebookLogin();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
