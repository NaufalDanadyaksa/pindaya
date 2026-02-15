"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Camera,
  CheckCircle,
  Loader2,
  ImageIcon,
  ArrowRight,
  RefreshCw,
  CameraOff,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageContext";

interface ScanResult {
  id: string;
  name: string;
  confidence: number;
  mode: "gemini" | "mock";
}

const LOW_CONFIDENCE_THRESHOLD = 0.5;

export default function ScanPage() {
  const { t, locale } = useLanguage();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"upload" | "camera">("upload");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  // Camera refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  // Store last image for re-scan
  const lastImageRef = useRef<{ base64: string; mimeType: string } | null>(
    null,
  );

  /* ── Cleanup camera on unmount or tab switch ── */
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraReady(false);
    setCameraError(false);
  }, []);

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  /* ── Start camera ── */
  const startCamera = useCallback(async () => {
    try {
      setCameraError(false);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setCameraReady(true);
        };
      }
    } catch {
      setCameraError(true);
    }
  }, []);

  /* ── Send image to /api/scan ── */
  const scanImage = useCallback(
    async (base64: string, mimeType: string) => {
      setScanning(true);
      setError(null);
      setNotFound(false);
      setResult(null);
      lastImageRef.current = { base64, mimeType };

      try {
        const res = await fetch("/api/scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64, mimeType }),
        });

        const data: ScanResult = await res.json();

        // If no match found (empty id) or confidence very low → not found
        if (!data.id || data.confidence < 0.3) {
          setNotFound(true);
          setScanning(false);
          return;
        }

        setResult(data);

        // Only auto-redirect if confidence is high enough
        if (data.confidence >= LOW_CONFIDENCE_THRESHOLD) {
          setTimeout(() => {
            router.push(`/result/${data.id}`);
          }, 1800);
        }
      } catch {
        setError(
          locale === "id"
            ? "Gagal memproses gambar. Coba lagi."
            : "Failed to process image. Please try again.",
        );
      } finally {
        setScanning(false);
      }
    },
    [locale, router],
  );

  /* ── Re-scan with same image ── */
  const handleRescan = useCallback(() => {
    if (lastImageRef.current) {
      scanImage(lastImageRef.current.base64, lastImageRef.current.mimeType);
    }
  }, [scanImage]);

  /* ── Compress image to reduce payload size ── */
  const compressImage = useCallback(
    (file: File | Blob): Promise<{ base64: string; mimeType: string }> => {
      return new Promise((resolve) => {
        const img = new window.Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
          URL.revokeObjectURL(url);
          const canvas = document.createElement("canvas");
          const MAX = 800; // max dimension
          let w = img.width;
          let h = img.height;
          if (w > MAX || h > MAX) {
            if (w > h) {
              h = Math.round((h * MAX) / w);
              w = MAX;
            } else {
              w = Math.round((w * MAX) / h);
              h = MAX;
            }
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
          const base64 = dataUrl.split(",")[1];
          resolve({ base64, mimeType: "image/jpeg" });
        };
        img.src = url;
      });
    },
    [],
  );

  /* ── Handle file upload ── */
  const handleFile = useCallback(
    async (file: File) => {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      const { base64, mimeType } = await compressImage(file);
      scanImage(base64, mimeType);
    },
    [scanImage, compressImage],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) handleFile(file);
    },
    [handleFile],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  /* ── Camera capture ── */
  const handleCapture = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);

    // Crop to center square for better object focus
    const size = Math.min(canvas.width, canvas.height);
    const cropX = (canvas.width - size) / 2;
    const cropY = (canvas.height - size) / 2;
    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = size;
    croppedCanvas.height = size;
    const cropCtx = croppedCanvas.getContext("2d");
    if (!cropCtx) return;
    cropCtx.drawImage(canvas, cropX, cropY, size, size, 0, 0, size, size);

    const dataUrl = croppedCanvas.toDataURL("image/jpeg", 0.92);
    setPreviewUrl(dataUrl);

    // Stop camera after capture
    stopCamera();

    const base64 = dataUrl.split(",")[1];
    scanImage(base64, "image/jpeg");
  }, [stopCamera, scanImage]);

  /* ── Reset ── */
  const resetScan = () => {
    setScanning(false);
    setResult(null);
    setPreviewUrl(null);
    setError(null);
    setNotFound(false);
    lastImageRef.current = null;
    stopCamera();
  };

  /* ── Tab switch ── */
  const switchTab = (tab: "upload" | "camera") => {
    resetScan();
    setActiveTab(tab);
    if (tab === "camera") {
      setTimeout(() => startCamera(), 100);
    }
  };

  // Determine if result has low confidence
  const isLowConfidence =
    result && result.confidence < LOW_CONFIDENCE_THRESHOLD;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-lg">
        {/* Hidden canvas for camera capture */}
        <canvas ref={canvasRef} className="hidden" />

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
              onClick={() => switchTab(tab.key)}
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
            {/* ─── UPLOAD TAB ─── */}
            {activeTab === "upload" ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {!scanning && !result && !notFound ? (
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
                  <ScanningView previewUrl={previewUrl} t={t} />
                ) : notFound ? (
                  <NotFoundView
                    previewUrl={previewUrl}
                    t={t}
                    onRescan={handleRescan}
                    onReset={resetScan}
                  />
                ) : result ? (
                  <ResultView
                    result={result}
                    previewUrl={previewUrl}
                    t={t}
                    isLow={!!isLowConfidence}
                    onViewResult={() => router.push(`/result/${result.id}`)}
                    onRescan={handleRescan}
                    onReset={resetScan}
                  />
                ) : null}
              </motion.div>
            ) : (
              /* ─── CAMERA TAB ─── */
              <motion.div
                key="camera"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {!scanning && !result && !notFound ? (
                  <div className="w-full rounded-2xl glass glow-border overflow-hidden">
                    {cameraError ? (
                      <div className="h-72 flex flex-col items-center justify-center gap-4 px-6">
                        <CameraOff className="w-12 h-12 text-red-400/60" />
                        <p className="text-secondary/50 text-sm text-center">
                          {t.scan.cameraError}
                        </p>
                        <button
                          onClick={() => startCamera()}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent/20 text-accent text-sm font-medium hover:bg-accent/30 transition-all"
                        >
                          <RefreshCw className="w-4 h-4" />
                          {t.scan.cameraStart}
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-72 object-cover bg-dark"
                        />
                        {cameraReady && (
                          <>
                            {/* Scan frame overlay */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="w-48 h-48 border-2 border-accent/50 rounded-2xl relative">
                                <div className="absolute -top-px -left-px w-6 h-6 border-t-2 border-l-2 border-accent rounded-tl-lg" />
                                <div className="absolute -top-px -right-px w-6 h-6 border-t-2 border-r-2 border-accent rounded-tr-lg" />
                                <div className="absolute -bottom-px -left-px w-6 h-6 border-b-2 border-l-2 border-accent rounded-bl-lg" />
                                <div className="absolute -bottom-px -right-px w-6 h-6 border-b-2 border-r-2 border-accent rounded-br-lg" />
                              </div>
                            </div>
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                              <button
                                onClick={handleCapture}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-accent-dark text-dark font-semibold text-sm hover:brightness-110 transition-all shadow-lg"
                              >
                                <Camera className="w-4 h-4" />
                                {t.scan.cameraCapture}
                              </button>
                            </div>
                          </>
                        )}
                        {!cameraReady && !cameraError && (
                          <div className="absolute inset-0 flex items-center justify-center bg-dark/80">
                            <Loader2 className="w-8 h-8 text-accent animate-spin" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : scanning ? (
                  <ScanningView previewUrl={previewUrl} t={t} />
                ) : notFound ? (
                  <NotFoundView
                    previewUrl={previewUrl}
                    t={t}
                    onRescan={handleRescan}
                    onReset={resetScan}
                  />
                ) : result ? (
                  <ResultView
                    result={result}
                    previewUrl={previewUrl}
                    t={t}
                    isLow={!!isLowConfidence}
                    onViewResult={() => router.push(`/result/${result.id}`)}
                    onRescan={handleRescan}
                    onReset={resetScan}
                  />
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error toast */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center text-red-400 text-sm"
            >
              {error}
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

/* ── Scanning animation ── */
function ScanningView({
  previewUrl,
  t,
}: {
  previewUrl: string | null;
  t: { scan: { scanning: string } };
}) {
  return (
    <div className="w-full h-72 rounded-2xl glass glow-border flex flex-col items-center justify-center gap-4 relative overflow-hidden">
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
      <p className="text-secondary/70 text-sm font-medium">{t.scan.scanning}</p>
      <div className="w-48 h-1 bg-dark-light rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
        />
      </div>
      {/* Scan line animation */}
      <motion.div
        className="absolute left-0 right-0 h-0.5 bg-accent/40"
        initial={{ top: "10%" }}
        animate={{ top: ["10%", "90%", "10%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ── Not Found Result ── */
function NotFoundView({
  previewUrl,
  t,
  onRescan,
  onReset,
}: {
  previewUrl: string | null;
  t: { scan: { notFound: string; scanAnother: string } };
  onRescan: () => void;
  onReset: () => void;
}) {
  return (
    <div className="w-full rounded-2xl glass border border-red-500/20 flex flex-col items-center justify-center gap-4 py-8 px-6">
      {previewUrl && (
        <div className="w-20 h-20 rounded-xl overflow-hidden border border-red-500/20 opacity-60">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt="Scanned"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <XCircle className="w-14 h-14 text-red-400" />
      </motion.div>
      <p className="text-red-400/80 text-sm text-center max-w-xs font-medium">
        {t.scan.notFound}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <button
          onClick={onRescan}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent/20 text-accent font-semibold text-sm hover:bg-accent/30 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Scan Again
        </button>
        <button
          onClick={onReset}
          className="px-6 py-3 rounded-xl glass text-secondary/70 text-sm font-medium hover-glow"
        >
          {t.scan.scanAnother}
        </button>
      </div>
    </div>
  );
}

/* ── Result with confidence ── */
function ResultView({
  result,
  previewUrl,
  t,
  isLow,
  onViewResult,
  onRescan,
  onReset,
}: {
  result: ScanResult;
  previewUrl: string | null;
  t: {
    scan: {
      recognized: string;
      viewResult: string;
      scanAnother: string;
      redirecting: string;
      confidence: string;
      lowConfidence: string;
    };
  };
  isLow: boolean;
  onViewResult: () => void;
  onRescan: () => void;
  onReset: () => void;
}) {
  const confidencePct = Math.round(result.confidence * 100);
  const confidenceColor =
    confidencePct >= 70
      ? "text-emerald-400"
      : confidencePct >= 50
        ? "text-yellow-400"
        : "text-red-400";
  const barColor =
    confidencePct >= 70
      ? "bg-emerald-400"
      : confidencePct >= 50
        ? "bg-yellow-400"
        : "bg-red-400";

  return (
    <div
      className={`w-full rounded-2xl glass flex flex-col items-center justify-center gap-4 py-8 px-4 ${
        isLow ? "border border-yellow-500/30" : "glow-border"
      }`}
    >
      {previewUrl && (
        <div className="w-24 h-24 rounded-xl overflow-hidden border border-accent/20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt="Scanned"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {isLow ? (
          <AlertTriangle className="w-12 h-12 text-yellow-400" />
        ) : (
          <CheckCircle className="w-12 h-12 text-emerald-400" />
        )}
      </motion.div>

      <div className="text-center">
        <p className="text-secondary font-semibold text-lg">
          {t.scan.recognized}
        </p>
        <p className="text-accent font-bold text-xl mt-1">{result.name}</p>

        {/* Confidence bar */}
        <div className="flex items-center justify-center gap-2 mt-3">
          <div className="w-24 h-2 bg-dark-light rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${confidencePct}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`h-full rounded-full ${barColor}`}
            />
          </div>
          <span className={`text-xs font-medium ${confidenceColor}`}>
            {confidencePct}%
          </span>
        </div>

        {/* Low confidence warning */}
        {isLow && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-yellow-400/70 text-xs mt-2 max-w-xs mx-auto"
          >
            ⚠️ {t.scan.lowConfidence}
          </motion.p>
        )}

        {/* Auto-redirect indicator (only for high confidence) */}
        {!isLow && (
          <p className="text-secondary/30 text-xs mt-2">{t.scan.redirecting}</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <button
          onClick={onViewResult}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-accent-dark text-dark font-semibold text-sm hover:brightness-110 transition-all"
        >
          {t.scan.viewResult}
          <ArrowRight className="w-4 h-4" />
        </button>
        {isLow && (
          <button
            onClick={onRescan}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-500/20 text-yellow-400 text-sm font-semibold hover:bg-yellow-500/30 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Scan Again
          </button>
        )}
        <button
          onClick={onReset}
          className="px-6 py-3 rounded-xl glass text-secondary/70 text-sm font-medium hover-glow"
        >
          {t.scan.scanAnother}
        </button>
      </div>
    </div>
  );
}
