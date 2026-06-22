"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PortfolioTheme = "dark" | "light";

interface PortfolioThemeState {
  theme: PortfolioTheme;
  setTheme: (theme: PortfolioTheme) => void;
  toggleTheme: () => void;
}

export const usePortfolioThemeStore = create<PortfolioThemeState>()(
  persist(
    (set, get) => ({
      theme: "dark",
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set({ theme: get().theme === "dark" ? "light" : "dark" }),
    }),
    { name: "portfolio-theme" }
  )
);
