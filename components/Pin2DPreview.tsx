"use client";

import { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePinCustomization } from "@/lib/usePinCustomization";
import { Pin3DModelByStyle } from "./Pin3DModels";
import { FixedSceneLights } from "./FixedSceneLights";
import { Environment } from "@react-three/drei";
import { PreviewModeProvider } from "@/lib/PreviewModeContext";
import type { PinStyle } from "@/lib/pinConfig";

function OrthoCameraController() {
  const { camera } = useThree();
  const { sizeWidth, sizeHeight } = usePinCustomization();
  const maxSizeCm = Math.max(sizeWidth ?? 2.54, sizeHeight ?? 2.54);
  const baseScale = maxSizeCm / 2.54;
  const orthoSize = baseScale * 0.7;
  const cameraZ = 2 + 0.8 * (maxSizeCm / 2.54);

  useEffect(() => {
    if (camera instanceof THREE.OrthographicCamera) {
      camera.position.set(0, 0, cameraZ);
      camera.left = -orthoSize;
      camera.right = orthoSize;
      camera.top = orthoSize;
      camera.bottom = -orthoSize;
      camera.updateProjectionMatrix();
    }
  }, [camera, orthoSize, cameraZ]);

  return null;
}

/**
 * 2D preview = front-facing orthographic render of the same 3D model.
 * Plating, effects, design, custom model are all synced with 3D view.
 */
export function Pin2DPreview({ style }: { style?: PinStyle }) {
  const storeStyle = usePinCustomization((s) => s.style);
  const activeStyle = style ?? storeStyle;
  const { shape, sizeWidth, sizeHeight } = usePinCustomization();
  const maxSizeCm = Math.max(sizeWidth ?? 2.54, sizeHeight ?? 2.54);
  const cameraZ = 2 + 0.8 * (maxSizeCm / 2.54);
  const baseScale = maxSizeCm / 2.54;
  const orthoSize = baseScale * 0.7;
  const sizeKey = `${shape}-${sizeWidth ?? 2.54}-${sizeHeight ?? 2.54}`;

  return (
    <div className="flex-1 min-w-0 min-h-0 w-full h-full overflow-hidden">
      <Canvas
        key={sizeKey}
        orthographic
        camera={{
          position: [0, 0, cameraZ],
          zoom: 1,
          near: 0.1,
          far: 100,
          left: -orthoSize,
          right: orthoSize,
          top: orthoSize,
          bottom: -orthoSize,
        }}
        gl={{ antialias: true, alpha: true, toneMappingExposure: 1.4 }}
        className="w-full h-full"
      >
        <PreviewModeProvider mode="2d">
          <OrthoCameraController />
          <FixedSceneLights />
          <Environment preset="studio" />
          <Pin3DModelByStyle style={activeStyle} />
        </PreviewModeProvider>
      </Canvas>
    </div>
  );
}
