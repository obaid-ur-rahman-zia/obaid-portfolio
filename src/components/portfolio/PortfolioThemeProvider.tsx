"use client";

import { useEffect } from "react";
import { usePortfolioThemeStore } from "@/lib/portfolio-theme-store";

export function PortfolioThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = usePortfolioThemeStore((s) => s.theme);

  useEffect(() => {
    const body = document.body;
    body.classList.toggle("portfolio-body-light", theme === "light");
    body.classList.toggle("portfolio-body-dark", theme === "dark");
    return () => {
      body.classList.remove("portfolio-body-light", "portfolio-body-dark");
    };
  }, [theme]);

  return (
    <div className={`portfolio-theme min-h-screen${theme === "light" ? " portfolio-light" : ""}`}>
      {children}
    </div>
  );
}
