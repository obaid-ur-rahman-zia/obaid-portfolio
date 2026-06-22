import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { requireAdmin } from "@/lib/auth";
import { errorResponse, jsonResponse } from "@/lib/api-utils";
import { getServiceClient } from "@/lib/supabase/server";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function extensionForType(type: string) {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  if (type === "image/gif") return "gif";
  return "jpg";
}

async function uploadToLocal(buffer: Buffer, folder: string, ext: string) {
  const safeFolder = folder.replace(/[^a-z0-9-_]/gi, "") || "misc";
  const filename = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
  const relativeDir = path.join("uploads", safeFolder);
  const absoluteDir = path.join(process.cwd(), "public", relativeDir);
  await mkdir(absoluteDir, { recursive: true });
  await writeFile(path.join(absoluteDir, filename), buffer);
  return `/${relativeDir.replace(/\\/g, "/")}/${filename}`;
}

export async function POST(request: Request) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = String(formData.get("folder") || "misc").trim();

    if (!(file instanceof File)) {
      return errorResponse("No file provided", 400);
    }
    if (!ALLOWED_TYPES.has(file.type)) {
      return errorResponse("Unsupported image type", 400);
    }
    if (file.size > MAX_BYTES) {
      return errorResponse("Image must be 5MB or smaller", 400);
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = extensionForType(file.type);
    const storagePath = `${folder.replace(/[^a-z0-9-_]/gi, "") || "misc"}/${Date.now()}-${crypto.randomUUID()}.${ext}`;

    try {
      const supabase = getServiceClient();
      const { error } = await supabase.storage.from("portfolio").upload(storagePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

      if (error) throw error;

      const { data } = supabase.storage.from("portfolio").getPublicUrl(storagePath);
      return jsonResponse({ url: data.publicUrl });
    } catch {
      const url = await uploadToLocal(buffer, folder, ext);
      return jsonResponse({ url });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return errorResponse(message, 500);
  }
}
