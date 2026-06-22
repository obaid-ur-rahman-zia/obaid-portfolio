import { getServiceClient } from "@/lib/supabase/server";
import { mapService } from "@/lib/db/mappers";
import { errorResponse, jsonResponse } from "@/lib/api-utils";

export async function GET() {
  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("visible", true)
      .order("order", { ascending: true });

    if (error) return errorResponse(error.message, 500);
    return jsonResponse((data ?? []).map(mapService));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
