"use client";

import { useState, useEffect } from "react";
import { usePinCustomization } from "@/lib/usePinCustomization";
import {
  PIN_STYLES,
  SIZES_CM,
  PLATING_OPTIONS,
  EFFECT_OPTIONS,
  ATTACHMENT_OPTIONS,
  BACK_SIDE_OPTIONS,
  PACKAGING_OPTIONS,
  PIN_SHAPES,
} from "@/lib/pinConfig";

export function SelectionSummary() {
  const {
    designName,
    style,
    shape,
    sizeWidth,
    sizeHeight,
    plating,
    effects,
    attachment,
    backSide,
    packaging,
  } = usePinCustomization();

  const styleLabel = PIN_STYLES.find((s) => s.id === style)?.label ?? style;
  const displayName = designName || `Custom ${styleLabel}`;
  const shapeLabel = PIN_SHAPES.find((s) => s.id === shape)?.label ?? shape;
  const isSingleDim = shape === "square" || shape === "circle";
  const sizeLabel = isSingleDim
    ? SIZES_CM.find((s) => Math.abs(s.value - sizeWidth) < 0.01)?.label ??
      `${Math.round((sizeWidth || 2.54) * 10) / 10} cm`
    : `${Math.round((sizeWidth || 2.54) * 10) / 10} × ${Math.round((sizeHeight || 2.54) * 10) / 10} cm`;
  const platingLabel = PLATING_OPTIONS.find((p) => p.id === plating)?.label ?? plating;
  const attachmentLabel =
    ATTACHMENT_OPTIONS.find((a) => a.id === attachment)?.label ?? attachment;
  const backSideLabel =
    BACK_SIDE_OPTIONS.find((b) => b.id === backSide)?.label ?? backSide;
  const packagingLabel =
    PACKAGING_OPTIONS.find((p) => p.id === packaging)?.label ?? packaging;

  const [lastUpdated, setLastUpdated] = useState(() => new Date());

  useEffect(() => {
    setLastUpdated(new Date());
  }, [designName, style, shape, sizeWidth, sizeHeight, plating, effects, attachment, backSide, packaging]);

  const handleGeneratePDF = () => {
    if (typeof window !== "undefined") {
      window.alert("PDF generation will be available soon. Contact us for a quote.");
    }
  };

  const handleGetQuote = () => {
    if (typeof window !== "undefined") {
      window.alert("Quote request received. We will contact you shortly.");
    }
  };

  return (
    <div className="rounded-xl bg-white p-4 border border-border-light shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-text-dark">
          Your Selection Summary
        </h3>
        <time className="text-[10px] text-text-dark/60" dateTime={lastUpdated.toISOString()} suppressHydrationWarning>
          {lastUpdated.toLocaleString(undefined, { dateStyle: "short", timeStyle: "medium" })}
        </time>
      </div>
      <dl className="space-y-1.5 text-xs">
        <div className="flex flex-col gap-0.5">
          <dt className="text-text-dark/70">Design name:</dt>
          <dd className="font-medium text-text-dark break-words">{displayName}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-text-dark/70">Style:</dt>
          <dd className="font-medium text-text-dark">{styleLabel}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-text-dark/70">Shape:</dt>
          <dd className="font-medium text-text-dark">{shapeLabel}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-text-dark/70">Size:</dt>
          <dd className="font-medium text-text-dark">{sizeLabel}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-text-dark/70">Plating:</dt>
          <dd className="font-medium text-text-dark">{platingLabel}</dd>
        </div>
        {effects.length > 0 && (
          <div className="flex justify-between gap-2">
            <dt className="text-text-dark/70">Effects:</dt>
            <dd className="font-medium text-text-dark text-right">
              {effects
                .map((e) => EFFECT_OPTIONS.find((o) => o.id === e)?.label ?? e)
                .join(", ")}
            </dd>
          </div>
        )}
        <div className="flex justify-between gap-2">
          <dt className="text-text-dark/70">Attachment:</dt>
          <dd className="font-medium text-text-dark">{attachmentLabel}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-text-dark/70">Back side:</dt>
          <dd className="font-medium text-text-dark">{backSideLabel}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-text-dark/70">Packaging:</dt>
          <dd className="font-medium text-text-dark">{packagingLabel}</dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-col gap-2">
        <button
          type="button"
          onClick={handleGeneratePDF}
          className="w-full min-h-[40px] px-3 py-2 rounded-lg border-2 border-primary-blue text-primary-blue font-medium text-sm hover:bg-primary-blue/10 transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Generate PDF
        </button>
        <button
          type="button"
          onClick={handleGetQuote}
          className="w-full min-h-[40px] px-3 py-2 rounded-lg bg-primary-blue text-white font-medium text-sm hover:bg-primary-blue-dark transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Get the Quote
        </button>
      </div>
    </div>
  );
}
