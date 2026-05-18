"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Lights that follow the camera so they stay at a fixed position relative to the view.
 * When the 3D model auto-rotates, the lighting remains consistent from the viewer's perspective.
 */
export function FixedSceneLights() {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (!camera) return;
    const camPos = camera.position.clone();
    const camQuat = camera.quaternion.clone();
    const sceneCenter = new THREE.Vector3(0, 0, 0);

    if (keyLightRef.current) {
      const offset = new THREE.Vector3(3, 3, 3);
      offset.applyQuaternion(camQuat);
      keyLightRef.current.position.copy(camPos.clone().add(offset));
      keyLightRef.current.target.position.copy(sceneCenter);
    }
    if (fillLightRef.current) {
      const offset = new THREE.Vector3(-2, 2, 2);
      offset.applyQuaternion(camQuat);
      fillLightRef.current.position.copy(camPos.clone().add(offset));
      fillLightRef.current.target.position.copy(sceneCenter);
    }
    if (pointLightRef.current) {
      const offset = new THREE.Vector3(0, 2, 2);
      offset.applyQuaternion(camQuat);
      pointLightRef.current.position.copy(camPos.clone().add(offset));
    }
  });

  return (
    <>
      <ambientLight intensity={1} />
      <hemisphereLight args={["#ffffff", "#b0c4de", 0.4]} />
      <directionalLight
        ref={keyLightRef}
        intensity={3.5}
        castShadow
      />
      <directionalLight ref={fillLightRef} intensity={1.9} />
      <pointLight ref={pointLightRef} intensity={1.5} />
    </>
  );
}
