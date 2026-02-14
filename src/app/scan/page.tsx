"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Camera,
  CheckCircle,
  Loader2,
  ImageIcon,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageContext";
import { culturalObjects } from "@/data/culturalObjects";

export default function ScanPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"upload" | "camera">("upload");
  const [scanning, setScanning] = useState(false);
  const [recognized, setRecognized] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleScan = useCallback((file?: File) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
    setScanning(true);

    // Mock recognition - pick a random cultural object
    setTimeout(
      () => {
        const randomIndex = Math.floor(Math.random() * culturalObjects.length);
        const obj = culturalObjects[randomIndex];
        setRecognized(obj.id);
        setScanning(false);
      },
      2000 + Math.random() * 1000,
    );
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        handleScan(file);
      }
    },
    [handleScan],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleScan(file);
      }
    },
    [handleScan],
  );

  const resetScan = () => {
    setScanning(false);
    setRecognized(null);
    setPreviewUrl(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-secondary mb-3">
            {t.scan.title}
          </h1>
          <p className="text-secondary/50 text-sm">{t.scan.subtitle}</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex rounded-xl glass p-1 mb-6"
        >
          {[
            { key: "upload" as const, label: t.scan.uploadTab, icon: Upload },
            { key: "camera" as const, label: t.scan.cameraTab, icon: Camera },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                resetScan();
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-accent/20 text-accent"
                  : "text-secondary/50 hover:text-secondary/70"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {activeTab === "upload" ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {!scanning && !recognized ? (
                  /* Upload Dropzone */
                  <label
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    className={`block w-full h-72 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
                      dragOver
                        ? "border-accent bg-accent/10"
                        : "border-accent/20 hover:border-accent/40 glass"
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileInput}
                    />
                    <div className="h-full flex flex-col items-center justify-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-accent" />
                      </div>
                      <div className="text-center">
                        <p className="text-secondary/70 text-sm font-medium">
                          {t.scan.dropzone}
                        </p>
                        <p className="text-secondary/30 text-xs mt-1">
                          {t.scan.formats}
                        </p>
                      </div>
                    </div>
                  </label>
                ) : scanning ? (
                  /* Scanning State */
                  <div className="w-full h-72 rounded-2xl glass glow-border flex flex-col items-center justify-center gap-4">
                    {previewUrl && (
                      <div className="w-20 h-20 rounded-xl overflow-hidden mb-2 border border-accent/20">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <Loader2 className="w-10 h-10 text-accent animate-spin" />
                    <p className="text-secondary/70 text-sm font-medium">
                      {t.scan.scanning}
                    </p>
                    {/* Progress bar */}
                    <div className="w-48 h-1 bg-dark-light rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                        className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
                      />
                    </div>
                  </div>
                ) : recognized ? (
                  /* Result State */
                  <div className="w-full h-72 rounded-2xl glass glow-border flex flex-col items-center justify-center gap-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle className="w-16 h-16 text-emerald-400" />
                    </motion.div>
                    <p className="text-secondary font-semibold text-lg">
                      {t.scan.recognized}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => router.push(`/result/${recognized}`)}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-accent-dark text-dark font-semibold text-sm hover:brightness-110 transition-all"
                      >
                        {t.scan.viewResult}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={resetScan}
                        className="px-6 py-3 rounded-xl glass text-secondary/70 text-sm font-medium hover-glow"
                      >
                        {t.scan.scanAnother}
                      </button>
                    </div>
                  </div>
                ) : null}
              </motion.div>
            ) : (
              /* Camera Tab */
              <motion.div
                key="camera"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-72 rounded-2xl glass flex flex-col items-center justify-center gap-4"
              >
                <Camera className="w-12 h-12 text-secondary/30" />
                <p className="text-secondary/50 text-sm text-center px-8">
                  {t.scan.cameraPlaceholder}
                </p>
                <button
                  onClick={() => setActiveTab("upload")}
                  className="px-5 py-2.5 rounded-xl bg-accent/20 text-accent text-sm font-medium hover:bg-accent/30 transition-all"
                >
                  {t.scan.tryUpload}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
