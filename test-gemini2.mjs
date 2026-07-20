import { GoogleGenAI } from "@google/genai";
const gemini = new GoogleGenAI({ apiKey: "dummy" });
try {
  await gemini.models.generateContent({
    model: "gemini-2.5-pro",
    contents: [{role: "user", parts: [{text: "hi"}]}],
    config: {
      systemInstruction: "test",
    },
  });
} catch (e) {
  console.error("ERROR:", e);
}
