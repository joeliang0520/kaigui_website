"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useOptionDetail } from "@/lib/OptionDetailsContext";

const OptionPreview3D = dynamic(
  () => import("./OptionPreview3D").then((m) => ({ default: m.OptionPreview3D })),
  { ssr: false }
);

type OptionType = "plating" | "effects" | "attachment" | "backSide" | "packaging";

interface OptionDetailModalProps {
  optionId: string;
  optionType: OptionType;
  isOpen: boolean;
  onClose: () => void;
}

function OptionRealWorldImage({
  optionId,
  optionType,
}: {
  optionId: string;
  optionType: OptionType;
}) {
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const src = `/option-images/${optionType}/${optionId}.jpg`;

  useEffect(() => {
    setShowPlaceholder(false);
  }, [optionId, optionType]);

  return showPlaceholder ? (
    <div className="w-full aspect-square min-h-[200px] rounded-lg overflow-hidden bg-soft-blue border border-border-blue border-dashed flex items-center justify-center">
      <div className="text-center p-4 text-xs text-text-dark/60">
        <p className="font-medium mb-1">Real-world photo</p>
        <p className="text-[10px]">
          Add image to: <code>public/option-images/{optionType}/{optionId}.jpg</code>
        </p>
      </div>
    </div>
  ) : (
    <div className="relative w-full aspect-square min-h-[200px] rounded-lg overflow-hidden bg-soft-blue border border-border-blue">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`Real-world example of ${optionId}`}
        className="w-full h-full object-contain"
        onError={() => setShowPlaceholder(true)}
      />
    </div>
  );
}

export function OptionDetailModal({
  optionId,
  optionType,
  isOpen,
  onClose,
}: OptionDetailModalProps) {
  const detail = useOptionDetail(optionType, optionId);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="option-detail-title"
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl border border-border-light">
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border-light bg-white">
          <h2 id="option-detail-title" className="text-lg font-semibold text-primary-blue">
            {detail.name}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-soft-blue text-text-dark transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4">
          <p className="text-sm text-text-dark/80 leading-relaxed">
            {detail.detailDescription ?? detail.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-text-dark/70 mb-2">3D Preview</p>
              <div className="min-h-[200px] rounded-lg overflow-hidden">
                <OptionPreview3D optionId={optionId} optionType={optionType} />
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-text-dark/70 mb-2">Real-world example</p>
              <OptionRealWorldImage optionId={optionId} optionType={optionType} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
