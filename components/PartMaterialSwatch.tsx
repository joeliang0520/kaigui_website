"use client";

import { PLATING_COLORS, PLATING_OPTIONS, ENAMEL_COLORS } from "@/lib/pinConfig";

interface SwatchItem {
  id: string;
  label: string;
  color: string;
  isEnamel?: boolean;
}

interface PartMaterialSwatchProps {
  item: SwatchItem;
  selected: boolean;
  onClick: () => void;
}

export function PartMaterialSwatch({ item, selected, onClick }: PartMaterialSwatchProps) {
  const isMetallic = !item.isEnamel;

  // Metallic swatches use a radial gradient to simulate sheen
  const metalStyle = isMetallic
    ? {
        background: `radial-gradient(circle at 35% 35%, ${lighten(item.color, 0.4)}, ${item.color} 55%, ${darken(item.color, 0.3)} 100%)`,
      }
    : { background: item.color };

  return (
    <button
      title={item.label}
      onClick={onClick}
      className={`w-12 h-12 rounded-full border-2 transition-all duration-150 relative ${
        selected
          ? "border-primary-blue scale-110 shadow-lg shadow-primary-blue/30"
          : "border-border-light hover:border-primary-blue hover:scale-105"
      }`}
      style={metalStyle}
    >
      {selected && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg className="w-5 h-5 text-white drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}
    </button>
  );
}

// Build the full list of swatch items for the material grid
export function buildMaterialItems(includeEnamel: boolean): SwatchItem[] {
  const platings: SwatchItem[] = PLATING_OPTIONS.map((p) => ({
    id: p.id,
    label: p.label,
    color: PLATING_COLORS[p.id] ?? "#888",
  }));

  if (!includeEnamel) return platings;

  const enamels: SwatchItem[] = ENAMEL_COLORS.map((e) => ({
    id: e.id,
    label: e.label,
    color: e.color,
    isEnamel: true,
  }));

  return [...platings, ...enamels];
}

// Helpers for metallic gradient sheen
function lighten(hex: string, amount: number): string {
  return adjustColor(hex, amount);
}
function darken(hex: string, amount: number): string {
  return adjustColor(hex, -amount);
}
function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + Math.round(255 * amount)));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + Math.round(255 * amount)));
  const b = Math.min(255, Math.max(0, (num & 0xff) + Math.round(255 * amount)));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
