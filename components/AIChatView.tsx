
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
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
    { role: 'model', text: '¡Hola! Soy PH Concierge. Conozco todos los rincones, restaurantes y fiestas de Pilar de la Horadada. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const chatSessionRef = useRef<Chat | null>(null);

  useEffect(() => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `Eres PH Concierge, el asistente experto de Pilar de la Horadada. 
        CONOCES TODO SOBRE:
        - Playas: Higuericas (dunas), Mil Palmeras (servicios), El Conde (Torre Vigía).
        - Gastronomía: Caldero en Mesón El Puerto ($$$), Tapas en la Plaza ($).
        - Fiestas: Charangas en Agosto, Patronales en Octubre.
        ESTILO:
        - Eres elegante, servicial y experto.
        - Recuerda lo que te ha dicho el usuario antes.
        - Usa emojis (🥘, 🌊, ⛪, 🎺).`,
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
      const text = result.text || "Lo siento, me he distraído con el mar del Pilar. ¿Me repites?";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "He tenido un pequeño corte de conexión. ¡Prueba de nuevo! 🌊" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "¿Cuándo son las charangas?",
    "¿Dónde comer un buen arroz?",
    "¿Qué playa tiene más servicios?"
  ];

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
            <span className="text-[10px] text-green-500 font-black uppercase tracking-widest">En línea</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-8 space-y-8 pb-48">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-gray-200' : 'bg-[#0f172a] text-white'}`}>
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
            <div className="p-5 rounded-[28px] bg-blue-50 text-blue-600 rounded-tl-none flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Persistent Input - Improved Visibility */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/95 backdrop-blur-3xl border-t border-gray-100 z-[60]">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
            {suggestions.map((s, idx) => (
              <button 
                key={idx}
                onClick={() => handleSend(s)}
                className="px-5 py-3 bg-gray-100 rounded-2xl text-[12px] font-black text-gray-700 whitespace-nowrap shadow-sm hover:bg-blue-600 hover:text-white transition-all"
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
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe tu pregunta aquí..."
              className="flex-1 px-6 py-5 bg-gray-100 border-none rounded-[28px] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all text-base shadow-inner text-gray-900 placeholder-gray-500 font-medium"
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
