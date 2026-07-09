"use client";
import { useRef, useState } from "react";
import Image from "next/image";

export default function ImageUploader({ value, onChange, label = "Image" }: { value: string; onChange: (url: string) => void; label?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    setUploading(false);
    if (res.ok) {
      const data = await res.json();
      onChange(data.url);
    }
  }

  return (
    <div>
      <label className="admin-label">{label}</label>
      <div className="flex items-center gap-3">
        <div className="w-20 h-20 rounded-lg border border-line bg-bg overflow-hidden shrink-0 relative">
          {value ? <Image src={value} alt="" fill className="object-cover" /> : <div className="w-full h-full flex items-center justify-center text-sub text-[10px]">No image</div>}
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <input
            className="admin-input"
            placeholder="Paste image URL or upload a file"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="flex gap-2">
            <button type="button" onClick={() => inputRef.current?.click()} className="btn-secondary py-1.5 px-3 text-xs">
              {uploading ? "Uploading..." : "Upload File"}
            </button>
          </div>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
        </div>
      </div>
    </div>
  );
}
