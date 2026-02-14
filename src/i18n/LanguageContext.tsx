"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { locales, Locale, Translations } from "./locales";

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("jogja-lang") as Locale | null;
    if (saved && (saved === "en" || saved === "id")) {
      setLocale(saved);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLocale((prev) => {
      const next = prev === "en" ? "id" : "en";
      localStorage.setItem("jogja-lang", next);
      return next;
    });
  }, []);

  const t = locales[locale];

  return (
    <LanguageContext.Provider value={{ locale, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
