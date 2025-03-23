import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";  // ✅ Import persist middleware


interface Main {
  wallet: string;
  addWallet: (wallet: string) => void;
  getWallet: () => string;
  role: number;
  addRole: (role: number) => void;
  getRole: () => number;
}

const useStore = create<Main>()(
  persist(   
    (set, get) => ({
      wallet: "",

      addWallet: (wallet) => {
        set({ wallet });
      },
      getWallet: () => get().wallet,

      role: 0,
      addRole: (role) => {
        set({role});
      },
      getRole: () => get().role,
    }),
    {
      name: "user-storage", 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);

export default useStore;
