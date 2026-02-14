"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  MeshDistortMaterial,
  useGLTF,
  Center,
  Environment,
} from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";
import { CulturalObject } from "@/data/culturalObjects";

/* ── GLB Model Loader ───────────────────────────────── */
function GLBModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <Center>
        <group ref={groupRef}>
          <primitive object={scene} scale={1.5} />
        </group>
      </Center>
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
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <directionalLight
        position={[-3, 3, -3]}
        intensity={0.5}
        color="#C89B3C"
      />
      <pointLight position={[0, -3, 0]} intensity={0.3} color="#7A3E3E" />
      <Environment preset="studio" />

      {object.modelUrl ? (
        <GLBModel url={object.modelUrl} />
      ) : (
        <FallbackModel object={object} />
      )}

      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={1}
        maxDistance={10}
        autoRotate
        autoRotateSpeed={1}
      />
    </>
  );
}

/* ── Loading ────────────────────────────────────────── */
function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="spinner" />
    </div>
  );
}

/* ── Main Component ─────────────────────────────────── */
export default function ModelViewer({ object }: { object: CulturalObject }) {
  return (
    <div className="relative w-full h-full min-h-[300px] rounded-2xl overflow-hidden glass glow-border">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: "transparent" }}
          gl={{ alpha: true, antialias: true }}
        >
          <Scene object={object} />
        </Canvas>
      </Suspense>
      {/* Decorative gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-dark/50 to-transparent pointer-events-none" />
    </div>
  );
}
