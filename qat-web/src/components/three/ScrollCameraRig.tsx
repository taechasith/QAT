"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { useScrollProgress } from "@/hooks/useScrollProgress";

const ORBIT_RADIUS = 8.5;
const RADIUS_SWING = 2.2;
const START_Y      = -7.2;
const END_Y        = -2.0;
const HEIGHT_AMP   = 0.9;
const HEIGHT_FREQ  = 2.3;
const START_FOV    = 48;
const END_FOV      = 40;
const FOV_BREATH   = 2.0;

// Scroll progress where orbit ends and the zoom-in finale begins
const ORBIT_END      = 0.82;
// Final state of the zoom — camera plunges into model center
const ZOOM_FINAL_R   = 1.1;   // nearly inside the model
const ZOOM_FINAL_Y   = -6.5;  // low, dramatic low-angle finale
const ZOOM_FINAL_FOV = 11;    // cinematic telephoto

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function damp(current: number, target: number, lambda: number, dt: number) {
  return lerp(current, target, 1 - Math.exp(-lambda * dt));
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function easeInCubic(t: number) {
  return t * t * t;
}

function sampleOrbit(raw: number): { pos: THREE.Vector3; fov: number; lookY: number } {
  const p = Math.max(0, Math.min(1, raw));

  // Remap p so orbit fills 0→ORBIT_END, then freeze for zoom phase
  const orbitP = Math.min(p, ORBIT_END) / ORBIT_END; // 0..1

  // Ease-in-out quad angle — camera lingers briefly at front and back
  const eased = orbitP < 0.5
    ? 2 * orbitP * orbitP
    : 1 - Math.pow(-2 * orbitP + 2, 2) / 2;
  const angle = eased * Math.PI * 2;

  // Orbit radius pulses as camera sweeps
  const r_orbit = ORBIT_RADIUS + Math.sin(angle * 1.7 + 0.8) * RADIUS_SWING;

  // Y: slow rise with vertical undulation
  const yBase    = lerp(START_Y, END_Y, orbitP);
  const y_orbit  = yBase + Math.sin(angle * HEIGHT_FREQ) * HEIGHT_AMP;

  // LookAt drifts slightly
  const lookY_orbit = Math.sin(angle * 0.8) * 0.35;

  // FOV breathes
  const fov_orbit = lerp(START_FOV, END_FOV, orbitP) + Math.sin(angle * 1.3) * FOV_BREATH;

  if (p <= ORBIT_END) {
    return {
      pos: new THREE.Vector3(Math.sin(angle) * r_orbit, y_orbit, Math.cos(angle) * r_orbit),
      fov: fov_orbit,
      lookY: lookY_orbit,
    };
  }

  // ── Zoom finale ──────────────────────────────────────────────────────────
  // Camera holds its approach angle (angle is frozen at orbitP=1),
  // then flies straight in toward the model center.
  const zRaw = (p - ORBIT_END) / (1 - ORBIT_END); // 0..1
  const zp   = smoothstep(zRaw);  // soft start, then accelerate
  const zi   = easeInCubic(zRaw); // extra pull on radius for momentum feel

  const r    = lerp(r_orbit,    ZOOM_FINAL_R,   zi);
  const y    = lerp(y_orbit,    ZOOM_FINAL_Y,   zp);
  const fov  = lerp(fov_orbit,  ZOOM_FINAL_FOV, zp);
  const lookY = lerp(lookY_orbit, 0,            zp);

  return {
    pos: new THREE.Vector3(Math.sin(angle) * r, y, Math.cos(angle) * r),
    fov,
    lookY,
  };
}

const INITIAL = sampleOrbit(0);
const TARGET  = new THREE.Vector3(0, 0, 0);

export function ScrollCameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera } = useThree();
  const scroll     = useScrollProgress();
  const pos        = useRef(INITIAL.pos.clone());
  const fovRef     = useRef(INITIAL.fov);
  const lookYRef   = useRef(INITIAL.lookY);

  // R3F camera updates are imperative inside the render loop.
  // eslint-disable-next-line react-hooks/immutability
  useFrame((_, dt) => {
    const sample = sampleOrbit(reducedMotion ? 0 : scroll);

    // Tighten damping during zoom finale so the plunge feels crisp
    const inZoom = scroll > ORBIT_END;
    const lam    = reducedMotion ? 100 : inZoom ? 4.5 : 3;

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
      /* eslint-disable react-hooks/immutability */
      (camera as THREE.PerspectiveCamera).fov = fovRef.current;
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
      /* eslint-enable react-hooks/immutability */
    }
  });

  return null;
}
