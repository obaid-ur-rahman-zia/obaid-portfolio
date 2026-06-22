"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { AppItem } from "@/types";

function formatAppDate(createdAt?: string, index = 0) {
  if (createdAt) {
    const d = new Date(createdAt);
    if (!Number.isNaN(d.getTime())) {
      return `${String(d.getMonth() + 1).padStart(2, "0")} / ${d.getFullYear()}`;
    }
  }
  return `${String(index + 1).padStart(2, "0")} / 2025`;
}

export function WorksSection({ apps }: { apps: AppItem[] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const titleScale = useTransform(scrollYProgress, [0, 0.35], [1.6, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [0.25, 1]);

  const featured = apps.filter((a) => a.featured).slice(0, 4);
  const display = featured.length > 0 ? featured : apps.slice(0, 4);

  return (
    <section ref={ref} className="swiss-border-t relative py-24 md:py-40 px-6 md:px-10 overflow-hidden">
      <div className="swiss-works-grid absolute inset-0 pointer-events-none" aria-hidden />

      <div className="max-w-7xl mx-auto relative z-10">
        <p className="swiss-mono text-center text-neutral-500 text-[10px] mb-8 tracking-[0.3em]">
          SELECTED WORKS
        </p>
        <motion.h2
          style={{ scale: titleScale, opacity: titleOpacity }}
          className="swiss-display text-[11vw] md:text-[7rem] leading-none mb-24 md:mb-32 origin-center text-center"
        >
          WORK_
        </motion.h2>

        <div className="space-y-32 md:space-y-40">
          {display.map((app, i) => (
            <article key={app.id} className="relative group">
              <p
                className="swiss-outline-text swiss-display text-[18vw] md:text-[9rem] leading-none absolute -top-8 md:-top-16 left-0 right-0 pointer-events-none select-none opacity-20"
                aria-hidden
              >
                {app.name.split(" ")[0]}
              </p>

              <Link
                href={`/apps/${app.slug}`}
                className="relative grid md:grid-cols-12 gap-8 md:gap-12 items-end pt-16 border-t border-white/10"
                data-cursor="pointer"
              >
                <div className={`md:col-span-4 space-y-6 ${i % 2 === 1 ? "md:order-2 md:text-right" : ""}`}>
                  <p className="swiss-mono text-[10px]">
                    <span className="text-[#cb0404]">{formatAppDate(app.created_at, i)}</span>
                    <span className="text-neutral-600 mx-2">—</span>
                    <span className="text-neutral-400">{app.category.toUpperCase()}</span>
                  </p>
                  <h3 className="swiss-display text-4xl md:text-6xl lg:text-7xl leading-[0.9] group-hover:text-[#dc2525] transition-colors">
                    {app.name.toUpperCase()}
                  </h3>
                  <ul className={`flex flex-col gap-1 ${i % 2 === 1 ? "md:items-end" : ""}`}>
                    {app.tech_stack.slice(0, 5).map((t) => (
                      <li key={t} className="swiss-mono text-[10px] text-neutral-500">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className="text-neutral-500 text-sm leading-relaxed max-w-sm">{app.short_description}</p>
                  <span className="inline-flex items-center gap-2 swiss-mono text-[10px] text-white group-hover:text-[#cb0404] transition-colors">
                    VIEW CASE <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>

                <div className={`md:col-span-8 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <div className="relative aspect-video swiss-bracket-card overflow-hidden bg-neutral-900">
                    <Image
                      src={app.screenshots?.[0] || app.icon || "/images/apps/default.svg"}
                      alt={app.name}
                      fill
                      className="object-cover opacity-90 group-hover:scale-[1.02] transition-transform duration-700 grayscale group-hover:grayscale-0"
                    />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {display.length === 0 && (
          <p className="swiss-mono text-neutral-500 text-center py-20">No projects published yet — check back soon.</p>
        )}

        <Link
          href="/apps"
          className="inline-block mt-20 swiss-mono text-xs border border-white/30 px-8 py-4 hover:border-[#cb0404] hover:text-[#dc2525] transition-colors"
          data-cursor="pointer"
        >
          VIEW ALL WORK_
        </Link>
      </div>
    </section>
  );
}
