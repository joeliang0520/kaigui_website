"use client";

import { usePinCustomization } from "@/lib/usePinCustomization";
import { PIN_STYLES, type PinStyle } from "@/lib/pinConfig";

export function Step1Style() {
  const { style, setStyle } = usePinCustomization();

  return (
    <div className="bg-surface-container-lowest p-6 border border-outline-variant/20">
      <h3 className="font-label text-sm font-bold text-primary uppercase tracking-widest mb-1">
        Step 1: Choose Your Pin Style
      </h3>
      <p className="text-sm text-on-surface-variant mb-4">
        Select from our six classic lapel pin styles
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {PIN_STYLES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setStyle(id as PinStyle)}
            className={`
              min-h-[48px] px-4 py-3 text-left font-label text-xs uppercase tracking-widest
              transition-all border-2
              ${
                style === id
                  ? "border-secondary bg-secondary/10 text-secondary font-bold"
                  : "border-outline-variant/30 bg-surface-container-low hover:border-secondary/40 text-on-surface"
              }
            `}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
