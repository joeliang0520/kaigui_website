"use client";

import { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Pin3DModelByStyle } from "./Pin3DModels";
import { FixedSceneLights } from "./FixedSceneLights";
import { usePinCustomization } from "@/lib/usePinCustomization";
import { PreviewModeProvider } from "@/lib/PreviewModeContext";
import type { PinStyle } from "@/lib/pinConfig";
import * as THREE from "three";

function CameraZoomController() {
  const { camera } = useThree();
  const { sizeWidth, sizeHeight } = usePinCustomization();
  const maxSizeCm = Math.max(sizeWidth ?? 2.54, sizeHeight ?? 2.54);
  const targetZ = 2 + 0.8 * (maxSizeCm / 2.54);

  useEffect(() => {
    camera.position.set(0, 0, targetZ);
    camera.updateProjectionMatrix();
  }, [camera, targetZ]);

  return null;
}

export function Pin3DViewer({ style }: { style?: PinStyle }) {
  const storeStyle = usePinCustomization((s) => s.style);
  const activeStyle = style ?? storeStyle;
  const { sizeWidth, sizeHeight, setSelectedPart } = usePinCustomization();
  const maxSizeCm = Math.max(sizeWidth ?? 2.54, sizeHeight ?? 2.54);
  const initialZ = 2 + 0.8 * (maxSizeCm / 2.54);

  return (
    <div className="w-full h-full min-h-[200px] rounded-lg bg-soft-blue border border-border-blue overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, initialZ], fov: 45 }}
        gl={{ antialias: true, alpha: true, toneMappingExposure: 1.6, toneMapping: THREE.ACESFilmicToneMapping }}
        className="w-full h-full"
        onPointerMissed={() => setSelectedPart(null)}
      >
        <PreviewModeProvider mode="3d">
          <CameraZoomController />
          <FixedSceneLights />
          <Environment preset="studio" environmentIntensity={1.2} />
          <Pin3DModelByStyle style={activeStyle} />
        </PreviewModeProvider>
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={Math.max(1, initialZ * 0.5)}
          maxDistance={Math.max(4, initialZ * 1.5)}
          minPolarAngle={0.25}
          maxPolarAngle={Math.PI - 0.25}
        />
      </Canvas>
    </div>
  );
}
