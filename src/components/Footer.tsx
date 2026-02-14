"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import Link from "next/link";
import { Compass, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative mt-20 border-t border-accent/10">
      <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <Compass className="w-5 h-5 text-secondary" />
              </div>
              <span className="font-bold text-lg text-secondary">
                Jogja<span className="text-accent">Culture</span>
              </span>
            </div>
            <p className="text-secondary/60 text-sm leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-accent text-sm uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <div className="space-y-2">
              <Link
                href="/"
                className="block text-secondary/60 hover:text-accent text-sm transition-colors"
              >
                {t.nav.home}
              </Link>
              <Link
                href="/scan"
                className="block text-secondary/60 hover:text-accent text-sm transition-colors"
              >
                {t.nav.scan}
              </Link>
              <Link
                href="/explore"
                className="block text-secondary/60 hover:text-accent text-sm transition-colors"
              >
                {t.nav.explore}
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-accent text-sm uppercase tracking-wider">
              {t.footer.contact}
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-secondary/60 text-sm">
                <MapPin className="w-4 h-4" />
                Yogyakarta, Indonesia
              </div>
              <div className="flex items-center gap-2 text-secondary/60 text-sm">
                <Mail className="w-4 h-4" />
                hello@jogjaculture.id
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-accent/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-secondary/40 text-xs">
            © 2026 JogjaCulture. {t.footer.rights}
          </p>
          <p className="text-secondary/40 text-xs">{t.footer.madeWith}</p>
        </div>
      </div>
    </footer>
  );
}
