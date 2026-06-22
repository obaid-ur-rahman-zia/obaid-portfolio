"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminThemeStore } from "@/lib/admin-theme-store";

export function AdminThemeToggle() {
  const { theme, toggleTheme } = useAdminThemeStore();
  const isDark = theme === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="justify-start gap-3 font-mono text-[10px] uppercase tracking-wider min-w-[140px]"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {isDark ? "Light mode" : "Dark mode"}
    </Button>
  );
}
