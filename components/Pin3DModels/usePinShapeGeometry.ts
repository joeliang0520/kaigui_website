"use client";

import { useMemo } from "react";
import * as THREE from "three";
import type { PinShape } from "@/lib/pinConfig";

const BASE_SCALE = 5.08; // cm, reference for 3D scale

function createRoundedRectShape(
  halfWidth: number,
  halfHeight: number,
  cornerRadius: number
): THREE.Shape {
  const shape = new THREE.Shape();
  const r = Math.min(cornerRadius, halfWidth * 0.4, halfHeight * 0.4);
  const w = halfWidth - r;
  const h = halfHeight - r;

  shape.moveTo(-w, -halfHeight);
  shape.lineTo(w, -halfHeight);
  shape.quadraticCurveTo(halfWidth, -halfHeight, halfWidth, -h);
  shape.lineTo(halfWidth, h);
  shape.quadraticCurveTo(halfWidth, halfHeight, w, halfHeight);
  shape.lineTo(-w, halfHeight);
  shape.quadraticCurveTo(-halfWidth, halfHeight, -halfWidth, h);
  shape.lineTo(-halfWidth, -h);
  shape.quadraticCurveTo(-halfWidth, -halfHeight, -w, -halfHeight);

  return shape;
}

function createRoundedRectRing(
  halfWidth: number,
  halfHeight: number,
  cornerRadius: number,
  innerScale: number
): THREE.Shape {
  const outer = createRoundedRectShape(halfWidth, halfHeight, cornerRadius);
  const innerHalfW = Math.max(0.01, halfWidth * innerScale);
  const innerHalfH = Math.max(0.01, halfHeight * innerScale);
  const innerR = Math.max(0.01, cornerRadius * innerScale);
  const inner = createRoundedRectShape(innerHalfW, innerHalfH, innerR);
  outer.holes.push(inner);
  return outer;
}

export interface PinShapeGeometry {
  faceGeometry: THREE.BufferGeometry;
  rimGeometry: THREE.BufferGeometry;
  backFaceGeometry: THREE.BufferGeometry;
  isCircle: boolean;
  halfWidth: number;
  halfHeight: number;
}

export function usePinShapeGeometry(
  shape: PinShape,
  sizeWidth: number,
  sizeHeight: number,
  faceScale: number = 0.92,
  rimInnerScale: number = 0.88
): PinShapeGeometry {
  return useMemo(() => {
    const maxSize = Math.max(sizeWidth || 2.54, sizeHeight || 2.54);
    const baseScale = maxSize / BASE_SCALE;

    if (shape === "circle") {
      const radius = baseScale;
      const faceGeometry = new THREE.CircleGeometry(radius * faceScale, 32);
      const rimGeometry = new THREE.RingGeometry(
        radius * rimInnerScale,
        radius,
        32
      );
      const backFaceGeometry = new THREE.CircleGeometry(radius, 32);
      return {
        faceGeometry,
        rimGeometry,
        backFaceGeometry,
        isCircle: true,
        halfWidth: radius,
        halfHeight: radius,
      };
    }

    const isSquare = shape === "square";
    const halfWidth =
      (baseScale * (isSquare ? 1 : (sizeWidth || 2.54) / maxSize)) * faceScale;
    const halfHeight =
      (baseScale * (isSquare ? 1 : (sizeHeight || 2.54) / maxSize)) * faceScale;
    const cornerRadius = Math.min(halfWidth, halfHeight) * 0.2;

    const faceShape = createRoundedRectShape(halfWidth, halfHeight, cornerRadius);
    const faceGeometry = new THREE.ShapeGeometry(faceShape, 32);

    const rimHalfW = halfWidth / faceScale;
    const rimHalfH = halfHeight / faceScale;
    const rimCornerR = cornerRadius / faceScale;
    const rimShape = createRoundedRectRing(
      rimHalfW,
      rimHalfH,
      rimCornerR,
      rimInnerScale
    );
    const rimGeometry = new THREE.ShapeGeometry(rimShape, 32);
    const backFaceShape = createRoundedRectShape(rimHalfW, rimHalfH, rimCornerR);
    const backFaceGeometry = new THREE.ShapeGeometry(backFaceShape, 32);

    return {
      faceGeometry,
      rimGeometry,
      backFaceGeometry,
      isCircle: false,
      halfWidth,
      halfHeight,
    };
  }, [shape, sizeWidth, sizeHeight, faceScale, rimInnerScale]);
}
