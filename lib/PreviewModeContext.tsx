"use client";

import { createContext, useContext } from "react";

export type PreviewMode = "2d" | "3d";

const PreviewModeContext = createContext<PreviewMode>("3d");

export function PreviewModeProvider({
  mode,
  children,
}: {
  mode: PreviewMode;
  children: React.ReactNode;
}) {
  return (
    <PreviewModeContext.Provider value={mode}>
      {children}
    </PreviewModeContext.Provider>
  );
}

export function usePreviewMode(): PreviewMode {
  return useContext(PreviewModeContext);
}
