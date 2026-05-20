"use client";

import { useGLTF } from "@react-three/drei";

const MODEL_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/qat-media/quantum_computer.glb`;

export function QuantumComputerModel() {
  const { scene } = useGLTF(MODEL_URL);
  return <primitive object={scene} position={[0, -0.4, 0]} />;
}
