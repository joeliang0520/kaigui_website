"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PLATING_COLORS } from "@/lib/pinConfig";

interface PlaceholderOptionModelProps {
  optionId: string;
  optionType: "plating" | "effects" | "attachment" | "backSide" | "packaging";
}

export function PlaceholderOptionModel({ optionId, optionType }: PlaceholderOptionModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  const { geometry, color } = useMemo(() => {
    const radius = 0.5;
    if (optionType === "plating") {
      const c = PLATING_COLORS[optionId] ?? "#D4AF37";
      return {
        geometry: new THREE.CylinderGeometry(radius * 0.9, radius * 0.85, 0.08, 32),
        color: c,
      };
    }
    if (optionType === "effects") {
      const colors: Record<string, string> = {
        glow: "#88ccff",
        glitter: "#ffd700",
        rhinestones: "#e0e0ff",
        transparent: "#ffffff",
        pearlescent: "#ffd1dc",
      };
      return {
        geometry: new THREE.SphereGeometry(radius * 0.4, 16, 16),
        color: colors[optionId] ?? "#cccccc",
      };
    }
    if (optionType === "attachment") {
      return {
        geometry: new THREE.BoxGeometry(radius * 0.6, radius * 0.2, radius * 0.3),
        color: "#8B4513",
      };
    }
    if (optionType === "backSide") {
      return {
        geometry: new THREE.CircleGeometry(radius * 0.8, 32),
        color: "#A8A8A8",
      };
    }
    if (optionType === "packaging") {
      return {
        geometry: new THREE.BoxGeometry(radius * 1.2, radius * 0.8, radius * 0.3),
        color: "#2C3E50",
      };
    }
    return {
      geometry: new THREE.CylinderGeometry(radius, radius * 0.98, 0.08, 32),
      color: "#D4AF37",
    };
  }, [optionId, optionType]);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        metalness: 0.6,
        roughness: 0.3,
      }),
    [color]
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material]
  );

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.3;
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry} material={material} castShadow receiveShadow />
    </group>
  );
}
