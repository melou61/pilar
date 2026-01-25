
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Camera, Upload, X, Sparkles, MapPin, Info, ArrowRight, Bot, Maximize, Layers, Scan } from './Icons';
import { AdSpot } from './AdSpot';
import { Footer } from './Footer';
import { Header } from './Header';
import { Ad, ViewState } from '../types';

interface PHLensViewProps {
  t: any;
  onBack: () => void;
  ads: Ad[];
  headerProps: any;
}

export const PHLensView: React.FC<PHLensViewProps> = ({ t, onBack, ads, headerProps }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        analyzeImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (base64Data: string) => {
    setIsAnalyzing(true);
    setResult(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Content = base64Data.split(',')[1];
      const langName = headerProps.currentLang.label;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Content, mimeType: 'image/jpeg' } },
            { text: `Identify this element of Pilar de la Horadada, Spain. Respond in ${langName}. Respond in JSON format only with these keys: identified, confidence, context, category, location, funFact.` }
          ]
        }
      });
      const text = (response.text || "").replace(/```json|```/gi, "").trim();
      if (text) {
        const data = JSON.parse(text);
        setResult(data);
      }
    } catch (error) {
      console.error("Lens error:", error);
      alert(t.common.error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[500] bg-[#020617] flex flex-col text-white animate-in fade-in duration-500 overflow-y-auto no-scrollbar">
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,27,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] [background-size:100%_2px,3px_100%]"></div>
      </div>

      <div className="relative z-[210] shrink-0">
         <Header {...headerProps} />
      </div>

      {/* ANUNCIO SUPERIOR (Full Width) */}
      <div className="w-full pt-4 pb-2 mt-24 shrink-0 relative z-10 bg-[#020617]">
         <AdSpot ads={ads} position="page-top" label={t.common.sponsored} view={ViewState.LENS} />
      </div>

      <div className="flex-1 relative flex flex-col items-center justify-center p-8 z-10">
        {!image ? (
          <div className="flex flex-col items-center text-center max-w-sm animate-in fade-in zoom-in duration-700">
             <div className="w-32 h-32 bg-cyan-500/10 rounded-[50px] flex items-center justify-center text-cyan-400 mb-10 border border-cyan-400/20 shadow-[0_0_60px_rgba(8,145,178,0.2)]">
                <Camera size={64} className="animate-pulse" />
             </div>
             <h3 className="text-4xl font-black tracking-tighter mb-6 uppercase">{t.lens.title}</h3>
             <button 
               onClick={() => fileInputRef.current?.click()}
               className="bg-cyan-600 text-white px-12 py-6 rounded-[30px] font-black uppercase tracking-widest shadow-xl flex items-center gap-4 hover:scale-105 active:scale-95 transition-all"
             >
                <Upload size={24} /> {t.lens.scanBtn}
             </button>
             <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
          </div>
        ) : (
          <div className="w-full max-w-lg flex flex-col items-center">
             <div className="relative w-full aspect-[4/5] rounded-[45px] overflow-hidden border border-white/20 shadow-2xl">
                <img src={image} className="w-full h-full object-cover" alt="Analyzing" />
                {isAnalyzing && <div className="absolute inset-0 z-20 bg-black/40"><div className="w-full h-1 bg-cyan-400 shadow-[0_0_20px_cyan] absolute animate-[scan_3s_infinite]"></div></div>}
             </div>
             {result && !isAnalyzing && (
               <div className="mt-8 w-full bg-[#0f172a]/95 backdrop-blur-3xl border border-white/10 p-8 rounded-[40px] shadow-2xl">
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-1 block">{t.lens.identified}</span>
                  <h3 className="text-3xl font-black tracking-tighter text-white mb-2">{result.identified}</h3>
                  <p className="text-slate-300 italic mb-6">"{result.context}"</p>
                  <div className="space-y-4 mb-8">
                     <div className="flex items-center gap-3 text-xs font-bold text-slate-400"><MapPin size={16} className="text-cyan-500" /> {result.location}</div>
                     <div className="flex items-center gap-3 text-xs font-bold text-slate-400"><Info size={16} className="text-cyan-500" /> {result.funFact}</div>
                  </div>
                  <button onClick={() => setImage(null)} className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">{t.lens.newScan}</button>
               </div>
             )}
             {isAnalyzing && (
               <div className="mt-8 text-cyan-400 font-black uppercase tracking-[0.3em] animate-pulse">
                  {t.common.thinking}
               </div>
             )}
          </div>
        )}
      </div>

      {/* ANUNCIO INFERIOR (Full Width) */}
      <div className="w-full py-6 shrink-0 opacity-90 relative z-10 mt-auto">
         <AdSpot ads={ads} position="page-bottom" label={t.common.sponsored} view={ViewState.LENS} />
      </div>

      <div className="relative z-10">
        <Footer t={t} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `@keyframes scan { 0% { top: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }` }} />
    </div>
  );
};
