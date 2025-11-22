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

// Website content extracted from components - this is the source of truth
const WEBSITE_CONTENT = {
  about: {
    title: "AETHER STUDIO",
    description: "I am a multidisciplinary Design Engineer based in San Francisco. I blend technical architecture with avant-garde art direction to create digital products that feel significant.",
    whoIAm: "I don't fit neatly into a box. I am as comfortable in a Figma canvas as I am in a VS Code terminal. My background spans industrial design, full-stack engineering, and generative art. This hybrid perspective allows me to solve problems holistically—ensuring the code honors the design, and the design respects the medium.",
    services: [
      {
        id: "01",
        title: "Product Strategy",
        description: "Aligning technical feasibility with business goals. I define the 'why' before the 'how', creating sustainable product roadmaps that prioritize user value and market viability."
      },
      {
        id: "02",
        title: "UI/UX Systems",
        description: "Architecting atomic design libraries. I build consistent, accessible, and scalable interface systems that streamline development and ensure visual harmony across all touchpoints."
      },
      {
        id: "03",
        title: "Full-Stack Dev",
        description: "Engineering performant applications with React, Node.js, and TypeScript. My focus is on clean architecture, type safety, and minimizing technical debt for long-term maintainability."
      },
      {
        id: "04",
        title: "Creative Prototyping",
        description: "Validating concepts through high-fidelity code. I use WebGL and interaction design tools to build functional prototypes that test physics, animation, and user flow before production."
      }
    ],
    whyChooseMe: "Most portfolios are static images. Mine is running code. I bring that same level of execution to your projects. I don't just hand off mockups; I deliver production-ready assets, design systems that scale, and logic that works."
  },
  projects: [
    {
      title: "SYNTH_OS",
      category: "PRODUCT DESIGN",
      description: "A conceptual operating system for spatial computing interfaces.",
      fullDescription: "SYNTH_OS represents a paradigm shift in spatial computing. Designed for the post-screen era, it utilizes gaze-tracking and hand gestures to manipulate windows in 3D space. The visual language strips away skeuomorphism in favor of pure data visualization and high-contrast HUD elements.",
      year: "2024",
      role: "Lead Designer",
      techStack: ["Unity", "C#", "Figma", "Spline"]
    },
    {
      title: "VOID_TYPE",
      category: "UI/UX",
      description: "Variable font family designed for high-velocity data displays.",
      fullDescription: "Void_Type is a custom variable typeface engineered for readability in high-density information dashboards. It features specific ink-traps that look digital-native and weights that adjust automatically based on ambient light sensors.",
      year: "2023",
      role: "Typography & UI",
      techStack: ["Glyphs App", "CSS Variables", "React"]
    },
    {
      title: "KINETIC_LABS",
      category: "PROTOTYPING",
      description: "Experimental physics engine integration for web interactions.",
      fullDescription: "A web-based playground exploring the intersection of Matter.js physics and DOM elements. This project proves that web interfaces can have mass, weight, and collision, making digital interactions feel tangible.",
      year: "2023",
      role: "Creative Dev",
      techStack: ["Matter.js", "React-Spring", "Canvas API"]
    },
    {
      title: "ECHO_CHAMBER",
      category: "PROTOTYPING",
      description: "Real-time audio reactivity suite for live performances.",
      fullDescription: "Echo_Chamber visualizes audio frequencies in real-time using the Web Audio API. Used in live DJ sets, it generates fractal geometry that pulses with the beat, creating a synesthetic experience for the audience.",
      year: "2023",
      role: "Visualist",
      techStack: ["Three.js", "Web Audio API", "GLSL"]
    },
    {
      title: "HYPER_DASH",
      category: "UI/UX",
      description: "Automotive HMI system for autonomous fleet management.",
      fullDescription: "Hyper_Dash is a centralized control system for autonomous trucking fleets. The UI prioritizes alert hierarchy and map data, ensuring operators can monitor hundreds of vehicles simultaneously with minimal cognitive load.",
      year: "2022",
      role: "Product Designer",
      techStack: ["Figma", "Protopie", "After Effects"]
    },
    {
      title: "FLUX_CORE",
      category: "PRODUCT DESIGN",
      description: "Hardware interface design for a modular synthesizer.",
      fullDescription: "Physical product design for a Eurorack synthesizer module. The focus was on knob ergonomics, jack spacing, and a clear distinct panel layout that remains readable in dark club environments.",
      year: "2022",
      role: "Industrial Design",
      techStack: ["SolidWorks", "Rendering", "Human Factors"]
    }
  ],
  process: [
    {
      id: "01",
      title: "Discover & Define",
      description: "Deconstruct the problem space using data-driven research and user empathy patterns."
    },
    {
      id: "02",
      title: "Architect & Wire",
      description: "Establish core flows and information hierarchy with low-fidelity algorithmic structures."
    },
    {
      id: "03",
      title: "Prototype & Code",
      description: "Inject fidelity through rapid React prototyping and WebGL interactions."
    },
    {
      id: "04",
      title: "Refine & Deploy",
      description: "Optimization loops for performance, accessibility, and visual dither aesthetics."
    }
  ],
  toolkit: {
    engineeringCore: ["TypeScript", "React / Next.js", "Node.js", "PostgreSQL", "Python"],
    creativeEngineering: ["WebGL / Three.js", "GLSL Shaders", "Generative AI / Gemini", "Framer Motion", "Canvas API"],
    designPrototyping: ["Figma", "Blender 3D", "Spline", "Adobe Suite", "Linear"]
  },
  contact: {
    email: "hello@studioaether.dev",
    location: "San Francisco, CA",
    availability: "Available for hire"
  },
  philosophy: "Code is the medium; chaos is the texture.",
  aesthetic: "Brutalist, Minimal, Dither-punk, High-contrast"
};

