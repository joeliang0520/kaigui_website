"use client";

import { usePinCustomization } from "@/lib/usePinCustomization";
import { PLATING_OPTIONS } from "@/lib/pinConfig";
import { OptionCardWithDetail } from "@/components/OptionCardWithDetail";
import { OptionDetailSection } from "@/components/OptionDetailSection";

export function Step3Plating() {
  const { plating, setPlating } = usePinCustomization();

  return (
    <div className="bg-surface-container-lowest p-6 border border-outline-variant/20">
      <h3 className="font-label text-sm font-bold text-primary uppercase tracking-widest mb-1">
        Step 3: Choose Your Plating Finish
      </h3>
      <p className="text-sm text-on-surface-variant mb-4">
        Select the metal finish that best matches your design
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {PLATING_OPTIONS.map(({ id, label }) => (
          <OptionCardWithDetail
            key={id}
            id={id}
            label={label}
            isSelected={plating === id}
            onSelect={() => setPlating(id)}
            optionType="plating"
          />
        ))}
      </div>
      <OptionDetailSection optionId={plating} optionType="plating" />
    </div>
  );
}
