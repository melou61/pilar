
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Camera, Upload, X, Sparkles, MapPin, Info, ArrowRight, Bot, Maximize, Layers, Scan } from './Icons';

interface PHLensViewProps {
  t: any;
  onBack: () => void;
}

export const PHLensView: React.FC<PHLensViewProps> = ({ t, onBack }) => {
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
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Content,
                mimeType: 'image/jpeg'
              }
            },
            {
              text: `Eres el sistema PH Lens de Pilar de la Horadada. Analiza esta imagen. 
              Si es un monumento local (como la Torre Vigía), un plato (arroz, pastas), una playa o naturaleza local, identifícalo.
              Responde ÚNICAMENTE con un objeto JSON válido (sin texto adicional, sin bloques de código markdown) con esta estructura:
              {
                "identified": "Nombre del lugar/objeto",
                "confidence": "98%",
                "context": "Breve explicación histórica o curiosidad local (máximo 30 palabras)",
                "category": "CULTURA | GASTRONOMÍA | NATURALEZA",
                "location": "Zona aproximada en Pilar de la Horadada",
                "funFact": "Un dato curioso poco conocido"
              }`
            }
          ]
        }
      });

      const responseText = response.text || "";
      // Strip potential markdown code blocks if the model includes them despite instructions
      const cleanedJson = responseText.replace(/```json|```/gi, "").trim();
      const data = JSON.parse(cleanedJson);
      setResult(data);
    } catch (error) {
      console.error("Lens Analysis Error:", error);
      alert("No se pudo identificar. Asegúrate de que sea algo de Pilar de la Horadada.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[500] bg-[#020617] flex flex-col text-white animate-in fade-in duration-500 overflow-hidden">
      {/* HUD Background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-32 h-32 border-l border-t border-blue-500"></div>
        <div className="absolute top-1/4 right-10 w-32 h-32 border-r border-t border-blue-500"></div>
        <div className="absolute bottom-1/4 left-10 w-32 h-32 border-l border-b border-blue-500"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 border-r border-b border-blue-500"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,27,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] [background-size:100%_2px,3px_100%]"></div>
      </div>

      <div className="p-8 flex items-center justify-between relative z-10 shrink-0">
        <button onClick={onBack} className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all active:scale-90 border border-white/10">
          <X size={28} />
        </button>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(8,145,178,0.5)]">
                <Scan size={22} className="text-white" />
             </div>
             <h2 className="font-black text-base uppercase tracking-[0.4em]">PH LENS</h2>
          </div>
          <span className="text-cyan-400 text-[8px] font-black uppercase tracking-[0.5em] mt-2">Explorador Visual IA</span>
        </div>
        <div className="w-16" />
      </div>

      <div className="flex-1 relative flex flex-col items-center justify-center p-8">
        {!image ? (
          <div className="flex flex-col items-center text-center max-w-sm animate-in fade-in zoom-in duration-700">
             <div className="w-32 h-32 bg-cyan-500/10 rounded-[50px] flex items-center justify-center text-cyan-400 mb-10 border border-cyan-400/20 shadow-[0_0_60px_rgba(8,145,178,0.2)]">
                <Camera size={64} className="animate-pulse" />
             </div>
             <h3 className="text-4xl font-black tracking-tighter mb-6 leading-none uppercase">Identifica tu entorno</h3>
             <p className="text-slate-400 font-medium mb-12 leading-relaxed text-lg">
               Apunta a un monumento, un plato típico o naturaleza local para recibir información instantánea del Pilar.
             </p>
             <div className="flex flex-col w-full gap-4">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-cyan-600 text-white py-6 rounded-[30px] font-black text-sm uppercase tracking-widest shadow-[0_20px_50px_rgba(8,145,178,0.4)] flex items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-all"
                >
                   <Upload size={24} /> Subir Imagen
                </button>
                <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Motor de análisis Gemini 2.5 Flash</p>
             </div>
             <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
          </div>
        ) : (
          <div className="w-full max-w-lg h-full flex flex-col items-center justify-center relative">
             <div className="relative w-full aspect-[4/5] rounded-[45px] overflow-hidden border border-white/20 shadow-2xl shadow-cyan-900/20 group">
                <img src={image} className="w-full h-full object-cover" alt="Analizando" />
                
                {/* Scan Animation Overlay */}
                {isAnalyzing && (
                  <div className="absolute inset-0 z-20">
                     <div className="w-full h-1 bg-cyan-400 shadow-[0_0_20px_cyan] absolute animate-[scan_3s_infinite] top-0 left-0"></div>
                     <div className="absolute inset-0 bg-cyan-500/10 backdrop-blur-[1px]"></div>
                  </div>
                )}

                {/* Floating Tags if Result */}
                {result && !isAnalyzing && (
                  <>
                    <div className="absolute top-10 left-10 animate-in slide-in-from-left duration-700">
                        <div className="bg-cyan-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl">
                           <Sparkles size={14} /> Identificado: {result.confidence}
                        </div>
                    </div>
                    <div className="absolute bottom-10 right-10 animate-in slide-in-from-right duration-700 delay-200">
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-3xl text-right max-w-[200px]">
                           <span className="text-[8px] font-black text-cyan-400 uppercase tracking-widest block mb-1">Localización</span>
                           <p className="text-xs font-bold leading-tight">{result.location}</p>
                        </div>
                    </div>
                  </>
                )}
             </div>

             {/* Analysis Details Card */}
             {result && !isAnalyzing && (
               <div className="absolute -bottom-4 left-0 right-0 px-4 animate-in slide-in-from-bottom-10 duration-700 delay-300">
                  <div className="bg-[#0f172a]/95 backdrop-blur-3xl border border-white/10 p-8 rounded-[40px] shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
                     <div className="flex justify-between items-start mb-6">
                        <div>
                           <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em] mb-1 block">{result.category}</span>
                           <h3 className="text-3xl font-black tracking-tighter text-white">{result.identified}</h3>
                        </div>
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-cyan-400 border border-white/10">
                           <Info size={24} />
                        </div>
                     </div>
                     
                     <p className="text-slate-300 font-medium text-base leading-relaxed mb-6 italic">
                        "{result.context}"
                     </p>

                     <div className="p-5 bg-cyan-900/30 border border-cyan-500/20 rounded-3xl mb-8">
                        <div className="flex items-center gap-2 mb-2 text-cyan-400">
                           <Bot size={16} />
                           <span className="text-[9px] font-black uppercase tracking-widest">Dato Curioso PH</span>
                        </div>
                        <p className="text-sm font-bold text-cyan-100">{result.funFact}</p>
                     </div>

                     <div className="flex gap-4">
                        <button 
                           onClick={() => setImage(null)}
                           className="flex-1 py-4 bg-white/5 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest border border-white/10 active:scale-95 transition-all"
                        >
                           Nueva Captura
                        </button>
                        <button className="flex-1 py-4 bg-cyan-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/40 active:scale-95 transition-all">
                           Ver Mapa <MapPin size={14} />
                        </button>
                     </div>
                  </div>
               </div>
             )}

             {isAnalyzing && (
                <div className="mt-10 text-center animate-pulse">
                   <p className="text-cyan-400 font-black text-xs uppercase tracking-[0.5em] mb-2">Procesando Red Neuronal...</p>
                   <p className="text-slate-500 text-sm font-bold">Contrastando con el patrimonio del Pilar</p>
                </div>
             )}
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />
    </div>
  );
};
