import Nav from '@/components/Nav';
import LoginForm from '@/features/authentication/login';
import RecommendedServices from '@/components/RecommendedServices';
import React from 'react';

const page = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-white py-8 px-2">
      <LoginForm />
      {/* Removed Our Services section from login page as requested */}
    </div>
  );
};

export default page;

export async function generateMetadata() {
  return {
    title: `Login | Technical sewa`,
  };
}
