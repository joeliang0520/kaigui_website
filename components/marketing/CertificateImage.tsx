"use client";

import { useEffect, useState } from "react";

interface CertificateImageProps {
  /** Path under /public, e.g. "/certificates/pollutant-discharge-permit.jpg" */
  src: string;
  alt: string;
  /** Tailwind aspect-ratio class for the card preview, e.g. "aspect-[3/4]" */
  aspectClass?: string;
  /** Label revealed on hover */
  hoverLabel?: string;
}

/**
 * Renders a certificate document as a card preview. Clicking the preview opens
 * a full-screen overlay showing the enlarged image. Close via the backdrop,
 * the close button, or the Escape key.
 */
export function CertificateImage({
  src,
  alt,
  aspectClass = "aspect-[3/4]",
  hoverLabel = "VIEW DOCUMENT",
}: CertificateImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* ── Card preview ── */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`w-full ${aspectClass} bg-surface-container-low relative group cursor-zoom-in overflow-hidden rounded-sm`}
      >
        <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-4 left-4 right-4 py-2 bg-surface-container-lowest/80 backdrop-blur text-center font-label text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
          {hoverLabel}
        </div>
      </button>

      {/* ── Enlarge overlay ── */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/90 backdrop-blur-sm p-6 md:p-12 cursor-zoom-out"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-on-primary border border-on-primary/20 hover:bg-on-primary hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-full object-contain shadow-2xl cursor-default"
          />
        </div>
      )}
    </>
  );
}
