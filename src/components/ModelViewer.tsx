"use client";

import dynamic from "next/dynamic";
import { useRef, Suspense, memo } from "react";
import { CulturalObject } from "@/data/culturalObjects";

/* ── Lazy-load heavy Three.js deps only when needed ─── */
const LazyCanvas = dynamic(() => import("./ModelViewerCanvas"), {
  ssr: false,
  loading: () => <LoadingFallback />,
});

/* ── Loading ────────────────────────────────────────── */
function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-dark/50">
      <div className="flex flex-col items-center gap-3">
        <div className="spinner" />
        <p className="text-secondary/40 text-xs">Loading 3D Model...</p>
      </div>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────── */
function ModelViewer({ object }: { object: CulturalObject }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[300px] rounded-2xl overflow-hidden glass glow-border"
    >
      <Suspense fallback={<LoadingFallback />}>
        <LazyCanvas object={object} />
      </Suspense>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-dark/50 to-transparent pointer-events-none" />
    </div>
  );
}

export default memo(ModelViewer);
