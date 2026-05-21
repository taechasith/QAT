"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type CatType = "artist_cat" | "technologist_cat" | "scientist_cat";

const CONFIG = {
  artist_cat: {
    body:   "#f97316",
    belly:  "#fed7aa",
    muzzle: "#fdba74",
    ear:    "#c2410c",
    eye:    "#fbbf24",
    label:  "Artist",
    sub:    "Creative & expressive",
  },
  technologist_cat: {
    body:   "#22d3ee",
    belly:  "#cffafe",
    muzzle: "#67e8f9",
    ear:    "#0e7490",
    eye:    "#34d399",
    label:  "Technologist",
    sub:    "Logical & precise",
  },
  scientist_cat: {
    body:   "#a78bfa",
    belly:  "#ede9fe",
    muzzle: "#c4b5fd",
    ear:    "#6d28d9",
    eye:    "#f9a8d4",
    label:  "Scientist",
    sub:    "Curious & analytical",
  },
};

const INNER_EAR = "#fda4af";
const PUPIL     = "#0f172a";
const NOSE      = "#fb7185";
const WHISKER   = "#e2e8f0";

// ── accessories ──────────────────────────────────────────────────────────────

function ArtistBeret() {
  return (
    <group position={[0, 0.82, 0.05]} rotation={[0.12, 0, -0.24]}>
      <mesh>
        <cylinderGeometry args={[0.36, 0.38, 0.05, 22]} />
        <meshStandardMaterial color="#6b2d0f" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.07, 0]}>
        <sphereGeometry args={[0.27, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#7c2d12" roughness={0.9} />
      </mesh>
      <mesh position={[-0.08, 0.28, 0.06]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>
    </group>
  );
}

function TechGoggles() {
  const mat = (
    <meshStandardMaterial
      color="#0e7490"
      emissive="#22d3ee"
      emissiveIntensity={1.3}
      roughness={0.1}
    />
  );
  return (
    <group>
      <mesh position={[-0.16, 0.32, 0.44]} rotation={[0, 0.3, 0]}>
        <torusGeometry args={[0.11, 0.024, 10, 28]} />
        {mat}
      </mesh>
      <mesh position={[0.16, 0.32, 0.44]} rotation={[0, -0.3, 0]}>
        <torusGeometry args={[0.11, 0.024, 10, 28]} />
        {mat}
      </mesh>
      <mesh position={[0, 0.32, 0.47]}>
        <boxGeometry args={[0.08, 0.028, 0.018]} />
        {mat}
      </mesh>
      {/* strap left */}
      <mesh position={[-0.32, 0.32, 0.30]} rotation={[0, 0.6, 0]}>
        <boxGeometry args={[0.12, 0.022, 0.012]} />
        {mat}
      </mesh>
      {/* strap right */}
      <mesh position={[0.32, 0.32, 0.30]} rotation={[0, -0.6, 0]}>
        <boxGeometry args={[0.12, 0.022, 0.012]} />
        {mat}
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
  const p: [number, number, number] = [0, 0.05, 0];
  return (
    <>
      <mesh ref={r1} position={p}>
        <torusGeometry args={[0.82, 0.018, 8, 48]} />
        <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.7} />
      </mesh>
      <mesh ref={r2} position={p} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.82, 0.018, 8, 48]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.7} />
      </mesh>
      <mesh ref={r3} position={p} rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[0.82, 0.018, 8, 48]} />
        <meshStandardMaterial color="#c4b5fd" emissive="#c4b5fd" emissiveIntensity={0.5} />
      </mesh>
    </>
  );
}

// ── tail ─────────────────────────────────────────────────────────────────────

function Tail({ color }: { color: string }) {
  const geo = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0.46, -0.70, -0.10),
      new THREE.Vector3(0.92, -0.10,  0.15),
      new THREE.Vector3(0.68,  0.38, -0.05),
    );
    return new THREE.TubeGeometry(curve, 24, 0.07, 8, false);
  }, []);
  return (
    <mesh geometry={geo}>
      <meshStandardMaterial color={color} roughness={0.6} />
    </mesh>
  );
}

// ── paw helper ───────────────────────────────────────────────────────────────

