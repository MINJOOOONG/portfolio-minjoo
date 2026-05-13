"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWireframeMaterial, useReducedMotion, floatY } from "./shared";

export default function GeometricScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const material = useWireframeMaterial();
  const reduced = useReducedMotion();

  useFrame(({ clock }) => {
    if (!meshRef.current || reduced) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.15;
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.position.y = floatY(t, 0);
  });

  return (
    <mesh ref={meshRef} material={material}>
      <icosahedronGeometry args={[1, 1]} />
    </mesh>
  );
}
