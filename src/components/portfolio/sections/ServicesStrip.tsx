"use client";

import Link from "next/link";
import type { Service } from "@/types";

export function ServicesStrip({ services }: { services: Service[] }) {
  const visible = services.filter((s) => s.visible).slice(0, 6);
  if (visible.length === 0) return null;

  return (
    <section className="swiss-border-t border-b py-8 overflow-hidden">
      <div className="px-6 md:px-10 max-w-7xl mx-auto mb-6 flex justify-between items-end">
        <p className="swiss-mono text-[10px] text-neutral-500">// SOFTWARE SERVICES</p>
        <Link href="/services" className="swiss-mono text-[10px] hover:text-[#dc2525] transition-colors" data-cursor="pointer">
          VIEW ALL_
        </Link>
      </div>
      <div className="flex flex-wrap justify-center gap-3 px-6 md:px-10 max-w-7xl mx-auto">
        {visible.map((s) => (
          <span
            key={s.id}
            className="swiss-mono text-[10px] border border-white/15 px-4 py-2 text-neutral-300 hover:border-[#cb0404] hover:text-white transition-colors"
          >
            {s.title}
          </span>
        ))}
      </div>
    </section>
  );
}
