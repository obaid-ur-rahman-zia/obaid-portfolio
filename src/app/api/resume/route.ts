import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { RESUME_FILENAME } from "@/lib/download-resume";

export const runtime = "nodejs";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "resumes", RESUME_FILENAME);
    const buffer = await readFile(filePath);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${RESUME_FILENAME}"`,
        "Content-Length": String(buffer.length),
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }
}
