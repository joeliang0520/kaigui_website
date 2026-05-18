"use client";

import { PlaceholderOptionModel } from "../PlaceholderOptionModel";

export function EffectsPlaceholder({ optionId }: { optionId: string }) {
  return <PlaceholderOptionModel optionId={optionId} optionType="effects" />;
}
