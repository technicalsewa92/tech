import Nav from "@/components/Nav";
import SignUpPro from "@/features/authentication/signup/pro-signup";
import React from "react";

const page = () => {
  return (
    <>
      {/* <Nav /> */}
      <SignUpPro />
    </>
  );
};

export default page;

export async function generateMetadata() {
  return {
    title: `SignUp Pro | Technical sewa`,
  };
}
