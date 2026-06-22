"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, ExternalLink, Play } from "lucide-react";
import type { Profile } from "@/types";
import { SITE } from "@/lib/site";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="relative min-h-screen flex items-center mesh-bg overflow-hidden pt-24">
      <motion.div
        className="absolute inset-0 opacity-30 pointer-events-none"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(0,229,255,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(123,47,255,0.1) 0%, transparent 40%)",
        }}
      />

      <div className="container-main relative z-10 grid lg:grid-cols-2 gap-12 items-center px-5 py-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-white/5 text-sm font-mono text-[var(--accent-cyan)] mb-6">
            <span className="h-2 w-2 rounded-full bg-[var(--success)] animate-pulse" />
            Available for new projects
          </span>
          <h1 className="font-[family-name:var(--font-syne)] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight">
            I build <span className="gradient-text">production software</span> that ships at scale.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[var(--text-secondary)] max-w-xl leading-relaxed">
            {profile.tagline}
          </p>
          <p className="mt-2 text-base text-[var(--text-secondary)]">
            <span className="text-white font-medium">{profile.title}</span> · {profile.years_experience}+ years
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link href="/apps" className="btn-primary">
              View My Work <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="btn-secondary">
              Hire Me
            </Link>
          </div>

          <div className="flex gap-3 mt-10">
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-secondary !min-h-11 !px-4" aria-label="GitHub">
                <Code2 className="h-5 w-5" />
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary !min-h-11 !px-4" aria-label="LinkedIn">
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
            {profile.play_store && (
              <a href={profile.play_store} target="_blank" rel="noopener noreferrer" className="btn-secondary !min-h-11 !px-4" aria-label="Website">
                <Play className="h-5 w-5" />
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[var(--accent-cyan)]/30 to-[var(--accent-violet)]/30 blur-3xl"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="relative glass-card gradient-border p-2 rounded-[2rem]">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-[1.75rem] overflow-hidden bg-[var(--bg-secondary)]">
                <Image
                  src={profile.photo || SITE.photo}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 256px, 320px"
                />
              </div>
            </div>
            <motion.div
              className="absolute -bottom-4 -left-4 glass-card px-4 py-3 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-2xl font-bold font-[family-name:var(--font-syne)] text-[var(--accent-cyan)]">
                {profile.play_store_apps}+
              </p>
              <p className="text-xs text-[var(--text-secondary)]">Live Products</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
