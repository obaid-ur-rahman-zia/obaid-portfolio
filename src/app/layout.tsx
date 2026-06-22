import type { Metadata } from "next";
import { Anton, Bebas_Neue, Inter, JetBrains_Mono, Syncopate } from "next/font/google";
import { PortfolioShell } from "@/components/portfolio/PortfolioShell";
import { SwissNav } from "@/components/portfolio/SwissNav";
import { SwissFooter } from "@/components/portfolio/SwissFooter";
import { AuthHydrate } from "@/components/admin/AuthHydrate";
import { fetchProfile } from "@/lib/fetchers";
import "./globals.css";
import "./portfolio.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas", display: "swap" });
const syncopate = Syncopate({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-syncopate", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | ${SITE.title}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Senior Software Engineer & Product Lead — Next.js, AI, Web3, and production software for global clients.",
  openGraph: {
    title: `${SITE.name} | ${SITE.title}`,
    description: "Scalable software systems — web, AI, and production platforms from architecture to deployment.",
    type: "website",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const profile = await fetchProfile();

  return (
    <html
      lang="en"
      className={`${anton.variable} ${bebas.variable} ${syncopate.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className={`${inter.className} antialiased`}>
        <AuthHydrate />
        <PortfolioShell>
          <SwissNav />
          <main>{children}</main>
          <SwissFooter profile={profile} />
        </PortfolioShell>
      </body>
    </html>
  );
}
