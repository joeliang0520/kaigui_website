"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Outlines } from "@react-three/drei";
import { usePinCustomization } from "@/lib/usePinCustomization";
import { usePreviewMode } from "@/lib/PreviewModeContext";
import { PLATING_COLORS } from "@/lib/pinConfig";
import { usePinTexture } from "./usePinTexture";
import { usePinShapeGeometry } from "./usePinShapeGeometry";
import { usePlatingTextureSet } from "./usePlatingTextureSet";
import { PBRMaterial } from "./PBRMaterial";
import { PinAttachmentMesh } from "./PinAttachmentMesh";

export function LaserCutModel() {
  const { imageUrl, shape, sizeWidth, sizeHeight, effects, partMaterials, selectedPart, setSelectedPart } =
    usePinCustomization();
  const previewMode = usePreviewMode();
  const mapTexture = usePinTexture(imageUrl);
  const faceTextureSet = usePlatingTextureSet(partMaterials.face);
  const rimTextureSet = usePlatingTextureSet(partMaterials.rim);
  const backTextureSet = usePlatingTextureSet(partMaterials.back);
  const groupRef = useRef<THREE.Group>(null);
  const hasUserDesign = !!imageUrl;

  const faceColor = PLATING_COLORS[partMaterials.face] ?? PLATING_COLORS.gold;
  const rimColor = PLATING_COLORS[partMaterials.rim] ?? PLATING_COLORS.gold;
  const backColor = PLATING_COLORS[partMaterials.back] ?? PLATING_COLORS.gold;
  const hasGlow = effects.includes("glow");
  const hasTransparent = effects.includes("transparent");

  const { faceGeometry, rimGeometry: edgeGeometry, backFaceGeometry } = usePinShapeGeometry(
    shape,
    sizeWidth ?? 2.54,
    sizeHeight ?? 2.54,
    0.95,
    0.93
  );

  const faceMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: mapTexture,
      metalness: hasUserDesign ? 0.08 : 0.5,
      roughness: hasUserDesign ? 0.5 : 0.3,
      color: hasUserDesign ? 0xffffff : faceColor,
      transparent: hasUserDesign || hasTransparent,
      alphaTest: hasUserDesign ? 0.05 : 0,
      opacity: hasTransparent ? 0.85 : 1,
      emissive: hasGlow ? "#88ccff" : "#000000",
      emissiveIntensity: hasGlow ? 0.3 : 0,
    });
  }, [mapTexture, faceColor, hasGlow, hasTransparent, imageUrl]);

  const edgeFallbackMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: rimColor,
        metalness: 0.9,
        roughness: 0.2,
        side: THREE.DoubleSide,
      }),
    [rimColor]
  );

  const backFallbackMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: backColor,
        metalness: 0.9,
        roughness: 0.2,
        side: THREE.DoubleSide,
      }),
    [backColor]
  );

  useEffect(
    () => () => {
      faceGeometry.dispose();
      edgeGeometry.dispose();
      backFaceGeometry.dispose();
      faceMaterial.dispose();
      edgeFallbackMaterial.dispose();
      backFallbackMaterial.dispose();
    },
    [faceGeometry, edgeGeometry, backFaceGeometry, faceMaterial, edgeFallbackMaterial, backFallbackMaterial]
  );

  useFrame((_, delta) => {
    if (previewMode === "3d" && groupRef.current && selectedPart === null)
      groupRef.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={groupRef}>
      <mesh
        geometry={faceGeometry}
        position={[0, 0, 0.015]}
        castShadow
        receiveShadow
        onClick={(e) => { e.stopPropagation(); setSelectedPart("face"); }}
        onPointerEnter={() => { document.body.style.cursor = "pointer"; }}
        onPointerLeave={() => { document.body.style.cursor = "default"; }}
      >
        {hasUserDesign ? (
          <primitive object={faceMaterial} attach="material" />
        ) : faceTextureSet ? (
          <PBRMaterial
            textureSet={faceTextureSet}
            naming="ambientcg"
            anisotropy={0.4}
            transparent={hasTransparent}
            opacity={hasTransparent ? 0.85 : 1}
            emissive={hasGlow ? "#88ccff" : "#000000"}
            emissiveIntensity={hasGlow ? 0.3 : 0}
          />
        ) : (
          <primitive object={faceMaterial} attach="material" />
        )}
        {selectedPart === "face" && <Outlines thickness={3} color="#2563EB" screenspace />}
      </mesh>
      <mesh
        geometry={edgeGeometry}
        position={[0, 0, 0.0075]}
        rotation={[-Math.PI / 2, 0, 0]}
        castShadow
        onClick={(e) => { e.stopPropagation(); setSelectedPart("rim"); }}
        onPointerEnter={() => { document.body.style.cursor = "pointer"; }}
        onPointerLeave={() => { document.body.style.cursor = "default"; }}
      >
        {rimTextureSet ? (
          <PBRMaterial
            textureSet={rimTextureSet}
            naming="ambientcg"
            anisotropy={0.4}
            side={THREE.DoubleSide}
          />
        ) : (
          <primitive object={edgeFallbackMaterial} attach="material" />
        )}
        {selectedPart === "rim" && <Outlines thickness={3} color="#2563EB" screenspace />}
      </mesh>
      <mesh
        geometry={backFaceGeometry}
        position={[0, 0, 0]}
        rotation={[Math.PI, 0, 0]}
        castShadow
        onClick={(e) => { e.stopPropagation(); setSelectedPart("back"); }}
        onPointerEnter={() => { document.body.style.cursor = "pointer"; }}
        onPointerLeave={() => { document.body.style.cursor = "default"; }}
      >
        {backTextureSet ? (
          <PBRMaterial
            textureSet={backTextureSet}
            naming="ambientcg"
            anisotropy={0.4}
            side={THREE.DoubleSide}
          />
        ) : (
          <primitive object={backFallbackMaterial} attach="material" />
        )}
        {selectedPart === "back" && <Outlines thickness={3} color="#2563EB" screenspace />}
      </mesh>
      <PinAttachmentMesh zBase={0} />
    </group>
  );
}
