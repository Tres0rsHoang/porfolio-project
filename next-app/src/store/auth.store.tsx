import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  isRefreshing: boolean;
  setToken: (accessToken: string) => void;
  clearTokens: () => void;
  ensureToken: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  isRefreshing: false,
  setToken: (accessToken: string) => set({ accessToken }),
  clearTokens: () => set({ accessToken: null }),
  ensureToken: async () => {
    const { accessToken, isRefreshing } = get();
    if (accessToken || isRefreshing) return;
    set({ isRefreshing: true });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/refresh`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!res.ok) {
        set({ accessToken: null, isRefreshing: false });
        return;
      }
      const data = await res.json();
      set({ accessToken: data.accessToken, isRefreshing: false });
    } catch (err) {
      console.error("Failed to refresh token", err);
      set({ accessToken: null, isRefreshing: false });
    }
  },
}));
