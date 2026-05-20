"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import { useReducedMotion } from "@/hooks/useReducedMotion";

import { QuantumComputerModel } from "./QuantumComputerModel";
import { QuantumRealmParticles } from "./QuantumRealmParticles";
import { ScrollCameraRig } from "./ScrollCameraRig";

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} color="#22d3ee" />
      <directionalLight position={[-5, 3, -5]} intensity={0.45} color="#a78bfa" />
      <pointLight position={[0, 2, 2]} intensity={1.4} color="#22d3ee" distance={16} decay={2} />
    </>
  );
}

export function QuantumHeroScene() {
  const reducedMotion = useReducedMotion();

  return (
    <Canvas
      camera={{ position: [0, -6.0, 8], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <SceneLights />
      <Suspense fallback={null}>
        <QuantumComputerModel />
        <Environment preset="night" />
      </Suspense>
      <QuantumRealmParticles />
      <ScrollCameraRig reducedMotion={reducedMotion} />
    </Canvas>
  );
}
