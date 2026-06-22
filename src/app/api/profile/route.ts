import { getServiceClient } from "@/lib/supabase/server";
import { mapProfile } from "@/lib/db/mappers";
import { errorResponse, jsonResponse } from "@/lib/api-utils";

export async function GET() {
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
