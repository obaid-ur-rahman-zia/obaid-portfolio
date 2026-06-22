"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppCard } from "@/components/cards/AppCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { AppItem } from "@/types";

export function FeaturedApps({ apps }: { apps: AppItem[] }) {
  const featured = apps.filter((a) => a.featured).slice(0, 3);
  const display = featured.length > 0 ? featured : apps.slice(0, 3);

  return (
    <section className="section-padding">
      <div className="container-main">
        <SectionHeading
          eyebrow="Portfolio"
          title="Projects I've shipped"
          subtitle="Production software built with Next.js, Node.js, AI, and cloud infrastructure."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {display.map((app, i) => (
            <AppCard key={app.id} app={app} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/apps" className="btn-secondary inline-flex">
            View all work <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
