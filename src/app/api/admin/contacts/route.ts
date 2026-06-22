import { requireAdmin } from "@/lib/auth";
import { getServiceClient } from "@/lib/supabase/server";
import { mapContact } from "@/lib/db/mappers";
import { errorResponse, jsonResponse } from "@/lib/api-utils";

export async function GET(request: Request) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("submitted_at", { ascending: false });

    if (error) return errorResponse(error.message, 500);
    return jsonResponse((data ?? []).map(mapContact));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
