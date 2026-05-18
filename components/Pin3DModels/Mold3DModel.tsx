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

export function Mold3DModel() {
  const { imageUrl, shape, sizeWidth, sizeHeight, effects, partMaterials, selectedPart, setSelectedPart } =
    usePinCustomization();
  const previewMode = usePreviewMode();
  const mapTexture = usePinTexture(imageUrl);
  const faceTextureSet = usePlatingTextureSet(partMaterials.face);
  const rimTextureSet = usePlatingTextureSet(partMaterials.rim);
  const backTextureSet = usePlatingTextureSet(partMaterials.back);
  const sideTextureSet = usePlatingTextureSet(partMaterials.side);
  const groupRef = useRef<THREE.Group>(null);
  const hasUserDesign = !!imageUrl;

  const faceColor = PLATING_COLORS[partMaterials.face] ?? PLATING_COLORS.gold;
  const rimColor = PLATING_COLORS[partMaterials.rim] ?? PLATING_COLORS.gold;
  const backColor = PLATING_COLORS[partMaterials.back] ?? PLATING_COLORS.gold;
  const sideColor = PLATING_COLORS[partMaterials.side] ?? PLATING_COLORS.gold;
  const hasGlow = effects.includes("glow");
  const hasTransparent = effects.includes("transparent");

  const baseGeom = usePinShapeGeometry(
    shape,
    sizeWidth ?? 2.54,
    sizeHeight ?? 2.54,
    0.9,
    0.85
  );
  const { faceGeometry: topCapGeometry, rimGeometry, backFaceGeometry, halfWidth, halfHeight } =
    baseGeom;

  const sideGeometry = useMemo(() => {
    if (baseGeom.isCircle) {
      const r = halfWidth / 0.9;
      return new THREE.CylinderGeometry(r * 0.9, r * 0.75, 0.1, 32);
    }
    const rectShape = new THREE.Shape();
    const w = halfWidth / 0.9;
    const h = halfHeight / 0.9;
    const cr = Math.min(w, h) * 0.2;
    rectShape.moveTo(-w + cr, -h);
    rectShape.lineTo(w - cr, -h);
    rectShape.quadraticCurveTo(w, -h, w, -h + cr);
    rectShape.lineTo(w, h - cr);
    rectShape.quadraticCurveTo(w, h, w - cr, h);
    rectShape.lineTo(-w + cr, h);
    rectShape.quadraticCurveTo(-w, h, -w, h - cr);
    rectShape.lineTo(-w, -h + cr);
    rectShape.quadraticCurveTo(-w, -h, -w + cr, -h);
    return new THREE.ExtrudeGeometry(rectShape, {
      depth: 0.1,
      bevelEnabled: false,
    });
  }, [baseGeom.isCircle, halfWidth, halfHeight]);

  const faceMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: mapTexture,
      metalness: hasUserDesign ? 0.1 : 0.6,
      roughness: hasUserDesign ? 0.5 : 0.35,
      color: hasUserDesign ? 0xffffff : faceColor,
      transparent: hasTransparent,
      opacity: hasTransparent ? 0.85 : 1,
      emissive: hasGlow ? "#88ccff" : "#000000",
      emissiveIntensity: hasGlow ? 0.3 : 0,
    });
  }, [mapTexture, faceColor, hasGlow, hasTransparent, imageUrl]);

  const sideFallbackMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: sideColor,
        metalness: 0.85,
        roughness: 0.25,
      }),
    [sideColor]
  );

  const rimFallbackMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: rimColor,
        metalness: 0.85,
        roughness: 0.25,
        side: THREE.DoubleSide,
      }),
    [rimColor]
  );

  const backFallbackMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: backColor,
        metalness: 0.85,
        roughness: 0.25,
        side: THREE.DoubleSide,
      }),
    [backColor]
  );

  useEffect(
    () => () => {
      sideGeometry.dispose();
      topCapGeometry.dispose();
      rimGeometry.dispose();
      backFaceGeometry.dispose();
      faceMaterial.dispose();
      sideFallbackMaterial.dispose();
      rimFallbackMaterial.dispose();
      backFallbackMaterial.dispose();
    },
    [
      sideGeometry,
      topCapGeometry,
      rimGeometry,
      backFaceGeometry,
      faceMaterial,
      sideFallbackMaterial,
      rimFallbackMaterial,
      backFallbackMaterial,
    ]
  );

  useFrame((_, delta) => {
    if (previewMode === "3d" && groupRef.current && selectedPart === null)
      groupRef.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={groupRef} rotation={[Math.PI / 2, 0, 0]}>
      <mesh
        geometry={topCapGeometry}
        position={[0, 0, 0.05]}
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
            clearcoat={0.4}
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
        geometry={sideGeometry}
        position={[0, 0, 0]}
        rotation={baseGeom.isCircle ? [0, 0, 0] : [-Math.PI / 2, 0, 0]}
        castShadow
        onClick={(e) => { e.stopPropagation(); setSelectedPart("side"); }}
        onPointerEnter={() => { document.body.style.cursor = "pointer"; }}
        onPointerLeave={() => { document.body.style.cursor = "default"; }}
      >
        {sideTextureSet ? (
          <PBRMaterial textureSet={sideTextureSet} naming="ambientcg" clearcoat={0.4} />
        ) : (
          <primitive object={sideFallbackMaterial} attach="material" />
        )}
        {selectedPart === "side" && <Outlines thickness={3} color="#2563EB" screenspace />}
      </mesh>
      <mesh
        geometry={rimGeometry}
        position={[0, 0, 0.05]}
        castShadow
        onClick={(e) => { e.stopPropagation(); setSelectedPart("rim"); }}
        onPointerEnter={() => { document.body.style.cursor = "pointer"; }}
        onPointerLeave={() => { document.body.style.cursor = "default"; }}
      >
        {rimTextureSet ? (
          <PBRMaterial
            textureSet={rimTextureSet}
            naming="ambientcg"
            clearcoat={0.4}
            side={THREE.DoubleSide}
          />
        ) : (
          <primitive object={rimFallbackMaterial} attach="material" />
        )}
        {selectedPart === "rim" && <Outlines thickness={3} color="#2563EB" screenspace />}
      </mesh>
      <mesh
        geometry={backFaceGeometry}
        position={[0, 0, -0.05]}
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
            clearcoat={0.4}
            side={THREE.DoubleSide}
          />
        ) : (
          <primitive object={backFallbackMaterial} attach="material" />
        )}
        {selectedPart === "back" && <Outlines thickness={3} color="#2563EB" screenspace />}
      </mesh>
      <PinAttachmentMesh zBase={-0.05} />
    </group>
  );
}
