"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Eye } from "lucide-react";
import { CulturalObject } from "@/data/culturalObjects";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ObjectCard({
  object,
  index,
}: {
  object: CulturalObject;
  index: number;
}) {
  const { t, locale } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/result/${object.id}`}>
        <div className="group relative rounded-2xl overflow-hidden glass hover-glow cursor-pointer h-full">
          {/* Image placeholder with gradient */}
          <div className="relative h-48 overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${object.modelColor}44 0%, ${object.modelColor}22 50%, rgba(26,26,46,0.8) 100%)`,
              }}
            />
            {/* Decorative pattern */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-full border-2 border-dashed opacity-20"
                style={{ borderColor: object.modelColor }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute w-16 h-16 rounded-full border border-dashed opacity-30"
                style={{ borderColor: object.modelColor }}
              />
              <div
                className="absolute w-8 h-8 rounded-full opacity-40"
                style={{ backgroundColor: object.modelColor }}
              />
            </div>
            {/* Category badge */}
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold glass text-accent uppercase tracking-wider">
                {t.categories[object.category as keyof typeof t.categories] ||
                  object.category}
              </span>
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="flex items-center gap-2 text-accent text-sm font-medium">
                <Eye className="w-4 h-4" />
                {t.explore.viewDetail}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-base font-semibold text-secondary group-hover:text-accent transition-colors">
              {object.name[locale]}
            </h3>
            <p className="text-secondary/50 text-xs mt-1.5 leading-relaxed line-clamp-2">
              {object.description[locale]}
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-secondary/40">
              <MapPinIcon />
              {object.origin[locale]}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function MapPinIcon() {
  return (
    <svg
      className="w-3 h-3"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}
