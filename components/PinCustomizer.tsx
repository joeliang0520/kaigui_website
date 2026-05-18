"use client";

import { useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ImageUploader } from "./ImageUploader";
import { ModelUploader } from "./ModelUploader";
import { OptionDetailsProvider } from "@/lib/OptionDetailsContext";
import { Step1Style } from "./CustomizationSteps/Step1Style";
import { Step2Size } from "./CustomizationSteps/Step2Size";
import { Step3Plating } from "./CustomizationSteps/Step3Plating";
import { Step4Effects } from "./CustomizationSteps/Step4Effects";
import { Step5Attachment } from "./CustomizationSteps/Step5Attachment";
import { Step6BackSide } from "./CustomizationSteps/Step6BackSide";
import { Step7Packaging } from "./CustomizationSteps/Step7Packaging";
import { Step8Approve } from "./CustomizationSteps/Step8Approve";
import { usePinCustomization } from "@/lib/usePinCustomization";
import type { PinStyle } from "@/lib/pinConfig";
import { Pin3DViewerWithMeasurements } from "./Pin3DViewerWithMeasurements";
import { PinPreviewSwitcher } from "./PinPreviewSwitcher";
import { SelectionSummary } from "./SelectionSummary";
import { CustomizerProgressBar } from "./CustomizerProgressBar";
import { buildStepsConfig } from "@/lib/customizerSteps";

interface PinCustomizerProps {
  style?: PinStyle;
  styleLabel?: string;
  hideStep1?: boolean;
  optionDetails?: import("@/lib/loadOptionDetails").OptionDetailsMap;
}

export function PinCustomizer({ style, styleLabel, hideStep1 = false, optionDetails }: PinCustomizerProps) {
  const { approved, currentStepIndex, setCurrentStepIndex, designName, setDesignName } = usePinCustomization();
  const steps = buildStepsConfig(hideStep1);
  const totalSteps = steps.length;
  const designNameInputRef = useRef<HTMLInputElement>(null);

  // Reset to step 0 when entering the customizer (Zustand persists across navigations)
  useEffect(() => {
    setCurrentStepIndex(0);
  }, [setCurrentStepIndex]);

  const goToStep = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, totalSteps - 1));
    setCurrentStepIndex(clamped);
  }, [totalSteps, setCurrentStepIndex]);

  const handleNext = useCallback(() => {
    goToStep(currentStepIndex + 1);
  }, [currentStepIndex, goToStep]);

  const handlePrev = useCallback(() => {
    goToStep(currentStepIndex - 1);
  }, [currentStepIndex, goToStep]);

  return (
    <OptionDetailsProvider details={optionDetails ?? { plating: {}, effects: {}, attachment: {}, backSide: {}, packaging: {} }}>
      <div className="min-h-screen bg-soft-blue-alt flex flex-col">
        <header className="sticky top-0 z-20 bg-white border-b border-border-light py-4 shrink-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Link href="/" className="text-sm text-primary-blue hover:underline mb-2 inline-block">
              ← Back to pin styles
            </Link>
            <div className="flex items-center gap-2">
              <input
                ref={designNameInputRef}
                type="text"
                value={designName ?? ""}
                onChange={(e) => setDesignName(e.target.value)}
                placeholder={styleLabel ? `e.g. Custom ${styleLabel}` : "Name your design"}
                title="Click to edit design name"
                className="flex-1 text-2xl sm:text-3xl font-bold text-primary-blue bg-transparent border-b-2 border-transparent hover:border-border-light focus:border-primary-blue focus:outline-none py-1 transition-colors placeholder:text-text-dark/40"
              />
              <button
                type="button"
                onClick={() => designNameInputRef.current?.focus()}
                className="flex-shrink-0 p-1 rounded-lg text-primary-blue/60 hover:text-primary-blue hover:bg-primary-blue/10 transition-colors"
                title="Click to edit design name"
                aria-label="Edit design name"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
            <p className="mt-1 text-text-dark/70 text-sm">
              {styleLabel ? `Design your ${styleLabel.toLowerCase()}` : "Follow these steps to design your perfect pin"}
            </p>
            <div className="mt-4">
              <CustomizerProgressBar
                hideStep1={hideStep1}
                totalSteps={totalSteps}
                currentStepIndex={currentStepIndex}
                onStepClick={goToStep}
              />
            </div>
          </div>
        </header>

        <div className="flex-1 flex min-h-0 overflow-hidden">
          {/* Left: current step content (fixed page, no scroll) */}
          <div className="flex-1 overflow-y-auto min-w-0">
            {approved && (
              <div className="min-h-[50vh] flex items-center justify-center px-4 py-8">
                <div className="rounded-xl bg-primary-blue/10 border border-primary-blue p-6 max-w-md text-center">
                  <p className="font-semibold text-primary-blue">
                    Thank you! Your design has been submitted. We will prepare the final artwork and contact you for approval.
                  </p>
                </div>
              </div>
            )}

            {!approved && (
              <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8">
                {currentStepIndex === 0 && (
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-border-light space-y-6">
                    <h2 className="text-lg font-semibold text-text-dark mb-4">Upload Your Design</h2>
                    <div>
                      <h3 className="text-sm font-medium text-text-dark mb-2">Design image</h3>
                      <ImageUploader />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-text-dark mb-2">Your 3D model (optional)</h3>
                      <ModelUploader />
                    </div>
                  </div>
                )}
                {currentStepIndex === 1 && !hideStep1 && <Step1Style />}
                {currentStepIndex === (hideStep1 ? 1 : 2) && <Step2Size />}
                {currentStepIndex === (hideStep1 ? 2 : 3) && <Step3Plating />}
                {currentStepIndex === (hideStep1 ? 3 : 4) && <Step4Effects />}
                {currentStepIndex === (hideStep1 ? 4 : 5) && <Step5Attachment />}
                {currentStepIndex === (hideStep1 ? 5 : 6) && <Step6BackSide />}
                {currentStepIndex === (hideStep1 ? 6 : 7) && <Step7Packaging />}
                {currentStepIndex === (hideStep1 ? 7 : 8) && <Step8Approve />}
              </div>
            )}
          </div>

          {/* Right: fixed panel - Pin preview & SelectionSummary (isolated from scroll) */}
          {!approved && (
            <aside className="hidden lg:block lg:w-[320px] shrink-0 border-l border-border-light bg-soft-blue/50">
              <div className="sticky top-24 p-4 space-y-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <div className="bg-soft-blue rounded-xl p-4 border border-border-blue">
                  <h2 className="text-sm font-semibold text-text-dark mb-3">Pin Preview</h2>
                  <Pin3DViewerWithMeasurements compact>
                    <PinPreviewSwitcher style={style} />
                  </Pin3DViewerWithMeasurements>
                </div>
                <SelectionSummary />
              </div>
            </aside>
          )}
        </div>

        {!approved && (
          <div className="sticky bottom-0 z-10 bg-white/95 backdrop-blur border-t border-border-light py-4 shrink-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                className="min-h-[44px] px-6 rounded-lg border-2 border-primary-blue text-primary-blue font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-blue/10 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              <span className="text-sm text-text-dark/70">
                Step {currentStepIndex + 1} of {totalSteps}
              </span>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentStepIndex >= totalSteps - 1}
                className="min-h-[44px] px-6 rounded-lg bg-primary-blue text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-blue-dark transition-colors flex items-center gap-2"
              >
                Next
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </OptionDetailsProvider>
  );
}
