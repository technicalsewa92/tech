import { fetchClient } from '@/lib/api';

export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  return fetchClient('/techsewa/masterconfig/publiclogin/signinlate', {
    method: 'POST',
    body: formData,
  });
}

export async function signupStandard(data: {
  mobilenumber: string;
  firstname: string;
  lastname: string;
  emailaddress: string;
  address: string;
  password: string;
  confirmpassword: string;
  refferedby?: string;
}) {
  const formData = new FormData();
  formData.append('phone', data.mobilenumber);
  formData.append('firstname', data.firstname);
  formData.append('lastname', data.lastname);
  formData.append('email', data.emailaddress);
  formData.append('address', data.address);
  formData.append('password', data.password);
  formData.append('confirm_password', data.confirmpassword);
  if (data.refferedby) formData.append('reffered_by', data.refferedby);
  return fetchClient('/techsewa/masterConfig/publicLogin/Signup', {
    method: 'POST',
    body: formData,
  });
}

export async function signupPro(data: {
  mobilenumber: string;
  name: string;
  address: string;
  emailaddress: string;
  password: string;
  confirmpassword: string;
  skill: string;
}) {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('address', data.address);
  formData.append('mobile', data.mobilenumber);
  formData.append('email', data.emailaddress);
  formData.append('password', data.password);
  formData.append('skill', data.skill);
  formData.append('confirm_password', data.confirmpassword);
  return fetchClient('/techsewa/masterConfig/publicLogin/TechSignUp', {
    method: 'POST',
    body: formData,
  });
}
