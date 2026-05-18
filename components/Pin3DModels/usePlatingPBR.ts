"use client";

import { useEffect, useState } from "react";
import * as THREE from "three";

export interface PlatingPBRTextures {
  map: THREE.Texture | null;
  normalMap: THREE.Texture | null;
  roughnessMap: THREE.Texture | null;
  metalnessMap: THREE.Texture | null;
  loaded: boolean;
}

const textureCache = new Map<string, PlatingPBRTextures>();

function loadTexture(
  url: string,
  colorSpace: THREE.ColorSpace = THREE.SRGBColorSpace
): Promise<THREE.Texture> {
  return new Promise((resolve, reject) => {
    const loader = new THREE.TextureLoader();
    loader.load(
      url,
      (tex) => {
        tex.colorSpace = colorSpace;
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        resolve(tex);
      },
      undefined,
      reject
    );
  });
}

async function loadPBRTextures(
  platingId: string,
  baseName: string
): Promise<PlatingPBRTextures> {
  const baseUrls = [
    `/pbr/${platingId}/${baseName}`, // flat: /pbr/gold/Metal042A_2K-JPG_Color.jpg
    `/pbr/${platingId}/${baseName}/${baseName}`, // subfolder: /pbr/gold/Metal042A_2K-JPG/Metal042A_2K-JPG_Color.jpg
  ];

  const results: PlatingPBRTextures = {
    map: null,
    normalMap: null,
    roughnessMap: null,
    metalnessMap: null,
    loaded: false,
  };

  const toTry = [
    { key: "map" as const, suffixes: ["_Color.jpg", "_Color.png"] },
    { key: "normalMap" as const, suffixes: ["_NormalGL.jpg", "_Normal.jpg", "_NormalGL.png", "_Normal.png"] },
    { key: "roughnessMap" as const, suffixes: ["_Roughness.jpg", "_Roughness.png"] },
    { key: "metalnessMap" as const, suffixes: ["_Metalness.jpg", "_Metalness.png"] },
  ];

  for (const { key, suffixes } of toTry) {
    for (const suf of suffixes) {
      let loaded = false;
      for (const baseUrl of baseUrls) {
        const url = `${baseUrl}${suf}`;
        try {
          const tex = await loadTexture(url, key === "normalMap" ? THREE.LinearSRGBColorSpace : THREE.SRGBColorSpace);
          results[key] = tex;
          loaded = true;
          break;
        } catch {
          continue;
        }
      }
      if (loaded) break;
    }
  }

  results.loaded = results.map !== null;
  return results;
}

export function usePlatingPBR(platingId: string): PlatingPBRTextures {
  const [textures, setTextures] = useState<PlatingPBRTextures>(() => ({
    map: null,
    normalMap: null,
    roughnessMap: null,
    metalnessMap: null,
    loaded: false,
  }));

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/pbr/materials.json");
        const config = (await res.json()) as Record<string, string>;
        const baseName = config[platingId]?.trim();
        if (!baseName) {
          setTextures((t) => ({ ...t, loaded: false }));
          return;
        }

        const cacheKey = `${platingId}:${baseName}`;
        const cached = textureCache.get(cacheKey);
        if (cached?.loaded && !cancelled) {
          setTextures(cached);
          return;
        }

        const loaded = await loadPBRTextures(platingId, baseName);
        if (!cancelled) {
          textureCache.set(cacheKey, loaded);
          setTextures(loaded);
        } else {
          [loaded.map, loaded.normalMap, loaded.roughnessMap, loaded.metalnessMap]
            .filter(Boolean)
            .forEach((t) => t!.dispose());
        }
      } catch {
        if (!cancelled) setTextures((t) => ({ ...t, loaded: false }));
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [platingId]);

  return textures;
}
