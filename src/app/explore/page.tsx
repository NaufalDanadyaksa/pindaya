"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import {
  categories,
  getCulturalObjectsByCategory,
} from "@/data/culturalObjects";
import ObjectCard from "@/components/ObjectCard";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ExplorePage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = getCulturalObjectsByCategory(activeCategory);

  const getCategoryLabel = (cat: string) => {
    if (cat === "all") return t.explore.all;
    return t.categories[cat as keyof typeof t.categories] || cat;
  };

  return (
    <div className="min-h-screen px-4 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-accent mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider">
              {t.explore.title}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-secondary mb-3">
            {t.explore.title}
          </h1>
          <p className="text-secondary/50 max-w-xl mx-auto text-sm">
            {t.explore.subtitle}
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-accent/20 text-accent border border-accent/30"
                  : "glass text-secondary/50 hover:text-secondary/80 hover:bg-white/5"
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </motion.div>

        {/* Objects Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((obj, index) => (
              <ObjectCard key={obj.id} object={obj} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-secondary/20 mx-auto mb-4" />
            <p className="text-secondary/40 text-sm">{t.explore.noResults}</p>
          </div>
        )}
      </div>
    </div>
  );
}
