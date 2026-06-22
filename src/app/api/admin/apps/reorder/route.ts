import { requireAdmin } from "@/lib/auth";
import { getServiceClient } from "@/lib/supabase/server";
import { mapApp } from "@/lib/db/mappers";
import { errorResponse, jsonResponse } from "@/lib/api-utils";

export async function POST(request: Request) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const items = (await request.json()) as Array<{ id: string; order: number }>;
    const supabase = getServiceClient();

    for (const item of items) {
      if (item.order < 0) return errorResponse("order must be >= 0", 422);
      await supabase.from("apps").update({ order: item.order }).eq("id", item.id);
    }

    const { data, error } = await supabase
      .from("apps")
      .select("*")
      .order("order", { ascending: true });

    if (error) return errorResponse(error.message, 500);
    return jsonResponse((data ?? []).map(mapApp));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
