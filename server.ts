import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health route
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "ELYSORA Academy Core" });
  });

  // API Route for Gemini AI Assistant integration
  app.post("/api/gemini", async (req, res) => {
    try {
      const { prompt, history, sysMessage } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
        // High-fidelity fallback for smooth local developer onboarding
        return res.status(200).json({
          text: `### Elysora AI Advisor Curation (Demo Mode)

Your \`GEMINI_API_KEY\` is currently using a default placeholder. To fully unlock the real-time Gemini generation model, provide your live key in the **Secrets/Settings panel** of Google AI Studio.

Based on the **Villas & Spa Project** blueprints:
1. **Zen Minimalist Wing integration:** We highly endorse a design using dark emerald local stones (Y: 12% higher thermal mass retention) combined with floor-to-ceiling recessed glazing. The alignment of natural mountain winds will lower mechanical cooling load specs by ~34%.
2. **Material Curation:** The chiseled dolomite surfaces and high-tactility cedar walls provide immediate tactile comfort, setting an elegant hospitality expectation before check-in.

Would you like to auto-generate a comparative layout report or simulate another scenario?`
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const contents = [];
      
      if (history && Array.isArray(history)) {
        for (const msg of history) {
          contents.push({
            role: msg.sender === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.text }]
          });
        }
      }
      
      contents.push({
        role: 'user',
        parts: [{ text: prompt }]
      });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction: sysMessage || "You are the ELYSORA Academy AI Advisor, a world-class strategist in luxury hotel hospitality, biophilic architecture, and guest experiences."
        }
      });

      res.json({ text: response.text || "No response received" });
    } catch (err: any) {
      console.error("Gemini API Error in backend:", err);
      res.status(500).json({ error: err.message || "Failed to contact Gemini engine" });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
