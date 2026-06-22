"use client";

import { useEffect } from "react";
import { useAdminThemeStore } from "@/lib/admin-theme-store";

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useAdminThemeStore((s) => s.theme);

  useEffect(() => {
    const panels = document.querySelectorAll(".admin-panel");
    panels.forEach((el) => {
      el.classList.toggle("admin-light", theme === "light");
    });
  }, [theme]);

  return <>{children}</>;
}
