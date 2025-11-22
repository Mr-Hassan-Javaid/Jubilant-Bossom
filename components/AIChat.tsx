import React, { useState, useRef, useEffect } from 'react';
import { X, CornerDownLeft, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Aether_Interface v3.0 initialized. How may I assist?",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(messages, input);
    
    const modelMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Trigger Button - Redesigned to be compact and stylish */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 h-10 pl-3 pr-4 bg-ink text-sand border border-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-3 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Sparkles className="w-3 h-3" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">Chat_Link</span>
      </button>

      {/* Compact Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[300px] h-[400px] z-50 flex flex-col bg-sand border border-ink shadow-[8px_8px_0px_0px_rgba(26,26,24,0.2)] animate-in slide-in-from-bottom-4 fade-in duration-300">
          
          {/* Header */}
          <div className="bg-ink text-sand h-10 px-4 flex justify-between items-center shrink-0 cursor-default select-none">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-none animate-pulse"></div>
              <span className="font-mono text-[10px] uppercase tracking-widest font-bold">System_Chat // v3</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-white transition-colors">
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F0F0E8] scrollbar-thin scrollbar-thumb-stone-300 scrollbar-track-transparent">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2 duration-300`}
              >
                <div 
                  className={`max-w-[85%] p-3 text-[11px] font-mono leading-relaxed border ${
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
              <div className="flex items-center gap-1 p-2 opacity-50">
                <div className="w-1 h-1 bg-ink animate-bounce"></div>
                <div className="w-1 h-1 bg-ink animate-bounce delay-100"></div>
                <div className="w-1 h-1 bg-ink animate-bounce delay-200"></div>
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
              placeholder="Type to interact..."
              className="flex-1 bg-transparent border-b border-stone-200 focus:border-ink outline-none text-xs font-mono py-1 px-0 transition-colors placeholder:text-stone-300"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="p-2 hover:bg-stone-100 text-ink transition-colors disabled:opacity-30"
            >
              <CornerDownLeft className="w-3 h-3" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};