
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
// Fix: Import icons from Icons component
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

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Fix: Use process.env.API_KEY as per the world-class senior frontend engineer requirements
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `You are a friendly and expert local tourism guide for Pilar de la Horadada, a town in Alicante, Spain. 
          Your goal is to help tourists and locals discover the best places to visit, eat, and stay.
          Knowledge base: 
          - Famous for beaches like Mil Palmeras, Las Higuericas, El Conde.
          - Iconic 16th-century Watchtower (Torre de la Horadada).
          - Lo Romero Golf course.
          - Río Seco nature park.
          - Known for modern agriculture and high-quality sports tourism.
          - 300+ days of sun.
          Be concise, helpful, and use emojis. Answer in the same language the user uses.`,
        }
      });

      // Fix: Extract generated text from GenerateContentResponse text property
      const text = response.text || "Sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Lo siento, hubo un error conectando con el guía local. Por favor inténtalo de nuevo." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] sm:h-screen bg-white animate-in slide-in-from-bottom duration-500">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-4 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <Sparkles size={20} className="fill-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 leading-none">{t.ai_guide.title}</h2>
            <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Guía Local Inteligente</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-gray-200' : 'bg-blue-600 text-white shadow-md'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-white text-gray-900 rounded-tr-none border border-gray-100' : 'bg-blue-600 text-white rounded-tl-none'}`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Bot size={16} />
              </div>
              <div className="p-4 rounded-2xl text-sm bg-blue-50 text-blue-600 rounded-tl-none flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.ai_guide.placeholder}
            className="flex-1 px-4 py-3 bg-gray-100 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white focus:border-blue-500 transition-all text-sm"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200 disabled:opacity-50 disabled:shadow-none"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};