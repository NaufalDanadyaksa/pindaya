"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Scan,
  Compass,
  Sparkles,
  ArrowRight,
  Box,
  Grid3X3,
  Layers,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { culturalObjects } from "@/data/culturalObjects";
import ObjectCard from "@/components/ObjectCard";

export default function LandingPage() {
  const { t } = useLanguage();
  const featuredObjects = culturalObjects.slice(0, 3);

  return (
    <div className="relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-accent/3 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-accent text-sm font-medium mb-8"
          >
            {t.hero.badge}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-secondary mb-6"
          >
            {t.hero.title}
            <span className="text-gradient">{t.hero.titleHighlight}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-secondary/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/scan">
              <button className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-accent-dark text-dark font-semibold text-base hover:brightness-110 transition-all shadow-lg shadow-accent/20 hover:shadow-accent/40">
                <Scan className="w-5 h-5" />
                {t.hero.scanBtn}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/explore">
              <button className="flex items-center gap-3 px-8 py-4 rounded-xl glass text-secondary font-semibold text-base hover-glow">
                <Compass className="w-5 h-5 text-accent" />
                {t.hero.exploreBtn}
              </button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-3 gap-4 max-w-md mx-auto mt-16"
          >
            {[
              { icon: Box, value: "6+", label: t.hero.statsObjects },
              { icon: Grid3X3, value: "5", label: t.hero.statsCategories },
              { icon: Layers, value: "3D", label: t.hero.statsInteractive },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-5 h-5 text-accent mx-auto mb-2" />
                <p className="text-xl font-bold text-secondary">{stat.value}</p>
                <p className="text-xs text-secondary/40">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="relative px-4 py-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-accent mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider">
              {t.featured.title}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-3">
            {t.featured.title}
          </h2>
          <p className="text-secondary/50 max-w-xl mx-auto text-sm">
            {t.featured.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredObjects.map((obj, index) => (
            <ObjectCard key={obj.id} object={obj} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link href="/explore">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-accent text-sm font-medium hover-glow">
              {t.featured.viewAll}
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
