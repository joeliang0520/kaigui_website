"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { PinStyle } from "@/lib/pinConfig";

const Pin2DPreview = dynamic(
  () => import("./Pin2DPreview").then((m) => ({ default: m.Pin2DPreview })),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 min-h-[200px] rounded-lg bg-soft-blue border border-border-blue flex items-center justify-center">
        <p className="text-text-dark/70 text-xs">Loading...</p>
      </div>
    ),
  }
);

const Pin3DViewer = dynamic(
  () => import("./Pin3DViewer").then((m) => ({ default: m.Pin3DViewer })),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-square w-full min-h-[200px] rounded-lg bg-soft-blue border border-border-blue flex items-center justify-center">
        <p className="text-text-dark/70 text-xs">Loading 3D...</p>
      </div>
    ),
  }
);

type PreviewMode = "2d" | "3d";

interface PinPreviewSwitcherProps {
  style?: PinStyle;
}

export function PinPreviewSwitcher({ style }: PinPreviewSwitcherProps) {
  const [mode, setMode] = useState<PreviewMode>("2d");

  return (
    <div className="w-full h-full flex flex-col gap-2 min-h-0">
      <div
        className="flex gap-1 p-1 rounded-lg bg-soft-blue-alt border border-border-blue shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setMode("2d");
          }}
          className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-colors ${
            mode === "2d"
              ? "bg-primary-blue text-white"
              : "text-text-dark/70 hover:text-text-dark hover:bg-white/50"
          }`}
        >
          2D
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setMode("3d");
          }}
          className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-colors ${
            mode === "3d"
              ? "bg-primary-blue text-white"
              : "text-text-dark/70 hover:text-text-dark hover:bg-white/50"
          }`}
        >
          3D
        </button>
      </div>
      <div
        className="flex-1 min-h-0 flex rounded-lg overflow-hidden border border-border-blue bg-soft-blue"
        onClick={(e) => e.stopPropagation()}
      >
        {mode === "2d" ? <Pin2DPreview style={style} /> : <Pin3DViewer style={style} />}
      </div>
    </div>
  );
}
