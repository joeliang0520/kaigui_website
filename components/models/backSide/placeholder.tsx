"use client";

import { PlaceholderOptionModel } from "../PlaceholderOptionModel";

export function BackSidePlaceholder({ optionId }: { optionId: string }) {
  return <PlaceholderOptionModel optionId={optionId} optionType="backSide" />;
}
