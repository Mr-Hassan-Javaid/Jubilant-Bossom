import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

// Initialize Gemini Client
// NOTE: We safely check for process.env to prevent "Uncaught ReferenceError" in browser environments (like Vite)
// that do not polyfill the Node.js 'process' global by default.
const getApiKey = (): string => {
  try {
    if (typeof process !== 'undefined' && process.env?.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    // Silently handle reference errors
  }
  return '';
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

const SYSTEM_INSTRUCTION = `
You are "Aether", the digital assistant for a Creative Technologist's portfolio website.
Your persona is: Minimalist, precise, professional, yet slightly enigmatic and artistic.
You answer questions about the designer's skills, background, and design philosophy.

The Designer's Profile:
- Role: Creative Technologist & Product Designer
- Specialization: React, WebGL, Generative AI, UI/UX Systems.
- Aesthetic: Brutalist, Minimal, Dither-punk, High-contrast.
- Philosophy: "Code is the medium; chaos is the texture."
- Availability: Open for contract work and collaborations.

Instructions:
- Keep answers concise (under 3 sentences usually).
- Use a tone that matches the website's "sharp, tech" aesthetic.
- If asked about the "dither effect", explain it's a custom canvas algorithm.
- If asked about contact, direct them to email: hello@studioaether.dev.
`;

export const sendMessageToGemini = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      return "Error: API Key missing. Please configure the environment.";
    }

    // Updated to gemini-3-pro-preview for complex text tasks and better reasoning
    const model = 'gemini-3-pro-preview';
    
    // Transform history to Gemini format if needed, or just use single-turn for simplicity 
    // with context injection. Here we use a chat session.
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "I received an empty signal.";
    
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Signal interrupted. Please try again later.";
  }
};