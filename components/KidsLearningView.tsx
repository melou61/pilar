
import React, { useState, useRef } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import { Baby, Volume2, Waves, UtensilsCrossed, Landmark, Sparkles, ArrowLeft, Mic, Play } from './Icons';

interface KidsLearningViewProps {
  t: any;
  onBack: () => void;
  langLabel: string;
}

export const KidsLearningView: React.FC<KidsLearningViewProps> = ({ t, onBack, langLabel }) => {
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const categories = [
    { id: 'beaches', label: 'Playas', icon: Waves, color: 'bg-blue-400', words: ['Higuericas', 'Mil Palmeras', 'Arena', 'Sol'] },
    { id: 'food', label: 'Comida', icon: UtensilsCrossed, color: 'bg-orange-400', words: ['Arroz', 'Pasta', 'Helado', 'Pan'] },
    { id: 'culture', label: 'Cultura', icon: Landmark, color: 'bg-amber-400', words: ['Torre', 'Iglesia', 'Pilar', 'Fiesta'] }
  ];

  // PCM Decoding functions
  function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  }

  async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
    return buffer;
  }

  const speakWord = async (word: string) => {
    if (isSpeaking) return;
    setIsSpeaking(word);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Pronuncia de forma clara y amigable para un niño la palabra: "${word}" en el idioma ${langLabel}.`;
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } }
          }
        }
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const ctx = audioContextRef.current;
        const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.onended = () => setIsSpeaking(null);
        source.start();
      } else {
        setIsSpeaking(null);
      }
    } catch (error) {
      console.error("TTS Error:", error);
      setIsSpeaking(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[600] bg-yellow-50 flex flex-col animate-in fade-in duration-500 overflow-hidden">
      <div className="p-8 flex items-center justify-between bg-white/80 backdrop-blur-xl border-b-4 border-yellow-200 shrink-0">
        <button onClick={onBack} className="w-16 h-16 bg-yellow-100 rounded-[24px] flex items-center justify-center text-yellow-600 shadow-lg active:scale-90 transition-all border-b-4 border-yellow-200">
           <ArrowLeft size={32} strokeWidth={3} />
        </button>
        <div className="flex flex-col items-center">
           <div className="flex items-center gap-3">
              <Baby size={32} className="text-blue-500 animate-bounce" />
              <h2 className="font-black text-2xl text-gray-800 tracking-tighter uppercase">PH KIDS</h2>
           </div>
           <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Aprende en {langLabel}</span>
        </div>
        <div className="w-16" />
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-12 no-scrollbar">
         <div className="bg-white rounded-[40px] p-8 border-b-8 border-gray-100 shadow-xl text-center">
            <h3 className="text-3xl font-black text-gray-800 tracking-tighter mb-4">¡Hola, Pequeño Vecino! 👋</h3>
            <p className="text-gray-500 text-lg font-bold leading-tight">Pulsa en las palabras para escucharlas en tu idioma favorito.</p>
         </div>

         {categories.map(cat => (
           <div key={cat.id} className="space-y-6">
              <div className="flex items-center gap-4 px-4">
                 <div className={`w-12 h-12 ${cat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                    <cat.icon size={24} />
                 </div>
                 <h4 className="text-2xl font-black text-gray-800 tracking-tight uppercase">{cat.label}</h4>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                 {cat.words.map(word => (
                   <button 
                     key={word}
                     onClick={() => speakWord(word)}
                     className={`relative bg-white p-8 rounded-[40px] shadow-lg border-b-8 border-gray-100 flex flex-col items-center justify-center gap-4 active:scale-95 transition-all group overflow-hidden ${isSpeaking === word ? 'ring-8 ring-blue-400' : ''}`}
                   >
                      {isSpeaking === word && (
                        <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                           <div className="flex gap-1">
                             <div className="w-1.5 h-6 bg-blue-500 rounded-full animate-pulse" />
                             <div className="w-1.5 h-10 bg-blue-500 rounded-full animate-pulse delay-75" />
                             <div className="w-1.5 h-6 bg-blue-500 rounded-full animate-pulse delay-150" />
                           </div>
                        </div>
                      )}
                      <div className={`w-16 h-16 rounded-[24px] ${cat.color} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform`}>
                         <Volume2 size={32} />
                      </div>
                      <span className="text-xl font-black text-gray-800 uppercase tracking-tighter">{word}</span>
                   </button>
                 ))}
              </div>
           </div>
         ))}
      </div>

      <div className="p-10 bg-white border-t-4 border-yellow-200 flex justify-center pb-12">
          <div className="bg-blue-600 text-white px-10 py-5 rounded-[32px] font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-3">
             <Sparkles size={20} /> 71 Niños Hablando
          </div>
      </div>
    </div>
  );
};
