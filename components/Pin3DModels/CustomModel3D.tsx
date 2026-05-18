"use client";

import { useMemo, useEffect, useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { usePinCustomization } from "@/lib/usePinCustomization";
import { usePreviewMode } from "@/lib/PreviewModeContext";
import { PLATING_COLORS } from "@/lib/pinConfig";
import { usePlatingTextureSet } from "./usePlatingTextureSet";
import { usePinTexture } from "./usePinTexture";

const TARGET_SIZE = 2; // Match approximate pin size in scene units

function getTexturePaths(textureSet: string): Record<string, string> {
  const baseName = textureSet.split("/").pop() || textureSet;
  const prefix = `${textureSet}/${baseName}`;
  return {
    map: `${prefix}_Color.jpg`,
    normalMap: `${prefix}_NormalGL.jpg`,
    roughnessMap: `${prefix}_Roughness.jpg`,
    metalnessMap: `${prefix}_Metalness.jpg`,
  };
}

/**
 * Applies plating material to all meshes in a cloned scene.
 * Uses plating PBR textures when available, otherwise fallback color.
 */
function CustomModelWithPlating({ url }: { url: string }) {
  const { plating, imageUrl, effects } = usePinCustomization();
  const previewMode = usePreviewMode();
  const gltf = useLoader(GLTFLoader, url);
  const platingTextureSet = usePlatingTextureSet(plating);
  const mapTexture = usePinTexture(imageUrl);
  const groupRef = useRef<THREE.Group>(null);

  const platingColor = PLATING_COLORS[plating] ?? PLATING_COLORS.gold;
  const hasGlow = effects.includes("glow");
  const hasTransparent = effects.includes("transparent");
  const hasUserDesign = !!imageUrl;

  const clonedScene = useMemo(() => {
    const scene = gltf.scene.clone();
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z, 0.001);
    const scale = TARGET_SIZE / maxDim;
    scene.scale.setScalar(scale);
    scene.position.copy(center.clone().negate().multiplyScalar(scale));
    return scene;
  }, [gltf.scene]);

  useFrame((_, delta) => {
    if (previewMode === "3d" && groupRef.current) groupRef.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={groupRef}>
      <CustomModelMaterialApplicator
        scene={clonedScene}
        platingTextureSet={platingTextureSet}
        mapTexture={mapTexture}
        platingColor={platingColor}
        hasGlow={hasGlow}
        hasTransparent={hasTransparent}
        hasUserDesign={hasUserDesign}
      />
      <primitive object={clonedScene} />
    </group>
  );
}

function CustomModelFallbackApplicator({
  scene,
  platingColor,
  hasGlow,
  hasTransparent,
}: {
  scene: THREE.Object3D;
  platingColor: string;
  hasGlow: boolean;
  hasTransparent: boolean;
}) {
  const fallbackMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: platingColor,
        metalness: 0.85,
        roughness: 0.2,
        transparent: hasTransparent,
        opacity: hasTransparent ? 0.85 : 1,
        emissive: hasGlow ? "#88ccff" : "#000000",
        emissiveIntensity: hasGlow ? 0.3 : 0,
      }),
    [platingColor, hasGlow, hasTransparent]
  );

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = fallbackMaterial;
      }
    });
    return () => {
      fallbackMaterial.dispose();
    };
  }, [scene, fallbackMaterial]);

  return null;
}

function CustomModelMaterialApplicator({
  scene,
  platingTextureSet,
  mapTexture,
  platingColor,
  hasGlow,
  hasTransparent,
  hasUserDesign,
}: {
  scene: THREE.Object3D;
  platingTextureSet: string | null;
  mapTexture: THREE.Texture;
  platingColor: string;
  hasGlow: boolean;
  hasTransparent: boolean;
  hasUserDesign: boolean;
}) {
  if (platingTextureSet) {
    return (
      <CustomModelPBRApplicator
        scene={scene}
        textureSet={platingTextureSet}
        mapTexture={mapTexture}
        hasGlow={hasGlow}
        hasTransparent={hasTransparent}
        hasUserDesign={hasUserDesign}
      />
    );
  }
  return (
    <CustomModelFallbackApplicator
      scene={scene}
      platingColor={platingColor}
      hasGlow={hasGlow}
      hasTransparent={hasTransparent}
    />
  );
}

function CustomModelPBRApplicator({
  scene,
  textureSet,
  mapTexture,
  hasGlow,
  hasTransparent,
  hasUserDesign,
}: {
  scene: THREE.Object3D;
  textureSet: string;
  mapTexture: THREE.Texture;
  hasGlow: boolean;
  hasTransparent: boolean;
  hasUserDesign: boolean;
}) {
  const paths = useMemo(() => getTexturePaths(textureSet), [textureSet]);
  const textures = useTexture(paths);

  const material = useMemo(() => {
    if (textures.map) textures.map.colorSpace = THREE.SRGBColorSpace;
    if (textures.roughnessMap)
      textures.roughnessMap.colorSpace = THREE.LinearSRGBColorSpace;
    if (textures.metalnessMap)
      textures.metalnessMap.colorSpace = THREE.LinearSRGBColorSpace;

    return new THREE.MeshStandardMaterial({
      map: hasUserDesign ? mapTexture : textures.map,
      normalMap: textures.normalMap,
      roughnessMap: textures.roughnessMap,
      metalnessMap: hasUserDesign ? null : textures.metalnessMap,
      metalness: hasUserDesign ? 0.1 : 1,
      roughness: hasUserDesign ? 0.5 : 1,
      color: 0xffffff,
      transparent: hasTransparent,
      opacity: hasTransparent ? 0.85 : 1,
      emissive: hasGlow ? "#88ccff" : "#000000",
      emissiveIntensity: hasGlow ? 0.3 : 0,
      envMapIntensity: 1.2,
    });
  }, [
    textures.map,
    textures.normalMap,
    textures.roughnessMap,
    textures.metalnessMap,
    mapTexture,
    hasUserDesign,
    hasGlow,
    hasTransparent,
  ]);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });
    return () => {
      material.dispose();
    };
  }, [scene, material]);

  return null;
}

export function CustomModel3D({ url }: { url: string }) {
  return (
    <CustomModelWithPlating url={url} />
  );
}
