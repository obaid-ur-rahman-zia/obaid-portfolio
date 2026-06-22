import { requireAdmin } from "@/lib/auth";
import { getServiceClient } from "@/lib/supabase/server";
import { errorResponse, jsonResponse } from "@/lib/api-utils";

export async function GET(request: Request) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const supabase = getServiceClient();

    const [apps, services, plans, contacts, unread] = await Promise.all([
      supabase.from("apps").select("*", { count: "exact", head: true }),
      supabase.from("services").select("*", { count: "exact", head: true }),
      supabase.from("plans").select("*", { count: "exact", head: true }),
      supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
      supabase
        .from("contact_submissions")
        .select("*", { count: "exact", head: true })
        .eq("read", false),
    ]);

    if (apps.error) return errorResponse(apps.error.message, 500);
    if (services.error) return errorResponse(services.error.message, 500);
    if (plans.error) return errorResponse(plans.error.message, 500);
    if (contacts.error) return errorResponse(contacts.error.message, 500);
    if (unread.error) return errorResponse(unread.error.message, 500);

    return jsonResponse({
      total_apps: apps.count ?? 0,
      total_services: services.count ?? 0,
      active_plans: plans.count ?? 0,
      contact_submissions: contacts.count ?? 0,
      unread_contacts: unread.count ?? 0,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
