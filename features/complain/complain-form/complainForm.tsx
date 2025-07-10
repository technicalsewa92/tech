import React, { useState } from "react";

import MapComponent from "@/components/mapComponents/MapComponent";
import ComplainFormFinalStep from "./complainFormFinalStep";
import useComplainFormStore from "@/store/useComplainInquiryStore";

export default function ComplainForm() {
  const [formStep2, setFormStep2] = useState(false);
  const { setInquiryData } = useComplainFormStore();


  const handleProceedToStep2 = (location: any) => {
    setInquiryData({ location: { lat: location.lat, long: location.lng } });
    setFormStep2(true);
  };

  if (formStep2) {
    return <ComplainFormFinalStep onBack={() => setFormStep2(false)} />;
  }

  return <MapComponent onProceed={handleProceedToStep2} />;
}
