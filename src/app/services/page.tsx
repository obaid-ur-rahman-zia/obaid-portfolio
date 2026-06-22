import { SwissPageLayout } from "@/components/portfolio/SwissPageLayout";
import { fetchServices } from "@/lib/fetchers";

export const metadata = {
  title: "Services",
  description: "Full-stack software engineering, AI automation, cloud DevOps, 3D, and Web3 development services.",
};

export default async function ServicesPage() {
  const services = await fetchServices();

  return (
    <SwissPageLayout
      tag="Offerings"
      title="SERVICES_"
      subtitle="End-to-end software engineering — from frontend and APIs to cloud deployment."
    >
      <div className="grid md:grid-cols-2 gap-px bg-white/10">
        {services.map((s, i) => (
          <article key={s.id} className="bg-black p-10 swiss-border">
            <p className="swiss-mono text-[10px] text-[#ff4d00] mb-4">[{String(i + 1).padStart(2, "0")}]</p>
            <h2 className="text-2xl font-semibold">{s.title}</h2>
            <p className="text-neutral-500 mt-4 leading-relaxed">{s.description}</p>
            {s.starting_price && (
              <p className="swiss-mono text-sm text-[#cb0404] mt-6">{s.starting_price}</p>
            )}
          </article>
        ))}
      </div>
    </SwissPageLayout>
  );
}
