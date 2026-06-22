"use client";

import { motion } from "framer-motion";
import {
  Database,
  Globe,
  Palette,
  Server,
  Smartphone,
  Store,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  smartphone: Smartphone,
  database: Database,
  server: Server,
  globe: Globe,
  store: Store,
  palette: Palette,
  wrench: Wrench,
};

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const Icon = iconMap[service.icon] || Smartphone;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="glass-card p-8 rounded-2xl group hover:border-[var(--accent-cyan)]/30 transition-colors"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent-cyan)]/20 to-[var(--accent-violet)]/20 text-[var(--accent-cyan)] group-hover:scale-110 transition-transform">
        <Icon className="h-7 w-7" aria-hidden />
      </div>
      <h3 className="mt-6 font-[family-name:var(--font-syne)] text-xl font-semibold">{service.title}</h3>
      <p className="mt-3 text-[var(--text-secondary)] text-sm leading-relaxed">{service.description}</p>
      {service.starting_price && (
        <p className="mt-4 font-mono text-sm text-[var(--accent-cyan)]">{service.starting_price}</p>
      )}
    </motion.div>
  );
}
