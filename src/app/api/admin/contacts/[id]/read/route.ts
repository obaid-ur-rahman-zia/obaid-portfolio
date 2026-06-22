import { requireAdmin } from "@/lib/auth";
import { getServiceClient } from "@/lib/supabase/server";
import { mapContact } from "@/lib/db/mappers";
import { errorResponse, jsonResponse } from "@/lib/api-utils";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const supabase = getServiceClient();

    const { data: current } = await supabase
      .from("contact_submissions")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (!current) return errorResponse("Contact not found", 404);

    const { data, error } = await supabase
      .from("contact_submissions")
      .update({ read: true })
      .eq("id", id)
      .select("*")
      .single();

    if (error) return errorResponse(error.message, 500);
    return jsonResponse(mapContact(data));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
