"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { submitContact } from "@/lib/api";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await submitContact(form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          id="name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full min-h-12 px-4 rounded-xl bg-white/5 border border-[var(--border)] focus:border-[var(--accent-cyan)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)]/20 transition-colors"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full min-h-12 px-4 rounded-xl bg-white/5 border border-[var(--border)] focus:border-[var(--accent-cyan)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)]/20 transition-colors"
          placeholder="you@email.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] focus:border-[var(--accent-cyan)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)]/20 transition-colors resize-y min-h-[120px]"
          placeholder="Tell me about your project..."
        />
      </div>
      <button type="submit" disabled={status === "loading"} className="btn-primary w-full">
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Send message
          </>
        )}
      </button>
      {status === "success" && (
        <p className="text-sm text-[var(--success)] text-center" role="status">
          Message sent! I&apos;ll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400 text-center" role="alert">
          Could not send. Make sure the API server is running.
        </p>
      )}
    </form>
  );
}
