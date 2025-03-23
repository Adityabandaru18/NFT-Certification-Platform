import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";  // ✅ Import persist middleware


interface Main {
  wallet: string;
  addWallet: (wallet: string) => void;
  getWallet: () => string;

}

const useStore = create<Main>()(
  persist(   
    (set, get) => ({
      wallet: "",

      addWallet: (wallet) => {
        set({ wallet });
      },
      getWallet: () => get().wallet,
    }),
    {
      name: "user-storage", 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);

export default useStore;
