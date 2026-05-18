"use client";

import { PlaceholderOptionModel } from "../PlaceholderOptionModel";

export function PlatingPlaceholder({ optionId }: { optionId: string }) {
  return <PlaceholderOptionModel optionId={optionId} optionType="plating" />;
}
