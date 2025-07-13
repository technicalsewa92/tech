import Nav from '@/components/Nav';
import StandardSignUp from '@/features/authentication/signup/standard-signup';
import React from 'react';

const page = () => {
  return (
    <>
      <StandardSignUp />
    </>
  );
};

export default page;

export async function generateMetadata() {
  return {
    title: `SignUP | Technical sewa`,
  };
}
