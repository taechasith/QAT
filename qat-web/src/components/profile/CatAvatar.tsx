"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type CatType = "artist_cat" | "technologist_cat" | "scientist_cat";

const CONFIG = {
  artist_cat: {
    body: "#f97316",
    ear: "#ea580c",
    label: "Artist",
    sub: "Creative & expressive",
  },
  technologist_cat: {
    body: "#22d3ee",
    ear: "#0891b2",
    label: "Technologist",
    sub: "Logical & precise",
  },
  scientist_cat: {
    body: "#a78bfa",
    ear: "#7c3aed",
    label: "Scientist",
    sub: "Curious & analytical",
  },
};

const EYE_COLOR = "#0f172a";
const NOSE_COLOR = "#fda4af";

function ArtistAccessory() {
  return (
    /* beret */
    <mesh position={[0, 0.82, 0.04]} rotation={[0.15, 0, -0.2]}>
      <cylinderGeometry args={[0.26, 0.3, 0.07, 20]} />
      <meshStandardMaterial color="#78350f" roughness={0.8} />
    </mesh>
  );
}

function TechAccessory() {
  return (
    /* visor band across eyes */
    <mesh position={[0, 0.5, 0.37]}>
      <boxGeometry args={[0.44, 0.1, 0.04]} />
      <meshStandardMaterial color="#0e7490" emissive="#0e7490" emissiveIntensity={0.6} roughness={0.2} />
    </mesh>
  );
}

function SciAccessory() {
  /* three atom rings orbiting the head */
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    if (r1.current) r1.current.rotation.z += dt * 1.2;
    if (r2.current) r2.current.rotation.x += dt * 0.9;
    if (r3.current) r3.current.rotation.y += dt * 1.4;
  });

  return (
    <>
      <mesh ref={r1} position={[0, 0.45, 0]}>
        <torusGeometry args={[0.62, 0.018, 8, 48]} />
        <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={r2} position={[0, 0.45, 0]} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.62, 0.018, 8, 48]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={r3} position={[0, 0.45, 0]} rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[0.62, 0.018, 8, 48]} />
        <meshStandardMaterial color="#c4b5fd" emissive="#c4b5fd" emissiveIntensity={0.4} />
      </mesh>
    </>
  );
}

function CatScene({ type }: { type: CatType }) {
  const groupRef = useRef<THREE.Group>(null);
  const cfg = CONFIG[type];

  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.45;
  });

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh position={[0, -0.28, 0]}>
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshStandardMaterial color={cfg.body} roughness={0.6} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.45, 0]}>
        <sphereGeometry args={[0.38, 16, 16]} />
        <meshStandardMaterial color={cfg.body} roughness={0.6} />
      </mesh>

      {/* Ear left */}
      <mesh position={[-0.23, 0.79, 0]} rotation={[0, 0, -0.3]}>
        <coneGeometry args={[0.12, 0.22, 3]} />
        <meshStandardMaterial color={cfg.ear} roughness={0.6} />
      </mesh>

      {/* Ear right */}
      <mesh position={[0.23, 0.79, 0]} rotation={[0, 0, 0.3]}>
        <coneGeometry args={[0.12, 0.22, 3]} />
        <meshStandardMaterial color={cfg.ear} roughness={0.6} />
      </mesh>

      {/* Eye left */}
      <mesh position={[-0.14, 0.49, 0.36]}>
        <sphereGeometry args={[0.055, 8, 8]} />
        <meshStandardMaterial color={EYE_COLOR} />
      </mesh>

      {/* Eye right */}
      <mesh position={[0.14, 0.49, 0.36]}>
        <sphereGeometry args={[0.055, 8, 8]} />
        <meshStandardMaterial color={EYE_COLOR} />
      </mesh>

      {/* Nose */}
      <mesh position={[0, 0.39, 0.38]}>
        <sphereGeometry args={[0.038, 8, 8]} />
        <meshStandardMaterial color={NOSE_COLOR} />
      </mesh>

      {/* Accessory */}
      {type === "artist_cat" && <ArtistAccessory />}
      {type === "technologist_cat" && <TechAccessory />}
      {type === "scientist_cat" && <SciAccessory />}
    </group>
  );
}

export function CatAvatar({ type, size = 120 }: { type: CatType; size?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0.25, 2.4], fov: 38 }}
      style={{ width: size, height: size, display: "block" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 3]} intensity={1.1} />
      <directionalLight position={[-2, 1, -2]} intensity={0.3} color="#a78bfa" />
      <CatScene type={type} />
    </Canvas>
  );
}

export { CONFIG as CAT_CONFIG };
