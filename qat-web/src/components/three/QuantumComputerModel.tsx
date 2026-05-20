"use client";

import { useGLTF } from "@react-three/drei";

export function QuantumComputerModel() {
  const { scene } = useGLTF("/models/quantum_computer.glb");
  return <primitive object={scene} position={[0, -0.4, 0]} />;
}

