"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { useScrollProgress } from "@/hooks/useScrollProgress";

type CameraKeyframe = {
  progress: number;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
};

const PATH: CameraKeyframe[] = [
  { progress: 0.0,  position: [0,    -9.0, 8],   target: [0,  0.3, 0], fov: 42 },
  { progress: 0.18, position: [3.5,  -4.0, 7.5], target: [0,  0.0, 0], fov: 40 },
  { progress: 0.36, position: [-3.2, -2.5, 7.5], target: [0,  0.0, 0], fov: 38 },
  { progress: 0.58, position: [0,    -1.5, 8.0], target: [0,  0.0, 0], fov: 40 },
  { progress: 0.78, position: [0,    -1.0, 9.5], target: [0,  0.0, 0], fov: 44 },
  { progress: 1.0,  position: [0,    -0.8, 12],  target: [0,  0.0, 0], fov: 48 },
];

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function damp(current: number, target: number, lambda: number, dt: number) {
  return lerp(current, target, 1 - Math.exp(-lambda * dt));
}

function samplePath(raw: number): { pos: THREE.Vector3; tgt: THREE.Vector3; fov: number } {
  const p = Math.max(0, Math.min(1, raw));
  let a = PATH[0];
  let b = PATH[PATH.length - 1];
  for (let i = 0; i < PATH.length - 1; i++) {
    if (p >= PATH[i].progress && p <= PATH[i + 1].progress) {
      a = PATH[i];
      b = PATH[i + 1];
      break;
    }
  }
  const range = b.progress - a.progress;
  const t = range > 0 ? smoothstep((p - a.progress) / range) : 0;
  return {
    pos: new THREE.Vector3(
      lerp(a.position[0], b.position[0], t),
      lerp(a.position[1], b.position[1], t),
      lerp(a.position[2], b.position[2], t),
    ),
    tgt: new THREE.Vector3(
      lerp(a.target[0], b.target[0], t),
      lerp(a.target[1], b.target[1], t),
      lerp(a.target[2], b.target[2], t),
    ),
    fov: lerp(a.fov, b.fov, t),
  };
}

export function ScrollCameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera } = useThree();
  const scroll = useScrollProgress();
  const pos = useRef(new THREE.Vector3(...PATH[0].position));
  const tgt = useRef(new THREE.Vector3(...PATH[0].target));
  const fovRef = useRef(PATH[0].fov);

  useFrame((_, dt) => {
    const sample = samplePath(reducedMotion ? 0 : scroll);
    const lam = reducedMotion ? 100 : 5;

    pos.current.set(
      damp(pos.current.x, sample.pos.x, lam, dt),
      damp(pos.current.y, sample.pos.y, lam, dt),
      damp(pos.current.z, sample.pos.z, lam, dt),
    );
    tgt.current.set(
      damp(tgt.current.x, sample.tgt.x, lam, dt),
      damp(tgt.current.y, sample.tgt.y, lam, dt),
      damp(tgt.current.z, sample.tgt.z, lam, dt),
    );
    fovRef.current = damp(fovRef.current, sample.fov, lam, dt);

    camera.position.copy(pos.current);
    camera.lookAt(tgt.current);
    if ("fov" in camera) {
      (camera as THREE.PerspectiveCamera).fov = fovRef.current;
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    }
  });

  return null;
}
