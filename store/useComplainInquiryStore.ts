import { createSelectorHooks } from "auto-zustand-selectors-hook";
import { produce } from "immer";
import { create } from "zustand";

export interface InquiryInfo {
  service_category: string;
  product_category: string;
  brand_product_id: string;
  service_id: string;
  location: { lat: number; long: number };
}

type ComplainStoreType = {
  inquiryData: InquiryInfo | null;
  setInquiryData: (data: { [key: string]: string | object }) => void;
};

const useComplainFormStoreBase = create<ComplainStoreType>((set) => ({
  inquiryData: null,
  setInquiryData: (data) => {
    set(
      produce<ComplainStoreType>((state) => {
        state.inquiryData = { ...state.inquiryData, ...data } as InquiryInfo;
      })
    );
  },
  clearInquiryData: () => {
    set(
      produce<ComplainStoreType>((state) => {
        state.inquiryData = null;
      })
    );
  },
}));

const useComplainFormStore = createSelectorHooks(useComplainFormStoreBase);

export default useComplainFormStore;
