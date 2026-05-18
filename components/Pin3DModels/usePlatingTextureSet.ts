"use client";

import { useEffect, useState } from "react";

let materialsConfigPromise: Promise<Record<string, string>> | null = null;

async function loadMaterialsConfig(): Promise<Record<string, string>> {
  if (materialsConfigPromise) return materialsConfigPromise;
  materialsConfigPromise = fetch("/pbr/materials.json").then((r) => r.json());
  return materialsConfigPromise;
}

export function usePlatingTextureSet(platingId: string): string | null {
  const [textureSet, setTextureSet] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadMaterialsConfig().then((config) => {
      if (cancelled) return;
      const baseName = (config[platingId] as string)?.trim();
      if (baseName) {
        setTextureSet(`/pbr/${platingId}/${baseName}`);
      } else {
        setTextureSet(null);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [platingId]);

  return textureSet;
}
