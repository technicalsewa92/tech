import React from "react";
import Nav from '@/components/Nav'
import ChangePasswordForm from "@/features/account/changePassword";

export default function ChangePasswordPage() {
  return (
    <>
      <ChangePasswordForm />
    </>
  );
}

export async function generateMetadata() {
  return {
    title: `Change Password | Technical sewa`,
  };
}
