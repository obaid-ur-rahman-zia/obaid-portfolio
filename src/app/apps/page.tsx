import Image from "next/image";
import Link from "next/link";
import { SwissPageLayout } from "@/components/portfolio/SwissPageLayout";
import { fetchApps } from "@/lib/fetchers";

export const metadata = {
  title: "Work",
  description: "Selected projects — AI, Web3, SaaS, and full-stack products in production.",
};

export default async function AppsPage() {
  const apps = await fetchApps();

  return (
    <SwissPageLayout
      tag="Portfolio"
      title="WORK_"
      subtitle="Production software products — explore stack, features, and live links."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
        {apps.map((app, i) => (
          <Link
            key={app.id}
            href={`/apps/${app.slug}`}
            className="group bg-black p-8 swiss-border hover:bg-white/5 transition-colors block"
            data-cursor="pointer"
          >
            <p className="swiss-mono text-[10px] text-[#ff4d00] mb-4">{String(i + 1).padStart(2, "0")}</p>
            <div className="relative h-16 w-16 swiss-photo-frame overflow-hidden mb-6">
              <Image src={app.icon || "/images/apps/default.svg"} alt="" fill className="object-cover" />
            </div>
            <h2 className="text-xl font-semibold group-hover:text-[#dc2525] transition-colors">{app.name}</h2>
            <p className="swiss-mono text-[9px] text-neutral-500 mt-2">{app.category}</p>
            <p className="text-neutral-500 text-sm mt-3 line-clamp-2">{app.short_description}</p>
          </Link>
        ))}
      </div>
    </SwissPageLayout>
  );
}
