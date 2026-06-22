"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAdminThemeStore } from "@/lib/admin-theme-store";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminThemeProvider } from "@/components/admin/AdminThemeProvider";
import "./admin-theme.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin";
  const theme = useAdminThemeStore((s) => s.theme);

  return (
    <AdminGuard>
      <AdminThemeProvider>
        <div
          className={cn(
            "admin-panel min-h-screen",
            theme === "light" && "admin-light",
            !isLogin && "flex"
          )}
        >
          {!isLogin && <AdminSidebar />}
          <div className={cn("flex min-h-screen min-w-0 flex-1 flex-col", isLogin && "w-full")}>
            {!isLogin && <AdminTopbar />}
            <main
              className={cn(
                isLogin
                  ? "flex min-h-screen w-full flex-1 items-center justify-center p-6"
                  : "admin-crm-main flex-1 overflow-auto p-6 md:p-8"
              )}
            >
              {children}
            </main>
          </div>
        </div>
      </AdminThemeProvider>
    </AdminGuard>
  );
}
