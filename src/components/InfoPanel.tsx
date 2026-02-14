"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, BookOpen, Sparkles } from "lucide-react";
import { CulturalObject } from "@/data/culturalObjects";
import { useLanguage } from "@/i18n/LanguageContext";

export default function InfoPanel({ object }: { object: CulturalObject }) {
  const { t, locale } = useLanguage();

  const sections = [
    {
      icon: MapPin,
      title: t.result.origin,
      content: object.origin[locale],
      color: "text-accent",
    },
    {
      icon: Clock,
      title: t.result.history,
      content: object.history[locale],
      color: "text-blue-400",
    },
    {
      icon: BookOpen,
      title: t.result.philosophy,
      content: object.philosophy[locale],
      color: "text-emerald-400",
    },
    {
      icon: Sparkles,
      title: t.result.culturalMeaning,
      content: object.culturalMeaning[locale],
      color: "text-purple-400",
    },
  ];

  return (
    <div className="space-y-4 overflow-y-auto max-h-[600px] chat-scroll pr-2">
      {/* Object Name & Category */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-secondary mb-1">
          {object.name[locale]}
        </h2>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent border border-accent/30">
          {t.categories[object.category as keyof typeof t.categories] ||
            object.category}
        </span>
        <p className="mt-3 text-secondary/70 text-sm leading-relaxed">
          {object.description[locale]}
        </p>
      </motion.div>

      {/* Info Sections */}
      {sections.map((section, index) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="glass rounded-xl p-4 hover-glow"
        >
          <div className="flex items-center gap-2 mb-2">
            <section.icon className={`w-4 h-4 ${section.color}`} />
            <h3 className="text-sm font-semibold text-secondary">
              {section.title}
            </h3>
          </div>
          <p className="text-secondary/60 text-sm leading-relaxed">
            {section.content}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
