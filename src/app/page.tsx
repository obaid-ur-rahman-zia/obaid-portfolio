import { PortfolioHome } from "@/components/portfolio/PortfolioHome";
import { fetchApps, fetchProfile, fetchServices } from "@/lib/fetchers";

export default async function HomePage() {
  const [profile, apps, services] = await Promise.all([
    fetchProfile(),
    fetchApps(),
    fetchServices(),
  ]);

  return <PortfolioHome profile={profile} apps={apps} services={services} />;
}
