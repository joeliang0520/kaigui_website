"use client";

import { PlaceholderOptionModel } from "../PlaceholderOptionModel";

export function AttachmentPlaceholder({ optionId }: { optionId: string }) {
  return <PlaceholderOptionModel optionId={optionId} optionType="attachment" />;
}
