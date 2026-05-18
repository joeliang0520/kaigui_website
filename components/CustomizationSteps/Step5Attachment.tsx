"use client";

import { usePinCustomization } from "@/lib/usePinCustomization";
import { ATTACHMENT_OPTIONS } from "@/lib/pinConfig";
import { OptionCardWithDetail } from "@/components/OptionCardWithDetail";
import { OptionDetailSection } from "@/components/OptionDetailSection";

const TWO_CLUTCH_IDS = new Set(["two_rubber_clutch", "two_deluxe_clutch", "two_military_clutch"]);
const TWO_CLUTCH_MIN_MM = 22;

export function Step5Attachment() {
  const { attachment, setAttachment, sizeWidth, sizeHeight } = usePinCustomization();
  const pinDiaMm = Math.max(sizeWidth || 2.54, sizeHeight || 2.54) * 10;
  const tooSmallForDual = pinDiaMm < TWO_CLUTCH_MIN_MM;

  return (
    <div className="bg-surface-container-lowest p-6 border border-outline-variant/20">
      <h3 className="font-label text-sm font-bold text-primary uppercase tracking-widest mb-1">
        Step 5: Choose Your Attachment
      </h3>
      <p className="text-sm text-on-surface-variant mb-4">
        Different backing attachments to suit different uses
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {ATTACHMENT_OPTIONS.map(({ id, label }) => {
          const isDisabled = tooSmallForDual && TWO_CLUTCH_IDS.has(id);
          return (
            <OptionCardWithDetail
              key={id}
              id={id}
              label={label}
              isSelected={attachment === id}
              onSelect={() => setAttachment(id)}
              optionType="attachment"
              disabled={isDisabled}
              disabledReason={
                isDisabled
                  ? `Pin size too small for dual clutch. Please select a size of ${TWO_CLUTCH_MIN_MM} mm or larger.`
                  : undefined
              }
            />
          );
        })}
      </div>
      <OptionDetailSection optionId={attachment} optionType="attachment" />
    </div>
  );
}
