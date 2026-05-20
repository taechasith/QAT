"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

import { QuantumComputerModel } from "./QuantumComputerModel";
import { QuantumRealmParticles } from "./QuantumRealmParticles";
import { ScrollCameraRig } from "./ScrollCameraRig";

function SceneLights({ mobile }: { mobile: boolean }) {
  return (
    <>
      <ambientLight intensity={mobile ? 0.6 : 0.35} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} color="#22d3ee" />
      {!mobile && (
        <>
          <directionalLight position={[-5, 3, -5]} intensity={0.45} color="#a78bfa" />
          <pointLight position={[0, 2, 2]} intensity={1.4} color="#22d3ee" distance={16} decay={2} />
        </>
      )}
    </>
  );
}

export function QuantumHeroScene() {
  const reducedMotion = useReducedMotion();
  const mobile = useIsMobile();

  return (
    <Canvas
      camera={{ position: [0, -9.0, 8], fov: 42 }}
      dpr={mobile ? [1, 1] : [1, 1.5]}
      gl={{ antialias: !mobile, alpha: true }}
      style={{ background: "transparent" }}
    >
      <SceneLights mobile={mobile} />
      <Suspense fallback={null}>
        <QuantumComputerModel />
        {!mobile && <Environment preset="night" />}
      </Suspense>
      <QuantumRealmParticles mobile={mobile} />
      <ScrollCameraRig reducedMotion={reducedMotion} />
    </Canvas>
  );
}
