"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLineMaterial, useReducedMotion, floatY } from "./shared";

export default function TrackScene() {
  const groupRef = useRef<THREE.Group>(null);
  const carRef = useRef<THREE.Mesh>(null);
  const lineMat = useLineMaterial();
  const reduced = useReducedMotion();

  // Elliptical track
  const trackPositions = useMemo(() => {
    const pts: number[] = [];
    const segments = 64;
    for (let i = 0; i < segments; i++) {
      const a1 = (i / segments) * Math.PI * 2;
      const a2 = ((i + 1) / segments) * Math.PI * 2;
      pts.push(
        Math.cos(a1) * 1.2,
        Math.sin(a1) * 0.6,
        0,
        Math.cos(a2) * 1.2,
        Math.sin(a2) * 0.6,
        0
      );
    }
    return new Float32Array(pts);
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current || reduced) return;
    const t = clock.getElapsedTime();
    groupRef.current.position.y = floatY(t, 0);
    groupRef.current.rotation.x = 0.3;

    // Move car along track
    if (carRef.current) {
      const angle = t * 0.6;
      carRef.current.position.set(
        Math.cos(angle) * 1.2,
        Math.sin(angle) * 0.6,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Track ellipse */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[trackPositions, 3]}
            count={trackPositions.length / 3}
          />
        </bufferGeometry>
        <primitive object={lineMat} attach="material" />
      </lineSegments>
      {/* Car dot */}
      <mesh ref={carRef}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#c0c0c0" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
