"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { useScrollProgress } from "@/hooks/useScrollProgress";

// Base orbit radius — camera weaves in/out by ±RADIUS_SWING
const ORBIT_RADIUS  = 8.5;
const RADIUS_SWING  = 2.2;
// Y: rises overall; a sinusoidal wave adds cinematic dips/climbs
const START_Y       = -7.2;
const END_Y         = -2.0;   // never higher — user prefers low angle
const HEIGHT_AMP    = 0.9;    // ±0.9 unit oscillation
const HEIGHT_FREQ   = 2.3;    // ~2 full bobs per orbit
// FOV: starts wide, tightens, breathes slightly
const START_FOV     = 48;
const END_FOV       = 40;
const FOV_BREATH    = 2.0;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function damp(current: number, target: number, lambda: number, dt: number) {
  return lerp(current, target, 1 - Math.exp(-lambda * dt));
}

function sampleOrbit(raw: number): { pos: THREE.Vector3; fov: number; lookY: number } {
  const p = Math.max(0, Math.min(1, raw));

  // Full 360° orbit; non-linear angle so camera briefly lingers at front/back
  const eased = p < 0.5
    ? 2 * p * p
    : 1 - Math.pow(-2 * p + 2, 2) / 2; // ease-in-out quad
  const angle = eased * Math.PI * 2;

  // Radius pulses — camera sweeps closer then farther as it orbits
  const r = ORBIT_RADIUS + Math.sin(angle * 1.7 + 0.8) * RADIUS_SWING;

  // Y: slow rise with sinusoidal vertical undulation
  const yBase = lerp(START_Y, END_Y, p);
  const y     = yBase + Math.sin(angle * HEIGHT_FREQ) * HEIGHT_AMP;

  // LookAt target drifts slightly in Y — makes orbit feel alive
  const lookY = Math.sin(angle * 0.8) * 0.35;

  // FOV breathes in sync with the radius
  const fov = lerp(START_FOV, END_FOV, p) + Math.sin(angle * 1.3) * FOV_BREATH;

  return {
    pos: new THREE.Vector3(Math.sin(angle) * r, y, Math.cos(angle) * r),
    fov,
    lookY,
  };
}

const INITIAL  = sampleOrbit(0);
const TARGET   = new THREE.Vector3(0, 0, 0);

export function ScrollCameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera } = useThree();
  const scroll    = useScrollProgress();
  const pos       = useRef(INITIAL.pos.clone());
  const fovRef    = useRef(INITIAL.fov);
  const lookYRef  = useRef(INITIAL.lookY);

  useFrame((_, dt) => {
    const sample = sampleOrbit(reducedMotion ? 0 : scroll);
    const lam    = reducedMotion ? 100 : 3;

    pos.current.set(
      damp(pos.current.x, sample.pos.x, lam, dt),
      damp(pos.current.y, sample.pos.y, lam, dt),
      damp(pos.current.z, sample.pos.z, lam, dt),
    );
    fovRef.current   = damp(fovRef.current,  sample.fov,   lam, dt);
    lookYRef.current = damp(lookYRef.current, sample.lookY, lam, dt);

    camera.position.copy(pos.current);
    TARGET.set(0, lookYRef.current, 0);
    camera.lookAt(TARGET);

    if ("fov" in camera) {
      (camera as THREE.PerspectiveCamera).fov = fovRef.current;
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    }
  });

  return null;
}
