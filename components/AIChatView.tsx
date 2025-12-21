
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { Send, Bot, User, Sparkles, X, ArrowLeft } from './Icons';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface AIChatViewProps {
  t: any;
  onBack: () => void;
  langCode: string;
  langLabel: string;
}

export const AIChatView: React.FC<AIChatViewProps> = ({ t, onBack, langCode, langLabel }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<Chat | null>(null);

  useEffect(() => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        // Dinámicamente pedimos a la IA que use el idioma seleccionado
        systemInstruction: `${t.ai_guide.system} IMPORTANT: Always respond in ${langLabel}. Ensure perfect grammar and cultural sensitivity for this specific language.`,
      },
    });
    chatSessionRef.current = chat;
    
    setMessages([
      { role: 'model', text: t.ai_guide.welcome }
    ]);
  }, [langCode, langLabel, t.ai_guide.system, t.ai_guide.welcome]);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading || !chatSessionRef.current) return;

    const userMessage = textToSend.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const result = await chatSessionRef.current.sendMessage({ message: userMessage });
      const text = result.text || "I'm sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Connectivity issues. Please try again! 🌊" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] animate-in slide-in-from-right duration-500 overflow-hidden">
      {/* Cabecera Concierge */}
      <div className="shrink-0 bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-6 shadow-lg relative z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white/30 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-xl">
              <Bot size={28} />
            </div>
            <div>
              <h2 className="text-white font-black text-xl tracking-tighter leading-none">PH Concierge</h2>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">{t.ai_guide.online}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Area de Mensajes */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto px-6 py-8 space-y-8 no-scrollbar"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-white border border-gray-100' : 'bg-[#0f172a] text-white'}`}>
                {msg.role === 'user' ? <User size={18} className="text-gray-400" /> : <Bot size={18} />}
              </div>
              <div className={`p-5 rounded-[28px] text-[15px] leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-white text-gray-900 rounded-tr-none border border-gray-100' : 'bg-[#0f172a] text-white rounded-tl-none font-medium'}`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="flex gap-4">
               <div className="w-10 h-10 rounded-2xl bg-[#0f172a] text-white flex items-center justify-center shrink-0">
                  <Bot size={18} />
               </div>
               <div className="p-5 rounded-[28px] bg-white border border-gray-100 rounded-tl-none flex items-center gap-2 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Pie de Chat */}
      <div className="shrink-0 bg-white border-t border-gray-100 px-6 py-6 pb-10">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {t.ai_guide.suggestions.map((s: string, idx: number) => (
              <button 
                key={idx}
                onClick={() => handleSend(s)}
                className="px-5 py-2.5 bg-blue-50/50 border border-blue-100 rounded-2xl text-[10px] font-black text-blue-700 whitespace-nowrap shadow-sm hover:bg-blue-600 hover:text-white transition-all active:scale-95"
              >
                {s}
              </button>
            ))}
          </div>
          
          <div className="relative flex gap-3 items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.ai_guide.placeholder}
              className="flex-1 px-6 py-4 bg-gray-50 border border-gray-100 rounded-[24px] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all text-base shadow-inner text-gray-900 placeholder-gray-400 font-medium"
            />
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="w-14 h-14 bg-[#0f172a] text-white rounded-[20px] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-50"
            >
              <Send size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
