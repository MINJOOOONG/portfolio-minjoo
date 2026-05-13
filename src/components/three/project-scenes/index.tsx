"use client";

import { useRef, useState, useEffect, lazy, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { matchProjectScene, type SceneVariant } from "@/lib/project-scene-matcher";

const scenes: Record<SceneVariant, React.LazyExoticComponent<React.ComponentType>> = {
  geometric: lazy(() => import("./geometric-scene")),
  document: lazy(() => import("./document-scene")),
  flow: lazy(() => import("./flow-scene")),
  statemachine: lazy(() => import("./statemachine-scene")),
  console: lazy(() => import("./console-scene")),
  track: lazy(() => import("./track-scene")),
};

interface ProjectMiniSceneProps {
  title: string;
  techStack: string[];
}

export default function ProjectMiniScene({ title, techStack }: ProjectMiniSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
        else setVisible(false);
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const variant = matchProjectScene(title, techStack);
  const SceneComponent = scenes[variant];

  return (
    <div ref={containerRef} className="w-full h-full bg-[var(--notion-surface)]">
      {visible && (
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 3], fov: 50 }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <SceneComponent />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
