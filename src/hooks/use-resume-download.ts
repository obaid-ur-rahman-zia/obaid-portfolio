"use client";

import { useCallback, useState } from "react";
import { downloadResume } from "@/lib/download-resume";

export function useResumeDownload() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = useCallback(async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    setError(null);

    try {
      await downloadResume();
    } catch {
      setError("Could not download resume. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  }, [isDownloading]);

  return { handleDownload, isDownloading, error };
}
