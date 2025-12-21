
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
}

export const AIChatView: React.FC<AIChatViewProps> = ({ t, onBack, langCode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<Chat | null>(null);

  useEffect(() => {
    const ai = new GoogleGenAI({ apiKey: "AIzaSyDeG7eTitfS-Q-p2gdYwDt4t6W2nIlIl_g" });
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: t.ai_guide.system,
      },
    });
    chatSessionRef.current = chat;
    
    setMessages([
      { role: 'model', text: t.ai_guide.welcome }
    ]);
  }, [langCode, t.ai_guide.system, t.ai_guide.welcome]);

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
      const text = result.text || "Lo siento, no he podido procesar eso. ¿Puedes repetir?";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Parece que tengo problemas de conexión. ¡Inténtalo de nuevo! 🌊" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] animate-in slide-in-from-right duration-500 relative">
      {/* Cabecera Azul Restaurada */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-6 rounded-b-[40px] shadow-lg relative z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20"
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

      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto px-6 py-8 space-y-8 pb-32"
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
                  <div className="w-1.2 h-1.2 bg-blue-400 rounded-full animate-bounce" />
                  <div className="w-1.2 h-1.2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.2 h-1.2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Input de chat */}
      <div className="absolute bottom-8 left-0 right-0 p-6 z-[120]">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {t.ai_guide.suggestions.map((s: string, idx: number) => (
              <button 
                key={idx}
                onClick={() => handleSend(s)}
                className="px-5 py-2.5 bg-white border border-gray-100 rounded-2xl text-[10px] font-black text-gray-700 whitespace-nowrap shadow-sm hover:bg-[#0f172a] hover:text-white transition-all active:scale-95"
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
              className="flex-1 px-6 py-5 bg-white border border-gray-100 rounded-[28px] focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-base shadow-xl text-gray-900 placeholder-gray-400 font-medium"
            />
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="w-16 h-16 bg-[#0f172a] text-white rounded-[24px] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-50"
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
