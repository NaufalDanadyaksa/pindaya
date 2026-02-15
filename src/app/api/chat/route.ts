import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

/* ── Mock responses (fallback) ── */
function getMockResponse(
  question: string,
  objectName: string,
  objectData: {
    description: string;
    history: string;
    philosophy: string;
    culturalMeaning: string;
  },
  locale: string,
): string {
  const q = question.toLowerCase();
  const isID = locale === "id";

  const keywords: Record<string, (n: string, d: typeof objectData) => string> =
    isID
      ? {
          "filosofi|makna|arti": (n, d) =>
            `Filosofi dari ${n} sangat menarik! ${d.philosophy} Apakah ada aspek tertentu yang ingin Anda ketahui lebih lanjut?`,
          "sejarah|asal|kapan": (n, d) =>
            `Mengenai sejarah ${n}: ${d.history} Ini merupakan bagian penting dari warisan budaya Yogyakarta.`,
          "buat|cara|proses": (n, d) =>
            `${n} memiliki proses pembuatan yang kompleks dan diwariskan turun-temurun. ${d.culturalMeaning}`,
          "beli|toko|souvenir": (n) =>
            `Untuk ${n}, Anda bisa mengunjungi galeri dan toko kerajinan di Malioboro, Kotagede, atau area Keraton Yogyakarta.`,
        }
      : {
          "philosophy|meaning|symbol": (n, d) =>
            `The philosophy of ${n} is fascinating! ${d.philosophy} Would you like to know more?`,
          "history|origin|when|old": (n, d) =>
            `Regarding the history of ${n}: ${d.history} It remains important cultural heritage.`,
          "make|made|create|how": (n, d) =>
            `${n} involves a complex creation process passed down through generations. ${d.culturalMeaning}`,
          "buy|shop|souvenir|where": (n) =>
            `For authentic ${n}, visit galleries around Malioboro Street, Kotagede, or near the Yogyakarta Palace.`,
        };

  for (const [pattern, fn] of Object.entries(keywords)) {
    if (new RegExp(pattern).test(q)) return fn(objectName, objectData);
  }

  return isID
    ? `Pertanyaan bagus tentang ${objectName}! ${objectData.description} Ada yang lain yang ingin ditanyakan?`
    : `Great question about ${objectName}! ${objectData.description} Anything else you'd like to know?`;
}

/* ── Rate limit ── */
let lastRequestTime = 0;
const MIN_INTERVAL_MS = 5000;

/* ── API Route ── */
export async function POST(req: NextRequest) {
  let message = "";
  let objectName = "";
  let objectData = {
    description: "",
    history: "",
    philosophy: "",
    culturalMeaning: "",
  };
  let locale = "en";
  let history: { role: string; content: string }[] = [];

  try {
    const body = await req.json();
    message = body.message || "";
    objectName = body.objectName || "";
    objectData = body.objectData || objectData;
    locale = body.locale || "en";
    history = body.history || [];
  } catch {
    return NextResponse.json(
      { reply: "Invalid request.", mode: "error" },
      { status: 400 },
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // No API key → mock mode
  if (!apiKey || apiKey.trim() === "") {
    return NextResponse.json({
      reply: getMockResponse(message, objectName, objectData, locale),
      mode: "mock",
    });
  }

  try {
    // Server-side rate limiting
    const now = Date.now();
    const wait = MIN_INTERVAL_MS - (now - lastRequestTime);
    if (wait > 0) {
      await new Promise((r) => setTimeout(r, wait));
    }
    lastRequestTime = Date.now();

    // System instruction
    const systemInstruction =
      locale === "id"
        ? `Kamu ahli budaya Yogyakarta. Objek: "${objectName}". Info: ${objectData.description} Sejarah: ${objectData.history} Filosofi: ${objectData.philosophy} Makna: ${objectData.culturalMeaning}. Jawab Bahasa Indonesia, ramah, ringkas (2-3 kalimat).`
        : `You are a Yogyakarta cultural expert. Object: "${objectName}". Info: ${objectData.description} History: ${objectData.history} Philosophy: ${objectData.philosophy} Meaning: ${objectData.culturalMeaning}. Be friendly, concise (2-3 sentences).`;

    // Build contents for Gemini API
    const contents: { role: string; parts: { text: string }[] }[] = [];

    // Add chat history (last 6 messages)
    if (Array.isArray(history)) {
      for (const msg of history.slice(-6)) {
        contents.push({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        });
      }
    }

    // Add current message (prepend system instruction on first message)
    const prompt =
      contents.length === 0 ? `${systemInstruction}\n\n${message}` : message;
    contents.push({ role: "user", parts: [{ text: prompt }] });

    // New official SDK (best practice from quickstart)
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
      config: {
        maxOutputTokens: 250,
        temperature: 0.7,
      },
    });

    const reply =
      response.text ||
      (locale === "id" ? "Maaf, coba lagi." : "Sorry, please try again.");

    return NextResponse.json({ reply, mode: "gemini" });
  } catch (error: unknown) {
    console.error(
      "Gemini API error, falling back to mock:",
      error instanceof Error ? error.message : error,
    );

    // Graceful fallback to mock
    const fallback = getMockResponse(message, objectName, objectData, locale);
    return NextResponse.json({ reply: fallback, mode: "mock" });
  }
}
