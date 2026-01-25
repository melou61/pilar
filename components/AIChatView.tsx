
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { Send, Bot, ArrowLeft, ExternalLink, Globe, Mic } from './Icons';
import { VoiceConcierge } from './VoiceConcierge';
import { AdSpot } from './AdSpot';
import { Header } from './Header';
import { Footer } from './Footer';
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
  onOpenAdminLogin: () => void;
}

export const AIChatView: React.FC<AIChatViewProps> = ({ t, onBack, langCode, langLabel, ads, headerProps, onOpenAdminLogin }) => {
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
      setMessages(prev => [...prev, { role: 'model', text: t.common.error }]);
    } finally { setIsLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-[450] bg-[#f8fafc] flex flex-col animate-in fade-in duration-500 overflow-y-auto no-scrollbar">
      {isVoiceActive && <VoiceConcierge onClose={() => setIsVoiceActive(false)} t={t} ads={ads} headerProps={headerProps} />}
      
      {/* 1. HEADER GLOBAL */}
      <div className="relative z-[5000] shrink-0">
         <Header {...headerProps} />
      </div>

      {/* 2. ANUNCIO SUPERIOR (Full Width) */}
      <div className="w-full py-2 mt-24 bg-white border-b border-gray-50 shrink-0 relative z-10">
        <AdSpot ads={ads} position="page-top" label={t.common.sponsored} view={ViewState.AI_CHAT} />
      </div>

      {/* 3. CONTENEDOR DE CHAT PRINCIPAL */}
      <div className="max-w-4xl mx-auto w-full px-4 py-8 flex-1">
          <div className="bg-white rounded-[45px] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col h-[70vh]">
              {/* Chat Sub-Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white z-10">
                <div className="flex items-center gap-4">
                  <button onClick={onBack} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={24}/></button>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg"><Bot size={24}/></div>
                    <div>
                        <h2 className="font-black text-gray-900 uppercase tracking-tighter leading-none text-xs">PH Concierge</h2>
                        <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1 mt-1">
                            <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" /> {t.ai_guide.online}
                        </span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setIsVoiceActive(true)} className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                  <Mic size={24} />
                </button>
              </div>

              {/* Messages Area */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-slate-50/30">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                    <div className={`p-5 rounded-3xl max-w-[85%] text-sm font-bold shadow-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-50 rounded-tl-none'}`}>
                      {msg.text}
                    </div>
                    {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                           {msg.sources.map((s, idx) => (
                               <a key={idx} href={s.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-100 rounded-full text-[9px] font-black text-blue-600 uppercase tracking-widest hover:bg-blue-50 transition-colors">
                                   <Globe size={10} /> {s.title || 'Source'}
                               </a>
                           ))}
                        </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                    <div className="flex gap-2 items-center p-4 bg-white/50 rounded-2xl border border-dashed border-gray-200 animate-pulse">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                        <span className="text-[10px] font-black uppercase text-blue-400 tracking-[0.2em]">{t.common.thinking}</span>
                    </div>
                )}
              </div>

              {/* Input area */}
              <div className="p-6 border-t border-gray-100 bg-white shrink-0">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
                    placeholder={t.ai_guide.placeholder} 
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 font-bold outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-600 transition-all placeholder-gray-300" 
                  />
                  <button onClick={() => handleSend()} disabled={!input.trim() || isLoading} className="bg-blue-600 text-white p-5 rounded-2xl shadow-xl active:scale-95 transition-all hover:bg-blue-700 disabled:opacity-30">
                    <Send size={24}/>
                  </button>
                </div>
              </div>
          </div>
      </div>

      {/* 4. ANUNCIO INFERIOR (Full Width) */}
      <div className="w-full py-6 shrink-0 opacity-90 relative z-10 bg-white border-t border-gray-50">
        <div className="max-w-4xl mx-auto">
            <AdSpot ads={ads} position="page-bottom" label={t.common.sponsored} view={ViewState.AI_CHAT} />
        </div>
      </div>

      {/* 5. FOOTER GLOBAL */}
      <div className="relative z-10">
        <Footer t={t} onOpenAdminLogin={onOpenAdminLogin} />
      </div>
    </div>
  );
};
