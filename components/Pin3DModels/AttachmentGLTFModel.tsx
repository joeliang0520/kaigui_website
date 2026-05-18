"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useLoader } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

/**
 * Loads a .glb from /models/attachments/{attachmentId}.glb.
 *
 * - Always uses the uploaded GLB model (no procedural fallback).
 * - Shows nothing (blank) while loading or if file is missing.
 * - Clones the scene on every mount so the same URL can be rendered
 *   multiple times (needed for "two_" dual variants).
 *
 * Place .glb files in:  public/models/attachments/<attachmentId>.glb
 *
 * ── Modeling convention ─────────────────────────────────────────────────────
 *   The loader applies scale = 40 and rotation = [π,0,0] to the GLB scene.
 *
 *   • The disc's pin-touching FACE (not centre) must be exactly at Z = 0.
 *   • The disc body AND the post BOTH extend in the +Z direction from Z = 0.
 *     Nothing should be at negative Z — any geometry below Z = 0 will appear
 *     inside the pin body (overlap) after the automatic 180° flip.
 *   • Centre the disc horizontally at the world origin (X = 0, Y = 0).
 */

// ── File-existence cache (module-level, persists across renders) ──────────
const existsCache = new Map<string, boolean>();

function useGLBExists(url: string): boolean {
  const cached = existsCache.get(url);
  const [exists, setExists] = useState<boolean>(cached ?? false);

  useEffect(() => {
    if (existsCache.has(url)) return;
    fetch(url, { method: "HEAD" })
      .then((r) => {
        existsCache.set(url, r.ok);
        setExists(r.ok);
      })
      .catch(() => {
        existsCache.set(url, false);
        setExists(false);
      });
  }, [url]);

  return exists;
}

// ── Inner loader — only mounted when file is confirmed to exist ──────────

function GLTFScene({
  url,
  material,
  onClick,
  onPointerEnter,
  onPointerLeave,
}: {
  url: string;
  material: THREE.MeshPhysicalMaterial;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}) {
  const gltf = useLoader(GLTFLoader, url);

  // Clone the scene so each instance gets its own scene graph.
  // This allows the same GLB to be rendered multiple times (dual mode).
  const clonedScene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = material;
        child.castShadow = true;
      }
    });
  }, [clonedScene, material]);

  return (
    <primitive
      object={clonedScene}
      scale={40}
      rotation={[Math.PI, 0, 0]}
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    />
  );
}

// ── Public component ─────────────────────────────────────────────────────

export function AttachmentGLTFModel({
  attachmentId,
  material,
  onClick,
  onPointerEnter,
  onPointerLeave,
}: {
  attachmentId: string;
  material: THREE.MeshPhysicalMaterial;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}) {
  const url = `/models/attachments/${attachmentId}.glb`;
  const exists = useGLBExists(url);

  // Show nothing while checking or if file is missing
  if (!exists) return null;

  // Show nothing while Suspense is loading (fallback={null})
  return (
    <Suspense fallback={null}>
      <GLTFScene
        url={url}
        material={material}
        onClick={onClick}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      />
    </Suspense>
  );
}
