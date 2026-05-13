"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWireframeMaterial, useLineMaterial, useReducedMotion, floatY } from "./shared";

const NODES = [
  { pos: [-1.2, 0.3, 0] as [number, number, number] },
  { pos: [-0.4, -0.3, 0] as [number, number, number] },
  { pos: [0.4, 0.3, 0] as [number, number, number] },
  { pos: [1.2, -0.3, 0] as [number, number, number] },
];

export default function FlowScene() {
  const groupRef = useRef<THREE.Group>(null);
  const dotRef = useRef<THREE.Mesh>(null);
  const wireMat = useWireframeMaterial();
  const lineMat = useLineMaterial();
  const reduced = useReducedMotion();

  const linePositions = useMemo(() => {
    const pts: number[] = [];
    for (let i = 0; i < NODES.length - 1; i++) {
      pts.push(...NODES[i].pos, ...NODES[i + 1].pos);
    }
    return new Float32Array(pts);
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current || reduced) return;
    const t = clock.getElapsedTime();
    groupRef.current.position.y = floatY(t, 0);

    // Animate travelling dot
    if (dotRef.current) {
      const progress = (t * 0.3) % 1;
      const segment = Math.min(Math.floor(progress * (NODES.length - 1)), NODES.length - 2);
      const segProgress = (progress * (NODES.length - 1)) - segment;
      const a = NODES[segment].pos;
      const b = NODES[segment + 1].pos;
      dotRef.current.position.set(
        a[0] + (b[0] - a[0]) * segProgress,
        a[1] + (b[1] - a[1]) * segProgress,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Box nodes */}
      {NODES.map((n, i) => (
        <mesh key={i} position={n.pos} material={wireMat}>
          <boxGeometry args={[0.3, 0.25, 0.15]} />
        </mesh>
      ))}
      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={linePositions.length / 3}
          />
        </bufferGeometry>
        <primitive object={lineMat} attach="material" />
      </lineSegments>
      {/* Travelling dot */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#c0c0c0" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
