"use client";

import { createContext, useContext } from "react";
import type { OptionDetail, OptionDetailsMap } from "./loadOptionDetails";

type OptionType = "plating" | "effects" | "attachment" | "backSide" | "packaging";

const OptionDetailsContext = createContext<OptionDetailsMap | null>(null);

export function OptionDetailsProvider({
  children,
  details,
}: {
  children: React.ReactNode;
  details: OptionDetailsMap | null | undefined;
}) {
  return (
    <OptionDetailsContext.Provider value={details ?? null}>
      {children}
    </OptionDetailsContext.Provider>
  );
}

export function useOptionDetail(
  optionType: OptionType,
  optionId: string
): OptionDetail {
  const ctx = useContext(OptionDetailsContext);
  if (!ctx) {
    return {
      name: optionId.replace(/_/g, " "),
      description: "Placeholder description.",
    };
  }
  return (
    ctx[optionType]?.[optionId] ?? {
      name: optionId.replace(/_/g, " "),
      description: "Placeholder description.",
    }
  );
}
