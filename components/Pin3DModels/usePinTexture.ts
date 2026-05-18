"use client";

import { useEffect, useState } from "react";
import * as THREE from "three";

export function createPlaceholderTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#E5E7EB";
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = "#9CA3AF";
  ctx.font = "24px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Your design", 128, 120);
  ctx.fillText("will appear here", 128, 150);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function usePinTexture(imageUrl: string | null) {
  const [mapTexture, setMapTexture] = useState<THREE.Texture>(() =>
    createPlaceholderTexture()
  );

  useEffect(() => {
    if (!imageUrl) {
      setMapTexture((prev) => {
        prev.dispose();
        return createPlaceholderTexture();
      });
      return;
    }
    const loader = new THREE.TextureLoader();
    loader.load(
      imageUrl,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.premultiplyAlpha = false;
        setMapTexture((prev) => {
          prev.dispose();
          return tex;
        });
      },
      undefined,
      () =>
        setMapTexture((prev) => {
          prev.dispose();
          return createPlaceholderTexture();
        })
    );
  }, [imageUrl]);

  return mapTexture;
}
