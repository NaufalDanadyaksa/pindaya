"use client";

import { LanguageProvider } from "@/i18n/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <Navbar />
      <main className="min-h-screen pt-16">{children}</main>
      <Footer />
    </LanguageProvider>
  );
}
