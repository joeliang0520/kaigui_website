"use client";

import { useState, useRef, useEffect } from "react";
import { useOptionDetail } from "@/lib/OptionDetailsContext";

interface OptionCardWithDetailProps {
  id: string;
  label: string;
  isSelected: boolean;
  onSelect: () => void;
  optionType: "plating" | "effects" | "attachment" | "backSide" | "packaging";
  disabled?: boolean;
  disabledReason?: string;
  /** When true renders with dark surface-container-high styling (for dark-themed pages) */
  dark?: boolean;
}

export function OptionCardWithDetail({
  id,
  label,
  isSelected,
  onSelect,
  optionType,
  disabled = false,
  disabledReason,
  dark = false,
}: OptionCardWithDetailProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<"top" | "bottom">("top");
  const cardRef = useRef<HTMLDivElement>(null);

  const detail = useOptionDetail(optionType, id);

  useEffect(() => {
    if (!showTooltip || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;
    setTooltipPosition(spaceAbove > spaceBelow ? "top" : "bottom");
  }, [showTooltip]);

  return (
    <div
      ref={cardRef}
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {dark ? (
        <button
          type="button"
          onClick={disabled ? undefined : onSelect}
          disabled={disabled}
          className="w-full min-h-[48px] px-4 py-3 text-left font-label text-xs uppercase tracking-widest transition-all"
          style={{
            border: disabled
              ? "1px solid rgba(77,70,53,0.2)"
              : isSelected
              ? "2px solid #d4af37"
              : "1px solid rgba(77,70,53,0.3)",
            background: disabled
              ? "rgba(51,53,55,0.4)"
              : isSelected
              ? "rgba(212,175,55,0.08)"
              : "#282a2c",
            color: disabled ? "#99907c" : isSelected ? "#d4af37" : "#e2e2e5",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.6 : 1,
            boxShadow: isSelected ? "0 0 12px rgba(212,175,55,0.1)" : "none",
          }}
        >
          {label}
        </button>
      ) : (
        <button
          type="button"
          onClick={disabled ? undefined : onSelect}
          disabled={disabled}
          className={`
            w-full min-h-[48px] px-4 py-3 text-left font-label text-xs uppercase tracking-widest
            transition-all border-2
            ${
              disabled
                ? "border-outline-variant/20 bg-surface-container-low text-on-surface-variant/50 cursor-not-allowed opacity-60"
                : isSelected
                ? "border-secondary bg-secondary/10 text-secondary font-bold"
                : "border-outline-variant/30 bg-surface-container-low hover:border-secondary/40 text-on-surface"
            }
          `}
        >
          {label}
        </button>
      )}

      {showTooltip && (
        <div
          className={`
            absolute z-50 w-72 shadow-xl text-left overflow-hidden
            ${tooltipPosition === "top" ? "bottom-full mb-2" : "top-full mt-2"}
            left-1/2 -translate-x-1/2
          `}
          style={
            dark
              ? { background: "#1e2022", border: "1px solid rgba(77,70,53,0.4)" }
              : { background: "#ffffff", border: "1px solid #c6c6cc" }
          }
        >
          {disabled && disabledReason ? (
            <div className="p-3">
              <p className="font-label text-xs font-bold text-error">⚠ {disabledReason}</p>
            </div>
          ) : (
            <div className="p-4">
              <p
                className="font-label text-xs font-bold uppercase tracking-widest mb-1.5"
                style={{ color: dark ? "#d4af37" : "#030612" }}
              >
                {detail.name}
              </p>
              <p
                className="font-body text-xs leading-relaxed"
                style={{ color: dark ? "#d0c5af" : "#45464c" }}
              >
                {detail.description}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
