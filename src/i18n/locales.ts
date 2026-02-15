export type Locale = "en" | "id";

export const locales = {
  en: {
    // Navbar
    nav: {
      home: "Home",
      scan: "Scan",
      explore: "Explore",
      language: "ID",
    },
    // Hero / Landing
    hero: {
      badge: "✨ Unlocking Yogyakarta's Cultural Through Technology",
      title: "Pin",
      titleHighlight: "daya",
      subtitle:
        "Pindai Budaya Yogyakarta — Scan cultural objects, interact with 3D models, and learn from an AI cultural expert.",
      scanBtn: "Scan Object",
      exploreBtn: "Explore Culture",
      statsObjects: "Cultural Objects",
      statsCategories: "Categories",
      statsInteractive: "Interactive 3D",
    },
    // Featured Section
    featured: {
      title: "Featured Cultural Objects",
      subtitle:
        "Discover the rich heritage of Yogyakarta through these iconic cultural artifacts",
      viewAll: "View All Objects",
      exploreBtn: "Explore",
    },
    // Scan Page
    scan: {
      title: "Scan Cultural Object",
      subtitle:
        "Upload an image or use your camera to identify cultural objects",
      uploadTab: "Upload Image",
      cameraTab: "Use Camera",
      dropzone: "Drag & drop an image here, or click to browse",
      formats: "Supports JPG, PNG, WebP",
      scanning: "Analyzing cultural object...",
      recognized: "Object Recognized!",
      viewResult: "View 3D Model & Details",
      scanAnother: "Scan Another",
      cameraPlaceholder:
        "Camera feature coming soon. Please use image upload for now.",
      tryUpload: "Try Image Upload",
      cameraCapture: "Capture & Scan",
      cameraStart: "Start Camera",
      cameraError: "Could not access camera. Please allow camera permission.",
      redirecting: "Redirecting to result...",
      confidence: "Confidence",
      notFound: "No matching cultural object found. Try a clearer image.",
      lowConfidence: "Result might not be accurate. Try scanning again?",
    },
    // Result Page
    result: {
      viewer3d: "3D Model Viewer",
      dragToRotate: "Drag to rotate • Scroll to zoom • Right-click to pan",
      info: "Cultural Information",
      origin: "Origin",
      category: "Category",
      history: "History",
      philosophy: "Philosophy",
      culturalMeaning: "Cultural Meaning",
      backToExplore: "← Back to Explore",
      chat: "AI Cultural Expert",
    },
    // Chat
    chat: {
      placeholder: "Ask about this cultural object...",
      send: "Send",
      greeting:
        "Hello! 👋 I'm your Pindaya cultural expert. Ask me anything about",
      thinking: "Thinking...",
    },
    // Explore Page
    explore: {
      title: "Explore Pindaya",
      subtitle: "Unlocking Yogyakarta's Cultural Through Technology",
      all: "All",
      viewDetail: "View Detail",
      noResults: "No objects found in this category.",
    },
    // Categories
    categories: {
      batik: "Batik",
      weapon: "Traditional Weapons",
      clothing: "Traditional Clothing",
      artifact: "Artifacts",
      instrument: "Musical Instruments",
    },
    // Footer
    footer: {
      tagline: "Pindaya — Unlocking Yogyakarta's Cultural Through Technology.",
      quickLinks: "Quick Links",
      contact: "Contact",
      rights: "All rights reserved.",
      madeWith: "Made with ❤️ for Yogyakarta",
    },
  },
  id: {
    // Navbar
    nav: {
      home: "Beranda",
      scan: "Pindai",
      explore: "Jelajahi",
      language: "EN",
    },
    // Hero / Landing
    hero: {
      badge: "✨ Membuka Budaya Yogyakarta Melalui Teknologi",
      title: "Pin",
      titleHighlight: "daya",
      subtitle:
        "Pindai Budaya Yogyakarta — Pindai objek budaya, berinteraksi dengan model 3D, dan belajar dari ahli budaya AI.",
      scanBtn: "Pindai Objek",
      exploreBtn: "Jelajahi Budaya",
      statsObjects: "Objek Budaya",
      statsCategories: "Kategori",
      statsInteractive: "3D Interaktif",
    },
    // Featured Section
    featured: {
      title: "Objek Budaya Unggulan",
      subtitle:
        "Temukan warisan budaya Yogyakarta yang kaya melalui artefak budaya ikonik ini",
      viewAll: "Lihat Semua Objek",
      exploreBtn: "Jelajahi",
    },
    // Scan Page
    scan: {
      title: "Pindai Objek Budaya",
      subtitle:
        "Unggah gambar atau gunakan kamera untuk mengidentifikasi objek budaya",
      uploadTab: "Unggah Gambar",
      cameraTab: "Gunakan Kamera",
      dropzone: "Seret & lepas gambar di sini, atau klik untuk memilih",
      formats: "Mendukung JPG, PNG, WebP",
      scanning: "Menganalisis objek budaya...",
      recognized: "Objek Dikenali!",
      viewResult: "Lihat Model 3D & Detail",
      scanAnother: "Pindai Lainnya",
      cameraPlaceholder:
        "Fitur kamera segera hadir. Silakan gunakan unggah gambar untuk saat ini.",
      tryUpload: "Coba Unggah Gambar",
      cameraCapture: "Ambil & Pindai",
      cameraStart: "Mulai Kamera",
      cameraError: "Tidak bisa mengakses kamera. Izinkan akses kamera.",
      redirecting: "Mengarahkan ke hasil...",
      confidence: "Kepercayaan",
      notFound:
        "Tidak ditemukan objek budaya yang cocok. Coba gambar yang lebih jelas.",
      lowConfidence: "Hasil mungkin kurang akurat. Coba pindai ulang?",
    },
    // Result Page
    result: {
      viewer3d: "Penampil Model 3D",
      dragToRotate:
        "Seret untuk memutar • Gulir untuk zoom • Klik kanan untuk geser",
      info: "Informasi Budaya",
      origin: "Asal",
      category: "Kategori",
      history: "Sejarah",
      philosophy: "Filosofi",
      culturalMeaning: "Makna Budaya",
      backToExplore: "← Kembali ke Jelajahi",
      chat: "Ahli Budaya AI",
    },
    // Chat
    chat: {
      placeholder: "Tanyakan tentang objek budaya ini...",
      send: "Kirim",
      greeting: "Halo! 👋 Saya ahli budaya Pindaya. Tanyakan apa saja tentang",
      thinking: "Berpikir...",
    },
    // Explore Page
    explore: {
      title: "Jelajahi Pindaya",
      subtitle: "Membuka Budaya Yogyakarta Melalui Teknologi",
      all: "Semua",
      viewDetail: "Lihat Detail",
      noResults: "Tidak ada objek ditemukan dalam kategori ini.",
    },
    // Categories
    categories: {
      batik: "Batik",
      weapon: "Senjata Tradisional",
      clothing: "Pakaian Tradisional",
      artifact: "Artefak",
      instrument: "Alat Musik",
    },
    // Footer
    footer: {
      tagline: "Pindaya — Membuka Budaya Yogyakarta Melalui Teknologi.",
      quickLinks: "Tautan Cepat",
      contact: "Kontak",
      rights: "Hak cipta dilindungi.",
      madeWith: "Dibuat dengan ❤️ untuk Yogyakarta",
    },
  },
};

export type Translations = typeof locales.en;
