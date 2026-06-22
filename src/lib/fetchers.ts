import {
  queryApps,
  queryPlans,
  queryProfile,
  queryServices,
  queryTeam,
} from "@/lib/db/queries";
import {
  fallbackApps,
  fallbackPlans,
  fallbackProfile,
  fallbackServices,
  fallbackTeam,
} from "@/lib/fallback-data";

export async function fetchProfile() {
  try {
    return await queryProfile();
  } catch {
    return fallbackProfile;
  }
}

export async function fetchApps() {
  try {
    return await queryApps();
  } catch {
    return fallbackApps;
  }
}

export async function fetchServices() {
  try {
    return await queryServices();
  } catch {
    return fallbackServices;
  }
}

export async function fetchPlans() {
  try {
    return await queryPlans();
  } catch {
    return fallbackPlans;
  }
}

export async function fetchTeam() {
  try {
    return await queryTeam();
  } catch {
    return fallbackTeam;
  }
}

export async function fetchApp(slug: string) {
  const { queryAppBySlug } = await import("@/lib/db/queries");
  try {
    return await queryAppBySlug(slug);
  } catch {
    const app = fallbackApps.find((a) => a.slug === slug);
    if (!app) throw new Error("App not found");
    return app;
  }
}
