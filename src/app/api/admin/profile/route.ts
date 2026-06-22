import { requireAdmin } from "@/lib/auth";
import { getServiceClient } from "@/lib/supabase/server";
import { applyPartialUpdate, mapProfile } from "@/lib/db/mappers";
import { errorResponse, jsonResponse } from "@/lib/api-utils";
import type { Profile } from "@/types";

const JSON_FIELDS = new Set(["skills"]);

export async function GET(request: Request) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase.from("profile").select("*").eq("id", 1).maybeSingle();

    if (error) return errorResponse(error.message, 500);
    if (!data) return errorResponse("Profile not found", 404);

    return jsonResponse(mapProfile(data));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(message, 500);
  }
}

export async function PUT(request: Request) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const body = (await request.json()) as Partial<Profile>;
    const supabase = getServiceClient();

    const { data: current } = await supabase.from("profile").select("id").eq("id", 1).maybeSingle();
    if (!current) return errorResponse("Profile not found", 404);

    const updates: Record<string, unknown> = {};
    applyPartialUpdate(updates, body as Record<string, unknown>, JSON_FIELDS);

    const { data, error } = await supabase
      .from("profile")
      .update(updates)
      .eq("id", 1)
      .select("*")
      .single();

    if (error) return errorResponse(error.message, 500);
    return jsonResponse(mapProfile(data));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
