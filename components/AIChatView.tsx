
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
        systemInstruction: `${t.ai_guide.system} IMPORTANT: Response in ${langLabel}.`,
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

  const handleSend = async () => {
    if (!input.trim() || isLoading || !chatSessionRef.current) return;
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);
    try {
      const result = await chatSessionRef.current.sendMessage({ message: userMessage });
      setMessages(prev => [...prev, { role: 'model', text: result.text || "No response." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Error." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-300">
      <div className="p-6 border-b border-gray-100 flex items-center gap-4">
        <button onClick={onBack} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"><ArrowLeft size={24}/></button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white"><Bot size={24}/></div>
          <h2 className="font-black text-gray-900 uppercase tracking-tighter">PH Concierge</h2>
        </div>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-4 rounded-2xl max-w-[80%] text-sm font-bold ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-xs font-black text-blue-600 animate-pulse">Pensando...</div>}
      </div>
      <div className="p-6 border-t border-gray-100 flex gap-2">
        <input 
          type="text" value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={t.ai_guide.placeholder}
          className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 font-bold"
        />
        <button onClick={handleSend} className="bg-blue-600 text-white p-3 rounded-xl"><Send size={24}/></button>
      </div>
    </div>
  );
};
