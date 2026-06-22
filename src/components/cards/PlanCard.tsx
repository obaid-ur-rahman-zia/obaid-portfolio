"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Plan } from "@/types";

export function PlanCard({ plan, index = 0 }: { plan: Plan; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "relative glass-card rounded-3xl p-8 flex flex-col",
        plan.highlighted && "gradient-border ring-2 ring-[var(--accent-cyan)]/20 scale-[1.02] z-10"
      )}
    >
      {plan.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-mono bg-[var(--accent-cyan)] text-[#0a0a0f] font-semibold">
          Most Popular
        </span>
      )}
      <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">{plan.name}</p>
      <p className="mt-4 font-[family-name:var(--font-syne)] text-4xl font-bold">
        {plan.price}
        <span className="text-base font-normal text-[var(--text-secondary)]"> / {plan.billing_cycle}</span>
      </p>
      <ul className="mt-8 space-y-3 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-3 text-sm text-[var(--text-secondary)]">
            <Check className="h-5 w-5 shrink-0 text-[var(--success)]" aria-hidden />
            {f}
          </li>
        ))}
      </ul>
      <Link
        href="/contact"
        className={cn("mt-8 w-full text-center", plan.highlighted ? "btn-primary" : "btn-secondary")}
      >
        {plan.cta_text}
      </Link>
    </motion.div>
  );
}
