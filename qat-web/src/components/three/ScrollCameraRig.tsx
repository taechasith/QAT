"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { useScrollProgress } from "@/hooks/useScrollProgress";

const ORBIT_RADIUS = 8.5;
const START_Y     = -6.0;   // camera height at scroll=0 (looking up)
const END_Y       = -2.0;   // camera height at scroll=1 (still below model)
const START_FOV   = 42;
const END_FOV     = 46;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function damp(current: number, target: number, lambda: number, dt: number) {
  return lerp(current, target, 1 - Math.exp(-lambda * dt));
}

function sampleOrbit(raw: number): { pos: THREE.Vector3; fov: number } {
  const p = Math.max(0, Math.min(1, raw));
  // full 360° orbit as scroll goes 0→1, starting from front (angle=0 = positive Z)
  const angle = p * Math.PI * 2;
  const y     = lerp(START_Y, END_Y, p);
  const fov   = lerp(START_FOV, END_FOV, p);
  return {
    pos: new THREE.Vector3(
      Math.sin(angle) * ORBIT_RADIUS,
      y,
      Math.cos(angle) * ORBIT_RADIUS,
    ),
    fov,
  };
}

const INITIAL = sampleOrbit(0);
const TARGET  = new THREE.Vector3(0, 0, 0);

export function ScrollCameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera } = useThree();
  const scroll   = useScrollProgress();
  const pos      = useRef(INITIAL.pos.clone());
  const fovRef   = useRef(INITIAL.fov);

  useFrame((_, dt) => {
    const sample = sampleOrbit(reducedMotion ? 0 : scroll);
    const lam    = reducedMotion ? 100 : 4;

    pos.current.set(
      damp(pos.current.x, sample.pos.x, lam, dt),
      damp(pos.current.y, sample.pos.y, lam, dt),
      damp(pos.current.z, sample.pos.z, lam, dt),
    );
    fovRef.current = damp(fovRef.current, sample.fov, lam, dt);

    camera.position.copy(pos.current);
    camera.lookAt(TARGET);
    if ("fov" in camera) {
      (camera as THREE.PerspectiveCamera).fov = fovRef.current;
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    }
  });

  return null;
}
