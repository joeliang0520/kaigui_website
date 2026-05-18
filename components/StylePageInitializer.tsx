"use client";

import { useEffect } from "react";
import { usePinCustomization } from "@/lib/usePinCustomization";
import type { PinStyle } from "@/lib/pinConfig";

export function StylePageInitializer({ style }: { style: PinStyle }) {
  const setStyle = usePinCustomization((s) => s.setStyle);

  useEffect(() => {
    setStyle(style);
  }, [style, setStyle]);

  return null;
}
