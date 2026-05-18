"use client";

import { Suspense } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export type PBRNaming = "standard" | "ambientcg";

function getTexturePaths(
  textureSet: string,
  naming: PBRNaming,
  includeAO: boolean
): Record<string, string> {
  if (naming === "ambientcg") {
    const baseName = textureSet.split("/").pop() || textureSet;
    const prefix = `${textureSet}/${baseName}`;
    return {
      map: `${prefix}_Color.jpg`,
      normalMap: `${prefix}_NormalGL.jpg`,
      roughnessMap: `${prefix}_Roughness.jpg`,
      metalnessMap: `${prefix}_Metalness.jpg`,
    };
  }
  const paths: Record<string, string> = {
    map: `${textureSet}/albedo.jpg`,
    normalMap: `${textureSet}/normal.jpg`,
    roughnessMap: `${textureSet}/roughness.jpg`,
    metalnessMap: `${textureSet}/metallic.jpg`,
  };
  if (includeAO) paths.aoMap = `${textureSet}/ao.jpg`;
  return paths;
}

function PBRMaterialInner({
  textureSet,
  naming = "standard",
  includeAO = false,
  clearcoat = 0.5,
  clearcoatRoughness = 0.08,
  anisotropy = 0,
  ...props
}: {
  textureSet: string;
  naming?: PBRNaming;
  includeAO?: boolean;
  clearcoat?: number;
  clearcoatRoughness?: number;
  anisotropy?: number;
} & Omit<JSX.IntrinsicElements["meshPhysicalMaterial"], "map" | "normalMap" | "roughnessMap" | "metalnessMap" | "aoMap">) {
  const paths = getTexturePaths(textureSet, naming, includeAO);
  const textures = useTexture(paths);

  // Set color space for non-normal maps
  if (textures.map) textures.map.colorSpace = THREE.SRGBColorSpace;
  if (textures.roughnessMap) textures.roughnessMap.colorSpace = THREE.LinearSRGBColorSpace;
  if (textures.metalnessMap) textures.metalnessMap.colorSpace = THREE.LinearSRGBColorSpace;
  if (textures.aoMap) textures.aoMap.colorSpace = THREE.LinearSRGBColorSpace;

  return (
    <meshPhysicalMaterial
      {...props}
      map={textures.map}
      normalMap={textures.normalMap}
      roughnessMap={textures.roughnessMap}
      metalnessMap={textures.metalnessMap}
      aoMap={textures.aoMap}
      metalness={textures.metalnessMap ? 1 : 0.85}
      roughness={textures.roughnessMap ? 1 : 0.2}
      color={0xffffff}
      envMapIntensity={1.6}
      clearcoat={clearcoat}
      clearcoatRoughness={clearcoatRoughness}
      anisotropy={anisotropy}
    />
  );
}

export function PBRMaterial({
  textureSet,
  ...props
}: {
  textureSet: string;
  naming?: PBRNaming;
  includeAO?: boolean;
  clearcoat?: number;
  clearcoatRoughness?: number;
  anisotropy?: number;
} & Omit<JSX.IntrinsicElements["meshPhysicalMaterial"], "map" | "normalMap" | "roughnessMap" | "metalnessMap" | "aoMap">) {
  return (
    <Suspense fallback={<meshStandardMaterial color="#888888" roughness={0.5} metalness={0.5} />}>
      <PBRMaterialInner textureSet={textureSet} {...props} />
    </Suspense>
  );
}
