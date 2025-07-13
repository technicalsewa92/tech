'use client';
import useAuthStore from '@/store/useAuthStore';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye } from 'react-icons/ai';
import { BsEyeSlashFill } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const LoginForm1 = ({ cb }: { cb?: () => void }) => {
  const { push } = useRouter();
  const { signin } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
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
        cb && cb?.();
        !cb && push('/complains');
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

  return (
    <div className="bg-white  pt-[20px] pb-[79px]">
      <div className="flex flex-col  justify-center pt-[50px] w-[80%] lg:w-[33.33%]  mx-auto mt-4 px-4 md:p-0">
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

        <p className="text-2xl font-bold text-[#3398b7] text-center mt-6 mb-3">
          Login
        </p>

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
          className="text-[#555] text-[13px] leading-[10px] font-light mt-[20px]"
        >
          Forgot Password ?
        </Link>
        <button
          disabled={loading || !isValidForm}
          onClick={handleSignIn}
          className={`text-white text-[15px] leading-[18px] bg-primary font-bold rounded w-full py-[15px]
        mt-[44px] disabled:!text-gray-600 disabled:!bg-opacity-40 disabled:cursor-not-allowed`}
        >
          SIGN IN
        </button>

        <div className="flex items-center justify-center mt-5 mb-[10px] space-x-1">
          <p className="text-[13px] text-[#666666] leading-[10.72px] font-normal">
            Need an account?
          </p>
          <Link
            href="/sign-up-page/sign-up"
            className="text-[13px] text-[#BB243F] leading-[10px] font-bold underline decoration-[#BB243F] cursor-pointer"
          >
            Sign up
          </Link>
        </div>

        <div className="text-center">or</div>

        <div className="flex items-center justify-center mt-5 mb-[10px] space-x-1 gap-4">
          <FcGoogle size={30} className="text-[#34A853] cursor-pointer" />
          <FaFacebook size={30} className="text-[#1877F2] cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default LoginForm1;
