import {
  ZustandHookSelectors,
  createSelectorHooks,
} from "auto-zustand-selectors-hook";
import { produce } from "immer";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CustomerInfo {
  id: string;
  name: string;
  dealer: string;
  cust_id:string;
  address: string;
  phone?: string;
  mobile: string;
  email: string;
  type: string;
  photo: string;
}

type AuthStoreType = {
  user: CustomerInfo | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signin: (user: CustomerInfo, token?: string) => void;
  signout: () => void;
  stopLoading: () => void;
  token?: string;
};

const useAuthStoreBase = create<AuthStoreType>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      signin: (user, token) => {
        set(
          produce<AuthStoreType>((state) => {
            state.isAuthenticated = true;
            state.user = user;
            if (token) state.token = token;
          })
        );
      },
      signout: () => {
        localStorage.removeItem("token");
        set(
          produce<AuthStoreType>((state) => {
            state.isAuthenticated = false;
            state.user = null;
          })
        );
      },
      stopLoading: () => {
        set(
          produce<AuthStoreType>((state) => {
            state.isLoading = false;
          })
        );
      },
    }),
    {
      name: "auth-storage", // unique
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
const useAuthStore = createSelectorHooks(
  useAuthStoreBase
) as typeof useAuthStoreBase & ZustandHookSelectors<AuthStoreType>;
export default useAuthStore;
