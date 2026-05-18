"use client";

import { usePinCustomization } from "@/lib/usePinCustomization";
import { OptionDetailSection } from "@/components/OptionDetailSection";

const EFFECTS = [
  {
    id: "glow",
    label: "Glow in the Dark",
    color: "#7DD3FC",
    gradient: "from-blue-100 to-cyan-100",
    border: "border-cyan-300",
    selectedBorder: "border-cyan-500",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 3v1m0 16v1M4.22 4.22l.707.707m12.728 12.728.707.707M3 12h1m16 0h1M4.927 19.073l.707-.707M18.366 5.634l.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" />
      </svg>
    ),
  },
  {
    id: "glitter",
    label: "Glitter Color",
    color: "#FDE68A",
    gradient: "from-yellow-50 to-amber-100",
    border: "border-amber-300",
    selectedBorder: "border-amber-500",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
  },
  {
    id: "rhinestones",
    label: "Rhinestones",
    color: "#E0E7FF",
    gradient: "from-indigo-50 to-purple-100",
    border: "border-indigo-300",
    selectedBorder: "border-indigo-500",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 2L8 8H2l4.5 4.5L5 18l7-3.5 7 3.5-1.5-5.5L22 8h-6L12 2z" />
      </svg>
    ),
  },
  {
    id: "transparent",
    label: "Transparent Color",
    color: "#BAE6FD",
    gradient: "from-sky-50 to-teal-50",
    border: "border-teal-300",
    selectedBorder: "border-teal-500",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="9" strokeDasharray="3 2" />
        <circle cx="12" cy="12" r="5" />
      </svg>
    ),
  },
  {
    id: "pearlescent",
    label: "Pearlescent Color",
    color: "#FCE7F3",
    gradient: "from-pink-50 to-rose-100",
    border: "border-rose-300",
    selectedBorder: "border-rose-500",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" d="M8 12 Q10 8 12 12 Q14 16 16 12" />
      </svg>
    ),
  },
] as const;

function EffectDetailCard({ id }: { id: string }) {
  const effect = EFFECTS.find((e) => e.id === id);
  return (
    <div className={`rounded-sm border-2 bg-gradient-to-br ${effect?.gradient ?? "from-gray-50 to-gray-100"} ${effect?.selectedBorder ?? "border-gray-200"} overflow-hidden`}>
      {/* Coloured header strip */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-2">
        <span className="text-on-surface-variant">{effect?.icon}</span>
        <span className="text-sm font-semibold text-on-surface">{effect?.label}</span>
      </div>
      {/* OptionDetailSection but inside the card — we reset its top border visually */}
      <div className="px-4 pb-4">
        <OptionDetailSection optionId={id} optionType="effects" compact />
      </div>
    </div>
  );
}

export function Step4Effects() {
  const { effects, toggleEffect } = usePinCustomization();

  return (
    <div className="bg-surface-container-lowest p-6 border border-outline-variant/20">
      <h3 className="font-label text-sm font-bold text-primary uppercase tracking-widest mb-1">
        Step 4: Add Special Effects
      </h3>
      <p className="text-sm text-on-surface-variant mb-1">
        Enhance your pin with extra details and decorative options
      </p>
      <p className="text-xs text-on-surface-variant/70 mb-5">
        You can select multiple effects — or skip this step if you don&apos;t need any.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {EFFECTS.map(({ id, label, gradient, border, selectedBorder, icon, color }) => {
          const selected = effects.includes(id);
          return (
            <button
              key={id}
              type="button"
              onClick={() => toggleEffect(id)}
              className={`
                relative text-left rounded-sm border-2 p-4 transition-all
                bg-gradient-to-br ${gradient}
                ${selected
                  ? `${selectedBorder} shadow-md ring-1 ring-offset-1 ring-secondary/20`
                  : `${border} hover:shadow-sm hover:scale-[1.01]`}
              `}
            >
              {/* Selected checkmark */}
              {selected && (
                <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}

              {/* Color swatch + icon */}
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-8 h-8 rounded-full border border-white/60 shadow-sm flex-shrink-0"
                  style={{ background: color }}
                />
                <span className="text-on-surface-variant">{icon}</span>
              </div>

              <p className="text-sm font-label text-xs uppercase tracking-wider text-on-surface font-bold leading-tight">{label}</p>
            </button>
          );
        })}
      </div>

      {/* Counter badge */}
      {effects.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-secondary font-medium">
            {effects.length} effect{effects.length > 1 ? "s" : ""} selected
          </p>
          <button
            type="button"
            onClick={() => [...effects].forEach((e) => toggleEffect(e))}
            className="text-xs text-on-surface-variant/70 hover:text-red-500 underline transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Detail cards for every selected effect */}
      {effects.length > 0 && (
        <div className="mt-5 pt-5 border-t border-outline-variant/20 space-y-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary font-bold mb-3">Selected Effects</p>
          {effects.map((id) => (
            <EffectDetailCard key={id} id={id} />
          ))}
        </div>
      )}
    </div>
  );
}
