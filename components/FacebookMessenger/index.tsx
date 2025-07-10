"use client";
import React from "react";
import { FacebookProvider, CustomChat } from "react-facebook";

export default function FacebookMessenger() {
  return (
    <FacebookProvider appId="659173229438560" chatSupport>
      <CustomChat pageId="126960797174477" minimized={false} />
    </FacebookProvider>
  );
}
