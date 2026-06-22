import { getServiceClient } from "@/lib/supabase/server";
import { mapApp } from "@/lib/db/mappers";
import { errorResponse, jsonResponse } from "@/lib/api-utils";

export async function GET() {
  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from("apps")
      .select("*")
      .order("order", { ascending: true })
      .order("name", { ascending: true });

    if (error) return errorResponse(error.message, 500);
    return jsonResponse((data ?? []).map(mapApp));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
