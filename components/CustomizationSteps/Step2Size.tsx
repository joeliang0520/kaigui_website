"use client";

import { useState } from "react";
import { usePinCustomization } from "@/lib/usePinCustomization";
import { SIZES_CM, PIN_SHAPES, RECTANGLE_PRESETS } from "@/lib/pinConfig";
import type { PinShape } from "@/lib/pinConfig";

const MIN_CM = 0.5;
const MAX_CM = 15;

// US $1 coin (Sacagawea, Presidential) diameter in cm
const US_DOLLAR_COIN_DIAMETER_CM = 2.65;

export function Step2Size() {
  const { shape, sizeWidth, sizeHeight, setShape, setSizeWidth, setSizeHeight, customModelUrl } =
    usePinCustomization();

  const hasCustomModel = !!customModelUrl;

  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  const isSingleDimension = shape === "square" || shape === "circle";
  const effectiveSize = isSingleDimension ? sizeWidth : Math.max(sizeWidth, sizeHeight);

  const handleShapeChange = (newShape: PinShape) => {
    setShape(newShape);
    if (newShape === "square" || newShape === "circle") {
      setSizeHeight(sizeWidth);
    }
    setIsCustom(false);
    setCustomWidth("");
    setCustomHeight("");
  };

  const handlePresetClick = (value: number) => {
    setIsCustom(false);
    setCustomWidth("");
    setCustomHeight("");
    setSizeWidth(value);
    if (isSingleDimension) setSizeHeight(value);
  };

  const handleRectanglePreset = (w: number, h: number) => {
    setIsCustom(false);
    setCustomWidth("");
    setCustomHeight("");
    setSizeWidth(w);
    setSizeHeight(h);
  };

  const isRectanglePreset = (w: number, h: number) =>
    Math.abs(sizeWidth - w) < 0.01 && Math.abs(sizeHeight - h) < 0.01;

  const handleCustomWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.]/g, "");
    setCustomWidth(val);
    const num = parseFloat(val);
    if (!Number.isNaN(num) && num >= MIN_CM && num <= MAX_CM) {
      setSizeWidth(num);
      if (isSingleDimension) setSizeHeight(num);
    }
  };

  const handleCustomHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.]/g, "");
    setCustomHeight(val);
    const num = parseFloat(val);
    if (!Number.isNaN(num) && num >= MIN_CM && num <= MAX_CM) {
      setSizeHeight(num);
    }
  };

  const handleCustomBlur = () => {
    const w = parseFloat(customWidth);
    const h = parseFloat(customHeight);
    const validW = !Number.isNaN(w) && w >= MIN_CM && w <= MAX_CM;
    const validH = !Number.isNaN(h) || isSingleDimension;
    if (isSingleDimension) {
      if (validW) {
        setSizeWidth(w);
        setSizeHeight(w);
        setCustomWidth(w.toFixed(1));
      } else {
        setCustomWidth(sizeWidth.toFixed(1));
      }
      setCustomHeight("");
    } else {
      if (validW) {
        setSizeWidth(w);
        setCustomWidth(w.toFixed(1));
      } else {
        setCustomWidth(sizeWidth.toFixed(1));
      }
      if (validH && !Number.isNaN(h) && h >= MIN_CM && h <= MAX_CM) {
        setSizeHeight(h);
        setCustomHeight(h.toFixed(1));
      } else {
        setCustomHeight(sizeHeight.toFixed(1));
      }
    }
  };

  const maxSizeCm = 15;
  const scale = 100 / maxSizeCm; // SVG units per cm
  const pinCenterX = (effectiveSize / 2) * scale + 10;
  const pinCenterY = 50;
  const coinCenterX = 58;
  const coinCenterY = 50;
  const coinRadius = (US_DOLLAR_COIN_DIAMETER_CM / 2) * scale;

  return (
    <div className="bg-surface-container-lowest p-6 border border-outline-variant/20">
      <h3 className="font-label text-sm font-bold text-primary uppercase tracking-widest mb-1">
        Step 2: Select Size & Shape
      </h3>
      <p className="text-sm text-on-surface-variant mb-4">
        Choose your pin shape and dimensions. Pricing is based on the longest dimension.
      </p>

      {/* Shape selector - fixed to Custom Shape when user has uploaded a 3D model */}
      <div className="mb-4">
        <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">Shape</label>
        {hasCustomModel ? (
          <div className="flex items-center gap-2 px-4 py-3 rounded-sm border-2 border-secondary bg-secondary/10">
            <span className="text-sm font-medium text-secondary">Custom Shape</span>
            <span className="text-xs text-on-surface-variant">(from your uploaded 3D model)</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PIN_SHAPES.map((s) => (
              <label
                key={s.id}
                className={`
                  flex items-center justify-center gap-2 px-3 py-2.5 rounded-sm border-2 cursor-pointer transition-all
                  ${
                    shape === s.id
                      ? "border-secondary bg-secondary/10"
                      : "border-outline-variant/30 bg-surface-container-low hover:border-secondary/40"
                  }
                `}
              >
                <input
                  type="radio"
                  name="shape"
                  checked={shape === s.id}
                  onChange={() => handleShapeChange(s.id)}
                  className="sr-only"
                />
                <span
                  className={`text-sm font-medium ${
                    shape === s.id ? "text-secondary" : "text-on-surface"
                  }`}
                >
                  {s.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Size selection - hidden when custom model (size determined by model) */}
      {!hasCustomModel && isSingleDimension ? (
            <>
              <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">
                {shape === "circle" ? "Diameter" : "Side length"} (cm)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 mb-4">
                {SIZES_CM.map((s) => (
                  <label
                    key={s.value}
                    className={`
                      flex items-center gap-2 px-3 py-2.5 rounded-sm border-2 cursor-pointer transition-all
                      ${
                        !isCustom && Math.abs(sizeWidth - s.value) < 0.01
                          ? "border-secondary bg-secondary/10"
                          : "border-outline-variant/30 bg-surface-container-low hover:border-secondary/40"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="size-single"
                      checked={!isCustom && Math.abs(sizeWidth - s.value) < 0.01}
                      onChange={() => handlePresetClick(s.value)}
                      className="sr-only"
                    />
                    <span
                      className={`flex-1 text-sm font-medium ${
                        !isCustom && Math.abs(sizeWidth - s.value) < 0.01
                          ? "text-secondary"
                          : "text-on-surface"
                      }`}
                    >
                      {s.valueIn}
                      <span aria-hidden>″</span> ({s.valueMm}mm)
                    </span>
                    {s.popular && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary-blue/20 text-secondary font-medium">
                        Popular
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </>
          ) : !hasCustomModel ? (
            <>
              <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">
                Width × Height (cm)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-3">
                {RECTANGLE_PRESETS.map((p) => (
                  <label
                    key={p.label}
                    className={`
                      flex items-center justify-center px-3 py-2.5 rounded-sm border-2 cursor-pointer transition-all
                      ${
                        !isCustom && isRectanglePreset(p.width, p.height)
                          ? "border-secondary bg-secondary/10"
                          : "border-outline-variant/30 bg-surface-container-low hover:border-secondary/40"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="size-rect"
                      checked={!isCustom && isRectanglePreset(p.width, p.height)}
                      onChange={() => handleRectanglePreset(p.width, p.height)}
                      className="sr-only"
                    />
                    <span
                      className={`text-sm font-medium ${
                        !isCustom && isRectanglePreset(p.width, p.height)
                          ? "text-secondary"
                          : "text-on-surface"
                      }`}
                    >
                      {p.label}
                    </span>
                    {p.popular && (
                      <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-primary-blue/20 text-secondary font-medium">
                        Popular
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </>
          ) : null}

      {/* Custom size inputs - hidden when custom model */}
      {!hasCustomModel && (
          <div className="mt-4 space-y-3">
            <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
              Custom size (cm)
            </label>
            {isSingleDimension ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="e.g. 4.5"
                  value={
                    isCustom
                      ? customWidth
                      : SIZES_CM.some((s) => Math.abs(s.value - sizeWidth) < 0.01)
                        ? ""
                        : sizeWidth.toFixed(1)
                  }
                  onChange={handleCustomWidthChange}
                  onFocus={() => {
                    setIsCustom(true);
                    setCustomWidth(sizeWidth.toString());
                  }}
                  onBlur={handleCustomBlur}
                  className="flex-1 min-w-0 px-4 py-2.5 border border-outline-variant/30 bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:outline-none font-body text-sm"
                />
                <span className="flex items-center px-3 text-sm text-on-surface-variant">cm</span>
              </div>
            ) : (
              <div className="flex gap-2 flex-wrap">
                <div className="flex gap-2 flex-1 min-w-0">
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Width"
                    value={
                      isCustom
                        ? customWidth
                        : RECTANGLE_PRESETS.some((p) =>
                            isRectanglePreset(p.width, p.height)
                          )
                          ? ""
                          : sizeWidth.toFixed(1)
                    }
                    onChange={handleCustomWidthChange}
                    onFocus={() => {
                      setIsCustom(true);
                      setCustomWidth(sizeWidth.toString());
                      setCustomHeight(sizeHeight.toString());
                    }}
                    onBlur={handleCustomBlur}
                    className="flex-1 min-w-0 px-4 py-2.5 border border-outline-variant/30 bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:outline-none font-body text-sm"
                  />
                  <span className="flex items-center text-sm text-on-surface-variant">×</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Height"
                    value={
                      isCustom
                        ? customHeight
                        : RECTANGLE_PRESETS.some((p) =>
                            isRectanglePreset(p.width, p.height)
                          )
                          ? ""
                          : sizeHeight.toFixed(1)
                    }
                    onChange={handleCustomHeightChange}
                    onFocus={() => {
                      setIsCustom(true);
                      setCustomWidth(sizeWidth.toString());
                      setCustomHeight(sizeHeight.toString());
                    }}
                    onBlur={handleCustomBlur}
                    className="flex-1 min-w-0 px-4 py-2.5 border border-outline-variant/30 bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:outline-none font-body text-sm"
                  />
                </div>
                <span className="flex items-center px-3 text-sm text-on-surface-variant">cm</span>
              </div>
            )}
            <p className="text-xs text-on-surface-variant">
              {MIN_CM} - {MAX_CM} cm per dimension
            </p>
          </div>
      )}

      {hasCustomModel && (
        <p className="text-sm text-on-surface-variant py-2">
          Size is determined by your uploaded 3D model. View the preview to see the actual dimensions.
        </p>
      )}

      {/* Sample Pin Size View - hidden when custom model (shows procedural shapes) */}
      {!hasCustomModel && (
      <div className="mt-8 pt-6 border-t border-outline-variant/20">
          <h4 className="font-label text-xs uppercase tracking-widest text-primary font-bold mb-3">
            Sample Pin Size View
          </h4>
          <p className="text-xs text-on-surface-variant mb-2">
            Shown to scale with a US $1 coin (26.5 mm)
          </p>
          <div className="aspect-square max-w-[320px] rounded-sm border-2 border-outline-variant/20 bg-white overflow-hidden">
            <div className="relative w-full h-full">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <pattern
                    id="grid"
                    width="10"
                    height="10"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 10 0 L 0 0 0 10"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="0.5"
                    />
                  </pattern>
                  <radialGradient id="step2-coin-gold" cx="35%" cy="35%" r="70%">
                    <stop offset="0%" stopColor="#F4E4BC" />
                    <stop offset="40%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#B8860B" />
                  </radialGradient>
                  <clipPath id="step2-coin-clip" clipPathUnits="objectBoundingBox">
                    <circle cx="0.5" cy="0.5" r="0.5" />
                  </clipPath>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
                {[0, 25, 50, 75, 100].map((x) => (
                  <line
                    key={`v${x}`}
                    x1={x}
                    y1={0}
                    x2={x}
                    y2={100}
                    stroke="#9CA3AF"
                    strokeWidth="0.5"
                  />
                ))}
                {[0, 25, 50, 75, 100].map((y) => (
                  <line
                    key={`h${y}`}
                    x1={0}
                    y1={y}
                    x2={100}
                    y2={y}
                    stroke="#9CA3AF"
                    strokeWidth="0.5"
                  />
                ))}
                <text x="2" y="8" fontSize="6" fill="#6B7280" fontFamily="sans-serif">
                  0
                </text>
                <text x="48" y="8" fontSize="6" fill="#6B7280" fontFamily="sans-serif">
                  {(maxSizeCm / 2).toFixed(1)} cm
                </text>
                <text x="92" y="8" fontSize="6" fill="#6B7280" fontFamily="sans-serif">
                  {maxSizeCm} cm
                </text>
                {/* Pin - drawn to actual scale */}
                {shape === "circle" ? (
                  <circle
                    cx={pinCenterX}
                    cy={pinCenterY}
                    r={(sizeWidth / 2) * scale}
                    fill="#D4AF37"
                    stroke="#B8860B"
                    strokeWidth="0.5"
                  />
                ) : shape === "square" ? (
                  <rect
                    x={pinCenterX - (sizeWidth / 2) * scale}
                    y={pinCenterY - (sizeWidth / 2) * scale}
                    width={sizeWidth * scale}
                    height={sizeWidth * scale}
                    fill="#D4AF37"
                    stroke="#B8860B"
                    strokeWidth="0.5"
                  />
                ) : (
                  <rect
                    x={pinCenterX - (sizeWidth / 2) * scale}
                    y={pinCenterY - (sizeHeight / 2) * scale}
                    width={sizeWidth * scale}
                    height={sizeHeight * scale}
                    fill="#D4AF37"
                    stroke="#B8860B"
                    strokeWidth="0.5"
                  />
                )}
                {/* US $1 coin (26.5 mm) - realistic figure with reeded edge */}
                <g transform={`translate(${coinCenterX},${coinCenterY}) scale(${coinRadius / 48})`}>
                  <g clipPath="url(#step2-coin-clip)">
                    <circle cx="0" cy="0" r="48" fill="url(#step2-coin-gold)" stroke="#A67C00" strokeWidth="0.8" />
                    {/* Reeded edge - 80 ridges */}
                    {Array.from({ length: 80 }, (_, i) => {
                      const a1 = (i / 80) * 2 * Math.PI;
                      const a2 = ((i + 0.5) / 80) * 2 * Math.PI;
                      const a3 = ((i + 1) / 80) * 2 * Math.PI;
                      const rIn = 45;
                      const rOut = 48;
                      const x1 = rIn * Math.cos(a1);
                      const y1 = rIn * Math.sin(a1);
                      const x2 = rOut * Math.cos(a2);
                      const y2 = rOut * Math.sin(a2);
                      const x3 = rIn * Math.cos(a3);
                      const y3 = rIn * Math.sin(a3);
                      return (
                        <path
                          key={i}
                          d={`M ${x1} ${y1} Q ${x2} ${y2} ${x3} ${y3}`}
                          fill="none"
                          stroke="#8B6914"
                          strokeWidth="0.4"
                        />
                      );
                    })}
                    {/* Inner rim */}
                    <circle cx="0" cy="0" r="43" fill="none" stroke="#E8D48B" strokeWidth="0.3" opacity="0.7" />
                    {/* $1 - dollar coin center design */}
                    <text x="0" y="2" fontSize="14" fill="#5a4a2a" textAnchor="middle" fontWeight="bold" fontFamily="Georgia, serif">$1</text>
                    {/* ONE DOLLAR */}
                    <text x="0" y="18" fontSize="7" fill="#5a4a2a" textAnchor="middle" fontWeight="bold" fontFamily="Georgia, serif">
                      ONE DOLLAR
                    </text>
                  </g>
                </g>
              </svg>
            </div>
          </div>
      </div>
      )}
    </div>
  );
}
