"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWireframeMaterial, useLineMaterial, useReducedMotion, floatY } from "./shared";
import { seededRandom } from "@/lib/seeded-random";

export default function DocumentScene() {
  const groupRef = useRef<THREE.Group>(null);
  const wireMat = useWireframeMaterial();
  const lineMat = useLineMaterial();
  const reduced = useReducedMotion();

  const codeLines = useMemo(() => {
    const rand = seededRandom(77);
    const pts: number[] = [];
    for (let i = 0; i < 5; i++) {
      const y = 0.3 - i * 0.15;
      const width = 0.4 + rand() * 0.5;
      pts.push(-0.5, y, 0.01, -0.5 + width, y, 0.01);
    }
    return new Float32Array(pts);
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current || reduced) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
    groupRef.current.position.y = floatY(t, 0);
  });

  return (
    <group ref={groupRef}>
      {/* Document panels */}
      {[0, -0.15, -0.3].map((z, i) => (
        <mesh key={i} position={[i * 0.12, i * -0.08, z]} material={wireMat}>
          <planeGeometry args={[1.4, 1.0]} />
        </mesh>
      ))}
      {/* Code lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[codeLines, 3]}
            count={codeLines.length / 3}
          />
        </bufferGeometry>
        <primitive object={lineMat} attach="material" />
      </lineSegments>
    </group>
  );
}
