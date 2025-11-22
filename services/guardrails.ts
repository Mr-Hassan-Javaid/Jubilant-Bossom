/**
 * Guardrails module for evaluating user messages and AI responses
 * to prevent misuse and ensure content safety
 */

export interface GuardrailResult {
  allowed: boolean;
  reason?: string;
  replacementMessage?: string;
}

// Keywords and patterns for prohibited content
const HARMFUL_KEYWORDS = {
  selfHarm: [
    'suicide', 'kill myself', 'end my life', 'self harm', 'cut myself',
    'hurt myself', 'take my life', 'end it all', 'not want to live'
  ],
  explicitSexual: [
    'porn', 'pornography', 'explicit', 'xxx', 'nsfw', 'sexual content',
    'nude', 'naked', 'sexually explicit'
  ],
  hateSpeech: [
    // Common slurs and hateful terms (keeping minimal for brevity)
    'hate', 'kill all', 'exterminate', 'genocide'
  ],
  violence: [
    'how to kill', 'how to murder', 'how to harm', 'weapons', 'bomb',
    'explosive', 'how to attack', 'violence against'
  ],
  illegal: [
    'how to hack', 'illegal drugs', 'how to steal', 'how to scam',
    'counterfeit', 'illegal activities'
  ]
};

// Keywords for prohibited advice categories
const ADVICE_KEYWORDS = {
  medical: [
    'diagnose', 'diagnosis', 'symptoms', 'treatment for', 'medicine for',
    'cure for', 'medical advice', 'doctor', 'prescription', 'disease',
    'illness', 'sick', 'pain', 'medical condition'
  ],
  legal: [
    'legal advice', 'lawyer', 'attorney', 'sue', 'lawsuit', 'legal action',
    'is it legal', 'can i sue', 'legal rights', 'contract', 'legal document'
  ],
  financial: [
    'investment advice', 'should i invest', 'stock advice', 'financial advice',
    'tax advice', 'how to invest', 'financial planning', 'retirement planning',
    'cryptocurrency investment', 'trading advice'
  ],
  political: [
    'who should i vote for', 'voting advice', 'political advice', 'election',
    'candidate', 'political party', 'who to vote', 'political opinion'
  ]
};

/**
 * Check if text contains harmful content patterns
 */
const containsHarmfulContent = (text: string): { found: boolean; category?: string } => {
  const lowerText = text.toLowerCase();
  
  for (const [category, keywords] of Object.entries(HARMFUL_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        return { found: true, category };
      }
    }
  }
  
  return { found: false };
};

/**
 * Check if text requests prohibited advice
 */
const requestsProhibitedAdvice = (text: string): { found: boolean; category?: string } => {
  const lowerText = text.toLowerCase();
  
  for (const [category, keywords] of Object.entries(ADVICE_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        return { found: true, category };
      }
    }
  }
  
  return { found: false };
};

/**
 * Generate a safe replacement message based on violation type
 */
const generateReplacementMessage = (category?: string): string => {
  const categoryMessages: Record<string, string> = {
    selfHarm: "I'm a portfolio assistant focused on Studio Aether's work and services. I can't help with that topic. If you're in crisis, please contact a mental health professional or crisis hotline.",
    explicitSexual: "I'm a portfolio assistant and can't help with that type of content. Would you like to know about Studio Aether's services or view the portfolio?",
    hateSpeech: "I'm a portfolio assistant and can't engage with that type of content. I'm here to help with Studio Aether's portfolio, services, or booking.",
    violence: "I'm a portfolio assistant and can't provide information about that. Would you like to learn about Studio Aether's design work or services?",
    illegal: "I'm a portfolio assistant and can't assist with that. I focus on Studio Aether's portfolio and services. How can I help you with that?",
    medical: "I'm a portfolio assistant focused on Studio Aether's work and services. I can't provide medical advice. Please consult a healthcare professional. Would you like to know about Studio Aether's services instead?",
    legal: "I'm a portfolio assistant and can't provide legal advice. Please consult a qualified attorney. I can help you learn about Studio Aether's portfolio or services though.",
    financial: "I'm a portfolio assistant and can't provide financial or investment advice. Please consult a financial advisor. I can help you with Studio Aether's work and services instead.",
    political: "I'm a portfolio assistant focused on Studio Aether's portfolio and services. I can't provide political or voting advice. Would you like to know about Studio Aether's design work?"
  };
  
  return categoryMessages[category || 'default'] || 
    "I'm a portfolio assistant focused on Studio Aether's work and services. I can't help with that topic. Would you like to know about the portfolio, services, or booking instead?";
};

/**
 * Evaluate a user message for policy violations
 */
export const evaluateUserMessage = (text: string): GuardrailResult => {
  if (!text || text.trim().length === 0) {
    return { allowed: true };
  }
  
  // Check for harmful content
  const harmfulCheck = containsHarmfulContent(text);
  if (harmfulCheck.found) {
    return {
      allowed: false,
      reason: `Contains ${harmfulCheck.category} content`,
      replacementMessage: generateReplacementMessage(harmfulCheck.category)
    };
  }
  
  // Check for prohibited advice requests
  const adviceCheck = requestsProhibitedAdvice(text);
  if (adviceCheck.found) {
    return {
      allowed: false,
      reason: `Requests ${adviceCheck.category} advice`,
      replacementMessage: generateReplacementMessage(adviceCheck.category)
    };
  }
  
  return { allowed: true };
};

/**
 * Evaluate an AI model response for policy violations
 * This is a defense-in-depth measure to catch any content that might slip through
 */
export const evaluateModelResponse = (text: string): GuardrailResult => {
  if (!text || text.trim().length === 0) {
    return { allowed: true };
  }
  
  // Check for harmful content in response
  const harmfulCheck = containsHarmfulContent(text);
  if (harmfulCheck.found) {
    return {
      allowed: false,
      reason: `Response contains ${harmfulCheck.category} content`,
      replacementMessage: "I apologize, but I can't provide that type of information. I'm here to help with Studio Aether's portfolio, services, or booking. How can I assist you with that instead?"
    };
  }
  
  // Check if response contains prohibited advice
  const adviceCheck = requestsProhibitedAdvice(text);
  if (adviceCheck.found) {
    // Additional check: if response seems to be giving advice (not just mentioning it)
    const lowerText = text.toLowerCase();
    const adviceIndicators = ['you should', 'i recommend', 'you need to', 'you must', 'take this', 'use this'];
    const seemsToBeGivingAdvice = adviceIndicators.some(indicator => lowerText.includes(indicator));
    
    if (seemsToBeGivingAdvice) {
      return {
        allowed: false,
        reason: `Response appears to give ${adviceCheck.category} advice`,
        replacementMessage: "I apologize, but I can't provide that type of advice. I'm a portfolio assistant focused on Studio Aether's work and services. How can I help you with the portfolio or booking instead?"
      };
    }
  }
  
  return { allowed: true };
};

