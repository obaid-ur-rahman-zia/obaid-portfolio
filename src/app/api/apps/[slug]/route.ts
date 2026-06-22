import { getServiceClient } from "@/lib/supabase/server";
import { mapApp } from "@/lib/db/mappers";
import { errorResponse, jsonResponse } from "@/lib/api-utils";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const { slug } = await params;
    const supabase = getServiceClient();
    const { data, error } = await supabase.from("apps").select("*").eq("slug", slug).maybeSingle();

    if (error) return errorResponse(error.message, 500);
    if (!data) return errorResponse("App not found", 404);

    return jsonResponse(mapApp(data));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
