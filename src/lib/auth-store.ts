"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { login as apiLogin, setAuthToken } from "@/lib/api";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hydrate: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      isAuthenticated: false,
      hasHydrated: false,
      login: async (email, password) => {
        const { access_token } = await apiLogin(email, password);
        setAuthToken(access_token);
        set({ token: access_token, isAuthenticated: true });
      },
      logout: () => {
        setAuthToken(null);
        set({ token: null, isAuthenticated: false });
      },
      hydrate: () => {
        const token = get().token;
        if (token) {
          setAuthToken(token);
          set({ isAuthenticated: true });
        }
      },
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "portfolio-admin-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token }),
      onRehydrateStorage: () => (state, error) => {
        if (!error && state?.token) {
          setAuthToken(state.token);
          useAuthStore.setState({ isAuthenticated: true, token: state.token });
        }
        useAuthStore.setState({ hasHydrated: true });
      },
    }
  )
);
