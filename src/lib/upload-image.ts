import { api } from "@/lib/api";

export async function uploadImage(blob: Blob, folder: string): Promise<string> {
  const form = new FormData();
  form.append("file", blob, "image.jpg");
  form.append("folder", folder);
  const { data } = await api.post<{ url: string }>("/admin/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.url;
}
