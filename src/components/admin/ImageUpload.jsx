"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Spinner } from "@/components/ui/Loading";

/**
 * Image field for the admin forms. Two ways to set an image:
 *   1) Upload a file → backend streams it to Cloudinary → URL saved.
 *   2) Paste an image URL directly (always works, even before Cloudinary's
 *      API secret is configured).
 */
export default function ImageUpload({ label, value, onChange }) {
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { data } = await axiosSecure.post("/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onChange(data.url);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Upload failed — paste a URL instead");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {label && <span className="mb-1.5 block text-sm font-medium text-body">{label}</span>}
      <div className="flex items-start gap-3">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200">
          {value ? (
            <Image src={value} alt="preview" fill sizes="112px" className="object-cover" />
          ) : (
            <span className="grid h-full place-items-center text-2xl text-slate-300">🖼️</span>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            type="url"
            placeholder="Paste image URL or upload →"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="input-base"
          />
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-body hover:border-brand">
            {uploading ? <><Spinner /> Uploading…</> : "⬆ Upload"}
            <input type="file" accept="image/*" className="hidden" onChange={onFile} disabled={uploading} />
          </label>
        </div>
      </div>
    </div>
  );
}
