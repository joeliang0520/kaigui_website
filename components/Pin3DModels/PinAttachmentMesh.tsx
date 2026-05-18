"use client";

import { useMemo, useEffect } from "react";
import * as THREE from "three";
import { Outlines } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import { usePinCustomization } from "@/lib/usePinCustomization";
import { PLATING_COLORS } from "@/lib/pinConfig";
import { AttachmentGLTFModel } from "./AttachmentGLTFModel";

/**
 * Renders the backing attachment on the pin back.
 *
 * Attachment types:
 *   - rubber_clutch, deluxe_clutch, military_clutch, safety_pin:
 *       Always rendered via uploaded GLB model. Blank while loading.
 *   - two_rubber_clutch, two_deluxe_clutch, two_military_clutch:
 *       Two instances of the single GLB model placed side-by-side.
 *   - magnet_back, two_magnet_back:
 *       Procedural silver cylinder. Diameter customisable via store.
 *   - no_backing:
 *       Nothing rendered.
 *
 * 1 Three.js unit = 25.4 mm.
 */

// BASE_SCALE matches usePinShapeGeometry: pin radius in Three.js = sizeWidth / BASE_SCALE
const BASE_SCALE = 5.08; // cm

interface PinAttachmentMeshProps {
  zBase?: number;
}

// ── Map "two_" IDs to the base single-model ID ──────────────────────────
const DUAL_TO_SINGLE: Record<string, string> = {
  two_rubber_clutch: "rubber_clutch",
  two_deluxe_clutch: "deluxe_clutch",
  two_military_clutch: "military_clutch",
};

// Attachments that use GLB models (single or via DUAL_TO_SINGLE)
const GLB_ATTACHMENTS = new Set([
  "rubber_clutch",
  "deluxe_clutch",
  "military_clutch",
  "safety_pin",
  ...Object.keys(DUAL_TO_SINGLE),
]);

export function PinAttachmentMesh({ zBase = 0 }: PinAttachmentMeshProps) {
  const { attachment, plating, selectedPart, setSelectedPart, magnetDiameter, sizeWidth, sizeHeight } =
    usePinCustomization();

  const platingColor = PLATING_COLORS[plating] ?? PLATING_COLORS.gold;
  const isSelected = selectedPart === "attachment";

  // Pin radius in Three.js units — used to scale attachment spacing & magnet size
  const maxSizeCm = Math.max(sizeWidth || 2.54, sizeHeight || 2.54);
  const pinRadius = maxSizeCm / BASE_SCALE; // Three.js units
  const pinDiameterMm = maxSizeCm * 10;     // mm

  // Dual clutch offset: place at ±40% of pin radius so they look natural on any pin size
  const dualOffset = pinRadius * 0.4;

  const handleClick = (e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); setSelectedPart("attachment"); };
  const enterCursor = () => { document.body.style.cursor = "pointer"; };
  const leaveCursor = () => { document.body.style.cursor = "default"; };

  // Shared material for GLB meshes
  const sharedMetal = useMemo(
    () => new THREE.MeshPhysicalMaterial({
      color: platingColor,
      metalness: 0.90,
      roughness: 0.18,
      clearcoat: 0.5,
      clearcoatRoughness: 0.08,
    }),
    [platingColor],
  );

  useEffect(() => () => { sharedMetal.dispose(); }, [sharedMetal]);

  // ── no_backing → render nothing ────────────────────────────────────────
  if (attachment === "no_backing") return null;

  // ── Magnet back → procedural silver cylinder ───────────────────────────
  if (attachment === "magnet_back" || attachment === "two_magnet_back") {
    return (
      <MagnetAttachment
        zBase={zBase}
        dual={attachment === "two_magnet_back"}
        diameterMm={magnetDiameter}
        pinDiameterMm={pinDiameterMm}
        isSelected={isSelected}
        onClick={handleClick}
        onPointerEnter={enterCursor}
        onPointerLeave={leaveCursor}
      />
    );
  }

  // ── GLB-based attachments ──────────────────────────────────────────────
  if (GLB_ATTACHMENTS.has(attachment)) {
    const isDual = attachment in DUAL_TO_SINGLE;
    const baseId = isDual ? DUAL_TO_SINGLE[attachment] : attachment;

    return (
      <group position={[0, 0, zBase]}>
        {isDual ? (
          <>
            <group position={[-dualOffset, 0, 0]}>
              <AttachmentGLTFModel
                key={`${baseId}-L`}
                attachmentId={baseId}
                material={sharedMetal}
                onClick={handleClick}
                onPointerEnter={enterCursor}
                onPointerLeave={leaveCursor}
              />
            </group>
            <group position={[dualOffset, 0, 0]}>
              <AttachmentGLTFModel
                key={`${baseId}-R`}
                attachmentId={baseId}
                material={sharedMetal}
                onClick={handleClick}
                onPointerEnter={enterCursor}
                onPointerLeave={leaveCursor}
              />
            </group>
          </>
        ) : (
          <AttachmentGLTFModel
            key={baseId}
            attachmentId={baseId}
            material={sharedMetal}
            onClick={handleClick}
            onPointerEnter={enterCursor}
            onPointerLeave={leaveCursor}
          />
        )}
      </group>
    );
  }

  // Unknown attachment → render nothing
  return null;
}

// ── Magnet Back (procedural) ─────────────────────────────────────────────

interface MagnetProps {
  zBase: number;
  dual: boolean;
  diameterMm: number;
  pinDiameterMm: number;
  isSelected: boolean;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}

function MagnetAttachment({
  zBase,
  dual,
  diameterMm,
  pinDiameterMm,
  isSelected,
  onClick,
  onPointerEnter,
  onPointerLeave,
}: MagnetProps) {
  // Magnet diameter scales with pin size: use the smaller of user setting or 80% of pin diameter
  const baseDiaMm = Math.min(diameterMm, pinDiameterMm * 0.8);
  // Dual magnets use half the diameter
  const effectiveDiaMm = dual ? baseDiaMm / 2 : baseDiaMm;
  const r = (effectiveDiaMm / 2) / 25.4;   // magnet radius in Three.js units
  const thickness = 1 / 25.4;              // 1 mm thick disc
  const halfT = thickness / 2;

  const geo = useMemo(
    () => new THREE.CylinderGeometry(r, r, thickness, 32),
    [r, thickness],
  );

  useEffect(() => () => { geo.dispose(); }, [geo]);

  // For dual, offset based on the smaller radius so they don't overlap
  const pinR = (pinDiameterMm / 2) / 25.4;
  const dualGap = pinR * 0.4; // 40% of pin radius, same as clutch dual offset

  const magnetMesh = (dx: number) => (
    <mesh
      geometry={geo}
      position={[dx, 0, -halfT]}
      rotation={[Math.PI / 2, 0, 0]}
      castShadow
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      {/* Magnet always renders as silver regardless of plating */}
      <meshPhysicalMaterial
        color="#C0C0C0"
        metalness={0.7}
        roughness={0.3}
        clearcoat={0.3}
      />
      {isSelected && (
        <Outlines thickness={3} color="#2563EB" screenspace />
      )}
    </mesh>
  );

  return (
    <group position={[0, 0, zBase]}>
      {dual ? (
        <>
          {magnetMesh(-dualGap)}
          {magnetMesh(dualGap)}
        </>
      ) : (
        magnetMesh(0)
      )}
    </group>
  );
}
