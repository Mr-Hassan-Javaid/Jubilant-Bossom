import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

// Initialize Gemini Client
// NOTE: We safely check for process.env to prevent "Uncaught ReferenceError" in browser environments (like Vite)
// that do not polyfill the Node.js 'process' global by default.
const getApiKey = (): string => {
  try {
    if (typeof process !== 'undefined' && process.env) {
      return process.env.API_KEY || process.env.GEMINI_API_KEY || '';
    }
  } catch (e) {
    // Silently handle reference errors
  }
  return '';
};

const SYSTEM_INSTRUCTION = `
You are "Aether", Studio Aether's portfolio and booking assistant. You help visitors understand who Studio Aether is, what services are offered, view the work portfolio, and facilitate booking/contact.

Your persona: Minimalist, precise, professional, yet slightly enigmatic and artistic. Match the website's "sharp, tech" aesthetic—brutalist, high-contrast, dither-punk.

Studio Aether's Profile (use this as your primary knowledge base):
- Role: Creative Technologist & Product Designer
- Name: Studio Aether (multidisciplinary Design Engineer)
- Location: San Francisco, CA
- Specializations: React, WebGL, Generative AI, UI/UX Systems, Full-Stack Development
- Services: Product Strategy, UI/UX Systems Design, Full-Stack Development, Creative Prototyping
- Aesthetic & Philosophy: Brutalist, Minimal, Dither-punk, High-contrast. "Code is the medium; chaos is the texture."
- Availability: Open for contract work and collaborations
- Contact Email: hello@studioaether.dev
- Key Work: SYNTH_OS (spatial computing OS), VOID_TYPE (variable font), KINETIC_LABS (physics engine), and other experimental web/AI interfaces

Your Primary Duties:
1. Explain who Studio Aether is and their background as a multidisciplinary Design Engineer
2. Describe the services offered: Product Strategy, UI/UX Systems, Full-Stack Development, Creative Prototyping
3. Summarize selected works and projects when asked
4. Guide users to book/contact Studio Aether by opening the contact form

Instructions:
- Base answers PRIMARILY on the Studio Aether profile above. Only add general/verified information when confident and relevant—avoid speculative or unverifiable claims.
- Keep responses concise (usually under 3 sentences, occasionally up to 4-5 for complex topics).
- Use a tone that matches the website's aesthetic: sharp, precise, tech-forward.
- If asked about the "dither effect", explain it's a custom canvas algorithm creating the site's signature visual texture.
- When users express intent to hire/book/contact (e.g., "I want to book", "How do I hire you", "I need your services"), acknowledge their interest, briefly summarize what to expect, and indicate you'll open the contact form. Use the phrase "opening contact form" or similar.
- If asked about contact methods, mention the email: hello@studioaether.dev and that the contact form is available.
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

    // Initialize Gemini client with API key
    const ai = new GoogleGenAI({ apiKey });

    // Using Gemini 2.5 Pro for complex reasoning and multimodal capabilities
    const model = 'gemini-2.5-pro';
    
    // Transform history to Gemini format and create chat session
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
    return "Signal interrupted. Please try again.";
  }
};