"use client";

import { useMemo, useEffect } from "react";
import * as THREE from "three";
import { usePinCustomization } from "@/lib/usePinCustomization";
import { PLATING_COLORS } from "@/lib/pinConfig";

const BASE_SCALE = 5.08; // cm — matches usePinShapeGeometry

/**
 * Builds a canvas texture with laser-engraved text.
 * No flipping needed: with rotation=[0, PI, 0] on the mesh, when the pin GROUP
 * also rotates PI around Y (showing the back), the two Y-flips cancel out and
 * the canvas texture renders without mirroring or inversion.
 */
function buildLaserTexture(
  text: string,
  isPlaceholder: boolean,
  platingColor: string
): THREE.CanvasTexture {
  const SIZE = 512;
  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d")!;

  ctx.clearRect(0, 0, SIZE, SIZE);

  const engravingColor = isPlaceholder
    ? "rgba(255,255,255,0.22)"
    : deriveEngravingColor(platingColor);

  const maxChars = 22;
  const baseFontPx = Math.floor(SIZE * 0.13);
  const fontSize = text.length > maxChars
    ? Math.max(18, Math.floor(baseFontPx * (maxChars / text.length)))
    : baseFontPx;

  ctx.font = `bold ${fontSize}px Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = engravingColor;

  // Word-wrap
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (test.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);

  const lineHeight = fontSize * 1.35;
  const totalHeight = lines.length * lineHeight;
  const startY = SIZE / 2 - totalHeight / 2 + lineHeight / 2;
  lines.forEach((line, i) => {
    ctx.fillText(line, SIZE / 2, startY + i * lineHeight, SIZE * 0.88);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function deriveEngravingColor(hex: string): string {
  try {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (r * 299 + g * 587 + b * 114) / 1000;
    return luminance > 128 ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.65)";
  } catch {
    return "rgba(255,255,255,0.55)";
  }
}

export function LaserEngravingLayer() {
  const { backSide, laserEngravingText, sizeWidth, sizeHeight, plating } =
    usePinCustomization();

  const displayText = laserEngravingText.trim() || "Add your own text";
  const isPlaceholder = !laserEngravingText.trim();
  const platingColor = PLATING_COLORS[plating] ?? "#D4AF37";

  // Plane sized to match the pin back face
  const geometry = useMemo(() => {
    const maxSize = Math.max(sizeWidth ?? 2.54, sizeHeight ?? 2.54);
    const baseScale = maxSize / BASE_SCALE;
    const w = 2 * baseScale * ((sizeWidth ?? 2.54) / maxSize);
    const h = 2 * baseScale * ((sizeHeight ?? 2.54) / maxSize);
    return new THREE.PlaneGeometry(w, h);
  }, [sizeWidth, sizeHeight]);

  const texture = useMemo(() => {
    if (typeof window === "undefined") return null;
    return buildLaserTexture(displayText, isPlaceholder, platingColor);
  }, [displayText, isPlaceholder, platingColor]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      texture?.dispose();
    };
  }, [geometry, texture]);

  if (backSide !== "laser_engraving" || !texture) return null;

  return (
    <mesh
      geometry={geometry}
      // rotation [0, PI, 0]: mesh faces -Z (pin back).
      // When the pin group rotates PI around Y (showing back to viewer), the two
      // Y-flips cancel — the canvas texture appears flat, readable, on the back face.
      rotation={[0, Math.PI, 0]}
      // z=+0.001 in local space: after group Y-rotation, maps to z=-0.001 world,
      // which is just in front of the back face (z=0) from the back-side viewer.
      position={[0, 0, 0.001]}
      renderOrder={1}
    >
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        polygonOffset
        polygonOffsetFactor={-1}
        polygonOffsetUnits={-1}
      />
    </mesh>
  );
}
