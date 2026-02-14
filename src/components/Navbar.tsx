"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Compass } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, toggleLanguage, locale } = useLanguage();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/scan", label: t.nav.scan },
    { href: "/explore", label: t.nav.explore },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5 text-secondary" />
            </div>
            <span className="font-bold text-lg text-secondary hidden sm:block">
              Jogja<span className="text-accent">Culture</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-secondary/80 hover:text-accent hover:bg-white/5 transition-all text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-lg glass text-xs font-semibold text-accent hover:bg-accent/10 transition-all flex items-center gap-1.5"
            >
              <span className="text-base">{locale === "en" ? "🇮🇩" : "🇬🇧"}</span>
              {t.nav.language}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-secondary hover:bg-white/5 transition-colors"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-strong border-t border-accent/10"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-lg text-secondary/80 hover:text-accent hover:bg-white/5 transition-all text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