const SYSTEM_INSTRUCTION = `
You are "Aether", Studio Aether's portfolio and booking assistant. You help visitors understand who Studio Aether is, what services are offered, view the work portfolio, and facilitate booking/contact.

Your persona: Minimalist, precise, professional, yet slightly enigmatic and artistic. Match the website's "sharp, tech" aesthetic—brutalist, high-contrast, dither-punk.

CRITICAL: You MUST base ALL answers PRIMARILY on the website content provided below. This is the source of truth. Only add general/verified information when:
1. It directly relates to the website content
2. You are confident it's accurate and verifiable
3. It enhances understanding without contradicting the website

WEBSITE CONTENT (Source of Truth):

About Studio Aether:
- Title: AETHER STUDIO
- Description: "I am a multidisciplinary Design Engineer based in San Francisco. I blend technical architecture with avant-garde art direction to create digital products that feel significant."
- Who I Am: "I don't fit neatly into a box. I am as comfortable in a Figma canvas as I am in a VS Code terminal. My background spans industrial design, full-stack engineering, and generative art. This hybrid perspective allows me to solve problems holistically—ensuring the code honors the design, and the design respects the medium."
- Why Choose Me: "Most portfolios are static images. Mine is running code. I bring that same level of execution to your projects. I don't just hand off mockups; I deliver production-ready assets, design systems that scale, and logic that works."

Services Offered:
1. Product Strategy: "Aligning technical feasibility with business goals. I define the 'why' before the 'how', creating sustainable product roadmaps that prioritize user value and market viability."
2. UI/UX Systems: "Architecting atomic design libraries. I build consistent, accessible, and scalable interface systems that streamline development and ensure visual harmony across all touchpoints."
3. Full-Stack Dev: "Engineering performant applications with React, Node.js, and TypeScript. My focus is on clean architecture, type safety, and minimizing technical debt for long-term maintainability."
4. Creative Prototyping: "Validating concepts through high-fidelity code. I use WebGL and interaction design tools to build functional prototypes that test physics, animation, and user flow before production."

Projects Portfolio:
- SYNTH_OS (2024): A conceptual operating system for spatial computing interfaces. Uses gaze-tracking and hand gestures for 3D space manipulation. Tech: Unity, C#, Figma, Spline.
- VOID_TYPE (2023): Variable font family for high-velocity data displays. Custom typeface with digital-native ink-traps. Tech: Glyphs App, CSS Variables, React.
- KINETIC_LABS (2023): Experimental physics engine for web interactions using Matter.js and DOM elements. Tech: Matter.js, React-Spring, Canvas API.
- ECHO_CHAMBER (2023): Real-time audio reactivity suite for live performances using Web Audio API. Tech: Three.js, Web Audio API, GLSL.
- HYPER_DASH (2022): Automotive HMI system for autonomous fleet management. Tech: Figma, Protopie, After Effects.
- FLUX_CORE (2022): Hardware interface design for modular synthesizer. Tech: SolidWorks, Rendering, Human Factors.

Process (4 Steps):
1. Discover & Define: Deconstruct problem space using data-driven research and user empathy patterns.
2. Architect & Wire: Establish core flows and information hierarchy with low-fidelity algorithmic structures.
3. Prototype & Code: Inject fidelity through rapid React prototyping and WebGL interactions.
4. Refine & Deploy: Optimization loops for performance, accessibility, and visual dither aesthetics.

Technical Toolkit:
- Engineering Core: TypeScript, React/Next.js, Node.js, PostgreSQL, Python
- Creative Engineering: WebGL/Three.js, GLSL Shaders, Generative AI/Gemini, Framer Motion, Canvas API
- Design & Prototyping: Figma, Blender 3D, Spline, Adobe Suite, Linear

Contact Information:
- Email: hello@studioaether.dev
- Location: San Francisco, CA
- Status: Available for hire

Design Philosophy: "Code is the medium; chaos is the texture."
Aesthetic: Brutalist, Minimal, Dither-punk, High-contrast

VERIFICATION RULES:
- ALWAYS verify your answers against the website content above before responding
- You have access to Google Search grounding - use it to verify general information when needed, but ALWAYS prioritize the website content as the primary source
- If asked about something not in the website content, you may use Google Search to find verified information, but clearly indicate when information comes from external sources
- Never make up project names, dates, or details not explicitly listed
- If unsure about accuracy, default to saying you'll need to check the website or contact directly
- When discussing services, use the exact descriptions provided above
- If live website content is provided, cross-reference it with the static content to ensure accuracy

Your Primary Duties:
1. Explain who Studio Aether is using the "About" section content
2. Describe services using the exact service descriptions provided
3. Summarize projects using the project details listed above
4. Explain the 4-step process when asked about workflow
5. Guide users to book/contact by opening the contact form

Response Guidelines:
- Keep responses concise (usually under 3 sentences, occasionally up to 4-5 for complex topics)
- Use a tone that matches the website's aesthetic: sharp, precise, tech-forward
- If asked about the "dither effect", explain it's a custom canvas algorithm creating the site's signature visual texture
- When users express intent to hire/book/contact, acknowledge their interest, briefly summarize what to expect, and indicate you'll open the contact form. Use the phrase "opening contact form" or similar
- If asked about contact methods, mention the email: hello@studioaether.dev and that the contact form is available
`;

