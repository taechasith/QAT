"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

import { QuantumComputerModel } from "./QuantumComputerModel";
import { QuantumRealmParticles } from "./QuantumRealmParticles";
import { ScrollCameraRig } from "./ScrollCameraRig";

function SceneLights({ mobile }: { mobile: boolean }) {
  return (
    <>
      <ambientLight intensity={mobile ? 0.6 : 0.35} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} color="#9FFFE8" />
      {!mobile && (
        <>
          <directionalLight position={[-5, 3, -5]} intensity={0.45} color="#D4A832" />
          <pointLight position={[0, 2, 2]} intensity={1.4} color="#9FFFE8" distance={16} decay={2} />
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
      camera={{ position: [0, -6.0, 8.5], fov: 42 }}
      dpr={[1, 1.25]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
      }}
      style={{ background: "transparent" }}
    >
      <SceneLights mobile={mobile} />
      <Suspense fallback={null}>
        <QuantumComputerModel />
      </Suspense>
      <QuantumRealmParticles mobile={mobile} />
      <ScrollCameraRig reducedMotion={reducedMotion} />
    </Canvas>
  );
}
