"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { AppItem } from "@/types";

export function AppCard({ app, index = 0 }: { app: AppItem; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <Link
        href={`/apps/${app.slug}`}
        className="group block glass-card p-6 rounded-2xl hover:border-[var(--accent-cyan)]/40 transition-all duration-300 hover:-translate-y-1"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="relative h-16 w-16 rounded-2xl overflow-hidden bg-[var(--bg-primary)] shrink-0 ring-1 ring-white/10">
            <Image src={app.icon || "/images/apps/default.svg"} alt="" fill className="object-cover" />
          </div>
          <ArrowUpRight className="h-5 w-5 text-[var(--text-secondary)] group-hover:text-[var(--accent-cyan)] transition-colors" />
        </div>
        <h3 className="mt-4 font-[family-name:var(--font-syne)] text-xl font-semibold group-hover:text-[var(--accent-cyan)] transition-colors">
          {app.name}
        </h3>
        <span className="inline-block mt-2 px-2.5 py-0.5 rounded-md text-xs font-mono bg-[var(--accent-violet)]/20 text-[var(--accent-violet)] border border-[var(--accent-violet)]/30">
          {app.category}
        </span>
        <p className="mt-3 text-sm text-[var(--text-secondary)] line-clamp-2">{app.short_description}</p>
      </Link>
    </motion.article>
  );
}
