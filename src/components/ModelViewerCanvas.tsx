"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  MeshDistortMaterial,
  useGLTF,
} from "@react-three/drei";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { CulturalObject } from "@/data/culturalObjects";

/* ── GLB Model Loader (auto-fit to view) ────────────── */
function GLBModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Clone scene so each instance is independent
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Auto-fit: compute bounding box, center, and scale to fit nicely
  useEffect(() => {
    if (!groupRef.current) return;

    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // Normalize to fit within ~3 units
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 3;
    const scale = maxDim > 0 ? targetSize / maxDim : 1;

    groupRef.current.scale.setScalar(scale);

    // Center the model
    groupRef.current.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale,
    );

    // Adjust camera distance based on model size
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    }
  }, [clonedScene, camera]);

  // Slow auto-rotate
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={groupRef}>
        <primitive object={clonedScene} />
      </group>
    </Float>
  );
}

/* ── Fallback procedural geometry ───────────────────── */
function FallbackModel({ object }: { object: CulturalObject }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  const renderGeometry = () => {
    switch (object.modelType) {
      case "torus":
        return <torusKnotGeometry args={[1, 0.35, 128, 32]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[1.3, 0]} />;
      case "octahedron":
        return <octahedronGeometry args={[1.4, 0]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[1.3, 0]} />;
      case "cone":
        return <coneGeometry args={[1, 2, 6]} />;
      case "cylinder":
        return <cylinderGeometry args={[0.8, 1.2, 1.5, 8]} />;
      default:
        return <torusKnotGeometry args={[1, 0.35, 128, 32]} />;
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} castShadow receiveShadow>
        {renderGeometry()}
        <MeshDistortMaterial
          color={object.modelColor}
          roughness={0.2}
          metalness={0.8}
          distort={0.15}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

/* ── Scene ──────────────────────────────────────────── */
function Scene({ object }: { object: CulturalObject }) {
  return (
    <>
      {/* Lighting setup */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight
        position={[-5, 3, -3]}
        intensity={0.5}
        color="#C89B3C"
      />
      <directionalLight position={[0, -3, 0]} intensity={0.3} color="#7A3E3E" />
      <hemisphereLight args={["#ffffff", "#444444", 0.4]} />

      {object.modelUrl ? (
        <GLBModel url={object.modelUrl} />
      ) : (
        <FallbackModel object={object} />
      )}

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        minDistance={2}
        maxDistance={12}
        autoRotate
        autoRotateSpeed={1.5}
        target={[0, 0, 0]}
      />
    </>
  );
}

/* ── Canvas Component (code-split from ModelViewer) ─── */
export default function ModelViewerCanvas({
  object,
}: {
  object: CulturalObject;
}) {
  return (
    <Canvas
      camera={{ position: [0, 1, 5], fov: 45 }}
      style={{ background: "transparent" }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
    >
      <Scene object={object} />
    </Canvas>
  );
}
