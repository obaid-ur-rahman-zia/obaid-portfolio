import { requireAdmin } from "@/lib/auth";
import { getServiceClient } from "@/lib/supabase/server";
import { applyPartialUpdate, mapTeamMember, newId } from "@/lib/db/mappers";
import { errorResponse, jsonResponse, noContentResponse } from "@/lib/api-utils";
import type { TeamMember } from "@/types";

export async function GET(request: Request) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("order", { ascending: true });

    if (error) return errorResponse(error.message, 500);
    return jsonResponse((data ?? []).map(mapTeamMember));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(message, 500);
  }
}

export async function POST(request: Request) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const body = (await request.json()) as Partial<TeamMember>;
    if (!body.name) return errorResponse("Name is required", 422);

    const row = {
      id: newId(),
      name: body.name,
      role: body.role ?? "",
      photo: body.photo ?? "",
      bio: body.bio ?? "",
      linkedin: body.linkedin ?? "",
      github: body.github ?? "",
      is_lead: body.is_lead ?? false,
      order: body.order ?? 0,
    };

    const supabase = getServiceClient();
    const { data, error } = await supabase.from("team_members").insert(row).select("*").single();
    if (error) return errorResponse(error.message, 500);

    return jsonResponse(mapTeamMember(data), 201);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
