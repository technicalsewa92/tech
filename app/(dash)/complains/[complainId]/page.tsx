import Nav from "@/components/Nav";
import Footer from "@/components/footer/Footer";
import ComplainView from "@/features/complain/complain-view";
import React from "react";

export default function ComplainViewPage({ params }: any) {
  return (
    <>
      <ComplainView complainId={params?.complainId} />
    </>
  );
}