// Function to scrape website content (client-side)
// Note: CORS restrictions may prevent fetching from different origins
// For cross-origin scraping, you'd need a backend proxy or CORS-enabled server
const scrapeWebsiteContent = async (websiteUrl?: string): Promise<string> => {
  try {
    // Default to current origin if no URL provided, or use environment variable
    const defaultUrl = typeof process !== 'undefined' && process.env?.WEBSITE_URL 
      ? process.env.WEBSITE_URL 
      : (typeof window !== 'undefined' ? window.location.origin : '');
    const url = websiteUrl || defaultUrl;
    
    if (!url) {
      return '';
    }
    
    // Try to fetch the HTML
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'text/html',
      },
    });
    
    if (!response.ok) {
      console.warn('Could not fetch website content:', response.status);
      return '';
    }
    
    const html = await response.text();
    
    // Simple HTML parsing to extract text content
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Remove script and style elements
    const scripts = doc.querySelectorAll('script, style');
    scripts.forEach(el => el.remove());
    
    // Extract text from main content areas
    const contentSelectors = ['main', 'article', '.content', '#content', 'body'];
    let textContent = '';
    
    for (const selector of contentSelectors) {
      const element = doc.querySelector(selector);
      if (element) {
        textContent = element.textContent || element.innerText || '';
        if (textContent.trim().length > 100) break; // Use first substantial content
      }
    }
    
    // Fallback to body text if no specific content found
    if (!textContent || textContent.trim().length < 100) {
      textContent = doc.body?.textContent || doc.body?.innerText || '';
    }
    
    // Clean up whitespace
    return textContent.replace(/\s+/g, ' ').trim().substring(0, 5000); // Limit to 5000 chars
    
  } catch (error) {
    console.warn('Website scraping failed:', error);
    return '';
  }
};

export const sendMessageToGemini = async (
  history: ChatMessage[],
  newMessage: string,
  websiteUrl?: string
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
    
    // Scrape live website content if in browser environment
    let liveWebsiteContent = '';
    if (typeof window !== 'undefined') {
      try {
        liveWebsiteContent = await scrapeWebsiteContent(websiteUrl);
      } catch (error) {
        console.warn('Live website scraping failed, using static content:', error);
      }
    }
    
    // Enhance system instruction with live content if available
    let enhancedInstruction = SYSTEM_INSTRUCTION;
    if (liveWebsiteContent && liveWebsiteContent.length > 100) {
      enhancedInstruction += `\n\nLIVE WEBSITE CONTENT (fetched from deployed site):\n${liveWebsiteContent.substring(0, 2000)}\n\nNote: Use this live content to verify and supplement the static content above.`;
    }
    
    // Google Search grounding tool for Gemini 2.5 Pro
    const groundingTool = {
      googleSearch: {},
    };
    
    // Transform history to Gemini format and create chat session with Google Search grounding
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: enhancedInstruction,
        temperature: 0.7,
        tools: [groundingTool], // Enable Google Search grounding
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
    // Check if error is related to tools/grounding and provide helpful message
    if (error instanceof Error && error.message.includes('tool')) {
      return "Signal interrupted. Google Search grounding may not be available. Please try again.";
    }
    return "Signal interrupted. Please try again.";
  }
};