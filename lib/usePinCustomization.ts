"use client";

import { create } from "zustand";
import type { PinStyle, PinShape, PinPart } from "./pinConfig";

export interface PartMaterials {
  face: string;
  rim: string;
  back: string;
  side: string;
}

export interface BoxDimensions {
  width: string;
  height: string;
  length: string;
}

export interface PinCustomization {
  imageUrl: string | null;
  customModelUrl: string | null;
  designName: string;
  style: PinStyle;
  shape: PinShape;
  sizeWidth: number;
  sizeHeight: number;
  plating: string;
  partMaterials: PartMaterials;
  selectedPart: PinPart | null;
  effects: string[];
  attachment: string;
  magnetDiameter: number; // mm – only used when attachment is magnet_back / two_magnet_back
  backSide: string;
  laserEngravingText: string;
  packaging: string;
  boxDimensions: BoxDimensions;
  approved: boolean;
  currentStepIndex: number;
}

const initialState: PinCustomization = {
  imageUrl: null,
  customModelUrl: null,
  designName: "",
  style: "hard_enamel",
  shape: "circle",
  sizeWidth: 2.54,
  sizeHeight: 2.54,
  plating: "gold",
  partMaterials: { face: "gold", rim: "gold", back: "gold", side: "gold" },
  selectedPart: null,
  effects: [],
  attachment: "no_backing",
  magnetDiameter: 12, // mm default
  backSide: "plain_back",
  laserEngravingText: "",
  packaging: "thin_poly_bag",
  boxDimensions: { width: "", height: "", length: "" },
  approved: false,
  currentStepIndex: 0,
};

interface PinCustomizationStore extends PinCustomization {
  setCurrentStepIndex: (index: number) => void;
  setImageUrl: (url: string | null) => void;
  setCustomModelUrl: (url: string | null) => void;
  setDesignName: (designName: string) => void;
  setStyle: (style: PinStyle) => void;
  setShape: (shape: PinShape) => void;
  setSizeWidth: (sizeWidth: number) => void;
  setSizeHeight: (sizeHeight: number) => void;
  setSize: (size: number) => void;
  setPlating: (plating: string) => void;
  setPartMaterial: (part: PinPart, materialId: string) => void;
  setSelectedPart: (part: PinPart | null) => void;
  setEffects: (effects: string[]) => void;
  toggleEffect: (effect: string) => void;
  setAttachment: (attachment: string) => void;
  setMagnetDiameter: (d: number) => void;
  setBackSide: (backSide: string) => void;
  setLaserEngravingText: (text: string) => void;
  setPackaging: (packaging: string) => void;
  setBoxDimensions: (dims: Partial<BoxDimensions>) => void;
  setApproved: (approved: boolean) => void;
  reset: () => void;
}

export const usePinCustomization = create<PinCustomizationStore>((set) => ({
  ...initialState,
  setCurrentStepIndex: (currentStepIndex) => set({ currentStepIndex }),
  setImageUrl: (imageUrl) => set({ imageUrl }),
  setCustomModelUrl: (customModelUrl) =>
    set(() => ({
      customModelUrl,
      ...(customModelUrl ? { shape: "custom" as PinShape } : { shape: "circle" as PinShape }),
    })),
  setDesignName: (designName) => set({ designName }),
  setStyle: (style) => set({ style }),
  setShape: (shape) => set((s) => ({ shape, ...(shape === "square" || shape === "circle" ? { sizeHeight: s.sizeWidth } : {}) })),
  setSizeWidth: (sizeWidth) => set((s) => ({ sizeWidth, ...(s.shape === "square" || s.shape === "circle" ? { sizeHeight: sizeWidth } : {}) })),
  setSizeHeight: (sizeHeight) => set({ sizeHeight }),
  setSize: (size) => set({ sizeWidth: size, sizeHeight: size }),
  setPlating: (plating) => set({ plating, partMaterials: { face: plating, rim: plating, back: plating, side: plating } }),
  setPartMaterial: (part, materialId) =>
    set((s) => ({ partMaterials: { ...s.partMaterials, [part]: materialId } })),
  setSelectedPart: (selectedPart) => set({ selectedPart }),
  setEffects: (effects) => set({ effects }),
  toggleEffect: (effect) =>
    set((state) => ({
      effects: state.effects.includes(effect)
        ? state.effects.filter((e) => e !== effect)
        : [...state.effects, effect],
    })),
  setAttachment: (attachment) => set({ attachment }),
  setMagnetDiameter: (magnetDiameter) => set({ magnetDiameter }),
  setBackSide: (backSide) => set({ backSide }),
  setLaserEngravingText: (laserEngravingText) => set({ laserEngravingText }),
  setPackaging: (packaging) => set({ packaging }),
  setBoxDimensions: (dims) => set((s) => ({ boxDimensions: { ...s.boxDimensions, ...dims } })),
  setApproved: (approved) => set({ approved }),
  reset: () => set(initialState),
}));
