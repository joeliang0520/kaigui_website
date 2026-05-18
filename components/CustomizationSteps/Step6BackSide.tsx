"use client";

import { usePinCustomization } from "@/lib/usePinCustomization";
import { BACK_SIDE_OPTIONS } from "@/lib/pinConfig";
import { OptionCardWithDetail } from "@/components/OptionCardWithDetail";
import { OptionDetailSection } from "@/components/OptionDetailSection";

export function Step6BackSide() {
  const { backSide, setBackSide, laserEngravingText, setLaserEngravingText } =
    usePinCustomization();

  return (
    <div className="bg-surface-container-lowest p-6 border border-outline-variant/20">
      <h3 className="font-label text-sm font-bold text-primary uppercase tracking-widest mb-1">
        Step 6: Choose the Back Side Option
      </h3>
      <p className="text-sm text-on-surface-variant mb-4">
        Customize the back of your lapel pin
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {BACK_SIDE_OPTIONS.map(({ id, label }) => (
          <OptionCardWithDetail
            key={id}
            id={id}
            label={label}
            isSelected={backSide === id}
            onSelect={() => setBackSide(id)}
            optionType="backSide"
          />
        ))}
      </div>

      {backSide === "laser_engraving" && (
        <div className="mt-5 p-4 border-2 border-secondary/20 bg-surface-container-low">
          <label
            htmlFor="laser-text"
            className="block font-label text-xs font-bold text-secondary uppercase tracking-widest mb-1"
          >
            Laser Engraving Text
          </label>
          <p className="text-xs text-on-surface-variant mb-3">
            This text will be engraved on the back of your pin. The 3D preview
            updates as you type — rotate the pin to see the back.
          </p>
          <input
            id="laser-text"
            type="text"
            maxLength={60}
            value={laserEngravingText}
            onChange={(e) => setLaserEngravingText(e.target.value)}
            placeholder="Add your own text"
            className="w-full px-4 py-2.5 border border-outline-variant/30 bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:outline-none font-body text-sm"
          />
          <p className="text-[11px] text-on-surface-variant/70 mt-1.5 text-right font-label">
            {laserEngravingText.length} / 60 characters
          </p>
        </div>
      )}

      <OptionDetailSection optionId={backSide} optionType="backSide" />
    </div>
  );
}
