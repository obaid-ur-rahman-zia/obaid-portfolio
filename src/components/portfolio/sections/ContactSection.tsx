"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { submitContact } from "@/lib/api";
import type { Profile } from "@/types";

export function ContactSection({ profile }: { profile: Profile }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await submitContact({
        name: form.name,
        email: form.email,
        message: form.subject ? `${form.subject}\n\n${form.message}` : form.message,
      });
      setStatus("ok");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("err");
    }
  };

  return (
    <section id="contact" className="swiss-border-t swiss-grid-bg py-24 md:py-40 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24">
        <div>
          <h2 className="leading-[0.9]">
            <span className="swiss-outline-text swiss-display text-[14vw] md:text-[5.5rem] block">LET&apos;S</span>
            <span className="swiss-display text-[14vw] md:text-[5.5rem] text-white">
              CONNECT<span className="text-[#cb0404]">.</span>
            </span>
          </h2>
          <p className="text-neutral-500 mt-8 max-w-md leading-relaxed text-sm md:text-base">
            {profile.tagline ||
              "I build production-ready software systems — full-stack web, AI pipelines, and cloud infrastructure."}{" "}
            Open to full-time roles, freelance projects, and technical consulting.
          </p>
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="inline-block mt-6 swiss-mono text-xs hover:text-[#dc2525] transition-colors"
              data-cursor="pointer"
            >
              {profile.email}
            </a>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid sm:grid-cols-2 gap-8">
            {(["name", "email"] as const).map((field) => (
              <div key={field}>
                <label htmlFor={field} className="swiss-mono text-[10px] text-neutral-500 block mb-3">
                  {field.toUpperCase()}
                </label>
                <input
                  id={field}
                  type={field === "email" ? "email" : "text"}
                  required
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-3 focus:border-[#cb0404] outline-none transition-colors"
                />
              </div>
            ))}
          </div>
          <div>
            <label htmlFor="subject" className="swiss-mono text-[10px] text-neutral-500 block mb-3">
              SUBJECT
            </label>
            <input
              id="subject"
              type="text"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder="Software engineering project"
              className="w-full bg-transparent border-b border-white/20 py-3 focus:border-[#cb0404] outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="message" className="swiss-mono text-[10px] text-neutral-500 block mb-3">
              MESSAGE
            </label>
            <textarea
              id="message"
              required
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-transparent border-b border-white/20 py-3 focus:border-[#cb0404] outline-none transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="swiss-mono text-xs bg-white text-black px-10 py-4 hover:bg-[#cb0404] hover:text-white transition-colors disabled:opacity-50 inline-flex items-center gap-3 ml-auto"
            data-cursor="pointer"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Sending...
              </>
            ) : (
              <>
                SEND MESSAGE <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
          {status === "ok" && <p className="text-green-400 text-sm swiss-mono text-right">Message transmitted.</p>}
          {status === "err" && (
            <p className="text-red-400 text-sm swiss-mono text-right">Transmission failed. Try again.</p>
          )}
        </form>
      </div>
    </section>
  );
}
