
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { Send, Bot, ArrowLeft } from './Icons';

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
        systemInstruction: `${t.ai_guide.system} IMPORTANT: You MUST respond ONLY in the following language: ${langLabel}. Your personality is that of a premium virtual concierge for Pilar de la Horadada.`,
      },
    });
    chatSessionRef.current = chat;
    setMessages([{ role: 'model', text: t.ai_guide.welcome }]);
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
      setMessages(prev => [...prev, { role: 'model', text: result.text || "..." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-300 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center gap-4 shrink-0 bg-white z-10">
        <button onClick={onBack} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={24}/></button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg"><Bot size={24}/></div>
          <div>
            <h2 className="font-black text-gray-900 uppercase tracking-tighter leading-none">PH Concierge</h2>
            <span className="text-blue-500 text-[8px] font-black uppercase tracking-widest">{t.ai_guide.online}</span>
          </div>
        </div>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-slate-50/30">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
            <div className={`p-4 rounded-2xl max-w-[85%] text-sm font-bold shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none flex gap-1 shadow-sm">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>
      <div className="p-6 border-t border-gray-100 flex flex-col gap-4 bg-white shrink-0 pb-10">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {t.ai_guide.suggestions.map((s: string, idx: number) => (
            <button key={idx} onClick={() => handleSend(s)} className="px-4 py-2 bg-blue-50 text-blue-600 border border-blue-100 rounded-full text-[9px] font-black uppercase tracking-widest whitespace-nowrap hover:bg-blue-600 hover:text-white transition-all">
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input 
            type="text" value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.ai_guide.placeholder}
            className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 font-bold text-gray-900 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
          />
          <button 
            onClick={() => handleSend()} 
            disabled={!input.trim() || isLoading}
            className="bg-blue-600 text-white p-4 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 disabled:opacity-50 transition-all active:scale-95"
          >
            <Send size={24}/>
          </button>
        </div>
      </div>
    </div>
  );
};
