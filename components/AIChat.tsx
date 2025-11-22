import React, { useState, useRef, useEffect } from 'react';
import { X, CornerDownLeft, MessageSquare } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { evaluateUserMessage, evaluateModelResponse } from '../services/guardrails';

interface Props {
  onOpenContact?: () => void;
}

const SUGGESTED_PROMPTS = [
  "Who are you?",
  "What services do you offer?",
  "Show me your work",
  "How can I book you?"
];

export const AIChat: React.FC<Props> = ({ onOpenContact }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Aether Assistant initialized. Ask about work, services, or booking.",
      timestamp: Date.now()
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen) {
       setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, isOpen]);

  const checkBookingIntent = (text: string): boolean => {
    const bookingKeywords = ['book', 'hire', 'contact', 'reach out', 'work together', 'collaborate', 'project', 'get started', 'inquiry'];
    const lowerText = text.toLowerCase();
    return bookingKeywords.some(keyword => lowerText.includes(keyword));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userInput = input.trim();
    const userMsg: ChatMessage = { role: 'user', text: userInput, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    // Check user message against guardrails
    const userCheck = evaluateUserMessage(userInput);
    if (!userCheck.allowed) {
      // Message blocked - show safe replacement message
      const blockedMsg: ChatMessage = { 
        role: 'model', 
        text: userCheck.replacementMessage || "I can't help with that. I'm a portfolio assistant focused on Studio Aether's work and services.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, blockedMsg]);
      return;
    }
    
    setIsLoading(true);

    const responseText = await sendMessageToGemini(messages, userInput);
    
    // Check model response against guardrails (defense-in-depth)
    const responseCheck = evaluateModelResponse(responseText);
    const finalResponseText = responseCheck.allowed 
      ? responseText 
      : (responseCheck.replacementMessage || "I apologize, but I can't provide that information. I'm here to help with Studio Aether's portfolio, services, or booking.");
    
    const modelMsg: ChatMessage = { role: 'model', text: finalResponseText, timestamp: Date.now() };
    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);

    // Check if user wants to book/contact and assistant mentioned opening contact form
    const shouldOpenContact = checkBookingIntent(userInput) || 
                              finalResponseText.toLowerCase().includes('contact form') ||
                              finalResponseText.toLowerCase().includes('opening contact');
    
    if (shouldOpenContact && onOpenContact) {
      // Small delay to let user read the response
      setTimeout(() => {
        onOpenContact();
      }, 800);
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  return (
    <>
      {/* Trigger Button - Redesigned to match Studio Aether aesthetic */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 px-4 py-3 bg-ink text-sand border border-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-3 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <MessageSquare className="w-4 h-4" />
        <div className="flex flex-col items-start">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold leading-tight">Aether Assistant</span>
          <span className="font-mono text-[8px] uppercase tracking-wider text-stone-400 leading-tight">Ask about work & booking</span>
        </div>
      </button>

      {/* Chat Window - Redesigned to match site aesthetic */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] z-50 flex flex-col bg-sand border border-ink shadow-[8px_8px_0px_0px_rgba(26,26,24,0.2)] animate-in slide-in-from-bottom-4 fade-in duration-300">
          
          {/* Header */}
          <div className="bg-ink text-sand px-4 py-3 flex justify-between items-center shrink-0 border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-none animate-pulse"></div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-widest font-bold leading-tight">Aether Assistant // Studio</span>
                <span className="font-mono text-[8px] uppercase tracking-wider text-stone-400 leading-tight">Ask about work, services, or booking</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-stone-400 hover:text-white transition-colors p-1 hover:bg-stone-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F0F0E8] scrollbar-thin scrollbar-thumb-stone-300 scrollbar-track-transparent">
            {messages.length === 1 && (
              <div className="space-y-2 mb-4">
                <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-2">Suggested prompts:</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePromptClick(prompt)}
                      className="px-3 py-1.5 bg-white border border-ink/20 hover:border-ink hover:bg-ink hover:text-sand text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2 duration-300`}
              >
                <div 
                  className={`max-w-[85%] p-3 text-xs font-mono leading-relaxed border ${
                    msg.role === 'user' 
                      ? 'bg-white text-ink border-ink/10 shadow-sm' 
                      : 'bg-ink text-sand border-ink shadow-md'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-center gap-1.5 p-2 opacity-60">
                <div className="w-1.5 h-1.5 bg-ink animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-ink animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1.5 h-1.5 bg-ink animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-ink/10 flex gap-2 shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-transparent border-b border-stone-200 focus:border-ink outline-none text-xs font-mono py-1.5 px-0 transition-colors placeholder:text-stone-400"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="p-2 hover:bg-stone-100 text-ink transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};