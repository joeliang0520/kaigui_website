"use client";

import { useState, useEffect } from "react";
import { usePinCustomization } from "@/lib/usePinCustomization";

function RulerBar({ sizeCm, fillContainer = false }: { sizeCm: number; fillContainer?: boolean }) {
  const maxWidth = 220;
  const barWidth = fillContainer ? undefined : Math.max(80, (sizeCm / 8) * maxWidth);
  const tickInterval = sizeCm <= 2 ? 0.5 : sizeCm <= 5 ? 1 : 2;
  const ticks: number[] = [];
  for (let t = 0; t <= sizeCm + 0.01; t += tickInterval) {
    ticks.push(Math.round(t * 10) / 10);
  }
  const uniqueTicks = Array.from(new Set(ticks)).sort((a, b) => a - b);
  if (uniqueTicks[uniqueTicks.length - 1] !== sizeCm) {
    uniqueTicks.push(sizeCm);
  }

  const widthStyle = fillContainer ? { width: "100%" } : { width: `${barWidth}px` };
  const minLabelSpacing = 28;
  const showLabel = (tick: number, index: number) => {
    if (index === 0 || index === uniqueTicks.length - 1) return true;
    const prevTick = uniqueTicks[index - 1];
    const nextTick = uniqueTicks[index + 1];
    const w = barWidth ?? 200;
    const pos = (tick / sizeCm) * w;
    const prevPos = (prevTick / sizeCm) * w;
    const nextPos = (nextTick / sizeCm) * w;
    return pos - prevPos >= minLabelSpacing && nextPos - pos >= minLabelSpacing;
  };

  return (
    <div className={`flex flex-col gap-1.5 ${fillContainer ? "w-full" : "items-center"}`}>
      <div className="text-[10px] font-medium text-text-dark/60 uppercase tracking-wider">
        Scale (cm)
      </div>
      <div
        className="relative h-6 border-b-2 border-primary-blue"
        style={widthStyle}
      >
        <div
          className="absolute left-0 top-0 h-full border-l-2 border-primary-blue bg-primary-blue/10"
          style={widthStyle}
        />
        {uniqueTicks.map((tick) => (
          <div
            key={tick}
            className="absolute top-0 h-2.5 w-px bg-primary-blue"
            style={{
              left: fillContainer ? `${(tick / sizeCm) * 100}%` : `${(tick / sizeCm) * (barWidth ?? 0)}px`,
            }}
          />
        ))}
      </div>
      <div
        className="relative text-[10px] font-medium text-primary-blue"
        style={{ width: fillContainer ? "100%" : `${barWidth}px`, height: 18 }}
      >
        {uniqueTicks.map((tick, i) =>
          showLabel(tick, i) ? (
            <span
              key={tick}
              className="absolute -translate-x-1/2 whitespace-nowrap"
              style={{ left: `${(tick / sizeCm) * 100}%` }}
            >
              {tick} cm
            </span>
          ) : null
        )}
      </div>
    </div>
  );
}

export function Pin3DViewerWithMeasurements({
  children,
  compact = false,
}: {
  children: React.ReactNode;
  compact?: boolean;
}) {
  const { shape, sizeWidth, sizeHeight } = usePinCustomization();
  const [enlarged, setEnlarged] = useState(false);
  const sizeCm = Math.round((Math.max(sizeWidth || 2.54, sizeHeight || 2.54)) * 10) / 10;
  const sizeLabel =
    shape === "square" || shape === "circle"
      ? `${sizeCm} cm`
      : `${Math.round((sizeWidth || 2.54) * 10) / 10} × ${Math.round((sizeHeight || 2.54) * 10) / 10} cm`;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setEnlarged(false);
    };
    if (enlarged) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [enlarged]);

  if (compact) {
    return (
      <>
        <div className="w-full max-w-[320px] mx-auto space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-primary-blue">{sizeLabel}</span>
            <button
              type="button"
              onClick={() => setEnlarged(true)}
              className="text-xs font-medium text-primary-blue hover:underline flex items-center gap-1"
            >
              Click to zoom
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          </div>
          <div
            className="aspect-square w-full rounded-lg overflow-hidden border border-primary-blue/40 bg-white/50 cursor-pointer"
            onClick={() => setEnlarged(true)}
          >
            {!enlarged && children}
          </div>
          <div className="w-full">
            <RulerBar sizeCm={sizeCm} fillContainer />
          </div>
        </div>

        {enlarged && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setEnlarged(false)}
          >
            <div
              className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-border-light flex justify-between items-center">
                <h3 className="text-lg font-semibold text-text-dark">Pin Preview</h3>
                <button
                  type="button"
                  onClick={() => setEnlarged(false)}
                  className="p-2 rounded-lg hover:bg-soft-blue-alt text-text-dark"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <div className="w-full max-w-[560px] mx-auto space-y-4">
                  <div className="aspect-square w-full rounded-lg overflow-hidden border-2 border-primary-blue/40 bg-soft-blue min-h-[400px]">
                    {children}
                  </div>
                  <div className="w-full">
                    <RulerBar sizeCm={sizeCm} fillContainer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-primary-blue/10 border border-primary-blue/30">
            <span className="text-sm font-bold text-primary-blue">
              {sizeLabel}
            </span>
            <span className="text-xs text-text-dark/70 ml-1">
              {shape === "circle" ? "diameter" : shape === "square" ? "side" : "W × H"}
            </span>
          </div>
          <div className="text-xs text-text-dark/60">
            Actual size reference
          </div>
        </div>
      </div>

      <div className="w-full space-y-4">
        <div className="relative rounded-lg overflow-hidden border-2 border-primary-blue/40 bg-white/50">
          <div className="absolute top-2 left-2 z-10 flex gap-2">
            <div className="px-2 py-1 rounded bg-white/90 shadow-sm border border-border-light text-[10px] font-mono text-primary-blue">
              ↕ {Math.round((sizeHeight || 2.54) * 10) / 10} cm
            </div>
            <div className="px-2 py-1 rounded bg-white/90 shadow-sm border border-border-light text-[10px] font-mono text-primary-blue">
              ↔ {Math.round((sizeWidth || 2.54) * 10) / 10} cm
            </div>
          </div>
          {children}
        </div>

        <div className="w-full">
          <RulerBar sizeCm={sizeCm} fillContainer />
        </div>
      </div>
    </div>
  );
}
