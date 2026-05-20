"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type CatType = "artist_cat" | "technologist_cat" | "scientist_cat";

const CONFIG = {
  artist_cat: {
    body:    "#f97316",
    ear:     "#c2410c",
    eye:     "#fbbf24",   // amber eyes
    label:   "Artist",
    sub:     "Creative & expressive",
  },
  technologist_cat: {
    body:    "#22d3ee",
    ear:     "#0e7490",
    eye:     "#34d399",   // green eyes
    label:   "Technologist",
    sub:     "Logical & precise",
  },
  scientist_cat: {
    body:    "#a78bfa",
    ear:     "#6d28d9",
    eye:     "#f9a8d4",   // pink eyes
    label:   "Scientist",
    sub:     "Curious & analytical",
  },
};

const INNER_EAR = "#fda4af";
const PUPIL     = "#0f172a";
const NOSE      = "#fb7185";
const WHISKER   = "#e2e8f0";

// ---------- accessories ----------

function ArtistBeret() {
  return (
    <group position={[0, 0.75, 0.05]} rotation={[0.12, 0, -0.22]}>
      {/* brim */}
      <mesh>
        <cylinderGeometry args={[0.36, 0.38, 0.05, 20]} />
        <meshStandardMaterial color="#6b2d0f" roughness={0.9} />
      </mesh>
      {/* dome */}
      <mesh position={[0, 0.06, 0]}>
        <sphereGeometry args={[0.26, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#7c2d12" roughness={0.9} />
      </mesh>
      {/* button */}
      <mesh position={[0, 0.27, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>
    </group>
  );
}

function TechGoggles() {
  const glowMat = (
    <meshStandardMaterial
      color="#0e7490"
      emissive="#22d3ee"
      emissiveIntensity={1.2}
      roughness={0.1}
    />
  );
  return (
    <group>
      {/* left lens ring */}
      <mesh position={[-0.17, 0.24, 0.38]} rotation={[0, 0.25, 0]}>
        <torusGeometry args={[0.115, 0.025, 10, 28]} />
        {glowMat}
      </mesh>
      {/* right lens ring */}
      <mesh position={[0.17, 0.24, 0.38]} rotation={[0, -0.25, 0]}>
        <torusGeometry args={[0.115, 0.025, 10, 28]} />
        {glowMat}
      </mesh>
      {/* bridge */}
      <mesh position={[0, 0.24, 0.42]}>
        <boxGeometry args={[0.1, 0.03, 0.02]} />
        {glowMat}
      </mesh>
    </group>
  );
}

function SciRings() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (r1.current) r1.current.rotation.z += dt * 1.1;
    if (r2.current) r2.current.rotation.x += dt * 0.8;
    if (r3.current) r3.current.rotation.y += dt * 1.3;
  });
  const pos: [number, number, number] = [0, 0.1, 0];
  return (
    <>
      <mesh ref={r1} position={pos}>
        <torusGeometry args={[0.78, 0.018, 8, 48]} />
        <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.7} />
      </mesh>
      <mesh ref={r2} position={pos} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.78, 0.018, 8, 48]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.7} />
      </mesh>
      <mesh ref={r3} position={pos} rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[0.78, 0.018, 8, 48]} />
        <meshStandardMaterial color="#c4b5fd" emissive="#c4b5fd" emissiveIntensity={0.5} />
      </mesh>
    </>
  );
}

// ---------- tail ----------

function Tail({ color }: { color: string }) {
  const geo = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0.44, -0.65, 0),
      new THREE.Vector3(0.90, -0.20, 0.1),
      new THREE.Vector3(0.72,  0.30, 0),
    );
    return new THREE.TubeGeometry(curve, 20, 0.06, 8, false);
  }, []);
  return (
    <mesh geometry={geo}>
      <meshStandardMaterial color={color} roughness={0.6} />
    </mesh>
  );
}

// ---------- main cat ----------

