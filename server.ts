import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "20mb" }));

  // Initialize Gemini AI Client lazily or safely
  function getGeminiClient() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API 1: AI Dental & Skin Assessment (Text or Image Multimodal)
  app.post("/api/ai/assess", async (req, res) => {
    try {
      const { prompt, imageBase64, mimeType } = req.body;
      const ai = getGeminiClient();

      let contents: any;
      if (imageBase64 && mimeType) {
        contents = {
          parts: [
            {
              inlineData: {
                data: imageBase64,
                mimeType: mimeType || "image/jpeg",
              },
            },
            {
              text: prompt || "Please analyze this image from an aesthetic dental & skin perspective. Provide a reassuring, clinical overview of possible treatments available at Happy 32 Dentofacial Clinic in Indore, led by Dr. Himanshi Sawlani.",
            },
          ],
        };
      } else {
        contents = prompt || "How can Happy 32 Dentofacial Clinic help with smile design and HydraFacial treatments?";
      }

      const response = await ai.models.generateContent({
        model: imageBase64 ? "gemini-3.1-pro-preview" : "gemini-3.7-flash",
        contents,
        config: {
          systemInstruction:
            "You are the AI Clinical & Aesthetic Assistant for Happy 32 Dentofacial Clinic in Indore, founded by Dr. Himanshi Sawlani. Always provide warm, encouraging, highly professional, and informative guidance on dental treatments (Root Canals, Crowns, Implants, Veneers, Braces) and skin treatments (HydraFacial, Lasers, Glutathione IV). Never provide a definitive medical diagnosis, but educate patients and recommend booking a consultation at Happy 32 on Khatiwala Tank, Indore. Keep responses elegant, concise, and structured.",
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Error in /api/ai/assess:", error);
      res.status(500).json({
        error: error.message || "Failed to generate AI clinical assessment.",
      });
    }
  });

  // API 2: Search-Grounded Consultation Query
  app.post("/api/ai/search-query", async (req, res) => {
    try {
      const { query } = req.body;
      const ai = getGeminiClient();

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: query || "What are the latest advances in laser dentistry and HydraFacial skin rejuvenation?",
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction:
            "You are an expert aesthetic consultant for Happy 32 Dentofacial Clinic. Use Google Search grounding to provide accurate, up-to-date information on dental and skin procedures while contextualizing how Dr. Himanshi Sawlani's clinic in Indore delivers top-tier patient care.",
        },
      });

      const groundingChunks =
        response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

      res.json({
        text: response.text,
        groundingChunks,
      });
    } catch (error: any) {
      console.error("Error in /api/ai/search-query:", error);
      res.status(500).json({
        error: error.message || "Failed to process search query.",
      });
    }
  });

  // API 3: AI Smile Visualization / Image Generation
  app.post("/api/ai/generate-image", async (req, res) => {
    try {
      const { prompt, aspectRatio, imageSize } = req.body;
      const ai = getGeminiClient();

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-image",
        contents: {
          parts: [
            {
              text: prompt || "A pristine, serene modern cosmetic dental and skin studio reception in Indore with warm lighting, ivory and gold aesthetic, elegant minimalist interior.",
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio || "1:1",
            imageSize: imageSize || "1K",
          },
        },
      });

      let generatedImageUrl = null;
      let textOutput = "";

      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            generatedImageUrl = `data:${part.inlineData.mimeType || "image/png"};base64,${part.inlineData.data}`;
          } else if (part.text) {
            textOutput += part.text;
          }
        }
      }

      res.json({
        imageUrl: generatedImageUrl,
        description: textOutput,
      });
    } catch (error: any) {
      console.error("Error in /api/ai/generate-image:", error);
      res.status(500).json({
        error: error.message || "Failed to generate image.",
      });
    }
  });

  // Vite middleware for dev or Static serve for prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Happy 32 Clinic Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
