
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { Send, Bot, ArrowLeft, ExternalLink, Globe, Mic } from './Icons';
import { VoiceConcierge } from './VoiceConcierge';
import { AdSpot } from './AdSpot';
import { Header } from './Header';
import { Ad, ViewState } from '../types';

interface Message {
  role: 'user' | 'model';
  text: string;
  sources?: { uri: string; title: string }[];
}

interface AIChatViewProps {
  t: any;
  onBack: () => void;
  langCode: string;
  langLabel: string;
  ads: Ad[];
  headerProps: any;
}

export const AIChatView: React.FC<AIChatViewProps> = ({ t, onBack, langCode, langLabel, ads, headerProps }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<Chat | null>(null);

  useEffect(() => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: `${t.ai_guide.system} Responde en ${langLabel}.`,
      },
    });
    chatSessionRef.current = chat;
    setMessages([{ role: 'model', text: t.ai_guide.welcome }]);
  }, [langCode, langLabel, t.ai_guide.system, t.ai_guide.welcome]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading || !chatSessionRef.current) return;
    const userMessage = textToSend.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);
    try {
      const response = await chatSessionRef.current.sendMessage({ message: userMessage });
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({ uri: chunk.web?.uri, title: chunk.web?.title })).filter((s: any) => s.uri);
      setMessages(prev => [...prev, { role: 'model', text: response.text || "...", sources }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Error. Inténtalo de nuevo." }]);
    } finally { setIsLoading(false); }
  };

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-300 overflow-hidden relative">
      {isVoiceActive && <VoiceConcierge onClose={() => setIsVoiceActive(false)} t={t} ads={ads} headerProps={headerProps} />}
      
      {/* 1. HEADER GLOBAL */}
      <div className="relative z-[200] shrink-0">
         <Header {...headerProps} />
      </div>

      {/* 2. ANUNCIO SUPERIOR (mt-24 para compensar el header fijo) */}
      <div className="px-6 py-2 mt-24 bg-white border-b border-gray-50 shrink-0 relative z-10">
        <AdSpot ads={ads} position="page-top" label={t.common.sponsored} view={ViewState.AI_CHAT} />
      </div>

      {/* 3. SUB-HEADER DE CHAT */}
      <div className="p-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={24}/></button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg"><Bot size={24}/></div>
            <h2 className="font-black text-gray-900 uppercase tracking-tighter leading-none text-sm">Concierge IA</h2>
          </div>
        </div>
        <button onClick={() => setIsVoiceActive(true)} className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">
          <Mic size={24} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-slate-50/30">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2`}>
            <div className={`p-4 rounded-2xl max-w-[85%] text-sm font-bold shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && <div className="p-4 bg-white border rounded-2xl animate-pulse text-[10px] font-black uppercase text-blue-400">Consultando Pilar...</div>}
      </div>

      <div className="p-6 border-t border-gray-100 flex flex-col gap-4 bg-white shrink-0 pb-12">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder={t.ai_guide.placeholder} className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 font-bold outline-none focus:ring-2 focus:ring-blue-100" />
          <button onClick={() => handleSend()} disabled={!input.trim() || isLoading} className="bg-blue-600 text-white p-4 rounded-2xl shadow-xl active:scale-95 transition-all"><Send size={24}/></button>
        </div>
      </div>
    </div>
  );
};