function Paw({ x, color }: { x: number; color: string }) {
  const sign = x < 0 ? -1 : 1;
  return (
    <group position={[x, -0.90, 0.22]}>
      {/* leg */}
      <mesh position={[0, 0.14, -0.04]} rotation={[0.18, 0, 0]}>
        <cylinderGeometry args={[0.10, 0.095, 0.32, 10]} />
        <meshStandardMaterial color={color} roughness={0.55} />
      </mesh>
      {/* foot pad — flattened oval */}
      <mesh scale={[1.22, 0.42, 1.55]}>
        <sphereGeometry args={[0.115, 12, 10]} />
        <meshStandardMaterial color={color} roughness={0.55} />
      </mesh>
      {/* toe nubs */}
      {([-0.06, 0, 0.06] as number[]).map((dx, i) => (
        <mesh key={i} position={[dx * sign, 0.02, 0.10]} scale={[0.7, 0.5, 0.9]}>
          <sphereGeometry args={[0.045, 8, 6]} />
          <meshStandardMaterial color={color} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

// ── main cat scene ────────────────────────────────────────────────────────────

function CatScene({ type }: { type: CatType }) {
  const groupRef = useRef<THREE.Group>(null);
  const cfg = CONFIG[type];

  useFrame((state, dt) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += dt * 0.35;
    // gentle idle bob
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.018;
  });

  const whiskers: [number, number, number, number][] = [
    [-0.44, 0.22, 0.12, 0.32],
    [-0.44, 0.14, 0.00, 0.36],
    [-0.44, 0.06, -0.12, 0.28],
  ];

  const bodyMat = <meshStandardMaterial color={cfg.body} roughness={0.52} />;

  return (
    <group ref={groupRef}>

      {/* ── TAIL ── */}
      <Tail color={cfg.body} />

      {/* ── BODY — elongated sitting torso ── */}
      <mesh position={[0, -0.46, 0]} scale={[1.0, 1.18, 0.88]}>
        <sphereGeometry args={[0.50, 22, 18]} />
        {bodyMat}
      </mesh>

      {/* ── BELLY — lighter front patch ── */}
      <mesh position={[0, -0.50, 0.30]} scale={[0.7, 1.1, 0.38]}>
        <sphereGeometry args={[0.36, 14, 12]} />
        <meshStandardMaterial color={cfg.belly} roughness={0.65} />
      </mesh>

      {/* ── HAUNCHES — back leg bumps, sitting position ── */}
      <mesh position={[-0.36, -0.76, -0.12]} scale={[0.85, 0.72, 1.05]}>
        <sphereGeometry args={[0.24, 14, 12]} />
        {bodyMat}
      </mesh>
      <mesh position={[0.36, -0.76, -0.12]} scale={[0.85, 0.72, 1.05]}>
        <sphereGeometry args={[0.24, 14, 12]} />
        {bodyMat}
      </mesh>

      {/* ── FRONT PAWS ── */}
      <Paw x={-0.21} color={cfg.body} />
      <Paw x={ 0.21} color={cfg.body} />

      {/* ── NECK — tapered cylinder bridging body to head ── */}
      <mesh position={[0, -0.04, 0.06]} rotation={[-0.08, 0, 0]}>
        <cylinderGeometry args={[0.21, 0.27, 0.26, 14]} />
        {bodyMat}
      </mesh>

      {/* ── HEAD ── */}
      <mesh position={[0, 0.32, 0]}>
        <sphereGeometry args={[0.44, 24, 20]} />
        {bodyMat}
      </mesh>

      {/* ── CHEEKS — puffy jowl bumps ── */}
      <mesh position={[-0.26, 0.16, 0.34]} scale={[0.9, 0.65, 0.55]}>
        <sphereGeometry args={[0.20, 12, 10]} />
        <meshStandardMaterial color={cfg.muzzle} roughness={0.6} />
      </mesh>
      <mesh position={[0.26, 0.16, 0.34]} scale={[0.9, 0.65, 0.55]}>
        <sphereGeometry args={[0.20, 12, 10]} />
        <meshStandardMaterial color={cfg.muzzle} roughness={0.6} />
      </mesh>

      {/* ── MUZZLE — snout dome ── */}
      <mesh position={[0, 0.13, 0.40]} scale={[0.9, 0.70, 0.55]}>
        <sphereGeometry args={[0.22, 14, 12]} />
        <meshStandardMaterial color={cfg.muzzle} roughness={0.6} />
      </mesh>

      {/* ── EARS — outer ── */}
      <mesh position={[-0.28, 0.78, 0.02]} rotation={[0, 0, -0.22]}>
        <coneGeometry args={[0.17, 0.43, 3]} />
        <meshStandardMaterial color={cfg.ear} roughness={0.6} />
      </mesh>
      <mesh position={[0.28, 0.78, 0.02]} rotation={[0, 0, 0.22]}>
        <coneGeometry args={[0.17, 0.43, 3]} />
        <meshStandardMaterial color={cfg.ear} roughness={0.6} />
      </mesh>

      {/* ── EARS — inner pink ── */}
      <mesh position={[-0.27, 0.78, 0.06]} rotation={[0, 0, -0.22]}>
        <coneGeometry args={[0.095, 0.28, 3]} />
        <meshStandardMaterial color={INNER_EAR} roughness={0.6} />
      </mesh>
      <mesh position={[0.27, 0.78, 0.06]} rotation={[0, 0, 0.22]}>
        <coneGeometry args={[0.095, 0.28, 3]} />
        <meshStandardMaterial color={INNER_EAR} roughness={0.6} />
      </mesh>

      {/* ── EYES — iris ── */}
      <mesh position={[-0.16, 0.34, 0.42]}>
        <sphereGeometry args={[0.100, 14, 12]} />
        <meshStandardMaterial color={cfg.eye} emissive={cfg.eye} emissiveIntensity={0.38} />
      </mesh>
      <mesh position={[0.16, 0.34, 0.42]}>
        <sphereGeometry args={[0.100, 14, 12]} />
        <meshStandardMaterial color={cfg.eye} emissive={cfg.eye} emissiveIntensity={0.38} />
      </mesh>

      {/* ── EYES — pupil ── */}
      <mesh position={[-0.16, 0.34, 0.50]}>
        <sphereGeometry args={[0.056, 8, 8]} />
        <meshStandardMaterial color={PUPIL} />
      </mesh>
      <mesh position={[0.16, 0.34, 0.50]}>
        <sphereGeometry args={[0.056, 8, 8]} />
        <meshStandardMaterial color={PUPIL} />
      </mesh>

      {/* ── NOSE ── */}
      <mesh position={[0, 0.17, 0.47]}>
        <sphereGeometry args={[0.044, 8, 8]} />
        <meshStandardMaterial color={NOSE} />
      </mesh>

      {/* ── MOUTH — two small dark dots below nose ── */}
      <mesh position={[-0.042, 0.09, 0.47]}>
        <sphereGeometry args={[0.017, 6, 6]} />
        <meshStandardMaterial color={PUPIL} />
      </mesh>
      <mesh position={[0.042, 0.09, 0.47]}>
        <sphereGeometry args={[0.017, 6, 6]} />
        <meshStandardMaterial color={PUPIL} />
      </mesh>

      {/* ── WHISKERS — left ── */}
      {whiskers.map(([px, py, rz, sx], i) => (
        <mesh key={`wl${i}`} position={[-0.18 - sx / 2, py, 0.41]} rotation={[0, 0, rz]}>
          <boxGeometry args={[sx, 0.010, 0.007]} />
          <meshStandardMaterial color={WHISKER} opacity={0.82} transparent />
        </mesh>
      ))}

      {/* ── WHISKERS — right ── */}
      {whiskers.map(([, py, rz, sx], i) => (
        <mesh key={`wr${i}`} position={[0.18 + sx / 2, py, 0.41]} rotation={[0, 0, -rz]}>
          <boxGeometry args={[sx, 0.010, 0.007]} />
          <meshStandardMaterial color={WHISKER} opacity={0.82} transparent />
        </mesh>
      ))}

      {/* ── ACCESSORY ── */}
      {type === "artist_cat"       && <ArtistBeret />}
      {type === "technologist_cat" && <TechGoggles />}
      {type === "scientist_cat"    && <SciRings />}

    </group>
  );
}

// ── export ────────────────────────────────────────────────────────────────────

export function CatAvatar({ type, size = 120 }: { type: CatType; size?: number }) {
  return (
    <Canvas
      camera={{ position: [0, -0.08, 3.4], fov: 44 }}
      dpr={[1, 1]}
      frameloop="always"
      style={{ width: size, height: size, display: "block" }}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
    >
      <ambientLight intensity={0.60} />
      <directionalLight position={[3, 5, 4]} intensity={1.3} />
      <directionalLight position={[-3, 2, -2]} intensity={0.38} color="#c4b5fd" />
      <pointLight position={[0, 1, 3]} intensity={0.5} color="#ffffff" />
      <CatScene type={type} />
    </Canvas>
  );
}

export { CONFIG as CAT_CONFIG };
