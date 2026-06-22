"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { submitContact } from "@/lib/api";
import { getProfile } from "@/lib/api";
import type { Profile } from "@/types";

export default function ContactPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  useEffect(() => {
    getProfile().then(setProfile).catch(() => null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await submitContact(form);
      setStatus("ok");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("err");
    }
  };

  return (
    <div className="pt-28 pb-20 px-6 md:px-10 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="swiss-mono text-[10px] text-neutral-500 hover:text-[#dc2525] mb-8 inline-block" data-cursor="pointer">
          ← HOME_
        </Link>
        <p className="swiss-section-tag mb-4">Connect</p>
        <h1 className="swiss-display text-5xl md:text-7xl mb-12">
          CONTACT<span className="text-[#cb0404]">_</span>
        </h1>

        <div className="grid lg:grid-cols-2 gap-16">
          <p className="text-neutral-500 leading-relaxed max-w-md">
            Tell me about your app idea, timeline, and stack. I typically respond within 24 hours.
            {profile?.email && (
              <>
                <br />
                <br />
                <a href={`mailto:${profile.email}`} className="swiss-mono text-white hover:text-[#dc2525]" data-cursor="pointer">
                  {profile.email}
                </a>
              </>
            )}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {(["name", "email"] as const).map((field) => (
              <div key={field}>
                <label htmlFor={field} className="swiss-mono text-[10px] text-neutral-500 block mb-2">
                  {field.toUpperCase()}_
                </label>
                <input
                  id={field}
                  type={field === "email" ? "email" : "text"}
                  required
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-3 focus:border-[#cb0404] outline-none"
                />
              </div>
            ))}
            <div>
              <label htmlFor="message" className="swiss-mono text-[10px] text-neutral-500 block mb-2">
                MESSAGE_
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-transparent border border-white/20 p-4 focus:border-[#cb0404] outline-none resize-y"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="swiss-mono text-xs bg-[#cb0404] text-white px-10 py-4 hover:bg-[#dc2525] disabled:opacity-50"
              data-cursor="pointer"
            >
              {status === "loading" ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                </span>
              ) : (
                "SEND MESSAGE_"
              )}
            </button>
            {status === "ok" && <p className="text-green-400 text-sm swiss-mono">Message transmitted.</p>}
            {status === "err" && <p className="text-red-400 text-sm swiss-mono">Transmission failed.</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
