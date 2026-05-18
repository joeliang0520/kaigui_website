"use client";

import { Suspense } from "react";
import type { PinStyle } from "@/lib/pinConfig";
import { usePinCustomization } from "@/lib/usePinCustomization";
import { HardEnamelModel } from "./HardEnamelModel";
import { SoftEnamelModel } from "./SoftEnamelModel";
import { DieStruckModel } from "./DieStruckModel";
import { Mold3DModel } from "./Mold3DModel";
import { LaserCutModel } from "./LaserCutModel";
import { AcrylicModel } from "./AcrylicModel";
import { CustomModel3D } from "./CustomModel3D";
import { LaserEngravingLayer } from "./LaserEngravingLayer";

const STYLE_MODELS: Record<PinStyle, React.ComponentType> = {
  hard_enamel: HardEnamelModel,
  soft_enamel: SoftEnamelModel,
  die_struck: DieStruckModel,
  "3d_mold": Mold3DModel,
  laser_cut: LaserCutModel,
  acrylic: AcrylicModel,
};

export function Pin3DModelByStyle({ style }: { style: PinStyle }) {
  const customModelUrl = usePinCustomization((s) => s.customModelUrl);

  if (customModelUrl) {
    return (
      <>
        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[1, 1, 0.2]} />
              <meshStandardMaterial color="#888888" />
            </mesh>
          }
        >
          <CustomModel3D url={customModelUrl} />
        </Suspense>
        <LaserEngravingLayer />
      </>
    );
  }

  const Model = STYLE_MODELS[style];
  return (
    <>
      {Model ? <Model /> : <HardEnamelModel />}
      <LaserEngravingLayer />
    </>
  );
}
