import { getServiceClient } from "@/lib/supabase/server";
import {
  mapApp,
  mapPlan,
  mapProfile,
  mapService,
  mapTeamMember,
} from "@/lib/db/mappers";

export async function queryProfile() {
  const supabase = getServiceClient();
  const { data, error } = await supabase.from("profile").select("*").eq("id", 1).maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("Profile not found");
  return mapProfile(data);
}

export async function queryApps() {
  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("apps")
    .select("*")
    .order("order", { ascending: true })
    .order("name", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapApp);
}

export async function queryAppBySlug(slug: string) {
  const supabase = getServiceClient();
  const { data, error } = await supabase.from("apps").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("App not found");
  return mapApp(data);
}

export async function queryServices() {
  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("visible", true)
    .order("order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapService);
}

export async function queryPlans() {
  const supabase = getServiceClient();
  const { data, error } = await supabase.from("plans").select("*").order("id", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapPlan);
}

export async function queryTeam() {
  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapTeamMember);
}
