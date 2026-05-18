"use client";

import { useState } from "react";
import { usePinCustomization } from "@/lib/usePinCustomization";
import { PART_LABELS, PLATING_OPTIONS, PLATING_COLORS, ENAMEL_COLORS, ATTACHMENT_OPTIONS } from "@/lib/pinConfig";
import type { PinPart } from "@/lib/pinConfig";
import { PartMaterialSwatch, buildMaterialItems } from "./PartMaterialSwatch";

const ENAMEL_STYLES = new Set(["hard_enamel", "soft_enamel"]);

// SVG icons for each attachment type (simple schematic representations)
const ATTACHMENT_ICONS: Record<string, React.ReactNode> = {
  butterfly_clutch: (
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
      <line x1="20" y1="4" x2="20" y2="32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <polygon points="20,32 20,36 23,38 20,39 17,38 20,36" fill="currentColor" opacity="0.6"/>
      <path d="M20 18 Q10 14 6 18 Q10 22 20 18Z" fill="currentColor" opacity="0.85"/>
      <path d="M20 18 Q30 14 34 18 Q30 22 20 18Z" fill="currentColor" opacity="0.85"/>
    </svg>
  ),
  rubber_clutch: (
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
      <line x1="20" y1="4" x2="20" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <polygon points="20,28 20,33 23,35 20,36 17,35 20,33" fill="currentColor" opacity="0.6"/>
      <ellipse cx="20" cy="30" rx="7" ry="5" fill="currentColor" opacity="0.7"/>
    </svg>
  ),
  two_rubber_clutch: (
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
      <line x1="12" y1="4" x2="12" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="12" cy="26" rx="5.5" ry="4" fill="currentColor" opacity="0.7"/>
      <line x1="28" y1="4" x2="28" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="28" cy="26" rx="5.5" ry="4" fill="currentColor" opacity="0.7"/>
      <text x="20" y="38" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.6">×2</text>
    </svg>
  ),
  deluxe_clutch: (
    /* Large flat disc base + mushroom knob (post + wide brim + dome) */
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
      {/* Large base disc */}
      <ellipse cx="20" cy="30" rx="15" ry="4" fill="currentColor" opacity="0.5"/>
      {/* Short central post */}
      <rect x="18" y="20" width="4" height="11" fill="currentColor" opacity="0.8"/>
      {/* Wide mushroom brim */}
      <ellipse cx="20" cy="20" rx="9" ry="2.5" fill="currentColor" opacity="0.9"/>
      {/* Dome cap */}
      <path d="M11 20 Q11 12 20 12 Q29 12 29 20" fill="currentColor" opacity="0.85"/>
    </svg>
  ),
  two_deluxe_clutch: (
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
      {/* Left mushroom */}
      <ellipse cx="12" cy="30" rx="8" ry="2.5" fill="currentColor" opacity="0.45"/>
      <rect x="10.5" y="22" width="3" height="9" fill="currentColor" opacity="0.8"/>
      <ellipse cx="12" cy="22" rx="5.5" ry="1.8" fill="currentColor" opacity="0.9"/>
      <path d="M6.5 22 Q6.5 16 12 16 Q17.5 16 17.5 22" fill="currentColor" opacity="0.8"/>
      {/* Right mushroom */}
      <ellipse cx="28" cy="30" rx="8" ry="2.5" fill="currentColor" opacity="0.45"/>
      <rect x="26.5" y="22" width="3" height="9" fill="currentColor" opacity="0.8"/>
      <ellipse cx="28" cy="22" rx="5.5" ry="1.8" fill="currentColor" opacity="0.9"/>
      <path d="M22.5 22 Q22.5 16 28 16 Q33.5 16 33.5 22" fill="currentColor" opacity="0.8"/>
      <text x="20" y="40" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.6">×2</text>
    </svg>
  ),
  military_clutch: (
    /* Large disc base + central hub + 3-arm rotating star clasp */
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
      {/* Base disc */}
      <ellipse cx="20" cy="30" rx="14" ry="3.5" fill="currentColor" opacity="0.45"/>
      {/* Hub */}
      <circle cx="20" cy="19" r="4" fill="currentColor" opacity="0.9"/>
      {/* 3-arm clasp radiating from hub */}
      <line x1="20" y1="19" x2="33" y2="19" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="20" y1="19" x2="13.5" y2="8" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="20" y1="19" x2="13.5" y2="30" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      {/* Tip dots */}
      <circle cx="33" cy="19" r="2.5" fill="currentColor" opacity="0.8"/>
      <circle cx="13.5" cy="8" r="2.5" fill="currentColor" opacity="0.8"/>
      <circle cx="13.5" cy="30" r="2.5" fill="currentColor" opacity="0.8"/>
    </svg>
  ),
  two_military_clutch: (
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
      {/* Left star clasp */}
      <ellipse cx="12" cy="30" rx="8" ry="2.5" fill="currentColor" opacity="0.4"/>
      <circle cx="12" cy="20" r="3" fill="currentColor" opacity="0.9"/>
      <line x1="12" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="12" y1="20" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="12" y1="20" x2="8" y2="27" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      {/* Right star clasp */}
      <ellipse cx="28" cy="30" rx="8" ry="2.5" fill="currentColor" opacity="0.4"/>
      <circle cx="28" cy="20" r="3" fill="currentColor" opacity="0.9"/>
      <line x1="28" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="28" y1="20" x2="24" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="28" y1="20" x2="24" y2="27" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <text x="20" y="40" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.6">×2</text>
    </svg>
  ),
  screw_back: (
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
      <line x1="20" y1="4" x2="20" y2="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <polygon points="12,24 28,24 30,32 10,32" fill="currentColor" opacity="0.85"/>
      <line x1="14" y1="26" x2="26" y2="26" stroke="white" strokeWidth="1.5"/>
      <line x1="13" y1="29" x2="27" y2="29" stroke="white" strokeWidth="1.5"/>
    </svg>
  ),
  safety_pin: (
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
      <path d="M8 20 Q8 8 20 8 Q32 8 32 20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <line x1="8" y1="20" x2="8" y2="34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <rect x="26" y="18" width="8" height="8" rx="2" fill="currentColor" opacity="0.75"/>
      <line x1="10" y1="22" x2="30" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  magnet_back: (
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
      <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <circle cx="20" cy="20" r="7" fill="currentColor" opacity="0.5"/>
      <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.9"/>
      <text x="20" y="38" textAnchor="middle" fontSize="6" fill="currentColor" opacity="0.5">N</text>
    </svg>
  ),
  two_magnet_back: (
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
      <circle cx="13" cy="19" r="8.5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="13" cy="19" r="4.5" fill="currentColor" opacity="0.45"/>
      <circle cx="13" cy="19" r="2" fill="currentColor" opacity="0.9"/>
      <circle cx="27" cy="19" r="8.5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="27" cy="19" r="4.5" fill="currentColor" opacity="0.45"/>
      <circle cx="27" cy="19" r="2" fill="currentColor" opacity="0.9"/>
      <text x="20" y="38" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.6">×2</text>
    </svg>
  ),
  no_backing: (
    /* Plain flat disc — no post or hardware */
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
      <ellipse cx="20" cy="22" rx="14" ry="13" fill="currentColor" opacity="0.25"/>
      <ellipse cx="20" cy="22" rx="14" ry="13" stroke="currentColor" strokeWidth="2"/>
      {/* Subtle concentric ring to suggest flat polished surface */}
      <ellipse cx="20" cy="22" rx="9" ry="8" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
    </svg>
  ),
};

const TWO_CLUTCH_IDS = new Set(["two_rubber_clutch", "two_deluxe_clutch", "two_military_clutch"]);
const TWO_CLUTCH_MIN_MM = 22;

export function PartSelectorPanel() {
  const { style, partMaterials, selectedPart, setSelectedPart, setPartMaterial, attachment, setAttachment, sizeWidth, sizeHeight } = usePinCustomization();
  const [hoveredDisabled, setHoveredDisabled] = useState<string | null>(null);
  const pinDiaMm = Math.max(sizeWidth || 2.54, sizeHeight || 2.54) * 10;
  const tooSmallForDual = pinDiaMm < TWO_CLUTCH_MIN_MM;

  const is3DMold = style === "3d_mold";
  const materialParts: PinPart[] = is3DMold ? ["face", "rim", "back", "side"] : ["face", "rim", "back"];
  const allParts: PinPart[] = [...materialParts, "attachment"];

  const activePart = selectedPart ?? "face";
  const isAttachmentMode = activePart === "attachment";
  const includeEnamel = ENAMEL_STYLES.has(style) && activePart === "face";

  const currentMaterial = isAttachmentMode ? null : partMaterials[activePart as keyof typeof partMaterials];
  const currentLabel = currentMaterial
    ? (PLATING_OPTIONS.find((p) => p.id === currentMaterial)?.label ??
       ENAMEL_COLORS.find((e) => e.id === currentMaterial)?.label ??
       currentMaterial)
    : null;

  const currentAttachmentLabel = ATTACHMENT_OPTIONS.find((a) => a.id === attachment)?.label ?? attachment;

  const allSame =
    partMaterials.face === partMaterials.rim &&
    partMaterials.rim === partMaterials.back &&
    (!is3DMold || partMaterials.back === partMaterials.side);

  return (
    <div className="flex flex-col gap-4">
      {/* Part tabs — material parts + attachment */}
      <div>
        <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Select Part to Customize</p>
        <div className="flex gap-2 flex-wrap">
          {allParts.map((part) => (
            <button
              key={part}
              onClick={() => setSelectedPart(part)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-all ${
                activePart === part
                  ? "bg-primary-blue text-white border-primary-blue shadow-sm"
                  : "bg-white text-text-dark border-border-light hover:border-primary-blue hover:text-primary-blue"
              }`}
            >
              {PART_LABELS[part]}
            </button>
          ))}
        </div>
      </div>

      {/* ── ATTACHMENT MODE ── */}
      {isAttachmentMode ? (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 text-primary-blue flex-shrink-0">
              {ATTACHMENT_ICONS[attachment]}
            </div>
            <span className="text-sm text-text-dark">
              <span className="font-medium">Attachment:</span> {currentAttachmentLabel}
            </span>
          </div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Choose Backing Type</p>
          <div className="grid grid-cols-2 gap-2">
            {ATTACHMENT_OPTIONS.map(({ id, label }) => {
              const isDisabled = tooSmallForDual && TWO_CLUTCH_IDS.has(id);
              return (
                <div
                  key={id}
                  className="relative"
                  onMouseEnter={() => isDisabled && setHoveredDisabled(id)}
                  onMouseLeave={() => setHoveredDisabled(null)}
                >
                  <button
                    onClick={isDisabled ? undefined : () => setAttachment(id)}
                    disabled={isDisabled}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border-2 transition-all ${
                      isDisabled
                        ? "border-border-light bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
                        : attachment === id
                        ? "border-primary-blue bg-soft-blue text-primary-blue shadow-sm"
                        : "border-border-light bg-white text-text-dark hover:border-primary-blue hover:bg-soft-blue"
                    }`}
                  >
                    <div className={`w-5 h-5 flex-shrink-0 ${isDisabled ? "text-gray-300" : attachment === id ? "text-primary-blue" : "text-gray-400"}`}>
                      {ATTACHMENT_ICONS[id]}
                    </div>
                    <span className="text-[11px] font-medium leading-tight text-left">{label}</span>
                  </button>
                  {hoveredDisabled === id && (
                    <div className="absolute z-50 bottom-full mb-2 left-1/2 -translate-x-1/2 w-56 bg-white border border-red-200 rounded-lg shadow-lg p-2.5">
                      <p className="text-xs font-semibold text-red-600">⚠ Size too small for dual clutch</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">Please select a size of {TWO_CLUTCH_MIN_MM} mm or larger.</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
<p className="text-xs text-gray-400 italic">
            Rotate the pin to see the attachment on the back face.
          </p>
        </div>
      ) : (
        /* ── MATERIAL MODE ── */
        <>
          {/* Current selection label */}
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-full border border-border-light flex-shrink-0"
              style={{
                background:
                  PLATING_COLORS[currentMaterial!] ??
                  ENAMEL_COLORS.find((e) => e.id === currentMaterial)?.color ??
                  "#888",
              }}
            />
            <span className="text-sm text-text-dark">
              <span className="font-medium">{PART_LABELS[activePart as PinPart]}:</span> {currentLabel}
            </span>
          </div>

          {/* Material grid */}
          <div>
            {includeEnamel && (
              <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Plating Metals</p>
            )}
            <div className="grid grid-cols-5 gap-2 mb-3">
              {buildMaterialItems(false).map((item) => (
                <PartMaterialSwatch
                  key={item.id}
                  item={item}
                  selected={currentMaterial === item.id}
                  onClick={() => setPartMaterial(activePart as PinPart, item.id)}
                />
              ))}
            </div>

            {includeEnamel && (
              <>
                <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Enamel Colors</p>
                <div className="grid grid-cols-5 gap-2">
                  {ENAMEL_COLORS.map((e) => (
                    <PartMaterialSwatch
                      key={e.id}
                      item={{ id: e.id, label: e.label, color: e.color, isEnamel: true }}
                      selected={currentMaterial === e.id}
                      onClick={() => setPartMaterial(activePart as PinPart, e.id)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Multi-part combination summary */}
          {!allSame && (
            <div className="bg-soft-blue rounded-lg p-3 text-xs text-gray-600 space-y-1">
              <p className="font-medium text-text-dark mb-1">Current Combination</p>
              {materialParts.map((part) => {
                const matId = partMaterials[part as keyof typeof partMaterials];
                const label =
                  PLATING_OPTIONS.find((p) => p.id === matId)?.label ??
                  ENAMEL_COLORS.find((e) => e.id === matId)?.label ??
                  matId;
                return (
                  <div key={part} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full border border-border-light flex-shrink-0"
                      style={{
                        background:
                          PLATING_COLORS[matId] ??
                          ENAMEL_COLORS.find((e) => e.id === matId)?.color ??
                          "#888",
                      }}
                    />
                    <span>
                      {PART_LABELS[part]}: <span className="font-medium text-text-dark">{label}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Hint text */}
      <p className="text-xs text-gray-400 italic">
        {selectedPart
          ? "Tip: Click elsewhere in the 3D view to deselect."
          : "Click a part in the 3D viewer or select a tab above."}
      </p>
    </div>
  );
}
