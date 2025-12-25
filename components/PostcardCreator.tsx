
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, ArrowLeft, Download, Share2, ImageIcon, Camera, Wand2, X } from './Icons';

interface PostcardCreatorProps {
  t: any;
  onBack: () => void;
}

export const PostcardCreator: React.FC<PostcardCreatorProps> = ({ t, onBack }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const generatePostcard = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const fullPrompt = `A high quality cinematic photograph of Pilar de la Horadada, Spain: ${prompt}. Cinematic lighting, 8k resolution, touristic postcard style, mediterranean vibes.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: fullPrompt }],
        },
        config: {
          imageConfig: { aspectRatio: "1:1" }
        }
      });

      const candidate = response.candidates?.[0];
      if (candidate?.content?.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData) {
            setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
          }
        }
      }
    } catch (error) {
      console.error("Postcard error:", error);
      alert(t.common.error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `postcard-pilar-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="flex flex-col h-full bg-[#0f172a] text-white animate-in fade-in duration-500 overflow-hidden">
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-white/5 shrink-0 bg-[#0f172a] z-10">
        <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/60"><ArrowLeft size={24}/></button>
        <div className="flex flex-col items-center">
          <h2 className="font-black text-sm uppercase tracking-[0.3em]">{t.postcard.title}</h2>
          <span className="text-blue-400 text-[8px] font-black uppercase tracking-[0.4em] mt-1 italic">PILAR DE LA HORADADA</span>
        </div>
        <div className="w-10 h-10" /> {/* Spacer */}
      </div>

      <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center justify-center gap-8 no-scrollbar">
        {!generatedImage && !isGenerating ? (
          <div className="flex flex-col items-center text-center max-w-sm">
            <div className="w-24 h-24 bg-blue-600/10 rounded-[40px] flex items-center justify-center text-blue-500 mb-8 border border-blue-500/20 animate-pulse">
               <ImageIcon size={48} />
            </div>
            <h3 className="text-3xl font-black tracking-tighter mb-4 leading-tight">{t.postcard.subtitle}</h3>
            <p className="text-white/40 font-medium mb-12">{t.postcard.desc}</p>
          </div>
        ) : generatedImage ? (
          <div className="w-full max-w-lg aspect-square rounded-[40px] overflow-hidden shadow-2xl shadow-blue-500/10 border border-white/10 animate-in zoom-in-95">
            <img src={generatedImage} className="w-full h-full object-cover" alt="Generated" />
          </div>
        ) : (
          <div className="w-full max-w-lg aspect-square rounded-[40px] bg-white/5 border border-dashed border-white/20 flex flex-col items-center justify-center animate-pulse">
             <Wand2 size={48} className="text-blue-500 animate-spin mb-4" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">{t.postcard.generating}</span>
          </div>
        )}

        {generatedImage && (
          <div className="flex gap-4 animate-in slide-in-from-bottom-4">
             <button 
               onClick={downloadImage}
               className="bg-white/10 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 border border-white/10"
             >
               <Download size={18} /> {t.postcard.save}
             </button>
             <button 
               onClick={() => setGeneratedImage(null)}
               className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-blue-600/20"
             >
               <Wand2 size={18} /> {t.postcard.create}
             </button>
          </div>
        )}
      </div>

      {/* Input area */}
      {!generatedImage && (
        <div className="p-8 border-t border-white/5 bg-slate-900/50 backdrop-blur-xl shrink-0 pb-12">
          <div className="max-w-xl mx-auto flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              {t.postcard.suggestions.map((s: string) => (
                <button 
                  key={s} 
                  onClick={() => setPrompt(s)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <input 
                type="text"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder={t.postcard.placeholder}
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
              />
              <button 
                onClick={generatePostcard}
                disabled={!prompt.trim() || isGenerating}
                className="bg-blue-600 text-white p-5 rounded-2xl shadow-xl shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-50 transition-all active:scale-95"
              >
                <Sparkles size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
