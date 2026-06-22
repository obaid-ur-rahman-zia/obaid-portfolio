import { requireAdmin } from "@/lib/auth";
import { getServiceClient } from "@/lib/supabase/server";
import { applyPartialUpdate, mapApp } from "@/lib/db/mappers";
import { errorResponse, jsonResponse, noContentResponse } from "@/lib/api-utils";
import type { AppItem } from "@/types";

type Params = { params: Promise<{ id: string }> };

const JSON_FIELDS = new Set(["screenshots", "tech_stack", "features"]);

export async function PUT(request: Request, { params }: Params) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = (await request.json()) as Partial<AppItem>;
    const supabase = getServiceClient();

    const { data: current, error: fetchError } = await supabase
      .from("apps")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (fetchError) return errorResponse(fetchError.message, 500);
    if (!current) return errorResponse("App not found", 404);

    if (body.slug) {
      const { data: clash } = await supabase
        .from("apps")
        .select("id")
        .eq("slug", body.slug)
        .neq("id", id)
        .maybeSingle();
      if (clash) return errorResponse("Slug already exists", 400);
    }

    const updates: Record<string, unknown> = {};
    applyPartialUpdate(updates, body as Record<string, unknown>, JSON_FIELDS);

    const { data, error } = await supabase
      .from("apps")
      .update(updates)
      .eq("id", id)
      .select("*")
      .single();

    if (error) return errorResponse(error.message, 500);
    return jsonResponse(mapApp(data));
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

    const { data: current } = await supabase.from("apps").select("id").eq("id", id).maybeSingle();
    if (!current) return errorResponse("App not found", 404);

    const { error } = await supabase.from("apps").delete().eq("id", id);
    if (error) return errorResponse(error.message, 500);

    return noContentResponse();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
