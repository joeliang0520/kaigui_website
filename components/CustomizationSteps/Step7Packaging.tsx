"use client";

import { usePinCustomization } from "@/lib/usePinCustomization";
import { PACKAGING_OPTIONS } from "@/lib/pinConfig";
import { OptionCardWithDetail } from "@/components/OptionCardWithDetail";
import { OptionDetailSection } from "@/components/OptionDetailSection";

const BOX_DIMENSION_IDS = new Set(["paper_box", "plastic_box"]);

function DimensionInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">{label}</label>
      <div className="flex items-center gap-1">
        <input
          type="text"
          inputMode="decimal"
          placeholder="e.g. 5"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ""))}
          className="w-full px-3 py-2 border border-outline-variant/30 bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:outline-none font-body text-sm"
        />
        <span className="font-label text-xs text-on-surface-variant whitespace-nowrap">cm</span>
      </div>
    </div>
  );
}

export function Step7Packaging() {
  const { packaging, setPackaging, boxDimensions, setBoxDimensions } = usePinCustomization();
  const showDimensions = BOX_DIMENSION_IDS.has(packaging);

  return (
    <div className="bg-surface-container-lowest p-6 border border-outline-variant/20">
      <h3 className="font-label text-sm font-bold text-primary uppercase tracking-widest mb-1">
        Step 7: Choose Your Packaging
      </h3>
      <p className="text-sm text-on-surface-variant mb-4">
        We provide a variety of packaging options
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {PACKAGING_OPTIONS.map(({ id, label }) => (
          <OptionCardWithDetail
            key={id}
            id={id}
            label={label}
            isSelected={packaging === id}
            onSelect={() => setPackaging(id)}
            optionType="packaging"
          />
        ))}
      </div>

      {showDimensions && (
        <div className="mt-5 p-4 border-2 border-secondary/20 bg-surface-container-low">
          <p className="font-label text-xs font-bold text-secondary uppercase tracking-widest mb-1">
            Box Dimensions
          </p>
          <p className="text-xs text-on-surface-variant mb-1">
            Enter the inner dimensions of your box (optional — leave blank to use our standard size).
          </p>
          <p className="font-label text-xs text-amber-600 font-medium mb-3">
            ⚠ Non-standard sizes may incur an additional charge.
          </p>
          <div className="grid grid-cols-3 gap-3">
            <DimensionInput
              label="Width"
              value={boxDimensions.width}
              onChange={(v) => setBoxDimensions({ width: v })}
            />
            <DimensionInput
              label="Height"
              value={boxDimensions.height}
              onChange={(v) => setBoxDimensions({ height: v })}
            />
            <DimensionInput
              label="Length"
              value={boxDimensions.length}
              onChange={(v) => setBoxDimensions({ length: v })}
            />
          </div>
        </div>
      )}

      <OptionDetailSection optionId={packaging} optionType="packaging" />
    </div>
  );
}
