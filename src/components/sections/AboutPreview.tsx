"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Profile } from "@/types";
import { SITE } from "@/lib/site";

export function AboutPreview({ profile }: { profile: Profile }) {
  const stats = [
    { label: "Years Experience", value: profile.years_experience, suffix: "+" },
    { label: "Projects Delivered", value: profile.apps_in_production, suffix: "+" },
    { label: "Clients Served", value: profile.clients_served, suffix: "+" },
    { label: "Live Products", value: profile.play_store_apps, suffix: "" },
  ];

  return (
    <section id="about" className="section-padding bg-[var(--bg-secondary)]">
      <div className="container-main">
        <SectionHeading
          eyebrow="About"
          title="Software engineer. Product builder."
          subtitle="From frontend and APIs to cloud deployment — I ship software that scales in production."
        />
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-8 rounded-3xl">
              <p className="text-[var(--text-secondary)] leading-relaxed text-lg">{profile.bio}</p>
              <div className="flex flex-wrap gap-2 mt-8">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-xs font-mono border border-[var(--border)] bg-white/5 text-[var(--accent-cyan)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 rounded-2xl text-center hover:border-[var(--accent-cyan)]/30 transition-colors"
                >
                  <p className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-syne)] gradient-text">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">{stat.label}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 relative h-48 rounded-2xl overflow-hidden glass-card hidden md:block">
              <Image src={profile.photo || SITE.photo} alt="" fill className="object-cover opacity-60" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
