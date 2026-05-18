"use client";

import { usePinCustomization } from "@/lib/usePinCustomization";
import { buildStepsConfig } from "@/lib/customizerSteps";

interface CustomizerProgressBarProps {
  hideStep1?: boolean;
  totalSteps?: number;
  currentStepIndex: number;
  onStepClick?: (index: number) => void;
}

export function CustomizerProgressBar({
  hideStep1 = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  totalSteps,
  currentStepIndex,
  onStepClick,
}: CustomizerProgressBarProps) {
  const interactive = !!onStepClick;
  const state = usePinCustomization();
  const steps = buildStepsConfig(hideStep1);

  return (
    <div className="flex flex-col gap-2">
      {/* Step indicators with labels - each segment is clickable */}
      <div className="flex gap-1" role="tablist" aria-label="Customization steps">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isPast = index < currentStepIndex;
          const selection = step.getSelectionLabel(state);

          const barClass = `
            w-full h-2 min-h-2 shrink-0 rounded-full transition-all duration-200
            ${isActive ? "bg-primary-blue scale-105" : ""}
            ${isPast ? "bg-primary-blue/60" : ""}
            ${!isActive && !isPast ? "bg-border-blue" : ""}
            ${interactive ? "cursor-pointer hover:opacity-90" : "cursor-default"}
          `;

          const content = (
            <>
              <div className={barClass.trim()} />
              <span
                className={`text-[10px] sm:text-xs font-medium truncate w-full text-center ${
                  isActive ? "text-primary-blue" : isPast ? "text-text-dark/70" : "text-text-dark/50"
                }`}
              >
                {step.shortLabel}
              </span>
            </>
          );

          return (
            <div key={step.id} className="flex flex-1 flex-col items-center gap-1 min-w-0">
              {interactive ? (
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`${step.label}${selection ? `: ${selection}` : ""}`}
                title={`${step.label}${selection ? `: ${selection}` : ""}`}
                onClick={() => onStepClick?.(index)}
                className="flex flex-col items-center gap-1 w-full min-w-0 p-0 bg-transparent border-0 text-left hover:opacity-90 transition-opacity cursor-pointer"
              >
                  {content}
                </button>
              ) : (
                <div
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`${step.label}${selection ? `: ${selection}` : ""}`}
                  className="flex flex-col items-center gap-1 w-full min-w-0"
                >
                  {content}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Current step selection detail */}
      {steps[currentStepIndex]?.getSelectionLabel(state) && (
        <div className="text-sm text-text-dark/70">
          {steps[currentStepIndex]?.label}: {steps[currentStepIndex]?.getSelectionLabel(state)}
        </div>
      )}
    </div>
  );
}
