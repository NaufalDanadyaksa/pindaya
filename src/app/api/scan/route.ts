import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { culturalObjects } from "@/data/culturalObjects";

/* ── Rate limit ── */
let lastScanTime = 0;
const MIN_INTERVAL_MS = 4000;

/* ── Object list for prompt ── */
const objectList = culturalObjects
  .map(
    (o) =>
      `- id:"${o.id}" = ${o.name.en} (${o.category}): ${o.description.en.substring(0, 100)}`,
  )
  .join("\n");

const PROMPT = `You are a Yogyakarta cultural object classifier. Analyze this image and identify which object it matches:

${objectList}

Rules:
- Batik fabric with diagonal S-curves = batik-parang
- Batik fabric with circular/oval grid = batik-kawung
- Wavy dagger/blade = keris-pusaka
- Javanese head covering/hat = blangkon
- Metal percussion instruments/gongs = gamelan
- Shadow puppet figure = wayang-kulit
- Set confidence 0.8-1.0 if sure, 0.4-0.7 if uncertain, below 0.3 if no match

Respond ONLY with JSON: {"id":"object-id","name":"Name","confidence":0.9}`;

export async function POST(req: NextRequest) {
  let imageBase64 = "";
  let mimeType = "image/jpeg";

  try {
    const body = await req.json();
    imageBase64 = body.image || "";
    mimeType = body.mimeType || "image/jpeg";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || !imageBase64) {
    return NextResponse.json({
      id: "",
      name: "",
      confidence: 0,
      mode: "no-key",
    });
  }

  // Rate limiting
  const now = Date.now();
  const wait = MIN_INTERVAL_MS - (now - lastScanTime);
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastScanTime = Date.now();

  try {
    // New official SDK (best practice from quickstart)
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: PROMPT },
            {
              inlineData: {
                mimeType,
                data: imageBase64,
              },
            },
          ],
        },
      ],
      config: {
        maxOutputTokens: 100,
        temperature: 0.1,
      },
    });

    const text = response.text?.trim() || "";

    if (!text) {
      return NextResponse.json({
        id: "",
        name: "",
        confidence: 0,
        mode: "empty",
      });
    }

    // Parse JSON (handle possible markdown wrapping)
    let jsonStr = text;
    if (text.includes("```")) {
      const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (match) jsonStr = match[1].trim();
    }

    const parsed = JSON.parse(jsonStr);

    // Validate id exists in database
    const obj = culturalObjects.find((o) => o.id === parsed.id);
    if (obj) {
      return NextResponse.json({
        id: obj.id,
        name: obj.name.en,
        confidence: Math.min(1, Math.max(0, parsed.confidence || 0.5)),
        mode: "gemini",
      });
    }

    // Try name match
    const nameMatch = culturalObjects.find(
      (o) =>
        o.name.en.toLowerCase().includes((parsed.name || "").toLowerCase()) ||
        o.name.id.toLowerCase().includes((parsed.name || "").toLowerCase()),
    );
    if (nameMatch) {
      return NextResponse.json({
        id: nameMatch.id,
        name: nameMatch.name.en,
        confidence: parsed.confidence || 0.4,
        mode: "gemini",
      });
    }

    return NextResponse.json({
      id: "",
      name: "",
      confidence: 0,
      mode: "gemini",
    });
  } catch (error: unknown) {
    console.error(
      "Scan API error:",
      error instanceof Error ? error.message : error,
    );
    return NextResponse.json({
      id: "",
      name: "",
      confidence: 0,
      mode: "error",
    });
  }
}
