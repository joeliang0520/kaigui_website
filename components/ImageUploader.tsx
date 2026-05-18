"use client";

import { useCallback, useState } from "react";
import { usePinCustomization } from "@/lib/usePinCustomization";
import { removeBackground } from "@/lib/removeBackground";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export function ImageUploader({ dark }: { dark?: boolean }) {
  const { imageUrl, setImageUrl } = usePinCustomization();
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleFile = useCallback(
    async (file: File | null) => {
      setError(null);
      if (!file) { setImageUrl(null); return; }
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError("Please choose a JPG, PNG, or WebP file.");
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setError("File is too large. Maximum size is 10 MB.");
        return;
      }
      setProcessing(true);
      try {
        const raw = await new Promise<string>((res, rej) => {
          const reader = new FileReader();
          reader.onload = () => res(reader.result as string);
          reader.onerror = rej;
          reader.readAsDataURL(file);
        });
        const processed = await removeBackground(raw);
        setImageUrl(processed);
      } catch {
        setError("Could not process image. Please try a different file.");
      } finally {
        setProcessing(false);
      }
    },
    [setImageUrl]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  const onDragLeave = useCallback(() => setIsDragging(false), []);
  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      handleFile(file);
      e.target.value = "";
    },
    [handleFile]
  );

  const lightDrag = isDragging
    ? "border-secondary bg-secondary/5"
    : "border-outline-variant/30 bg-surface-container-low hover:border-secondary/40";

  return (
    <div className="w-full">
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={
          dark
            ? "relative border-2 border-dashed p-5 text-center transition-all cursor-pointer"
            : `relative border-2 border-dashed p-6 text-center transition-colors cursor-pointer ${lightDrag}`
        }
        style={
          dark
            ? {
                borderColor: isDragging ? "rgba(212,175,55,0.65)" : "rgba(212,175,55,0.3)",
                background: isDragging ? "rgba(212,175,55,0.06)" : "rgba(212,175,55,0.03)",
              }
            : undefined
        }
      >
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/jpg,image/png,image/webp"
          onChange={onInputChange}
          disabled={processing}
          className="absolute inset-0 cursor-pointer opacity-0 disabled:cursor-not-allowed"
          id="pin-image-upload"
          aria-label="Upload your pin design"
        />

        {processing ? (
          <div className="flex flex-col items-center gap-3 py-2">
            <svg
              className="w-7 h-7 animate-spin"
              style={{ color: dark ? "#d4af37" : "#775a19" }}
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <p className="font-label text-xs uppercase tracking-widest" style={{ color: dark ? "#d4af37" : "#775a19" }}>
              Removing background…
            </p>
          </div>
        ) : imageUrl ? (
          <div className="flex flex-col items-center gap-3">
            <div
              className="relative max-h-28 max-w-[7rem] overflow-hidden"
              style={{
                backgroundImage:
                  "linear-gradient(45deg,#e5e7eb 25%,transparent 25%)," +
                  "linear-gradient(-45deg,#e5e7eb 25%,transparent 25%)," +
                  "linear-gradient(45deg,transparent 75%,#e5e7eb 75%)," +
                  "linear-gradient(-45deg,transparent 75%,#e5e7eb 75%)",
                backgroundSize: "12px 12px",
                backgroundPosition: "0 0,0 6px,6px -6px,-6px 0px",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="Your pin design" className="max-h-28 max-w-full object-contain" />
            </div>
            <p className="font-label text-[10px] uppercase tracking-widest" style={{ color: dark ? "#99907c" : "#76777c" }}>
              Background removed
            </p>
            <label
              htmlFor="pin-image-upload"
              className="cursor-pointer font-label text-xs uppercase tracking-widest hover:underline"
              style={{ color: dark ? "#d4af37" : "#775a19" }}
            >
              Change image
            </label>
          </div>
        ) : (
          <label htmlFor="pin-image-upload" className="cursor-pointer">
            {dark ? (
              <>
                <p className="font-label text-xs uppercase tracking-widest font-bold" style={{ color: "#e2e2e5" }}>
                  Click or drag your image here
                </p>
                <p className="mt-1 font-label text-[10px]" style={{ color: "#99907c" }}>
                  JPG or PNG · max 10 MB
                </p>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-3xl text-outline mb-3 block">cloud_upload</span>
                <p className="font-label text-sm font-bold text-on-surface uppercase tracking-widest">
                  Drag &amp; Drop Vector Art
                </p>
                <p className="mt-1 font-label text-[10px] text-on-surface-variant uppercase tracking-widest">
                  AI, EPS, SVG, PNG or PDF · max 10 MB
                </p>
                <p className="mt-1 font-label text-[10px] text-on-surface-variant/60">
                  White backgrounds are removed automatically
                </p>
              </>
            )}
          </label>
        )}
      </div>
      {error && (
        <p className="mt-2 font-label text-xs text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
