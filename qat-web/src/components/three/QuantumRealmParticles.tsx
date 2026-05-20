"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const FULL_COUNT = 800;
const LITE_COUNT = 300;
const MAX_RADIUS = 14;
const DEPTH = 22;

export function QuantumRealmParticles({ mobile = false }: { mobile?: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const count = mobile ? LITE_COUNT : FULL_COUNT;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = Math.sqrt(Math.random()) * MAX_RADIUS;
      const theta = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * DEPTH;
      positions[i * 3 + 2] = Math.sin(theta) * radius;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: 0x22d3ee,
        size: 0.07,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.5,
        fog: false,
      }),
    [],
  );

  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.018;
    }
  });

  return <points ref={ref} geometry={geometry} material={material} />;
}
