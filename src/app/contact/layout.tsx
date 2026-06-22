import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch for your next software engineering or full-stack project.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
