"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronRight, ExternalLink } from "lucide-react";
import { AdminThemeToggle } from "./AdminThemeToggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE } from "@/lib/site";

const labels: Record<string, string> = {
  dashboard: "Dashboard",
  apps: "Projects",
  services: "Services",
  plans: "Pricing Plans",
  team: "Team",
  profile: "Profile",
  contacts: "Messages",
};

export function AdminTopbar() {
  const pathname = usePathname();
  const segment = pathname.split("/").pop() || "dashboard";
  const title = labels[segment] || "Admin";

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-border bg-card/95 backdrop-blur px-6">
      <div className="flex items-center gap-2 text-sm">
        <Link href="/admin/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
          CRM
        </Link>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <span className="font-semibold">{title}</span>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" asChild className="hidden sm:flex gap-2">
          <Link href="/" target="_blank">
            <ExternalLink className="h-4 w-4" />
            View site
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
        </Button>
        <AdminThemeToggle />
        <div className="flex items-center gap-3 pl-3 border-l border-border">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium leading-none">{SITE.name}</p>
            <p className="text-xs text-muted-foreground mt-1">Administrator</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
            {SITE.initials}
          </div>
          <Badge variant="secondary" className="hidden md:inline-flex text-[10px]">
            Online
          </Badge>
        </div>
      </div>
    </header>
  );
}
