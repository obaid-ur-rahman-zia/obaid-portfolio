"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Smartphone,
  Briefcase,
  CreditCard,
  Mail,
  Users,
  User,
  ArrowRight,
  Inbox,
} from "lucide-react";
import { getStats } from "@/lib/api";
import type { DashboardStats } from "@/types";
import { CrmPageHeader } from "@/components/admin/crm/CrmPageHeader";
import { CrmStatCard } from "@/components/admin/crm/CrmStatCard";
import { CrmPanel } from "@/components/admin/crm/CrmPanel";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const quickLinks = [
  { href: "/admin/apps", label: "Manage projects", icon: Smartphone },
  { href: "/admin/contacts", label: "View messages", icon: Inbox },
  { href: "/admin/profile", label: "Edit profile", icon: User },
  { href: "/admin/plans", label: "Pricing plans", icon: CreditCard },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: "Published projects", value: loading ? "—" : (stats?.total_apps ?? 0), icon: Smartphone, trend: "Portfolio work" },
    { label: "Services", value: loading ? "—" : (stats?.total_services ?? 0), icon: Briefcase, trend: "Offerings on site" },
    { label: "Active plans", value: loading ? "—" : (stats?.active_plans ?? 0), icon: CreditCard, trend: "Pricing tiers" },
    {
      label: "Inbox",
      value: loading ? "—" : (stats?.contact_submissions ?? 0),
      icon: Mail,
      trend: stats && stats.unread_contacts > 0 ? `${stats.unread_contacts} unread` : "All caught up",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <CrmPageHeader
        title="Dashboard"
        description="Overview of your portfolio — content, messages, and quick actions."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        {statCards.map((card) =>
          loading ? (
            <Skeleton key={card.label} className="h-[120px] rounded-xl" />
          ) : (
            <CrmStatCard key={card.label} {...card} />
          )
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <CrmPanel title="Quick actions" description="Jump to common tasks" className="lg:col-span-1">
          <ul className="divide-y divide-border/60">
            {quickLinks.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-3 px-6 py-4 text-sm font-medium hover:bg-muted/50 transition-colors group"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  {label}
                  <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </CrmPanel>

        <CrmPanel
          title="Workspace"
          description="Content sections you manage from this CRM"
          className="lg:col-span-2"
        >
          <div className="grid sm:grid-cols-2 gap-4 p-6">
            {[
              { href: "/admin/apps", label: "Projects", desc: "Showcase software products", icon: Smartphone },
              { href: "/admin/services", label: "Services", desc: "What you offer clients", icon: Briefcase },
              { href: "/admin/team", label: "Team", desc: "People on your site", icon: Users },
              { href: "/admin/contacts", label: "Messages", desc: "Contact form inbox", icon: Mail },
            ].map(({ href, label, desc, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="rounded-xl border border-border/80 bg-card p-5 hover:border-primary/40 hover:shadow-md transition-all"
              >
                <Icon className="h-5 w-5 text-primary mb-3" />
                <p className="font-semibold text-sm">{label}</p>
                <p className="text-xs text-muted-foreground mt-1">{desc}</p>
              </Link>
            ))}
          </div>
        </CrmPanel>
      </div>

      {!loading && stats && stats.unread_contacts > 0 && (
        <CrmPanel title="Attention needed" className="mt-6 border-destructive/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6">
            <p className="text-sm text-muted-foreground">
              You have <strong className="text-foreground">{stats.unread_contacts}</strong> unread contact
              {stats.unread_contacts === 1 ? "" : "s"}.
            </p>
            <Button asChild size="sm">
              <Link href="/admin/contacts">Open inbox</Link>
            </Button>
          </div>
        </CrmPanel>
      )}
    </div>
  );
}
