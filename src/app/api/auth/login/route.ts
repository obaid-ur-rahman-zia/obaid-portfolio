import { authenticateAdmin, createAccessToken } from "@/lib/auth";
import { errorResponse, jsonResponse } from "@/lib/api-utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim();
    const password = String(body.password ?? "");

    if (!authenticateAdmin(email, password)) {
      return errorResponse("Invalid credentials", 401);
    }

    const access_token = await createAccessToken(email);
    return jsonResponse({ access_token, token_type: "bearer" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
