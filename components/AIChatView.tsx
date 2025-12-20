
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Send, ArrowLeft, Bot, User, Sparkles } from './Icons';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface AIChatViewProps {
  t: any;
  onBack: () => void;
}

export const AIChatView: React.FC<AIChatViewProps> = ({ t, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: t.ai_guide.welcome }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Ref to hold the active chat session for persistence
  const chatSessionRef = useRef<Chat | null>(null);

  useEffect(() => {
    // Initialize chat session on mount
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `Eres PH Concierge, el asistente experto y sofisticado de Pilar de la Horadada. 
        CONOCES:
        - Todas las playas (Higuericas, Mil Palmeras, etc.) y sus servicios.
        - Todos los restaurantes (Mesón El Puerto para arroces, bares de tapas en la plaza).
        - Calendario de Fiestas: Patronales en Octubre, Romería en Junio, Charangas en Agosto.
        - Servicios: Ayuntamiento 24h, Pinar de Campoverde, Río Seco.
        REGLAS DE CONVERSACIÓN:
        - Mantén una conversación real, no eres solo una base de datos.
        - Recuerda lo que el usuario te ha dicho antes.
        - Sé amable, servicial y usa emojis mediterráneos.
        - Si no sabes algo, invita al usuario a visitar la oficina de turismo en Plaza Campoamor.`,
      },
    });
    chatSessionRef.current = chat;
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading || !chatSessionRef.current) return;

    const userMessage = textToSend.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const result = await chatSessionRef.current.sendMessage({ message: userMessage });
      const text = result.text || "Lo siento, me he distraído con el mar. ¿Qué me decías?";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "He tenido un pequeño problema de conexión. ¡Intentémoslo de nuevo! 🌊" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8fafc] animate-in slide-in-from-right duration-500">
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-100 flex items-center gap-4 bg-white/80 backdrop-blur-2xl sticky top-0 z-20">
        <button onClick={onBack} className="w-12 h-12 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={28} />
        </button>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
            <Sparkles size={24} className="fill-white" />
          </div>
          <div>
            <h2 className="font-black text-gray-900 text-lg leading-none">PH Concierge</h2>
            <span className="text-[10px] text-green-500 font-black uppercase tracking-widest">En línea ahora</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-8 space-y-8 pb-40">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-gray-200' : 'bg-[#0f172a] text-white shadow-blue-500/20'}`}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={`p-5 rounded-[28px] text-[15px] leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-white text-gray-900 rounded-tr-none border border-gray-100' : 'bg-[#0f172a] text-white rounded-tl-none font-medium'}`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="flex gap-4 max-w-[85%]">
              <div className="w-10 h-10 rounded-2xl bg-[#0f172a] text-white flex items-center justify-center shrink-0">
                <Bot size={20} />
              </div>
              <div className="p-5 rounded-[28px] bg-blue-50 text-blue-600 rounded-tl-none flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-3xl border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          {messages.length < 3 && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-2 mb-4">
                {["¿Qué fiestas hay?", "¿Mejor sitio para comer?", "¿Estado de playas?"].map((s, idx) => (
                    <button 
                        key={idx}
                        onClick={() => handleSend(s)}
                        className="px-5 py-3 bg-gray-100 rounded-2xl text-[12px] font-black text-gray-700 whitespace-nowrap shadow-sm hover:bg-blue-600 hover:text-white transition-all"
                    >
                        {s}
                    </button>
                ))}
            </div>
          )}
          
          <div className="relative flex gap-3 items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Pregúntame lo que quieras..."
              className="flex-1 px-6 py-5 bg-gray-100 border-none rounded-[28px] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all text-base shadow-inner"
            />
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="w-16 h-16 bg-blue-600 text-white rounded-[24px] flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-all shadow-xl shadow-blue-500/30 disabled:opacity-50"
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
