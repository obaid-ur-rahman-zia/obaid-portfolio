"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthStore((s) => s.token);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const isLogin = pathname === "/admin";

  useEffect(() => {
    if (!hasHydrated) return;
    if (isLogin && token) {
      router.replace("/admin/dashboard");
      return;
    }
    if (!isLogin && !token) {
      router.replace("/admin");
    }
  }, [hasHydrated, token, isLogin, pathname, router]);

  if (!hasHydrated) {
    return (
      <div className="admin-panel flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isLogin && !token) return null;

  return <>{children}</>;
}
