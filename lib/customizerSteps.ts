"use client";

import type { PinCustomization } from "./usePinCustomization";
import {
  PIN_STYLES,
  SIZES_CM,
  RECTANGLE_PRESETS,
  PLATING_OPTIONS,
  EFFECT_OPTIONS,
  ATTACHMENT_OPTIONS,
  BACK_SIDE_OPTIONS,
  PACKAGING_OPTIONS,
} from "./pinConfig";

export interface StepConfig {
  id: string;
  label: string;
  shortLabel: string;
  getSelectionLabel: (state: PinCustomization) => string | null;
}

export function getStepSelectionLabel(stepId: string, state: PinCustomization): string | null {
  switch (stepId) {
    case "upload":
      if (state.customModelUrl) return "3D model uploaded";
      if (state.imageUrl) return "Design uploaded";
      return null;
    case "style":
      return PIN_STYLES.find((s) => s.id === state.style)?.label ?? state.style;
    case "size": {
      const { shape, sizeWidth, sizeHeight, customModelUrl } = state;
      if (customModelUrl) return "Custom Shape";
      const isSingle = shape === "square" || shape === "circle";
      if (isSingle) {
        const preset = SIZES_CM.find((s) => Math.abs(s.value - sizeWidth) < 0.01);
        return preset?.label ?? `${Math.round(sizeWidth * 10) / 10} cm`;
      }
      const rect = RECTANGLE_PRESETS.find(
        (p) => Math.abs(p.width - sizeWidth) < 0.01 && Math.abs(p.height - sizeHeight) < 0.01
      );
      return rect?.label ?? `${Math.round(sizeWidth * 10) / 10} × ${Math.round(sizeHeight * 10) / 10} cm`;
    }
    case "plating":
      return PLATING_OPTIONS.find((p) => p.id === state.plating)?.label ?? state.plating;
    case "effects":
      return state.effects.length > 0
        ? state.effects
            .map((e) => EFFECT_OPTIONS.find((o) => o.id === e)?.label ?? e)
            .join(", ")
        : null;
    case "attachment":
      return ATTACHMENT_OPTIONS.find((a) => a.id === state.attachment)?.label ?? state.attachment;
    case "backSide":
      return BACK_SIDE_OPTIONS.find((b) => b.id === state.backSide)?.label ?? state.backSide;
    case "packaging":
      return PACKAGING_OPTIONS.find((p) => p.id === state.packaging)?.label ?? state.packaging;
    case "approve":
      return state.approved ? "Approved" : null;
    default:
      return null;
  }
}

export function buildStepsConfig(hideStep1: boolean): StepConfig[] {
  const steps: StepConfig[] = [
    { id: "upload", label: "Upload Design", shortLabel: "Design", getSelectionLabel: (s: PinCustomization) => getStepSelectionLabel("upload", s) },
    ...(hideStep1 ? [] : [{ id: "style", label: "Pin Style", shortLabel: "Style", getSelectionLabel: (s: PinCustomization) => getStepSelectionLabel("style", s) }]),
    { id: "size", label: "Size & Shape", shortLabel: "Size", getSelectionLabel: (s: PinCustomization) => getStepSelectionLabel("size", s) },
    { id: "plating", label: "Plating", shortLabel: "Plating", getSelectionLabel: (s: PinCustomization) => getStepSelectionLabel("plating", s) },
    { id: "effects", label: "Effects", shortLabel: "Effects", getSelectionLabel: (s: PinCustomization) => getStepSelectionLabel("effects", s) },
    { id: "attachment", label: "Attachment", shortLabel: "Attachment", getSelectionLabel: (s: PinCustomization) => getStepSelectionLabel("attachment", s) },
    { id: "backSide", label: "Back Side", shortLabel: "Back", getSelectionLabel: (s: PinCustomization) => getStepSelectionLabel("backSide", s) },
    { id: "packaging", label: "Packaging", shortLabel: "Packaging", getSelectionLabel: (s: PinCustomization) => getStepSelectionLabel("packaging", s) },
    { id: "approve", label: "Approve", shortLabel: "Approve", getSelectionLabel: (s: PinCustomization) => getStepSelectionLabel("approve", s) },
  ];
  return steps;
}
