"use client";

import { usePinCustomization } from "@/lib/usePinCustomization";
import {
  PIN_STYLES,
  SIZES_CM,
  PLATING_OPTIONS,
  EFFECT_OPTIONS,
  ATTACHMENT_OPTIONS,
  BACK_SIDE_OPTIONS,
  PACKAGING_OPTIONS,
  PIN_SHAPES,
} from "@/lib/pinConfig";

export function Step8Approve() {
  const {
    imageUrl,
    designName,
    style,
    shape,
    sizeWidth,
    sizeHeight,
    plating,
    effects,
    attachment,
    backSide,
    packaging,
    setApproved,
  } = usePinCustomization();

  const styleLabel = PIN_STYLES.find((s) => s.id === style)?.label ?? style;
  const displayName = designName || `Custom ${styleLabel}`;
  const shapeLabel = PIN_SHAPES.find((s) => s.id === shape)?.label ?? shape;
  const isSingleDim = shape === "square" || shape === "circle";
  const sizeLabel = isSingleDim
    ? SIZES_CM.find((s) => Math.abs(s.value - sizeWidth) < 0.01)?.label ??
      `${Math.round((sizeWidth || 2.54) * 10) / 10} cm`
    : `${Math.round((sizeWidth || 2.54) * 10) / 10} × ${Math.round((sizeHeight || 2.54) * 10) / 10} cm`;
  const platingLabel = PLATING_OPTIONS.find((p) => p.id === plating)?.label ?? plating;
  const attachmentLabel = ATTACHMENT_OPTIONS.find((a) => a.id === attachment)?.label ?? attachment;
  const backSideLabel = BACK_SIDE_OPTIONS.find((b) => b.id === backSide)?.label ?? backSide;
  const packagingLabel = PACKAGING_OPTIONS.find((p) => p.id === packaging)?.label ?? packaging;

  return (
    <div className="bg-surface-container-lowest p-6 border border-outline-variant/20">
      <h3 className="font-label text-sm font-bold text-primary uppercase tracking-widest mb-1">
        Step 8: Approve the Artwork and Start Production
      </h3>
      <p className="text-sm text-on-surface-variant mb-6">
        Review your choices below. Once confirmed, we will prepare the final artwork for your
        approval and move forward with sampling and mass production.
      </p>

      <div className="space-y-2 mb-8 border border-outline-variant/20 p-5 bg-surface-container-low">
        <div className="flex gap-4 items-start mb-4">
          {imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt="Your design"
              className="w-20 h-20 object-contain border border-outline-variant/20 shrink-0"
            />
          )}
          <div className="flex-1 space-y-2 font-body text-sm">
            {[
              { label: "Design name", value: displayName },
              { label: "Style", value: styleLabel },
              { label: "Shape", value: shapeLabel },
              { label: "Size", value: sizeLabel },
              { label: "Plating", value: platingLabel },
              ...(effects.length > 0
                ? [
                    {
                      label: "Effects",
                      value: effects
                        .map((e) => EFFECT_OPTIONS.find((o) => o.id === e)?.label ?? e)
                        .join(", "),
                    },
                  ]
                : []),
              { label: "Attachment", value: attachmentLabel },
              { label: "Back side", value: backSideLabel },
              { label: "Packaging", value: packagingLabel },
            ].map(({ label, value }) => (
              <p key={label}>
                <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                  {label}:
                </span>{" "}
                <span className="text-on-surface font-medium">{value}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setApproved(true)}
        className="w-full py-4 bg-primary text-on-primary font-label text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-opacity"
      >
        Approve and Start Production
      </button>
    </div>
  );
}
