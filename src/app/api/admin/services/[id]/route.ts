import { requireAdmin } from "@/lib/auth";
import { getServiceClient } from "@/lib/supabase/server";
import { applyPartialUpdate, mapService } from "@/lib/db/mappers";
import { errorResponse, jsonResponse, noContentResponse } from "@/lib/api-utils";
import type { Service } from "@/types";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = (await request.json()) as Partial<Service>;
    const supabase = getServiceClient();

    const { data: current } = await supabase.from("services").select("id").eq("id", id).maybeSingle();
    if (!current) return errorResponse("Service not found", 404);

    const updates: Record<string, unknown> = {};
    applyPartialUpdate(updates, body as Record<string, unknown>);

    const { data, error } = await supabase
      .from("services")
      .update(updates)
      .eq("id", id)
      .select("*")
      .single();

    if (error) return errorResponse(error.message, 500);
    return jsonResponse(mapService(data));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(message, 500);
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const supabase = getServiceClient();

    const { data: current } = await supabase.from("services").select("id").eq("id", id).maybeSingle();
    if (!current) return errorResponse("Service not found", 404);

    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) return errorResponse(error.message, 500);

    return noContentResponse();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
