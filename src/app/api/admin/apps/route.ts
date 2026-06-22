import { requireAdmin } from "@/lib/auth";
import { getServiceClient } from "@/lib/supabase/server";
import {
  applyPartialUpdate,
  dumpJsonList,
  mapApp,
  newId,
} from "@/lib/db/mappers";
import { errorResponse, jsonResponse } from "@/lib/api-utils";
import type { AppItem } from "@/types";

export async function GET(request: Request) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const supabase = getServiceClient();
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

export async function POST(request: Request) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const body = (await request.json()) as Partial<AppItem>;
    const slug = String(body.slug ?? "").trim();

    if (!body.name || !slug) {
      return errorResponse("Name and slug are required", 422);
    }

    const supabase = getServiceClient();
    const { data: existing } = await supabase.from("apps").select("id").eq("slug", slug).maybeSingle();
    if (existing) return errorResponse("Slug already exists", 400);

    const row = {
      id: newId(),
      name: body.name,
      slug,
      icon: body.icon ?? "",
      short_description: body.short_description ?? "",
      full_description: body.full_description ?? "",
      screenshots: dumpJsonList(body.screenshots),
      tech_stack: dumpJsonList(body.tech_stack),
      features: dumpJsonList(body.features),
      download_link: body.download_link ?? "",
      play_store_link: body.play_store_link ?? "",
      category: body.category ?? "Productivity",
      featured: body.featured ?? false,
      order: body.order ?? 0,
    };

    const { data, error } = await supabase.from("apps").insert(row).select("*").single();
    if (error) return errorResponse(error.message, 500);

    return jsonResponse(mapApp(data), 201);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
