export const RESUME_FILENAME = "Obaid_Ur_Rahman_Zia_Resume.pdf";

/** Served from `public/resumes/`; API route adds attachment headers for downloads. */
const RESUME_DOWNLOAD_URL = "/api/resume";
const RESUME_FALLBACK_URL = `/resumes/${RESUME_FILENAME}`;

async function fetchResumeBlob(): Promise<Blob> {
  const primary = await fetch(RESUME_DOWNLOAD_URL, { method: "GET", cache: "no-store" });
  if (primary.ok) {
    return primary.blob();
  }

  const fallback = await fetch(RESUME_FALLBACK_URL, { method: "GET", cache: "force-cache" });
  if (!fallback.ok) {
    throw new Error(`Resume unavailable (${fallback.status})`);
  }

  return fallback.blob();
}

function triggerBrowserDownload(blob: Blob, filename: string): void {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = filename;
  link.rel = "noopener noreferrer";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}

export async function downloadResume(): Promise<void> {
  const blob = await fetchResumeBlob();
  triggerBrowserDownload(blob, RESUME_FILENAME);
}
