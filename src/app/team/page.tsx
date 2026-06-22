import Image from "next/image";
import { SwissPageLayout } from "@/components/portfolio/SwissPageLayout";
import { fetchTeam } from "@/lib/fetchers";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Team",
  description: "Meet Obaid Ur Rahman Zia — Senior Software Engineer & Product Lead.",
};

export default async function TeamPage() {
  const team = await fetchTeam();

  return (
    <SwissPageLayout tag="People" title="TEAM_" subtitle="Built and led by a senior software engineer.">
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
        {team.map((member) => (
          <article
            key={member.id}
            className={`swiss-border p-8 ${member.is_lead ? "border-[#cb0404]" : ""}`}
          >
            <div className="relative h-32 w-32 swiss-photo-frame overflow-hidden mb-6">
              <Image
                src={member.photo || SITE.photo}
                alt={member.name}
                fill
                className="object-cover object-top"
              />
            </div>
            {member.is_lead && <p className="swiss-mono text-[9px] text-[#cb0404] mb-2">LEAD_</p>}
            <h2 className="text-2xl font-semibold">{member.name}</h2>
            <p className="swiss-mono text-[10px] text-neutral-500 mt-1">{member.role}</p>
            <p className="text-neutral-500 mt-4 leading-relaxed">{member.bio}</p>
          </article>
        ))}
      </div>
    </SwissPageLayout>
  );
}
