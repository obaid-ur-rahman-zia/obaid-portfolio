import { requireAdmin } from "@/lib/auth";
import { getServiceClient } from "@/lib/supabase/server";
import { applyPartialUpdate, mapService, newId } from "@/lib/db/mappers";
import { errorResponse, jsonResponse, noContentResponse } from "@/lib/api-utils";
import type { Service } from "@/types";

export async function GET(request: Request) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("order", { ascending: true });

    if (error) return errorResponse(error.message, 500);
    return jsonResponse((data ?? []).map(mapService));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(message, 500);
  }
}

export async function POST(request: Request) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const body = (await request.json()) as Partial<Service>;
    if (!body.title) return errorResponse("Title is required", 422);

    const row = {
      id: newId(),
      title: body.title,
      description: body.description ?? "",
      icon: body.icon ?? "smartphone",
      starting_price: body.starting_price ?? "",
      visible: body.visible ?? true,
      order: body.order ?? 0,
    };

    const supabase = getServiceClient();
    const { data, error } = await supabase.from("services").insert(row).select("*").single();
    if (error) return errorResponse(error.message, 500);

    return jsonResponse(mapService(data), 201);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
