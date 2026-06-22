"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type ScreenshotUploadListProps = {
  label?: string;
  values: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
};

export function ScreenshotUploadList({
  label = "Screenshots",
  values,
  onChange,
  folder = "screenshots",
}: ScreenshotUploadListProps) {
  return (
    <div className="space-y-4">
      <Label>{label}</Label>

      {values.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {values.map((url, index) => (
            <div key={`${url}-${index}`} className="relative overflow-hidden rounded-lg border border-border">
              <div className="relative aspect-video bg-muted">
                <Image src={url} alt="" fill className="object-cover" unoptimized />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 h-8 w-8 p-0"
                onClick={() => onChange(values.filter((_, i) => i !== index))}
                aria-label="Remove screenshot"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No screenshots yet.</p>
      )}

      <ImageUploadField
        key={values.length}
        label="Add screenshot"
        value=""
        onChange={(url) => {
          if (url) onChange([...values, url]);
        }}
        folder={folder}
        aspect={16 / 9}
        hint="16:9 crop recommended for project previews."
      />
    </div>
  );
}
