"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PlaceholderOptionModel } from "./models/PlaceholderOptionModel";
import { FixedSceneLights } from "./FixedSceneLights";

interface OptionPreview3DProps {
  optionId: string;
  optionType: "plating" | "effects" | "attachment" | "backSide" | "packaging";
}

export function OptionPreview3D({ optionId, optionType }: OptionPreview3DProps) {
  return (
    <div className="w-full aspect-square min-h-[120px] rounded-lg overflow-hidden bg-soft-blue border border-border-blue">
      <Canvas camera={{ position: [0, 0, 2], fov: 45 }} gl={{ antialias: true }}>
        <FixedSceneLights />
        <PlaceholderOptionModel optionId={optionId} optionType={optionType} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={0.25}
          maxPolarAngle={Math.PI - 0.25}
        />
      </Canvas>
    </div>
  );
}
