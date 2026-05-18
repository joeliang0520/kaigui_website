"use client";

import { useCallback, useState, useEffect } from "react";
import { usePinCustomization } from "@/lib/usePinCustomization";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB for 3D models
const ACCEPTED_TYPES = ["model/gltf-binary", "model/gltf+json"];
const ACCEPTED_EXTENSIONS = [".glb", ".gltf"];

export function ModelUploader() {
  const { customModelUrl, setCustomModelUrl } = usePinCustomization();
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Revoke object URL when clearing or changing
  useEffect(() => {
    return () => {
      if (customModelUrl && customModelUrl.startsWith("blob:")) {
        URL.revokeObjectURL(customModelUrl);
      }
    };
  }, [customModelUrl]);

  const handleFile = useCallback(
    (file: File | null) => {
      setError(null);
      if (customModelUrl && customModelUrl.startsWith("blob:")) {
        URL.revokeObjectURL(customModelUrl);
      }
      if (!file) {
        setCustomModelUrl(null);
        return;
      }
      const ext = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
      const isValidType =
        ACCEPTED_TYPES.includes(file.type) ||
        file.type === "application/octet-stream" ||
        ACCEPTED_EXTENSIONS.includes(ext);
      if (!isValidType) {
        setError("Please choose a GLB or GLTF file.");
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setError("File is too large. Maximum size is 10MB.");
        return;
      }
      const url = URL.createObjectURL(file);
      setCustomModelUrl(url);
    },
    [setCustomModelUrl, customModelUrl]
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

  const onDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      handleFile(file);
      e.target.value = "";
    },
    [handleFile]
  );

  const onClear = useCallback(() => {
    if (customModelUrl && customModelUrl.startsWith("blob:")) {
      URL.revokeObjectURL(customModelUrl);
    }
    setCustomModelUrl(null);
    setError(null);
  }, [customModelUrl, setCustomModelUrl]);

  return (
    <div className="w-full">
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`
          relative rounded-xl border-2 border-dashed p-8 text-center transition-colors
          ${isDragging ? "border-primary-blue bg-soft-blue-alt" : "border-border-blue bg-soft-blue"}
          hover:border-primary-blue/60
        `}
      >
        <input
          type="file"
          accept=".glb,.gltf,model/gltf-binary,model/gltf+json"
          onChange={onInputChange}
          className={`absolute inset-0 cursor-pointer opacity-0 ${customModelUrl ? "pointer-events-none" : ""}`}
          id="pin-model-upload"
          aria-label="Upload your 3D pin model"
        />
        {customModelUrl ? (
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg bg-primary-blue/10 px-4 py-2">
              <svg
                className="w-8 h-8 text-primary-blue"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm font-medium text-primary-blue">
                3D model uploaded
              </span>
            </div>
            <div className="flex gap-2">
              <label
                htmlFor="pin-model-upload"
                className="cursor-pointer text-sm font-medium text-primary-blue hover:underline"
              >
                Change model
              </label>
              <span className="text-text-dark/50">|</span>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClear();
                }}
                className="text-sm font-medium text-red-600 hover:underline cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <label htmlFor="pin-model-upload" className="cursor-pointer">
            <p className="text-lg font-medium text-text-dark">
              Click or drag your 3D model here
            </p>
            <p className="mt-2 text-sm text-text-dark/70">
              GLB or GLTF, max 10MB. Optional — use your own pin shape.
            </p>
          </label>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
