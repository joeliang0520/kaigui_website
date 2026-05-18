"use client";

import { PlaceholderOptionModel } from "../PlaceholderOptionModel";

export function PackagingPlaceholder({ optionId }: { optionId: string }) {
  return <PlaceholderOptionModel optionId={optionId} optionType="packaging" />;
}
