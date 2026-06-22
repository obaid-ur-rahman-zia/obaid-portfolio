"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Smartphone,
  Briefcase,
  CreditCard,
  Users,
  User,
  Mail,
  LogOut,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mainNav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/contacts", label: "Messages", icon: Mail, badge: true },
];

const contentNav = [
  { href: "/admin/apps", label: "Projects", icon: Smartphone },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/plans", label: "Pricing", icon: CreditCard },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/profile", label: "Profile", icon: User },
];

function NavGroup({
  title,
  items,
  pathname,
}: {
  title: string;
  items: typeof mainNav;
  pathname: string;
}) {
  return (
    <div className="mb-6">
      <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </p>
      <ul className="space-y-0.5">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
                {href === "/admin/contacts" && (
                  <Badge variant={active ? "secondary" : "outline"} className="ml-auto text-[10px] h-5">
                    Inbox
                  </Badge>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  if (pathname === "/admin") return null;

  return (
    <aside className="flex w-[260px] shrink-0 flex-col border-r border-border bg-card min-h-screen">
      <div className="flex h-16 items-center gap-3 border-b border-border px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Layers className="h-5 w-5" />
        </div>
        <div>
          <Link href="/admin/dashboard" className="font-semibold text-sm tracking-tight block">
            Portfolio CRM
          </Link>
          <p className="text-[10px] text-muted-foreground">Content Manager</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <NavGroup title="Overview" items={mainNav} pathname={pathname} />
        <NavGroup title="Content" items={contentNav} pathname={pathname} />
      </nav>

      <div className="border-t border-border p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={() => {
            logout();
            router.push("/admin");
          }}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </aside>
  );
}