function CatScene({ type }: { type: CatType }) {
  const groupRef = useRef<THREE.Group>(null);
  const cfg = CONFIG[type];

  useFrame((_, dt) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += dt * 0.35;
    }
  });

  // whisker helper: [posX, posY, rotZ, scaleX]
  const whiskers: [number, number, number, number][] = [
    [-0.48, 0.20, 0.10, 0.34],
    [-0.48, 0.14, 0.00, 0.36],
    [-0.48, 0.08, -0.10, 0.30],
  ];

  return (
    <group ref={groupRef}>

      {/* ── BODY ── */}
      <mesh position={[0, -0.58, 0]}>
        <sphereGeometry args={[0.50, 18, 14]} />
        <meshStandardMaterial color={cfg.body} roughness={0.55} />
      </mesh>

      {/* ── TAIL ── */}
      <Tail color={cfg.body} />

      {/* ── HEAD ── */}
      <mesh position={[0, 0.22, 0]}>
        <sphereGeometry args={[0.44, 20, 16]} />
        <meshStandardMaterial color={cfg.body} roughness={0.55} />
      </mesh>

      {/* ── EARS ── outer */}
      <mesh position={[-0.30, 0.70, 0]} rotation={[0, 0, -0.18]}>
        <coneGeometry args={[0.16, 0.42, 3]} />
        <meshStandardMaterial color={cfg.ear} roughness={0.6} />
      </mesh>
      <mesh position={[0.30, 0.70, 0]} rotation={[0, 0, 0.18]}>
        <coneGeometry args={[0.16, 0.42, 3]} />
        <meshStandardMaterial color={cfg.ear} roughness={0.6} />
      </mesh>

      {/* ── EARS ── inner pink */}
      <mesh position={[-0.29, 0.70, 0.04]} rotation={[0, 0, -0.18]}>
        <coneGeometry args={[0.09, 0.28, 3]} />
        <meshStandardMaterial color={INNER_EAR} roughness={0.6} />
      </mesh>
      <mesh position={[0.29, 0.70, 0.04]} rotation={[0, 0, 0.18]}>
        <coneGeometry args={[0.09, 0.28, 3]} />
        <meshStandardMaterial color={INNER_EAR} roughness={0.6} />
      </mesh>

      {/* ── EYES ── iris */}
      <mesh position={[-0.17, 0.26, 0.38]}>
        <sphereGeometry args={[0.095, 12, 10]} />
        <meshStandardMaterial color={cfg.eye} emissive={cfg.eye} emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.17, 0.26, 0.38]}>
        <sphereGeometry args={[0.095, 12, 10]} />
        <meshStandardMaterial color={cfg.eye} emissive={cfg.eye} emissiveIntensity={0.3} />
      </mesh>

      {/* ── EYES ── pupil */}
      <mesh position={[-0.17, 0.26, 0.46]}>
        <sphereGeometry args={[0.052, 8, 8]} />
        <meshStandardMaterial color={PUPIL} />
      </mesh>
      <mesh position={[0.17, 0.26, 0.46]}>
        <sphereGeometry args={[0.052, 8, 8]} />
        <meshStandardMaterial color={PUPIL} />
      </mesh>

      {/* ── NOSE ── */}
      <mesh position={[0, 0.12, 0.44]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color={NOSE} />
      </mesh>

      {/* ── WHISKERS ── left */}
      {whiskers.map(([px, py, rz, sx], i) => (
        <mesh key={`wl${i}`} position={[-0.22 - sx / 2, py, 0.36]} rotation={[0, 0, rz]}>
          <boxGeometry args={[sx, 0.012, 0.008]} />
          <meshStandardMaterial color={WHISKER} opacity={0.7} transparent />
        </mesh>
      ))}

      {/* ── WHISKERS ── right */}
      {whiskers.map(([, py, rz, sx], i) => (
        <mesh key={`wr${i}`} position={[0.22 + sx / 2, py, 0.36]} rotation={[0, 0, -rz]}>
          <boxGeometry args={[sx, 0.012, 0.008]} />
          <meshStandardMaterial color={WHISKER} opacity={0.7} transparent />
        </mesh>
      ))}

      {/* ── ACCESSORY ── */}
      {type === "artist_cat"       && <ArtistBeret />}
      {type === "technologist_cat" && <TechGoggles />}
      {type === "scientist_cat"    && <SciRings />}

    </group>
  );
}

export function CatAvatar({ type, size = 120 }: { type: CatType; size?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0.05, 2.9], fov: 46 }}
      style={{ width: size, height: size, display: "block" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[3, 5, 4]} intensity={1.2} />
      <directionalLight position={[-3, 2, -2]} intensity={0.35} color="#c4b5fd" />
      <CatScene type={type} />
    </Canvas>
  );
}

export { CONFIG as CAT_CONFIG };
