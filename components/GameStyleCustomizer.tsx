"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePinCustomization } from "@/lib/usePinCustomization";
import { OptionDetailsProvider } from "@/lib/OptionDetailsContext";
import { OptionCardWithDetail } from "@/components/OptionCardWithDetail";
import { OptionDetailSection } from "@/components/OptionDetailSection";
import { Pin3DViewer } from "./Pin3DViewer";
import { PinCadView } from "./PinCadView";
import { ImageUploader } from "./ImageUploader";
import { Step2Size } from "./CustomizationSteps/Step2Size";
import { Step4Effects } from "./CustomizationSteps/Step4Effects";
import { Step5Attachment } from "./CustomizationSteps/Step5Attachment";
import { Step6BackSide } from "./CustomizationSteps/Step6BackSide";
import { Step7Packaging } from "./CustomizationSteps/Step7Packaging";
import { PLATING_OPTIONS, PART_LABELS } from "@/lib/pinConfig";
import type { PinStyle, PinPart } from "@/lib/pinConfig";
import type { OptionDetailsMap } from "@/lib/loadOptionDetails";

// ─── Step configuration ────────────────────────────────────────────────────────

type GameStep = "size" | "material" | "effects" | "backside" | "attachment" | "packaging";

const GAME_STEPS: { id: GameStep; num: number; label: string; shortLabel: string }[] = [
  { id: "size",       num: 1, label: "Shape & Size",  shortLabel: "1. Shape & Size" },
  { id: "material",   num: 2, label: "Material",      shortLabel: "2. Material" },
  { id: "effects",    num: 3, label: "Effects",        shortLabel: "3. Effects" },
  { id: "backside",   num: 4, label: "Back Side",      shortLabel: "4. Back Side" },
  { id: "attachment", num: 5, label: "Attachment",     shortLabel: "5. Attachment" },
  { id: "packaging",  num: 6, label: "Packaging",      shortLabel: "6. Packaging" },
];

const STEP_DESCRIPTIONS: Record<GameStep, string> = {
  size:       "Choose the shape and dimensions of your pin.",
  material:   "Select the metal finish. Click a part in the 3D view to target it.",
  effects:    "Add optional decorative effects to your pin.",
  backside:   "Customize the reverse face of your pin.",
  attachment: "Choose how your pin fastens. Rotate the 3D model to see it.",
  packaging:  "Select how your order will be packaged.",
};

function partToStep(part: PinPart): GameStep {
  if (part === "attachment") return "attachment";
  return "material";
}

// ─── Material step (light theme) ──────────────────────────────────────────────

