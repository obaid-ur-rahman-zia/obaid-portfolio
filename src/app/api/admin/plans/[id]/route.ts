import { requireAdmin } from "@/lib/auth";
import { getServiceClient } from "@/lib/supabase/server";
import { applyPartialUpdate, mapPlan } from "@/lib/db/mappers";
import { errorResponse, jsonResponse } from "@/lib/api-utils";
import type { Plan } from "@/types";

type Params = { params: Promise<{ id: string }> };

const JSON_FIELDS = new Set(["features"]);

export async function PUT(request: Request, { params }: Params) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = (await request.json()) as Partial<Plan>;
    const supabase = getServiceClient();

    const { data: current } = await supabase.from("plans").select("id").eq("id", id).maybeSingle();
    if (!current) return errorResponse("Plan not found", 404);

    const updates: Record<string, unknown> = {};
    applyPartialUpdate(updates, body as Record<string, unknown>, JSON_FIELDS);

    const { data, error } = await supabase
      .from("plans")
      .update(updates)
      .eq("id", id)
      .select("*")
      .single();

    if (error) return errorResponse(error.message, 500);
    return jsonResponse(mapPlan(data));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
