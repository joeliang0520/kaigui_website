"use client";

import { useState } from "react";
import { useOptionDetail } from "@/lib/OptionDetailsContext";

type OptionType = "plating" | "effects" | "attachment" | "backSide" | "packaging";

interface OptionDetailSectionProps {
  optionId: string;
  optionType: OptionType;
  compact?: boolean;
  dark?: boolean;
}

const IMAGE_FILENAME_MAP: Partial<Record<string, string>> = {
  thin_poly_bag: "thin_ploy_bag",
  thick_poly_bag: "thick_ploy_bag",
};

const MULTI_IMAGE_MAP: Partial<Record<string, { file: string; label: string }[]>> = {
  backcard: [
    { file: "backcard_front", label: "Front" },
    { file: "backcard_back", label: "Back" },
  ],
};

function SingleImage({
  src,
  alt,
  optionType,
  optionId,
}: {
  src: string;
  alt: string;
  optionType: string;
  optionId: string;
}) {
  const [srcIndex, setSrcIndex] = useState(0);
  const srcs = [`${src}.png`, `${src}.jpg`, `${src}.JPG`, `${src}.PNG`];
  const showPlaceholder = srcIndex >= srcs.length;

  return showPlaceholder ? (
    <div className="w-full aspect-square min-h-[120px] overflow-hidden bg-surface-container-low border border-outline-variant/20 border-dashed flex items-center justify-center">
      <div className="text-center p-3 text-xs text-on-surface-variant">
        <p className="font-label font-bold mb-1">Real-world photo</p>
        <p className="text-[10px]">
          Add image to: <code>public/option-images/{optionType}/{optionId}.png</code>
        </p>
      </div>
    </div>
  ) : (
    <div className="relative w-full aspect-square min-h-[120px] overflow-hidden bg-surface-container-low border border-outline-variant/20">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={srcs[srcIndex]}
        alt={alt}
        className="w-full h-full object-contain"
        onError={() => setSrcIndex((i) => i + 1)}
      />
    </div>
  );
}

function OptionRealWorldImages({
  optionId,
  optionType,
}: {
  optionId: string;
  optionType: OptionType;
}) {
  const multiImages = MULTI_IMAGE_MAP[optionId];
  const fileBase = IMAGE_FILENAME_MAP[optionId] ?? optionId;
  const basePath = `/option-images/${optionType}`;

  if (multiImages) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {multiImages.map(({ file, label }) => (
          <div key={file}>
            <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-1 text-center">
              {label}
            </p>
            <SingleImage
              src={`${basePath}/${file}`}
              alt={`${optionId} – ${label}`}
              optionType={optionType}
              optionId={optionId}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <SingleImage
      src={`${basePath}/${fileBase}`}
      alt={`Real-world example of ${optionId}`}
      optionType={optionType}
      optionId={optionId}
    />
  );
}

export function OptionDetailSection({ optionId, optionType, compact, dark }: OptionDetailSectionProps) {
  const detail = useOptionDetail(optionType, optionId);

  return (
    <div
      className={compact ? "" : "mt-6 pt-6 border-t"}
      style={!compact ? { borderColor: dark ? "rgba(77,70,53,0.3)" : "rgba(198,198,204,0.3)" } : undefined}
    >
      {!compact && (
        <h4
          className="font-label text-xs font-bold uppercase tracking-widest mb-2"
          style={{ color: dark ? "#d4af37" : "#030612" }}
        >
          {detail.name}
        </h4>
      )}
      <p
        className="font-body text-sm leading-relaxed mb-4"
        style={{ color: dark ? "rgba(208,197,175,0.85)" : "#45464c" }}
      >
        {detail.detailDescription ?? detail.description}
      </p>
      <p
        className="font-label text-[10px] uppercase tracking-widest font-bold mb-2"
        style={{ color: dark ? "#99907c" : "#76777c" }}
      >
        Real-world example
      </p>
      <OptionRealWorldImages optionId={optionId} optionType={optionType} />
    </div>
  );
}
