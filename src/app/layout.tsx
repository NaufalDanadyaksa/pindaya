import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Jogja Culture Explorer — Discover Yogyakarta's Heritage",
  description:
    "Scan cultural objects, interact with 3D models, and learn from an AI cultural expert. Your gateway to Yogyakarta's rich heritage.",
  keywords: [
    "Yogyakarta",
    "Jogja",
    "culture",
    "batik",
    "3D",
    "heritage",
    "Indonesia",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
