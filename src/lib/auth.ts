import { SignJWT, jwtVerify } from "jose";

const SECRET_KEY = process.env.SECRET_KEY || "dev-secret-change-in-production";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "obaid107333@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "changeme123";
const ACCESS_TOKEN_EXPIRE_MINUTES = Number(
  process.env.ACCESS_TOKEN_EXPIRE_MINUTES || "43200"
);

function getSecret() {
  return new TextEncoder().encode(SECRET_KEY);
}

export async function createAccessToken(email: string): Promise<string> {
  return new SignJWT({ sub: email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(`${ACCESS_TOKEN_EXPIRE_MINUTES}m`)
    .sign(getSecret());
}

export function authenticateAdmin(email: string, password: string): boolean {
  return (
    email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD
  );
}

export async function verifyAdminToken(request: Request): Promise<string | null> {
  const auth = request.headers.get("authorization");
  if (!auth?.toLowerCase().startsWith("bearer ")) return null;

  const token = auth.slice(7);
  try {
    const { payload } = await jwtVerify(token, getSecret());
    const email = payload.sub;
    if (typeof email !== "string" || email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return null;
    }
    return email;
  } catch {
    return null;
  }
}

export function unauthorizedResponse() {
  return Response.json({ detail: "Not authenticated" }, { status: 401 });
}

export async function requireAdmin(request: Request): Promise<Response | null> {
  const email = await verifyAdminToken(request);
  if (!email) return unauthorizedResponse();
  return null;
}
