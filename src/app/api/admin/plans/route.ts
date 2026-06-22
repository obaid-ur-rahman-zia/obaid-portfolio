import { requireAdmin } from "@/lib/auth";
import { getServiceClient } from "@/lib/supabase/server";
import { mapPlan } from "@/lib/db/mappers";
import { errorResponse, jsonResponse } from "@/lib/api-utils";

export async function GET(request: Request) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase.from("plans").select("*");

    if (error) return errorResponse(error.message, 500);
    return jsonResponse((data ?? []).map(mapPlan));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
