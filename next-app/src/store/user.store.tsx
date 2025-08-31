import { User } from "@/models/user.model";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  commented: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  setCommented: (value: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      commented: false,
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null, commented: false }),
      setCommented: (value: boolean) => set({ commented: value }),
    }),
    {
      name: "user-storage",
    },
  ),
);
