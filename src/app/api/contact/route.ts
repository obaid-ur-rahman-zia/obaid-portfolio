import { getServiceClient } from "@/lib/supabase/server";
import { mapContact, newId } from "@/lib/db/mappers";
import { errorResponse, jsonResponse } from "@/lib/api-utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (name.length < 2 || name.length > 120) {
      return errorResponse("Name must be between 2 and 120 characters", 422);
    }
    if (!email || !email.includes("@")) {
      return errorResponse("Invalid email", 422);
    }
    if (message.length < 10 || message.length > 5000) {
      return errorResponse("Message must be between 10 and 5000 characters", 422);
    }

    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from("contact_submissions")
      .insert({ id: newId(), name, email, message })
      .select("*")
      .single();

    if (error) return errorResponse(error.message, 500);
    return jsonResponse(mapContact(data), 201);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
