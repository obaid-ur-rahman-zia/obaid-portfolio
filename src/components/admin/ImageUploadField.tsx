"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Cropper, { type Area } from "react-easy-crop";
import { Loader2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCroppedImageBlob } from "@/lib/crop-image";
import { uploadImage } from "@/lib/upload-image";

type ImageUploadFieldProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder: string;
  aspect?: number;
  hint?: string;
};

export function ImageUploadField({
  label,
  value,
  onChange,
  folder,
  aspect = 1,
  hint,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [cropOpen, setCropOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
    setCroppedArea(areaPixels);
  }, []);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCropOpen(true);
      setError("");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const closeCrop = () => {
    setCropOpen(false);
    setImageSrc(null);
    setUploading(false);
  };

  const handleUpload = async () => {
    if (!imageSrc || !croppedArea) return;
    setUploading(true);
    setError("");
    try {
      const blob = await getCroppedImageBlob(imageSrc, croppedArea);
      const url = await uploadImage(blob, folder);
      onChange(url);
      closeCrop();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {value ? (
        <div className="relative h-36 w-36 overflow-hidden rounded-lg border border-border bg-muted">
          <Image src={value} alt="" fill className="object-cover" unoptimized />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1 right-1 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
          <Upload className="h-4 w-4" />
          Upload & crop
        </Button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onFileSelect} />
      </div>

      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste an image URL"
      />

      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}

      {cropOpen && imageSrc ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4">
          <div className="flex w-full max-w-lg flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <p className="font-medium text-sm">Crop image</p>
              <button type="button" onClick={closeCrop} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative h-72 w-full overflow-hidden rounded-lg bg-black">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Zoom</Label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={closeCrop} disabled={uploading}>
                Cancel
              </Button>
              <Button type="button" onClick={() => void handleUpload()} disabled={uploading || !croppedArea}>
                {uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Uploading…
                  </>
                ) : (
                  "Save image"
                )}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
