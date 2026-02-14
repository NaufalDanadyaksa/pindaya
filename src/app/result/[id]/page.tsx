"use client";

import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { getCulturalObject } from "@/data/culturalObjects";
import InfoPanel from "@/components/InfoPanel";
import ChatPanel from "@/components/ChatPanel";
import { useLanguage } from "@/i18n/LanguageContext";

// Dynamic import for 3D viewer (no SSR)
const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[300px] rounded-2xl glass glow-border flex items-center justify-center">
      <div className="spinner" />
    </div>
  ),
});

export default function ResultPage() {
  const { t } = useLanguage();
  const params = useParams();
  const id = params.id as string;
  const object = getCulturalObject(id);

  if (!object) {
    notFound();
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-secondary/50 hover:text-accent text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.result.backToExplore}
          </Link>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 3D Viewer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-secondary flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-accent" />
                  {t.result.viewer3d}
                </h2>
              </div>
              <div className="h-[350px] sm:h-[400px]">
                <ModelViewer object={object} />
              </div>
              <p className="text-center text-secondary/30 text-xs mt-3">
                {t.result.dragToRotate}
              </p>
            </div>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4"
          >
            <h2 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {t.result.info}
            </h2>
            <InfoPanel object={object} />
          </motion.div>

          {/* Chat Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <h2 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {t.result.chat}
            </h2>
            <ChatPanel object={object} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