function GameMaterialStep() {
  const { plating, setPlating } = usePinCustomization();
  return (
    <div>
      <p className="font-label text-xs text-on-surface-variant mb-4 leading-relaxed">
        Choose the metal finish for your pin. Hover an option for details.
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

// ─── Step tab bar ──────────────────────────────────────────────────────────────

function StepTabBar({
  active,
  onSelect,
}: {
  active: GameStep;
  onSelect: (s: GameStep) => void;
}) {
  return (
    <div className="flex gap-0 mb-10 overflow-x-auto border-b border-outline-variant/20 no-scrollbar">
      {GAME_STEPS.map(({ id, shortLabel }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className={`flex-shrink-0 font-label text-[10px] uppercase tracking-widest px-4 py-3 transition-colors border-b-2 ${
              isActive
                ? "border-secondary text-secondary font-bold"
                : "border-transparent text-on-surface-variant hover:text-primary"
            }`}
          >
            {shortLabel}
          </button>
        );
      })}
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

interface GameStyleCustomizerProps {
  style?: PinStyle;
  styleLabel?: string;
  optionDetails?: OptionDetailsMap;
}

export function GameStyleCustomizer({ style, styleLabel, optionDetails }: GameStyleCustomizerProps) {
  const { selectedPart, setSelectedPart, attachment, magnetDiameter, setMagnetDiameter, sizeWidth, sizeHeight } =
    usePinCustomization();

  const isMagnet = attachment === "magnet_back" || attachment === "two_magnet_back";
  const pinDiaMm = Math.max(sizeWidth || 2.54, sizeHeight || 2.54) * 10;
  const magnetMin = Math.round(Math.max(6, pinDiaMm * 0.2));
  const magnetMax = Math.round(pinDiaMm * 0.8);
  const [activeStep, setActiveStep] = useState<GameStep>("size");
  const [showHint, setShowHint] = useState(true);
  const [viewMode, setViewMode] = useState<"3d" | "2d">("3d");

  useEffect(() => {
    if (selectedPart === null) return;
    const step = partToStep(selectedPart);
    setActiveStep(step);
    setShowHint(false);
  }, [selectedPart]);

  const handleStepSelect = (step: GameStep) => {
    setActiveStep(step);
    if (step !== "material" && step !== "attachment") {
      setSelectedPart(null);
    }
  };

  const activeIdx = GAME_STEPS.findIndex((s) => s.id === activeStep);
  const widthIn = (sizeWidth * 0.393701).toFixed(2);
  const widthMm = (sizeWidth * 10).toFixed(1);

  return (
    <OptionDetailsProvider
      details={optionDetails ?? { plating: {}, effects: {}, attachment: {}, backSide: {}, packaging: {} }}
    >
      {/* ── Top Nav ── */}
      <nav className="bg-background border-b border-outline-variant/10 flex justify-between items-center px-12 py-5 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="font-label text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
          >
            ← All Styles
          </Link>
          {styleLabel && (
            <>
              <span className="text-outline-variant">/</span>
              <span className="font-label text-sm font-semibold text-secondary uppercase tracking-tight">
                {styleLabel}
              </span>
            </>
          )}
        </div>

        {/* 3D / 2D toggle */}
        <div className="flex items-center p-1 gap-0 bg-surface-container-lowest border border-outline-variant/15 rounded-sm">
          {(["3d", "2d"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setViewMode(m)}
              className={`px-4 py-1.5 font-label text-xs font-bold uppercase tracking-widest transition-all ${
                viewMode === m
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {m === "3d" ? "3D VIEW" : "2D FLAT"}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Main layout ── */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-65px)]">

        {/* ── LEFT: Viewer ── */}
        <section className="relative lg:w-[58%] lg:sticky lg:top-[65px] lg:h-[calc(100vh-65px)] flex flex-col bg-surface-container-low">

          {/* Magnet size slider */}
          {isMagnet && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-3 shadow-md w-[260px] bg-surface-container-lowest/90 backdrop-blur border border-outline-variant/15 rounded-sm">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-label text-xs text-on-surface">Magnet Size</span>
                <span className="font-label text-xs font-semibold text-secondary">{magnetDiameter} mm</span>
              </div>
              <input
                type="range"
                min={magnetMin}
                max={magnetMax}
                value={Math.min(Math.max(magnetDiameter, magnetMin), magnetMax)}
                onChange={(e) => setMagnetDiameter(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: "#775a19" }}
              />
              <div className="flex justify-between text-[10px] mt-0.5 font-label text-on-surface-variant">
                <span>{magnetMin} mm</span>
                <span>{magnetMax} mm</span>
              </div>
            </div>
          )}

          {/* Viewer area */}
          <div className="flex-1 relative min-h-[400px] lg:min-h-0 flex items-center justify-center p-8">
            {viewMode === "3d" ? (
              <>
                <Pin3DViewer style={style} />

                {/* Hint pill */}
                {showHint && (
                  <div className="absolute bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 shadow-sm pointer-events-none whitespace-nowrap bg-surface-container-lowest/80 backdrop-blur border border-outline-variant/10 rounded-full">
                    <p className="font-label text-[10px] text-on-surface-variant">
                      ✦ Click any part of the pin to jump to its step
                    </p>
                  </div>
                )}

                {/* Part badge */}
                {selectedPart && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 font-label text-xs font-medium px-4 py-1.5 shadow pointer-events-none bg-secondary text-on-secondary rounded-full">
                    {selectedPart === "attachment"
                      ? `Attachment → Step ${GAME_STEPS.find((s) => s.id === "attachment")?.num}`
                      : `${PART_LABELS[selectedPart as PinPart]} → Step ${GAME_STEPS.find((s) => s.id === "material")?.num}`}
                  </div>
                )}

                {/* Zoom / rotate controls */}
                <div className="absolute bottom-20 right-8 flex flex-col gap-2">
                  <button className="w-10 h-10 bg-surface-container-lowest flex items-center justify-center border border-outline-variant/15 hover:bg-surface-container-high transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: 18 }}>zoom_in</span>
                  </button>
                  <button className="w-10 h-10 bg-surface-container-lowest flex items-center justify-center border border-outline-variant/15 hover:bg-surface-container-high transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: 18 }}>zoom_out</span>
                  </button>
                  <button className="w-10 h-10 bg-surface-container-lowest flex items-center justify-center border border-outline-variant/15 hover:bg-surface-container-high transition-colors shadow-sm mt-2">
                    <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: 18 }}>sync</span>
                  </button>
                </div>
              </>
            ) : (
              <PinCadView />
            )}
          </div>

          {/* Scale reference footer */}
          <div className="shrink-0 px-8 py-5 flex justify-between items-end border-t border-outline-variant/10">
            <div className="flex items-center gap-6 bg-surface-container-lowest/60 backdrop-blur-sm px-4 py-3 border border-outline-variant/10">
              <div className="text-center">
                <p className="font-label text-[10px] uppercase tracking-tighter text-outline mb-2">Scale Reference</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center border border-secondary/20">
                    <span className="font-label text-[10px] font-bold text-secondary">USD</span>
                  </div>
                  <div className="h-px w-10 bg-outline-variant/30" />
                  <div className="w-10 h-10 rounded-full border-2 border-dashed border-secondary/40 flex items-center justify-center">
                    <span className="font-label text-[8px] text-secondary/60">YOUR PIN</span>
                  </div>
                </div>
              </div>
              <div className="h-10 w-px bg-outline-variant/20" />
              <div className="font-label text-xs">
                <span className="block text-on-surface-variant">Current Diameter</span>
                <span className="block font-bold text-primary">{widthIn}&quot; / {widthMm}mm</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest/80 backdrop-blur px-4 py-2 border border-outline-variant/15 font-label text-[10px] text-outline uppercase tracking-widest">
              MATERIAL HONESTY: DIRECT-TO-FACTORY
            </div>
          </div>

          {/* Upload strip */}
          <div className="px-8 py-4 shrink-0 border-t border-outline-variant/10 bg-surface-container-lowest">
            <p className="font-label text-[10px] font-bold uppercase tracking-widest mb-3 text-outline">
              Upload Your Design
            </p>
            <ImageUploader />
          </div>
        </section>

        {/* ── RIGHT: Control Panel ── */}
        <section className="lg:w-[42%] flex flex-col bg-surface-container-lowest border-l border-outline-variant/10 overflow-y-auto max-h-screen"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#e3e2e0 transparent" }}
        >
          <div className="p-10">
            {/* Atelier Header */}
            <header className="mb-10">
              <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary font-semibold">
                Customization Atelier
              </span>
              <h1 className="font-headline text-4xl mt-2 text-primary">Pin Configuration</h1>
              <p className="text-on-surface-variant font-body text-sm mt-4 leading-relaxed max-w-md">
                Calibrate your design with precision-grade materials and finishes. Every element is
                crafted to your exact technical specifications.
              </p>
            </header>

            {/* Step tab bar */}
            <StepTabBar active={activeStep} onSelect={handleStepSelect} />

            {/* Step heading */}
            <div className="mb-8">
              <h2 className="font-headline text-2xl text-primary">
                {GAME_STEPS.find((s) => s.id === activeStep)?.label}
              </h2>
              <p className="font-label text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                {STEP_DESCRIPTIONS[activeStep]}
              </p>
            </div>

            {/* Step content */}
            <div className="space-y-5 mb-10">
              {activeStep === "size"       && <Step2Size />}
              {activeStep === "material"   && <GameMaterialStep />}
              {activeStep === "effects"    && <Step4Effects />}
              {activeStep === "backside"   && <Step6BackSide />}
              {activeStep === "attachment" && <Step5Attachment />}
              {activeStep === "packaging"  && <Step7Packaging />}
            </div>

            {/* Navigation footer */}
            <div className="pt-8 flex items-center justify-between border-t border-outline-variant/10">
              <div className="space-y-0.5">
                <span className="font-label text-[10px] uppercase tracking-widest text-outline block">
                  ESTIMATED PRODUCTION
                </span>
                <span className="font-headline text-sm font-bold text-primary italic block">
                  12-14 Business Days
                </span>
              </div>
              <div className="flex gap-3">
                {activeIdx > 0 && (
                  <button
                    type="button"
                    onClick={() => handleStepSelect(GAME_STEPS[activeIdx - 1].id)}
                    className="px-6 py-3 bg-surface-container-low font-label text-xs uppercase tracking-widest font-bold hover:bg-surface-container-high transition-colors text-primary"
                  >
                    ← Previous
                  </button>
                )}
                {activeIdx < GAME_STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => handleStepSelect(GAME_STEPS[activeIdx + 1].id)}
                    className="px-8 py-3 bg-primary text-on-primary font-label text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-opacity"
                  >
                    Proceed to {GAME_STEPS[activeIdx + 1].label} →
                  </button>
                ) : (
                  <button
                    type="button"
                    className="px-8 py-3 bg-secondary text-on-secondary font-label text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-opacity"
                  >
                    Confirm &amp; Quote →
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </OptionDetailsProvider>
  );
}
