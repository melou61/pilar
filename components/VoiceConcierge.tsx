
import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { X, Mic, MicOff, Volume2, Bot, Sparkles } from './Icons';
import { AdSpot } from './AdSpot';
import { Footer } from './Footer';
import { Header } from './Header';
import { Ad, ViewState } from '../types';

interface VoiceConciergeProps {
  onClose: () => void;
  t: any;
  ads: Ad[];
  headerProps: any;
}

// Funciones de codificación/decodificación manual requeridas por la API
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const VoiceConcierge: React.FC<VoiceConciergeProps> = ({ onClose, t, ads, headerProps }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcription, setTranscription] = useState('');
  
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const audioContextsRef = useRef<{ input: AudioContext; output: AudioContext } | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);

  const stopSession = () => {
    setIsActive(false);
    setIsConnecting(false);
    
    // Limpiar audio
    sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }
    
    if (audioContextsRef.current) {
      audioContextsRef.current.input.close();
      audioContextsRef.current.output.close();
    }
  };

  const startSession = async () => {
    if (isActive || isConnecting) return;
    setIsConnecting(true);
    setTranscription('');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextsRef.current = { input: inputCtx, output: outputCtx };

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } // Voz más cálida
          },
          systemInstruction: `Eres PH Concierge, la voz oficial de Pilar de la Horadada. 
          Tu tono es amable, servicial y profesional. Ayudas a turistas y ciudadanos con 
          información sobre playas, eventos, patrimonio y trámites. Responde siempre en el idioma 
          del usuario (${headerProps.currentLang.label}). Mantén tus respuestas concisas para una mejor experiencia de voz.`,
          outputAudioTranscription: {}
        },
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);

            // Iniciar flujo de micrófono hacia la IA
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              // Convertir a Int16 PCM
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) int16[i] = inputData[i] * 32768;
              
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };

              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // 1. Manejar Transcripción
            if (message.serverContent?.outputTranscription) {
              setTranscription(prev => prev + message.serverContent.outputTranscription.text);
            }

            // 2. Manejar Audio de salida de la IA
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && audioContextsRef.current) {
              const { output: ctx } = audioContextsRef.current;
              
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              const audioBuffer = await decodeAudioData(
                decode(base64Audio),
                ctx,
                24000,
                1
              );

              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              
              source.onended = () => {
                sourcesRef.current.delete(source);
              };

              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            // 3. Manejar Interrupciones (User talking over AI)
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => stopSession(),
          onerror: (e) => {
            console.error("Live API Error:", e);
            stopSession();
          }
        }
      });

      sessionPromiseRef.current = sessionPromise;

    } catch (e) {
      console.error("Mic Access Error:", e);
      setIsConnecting(false);
      alert("No se pudo acceder al micrófono. Por favor, verifica los permisos.");
    }
  };

  useEffect(() => {
    return () => stopSession();
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] bg-[#020617] flex flex-col text-white animate-in fade-in duration-700 overflow-y-auto no-scrollbar">
      
      {/* Background FX */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[150px] animate-pulse"></div>
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-[150px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-[220] shrink-0">
         <Header {...headerProps} />
      </div>

      <div className="px-8 pt-4 pb-2 mt-24 shrink-0 relative z-20 bg-[#020617]/80 backdrop-blur-md">
         <AdSpot ads={ads} position="page-top" label={t.common.sponsored} view={ViewState.AI_CHAT} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative z-20">
        {!isActive && !isConnecting && (
          <div className="animate-in zoom-in duration-700 max-w-sm">
             <div className="w-40 h-40 bg-blue-600/10 rounded-[60px] flex items-center justify-center text-blue-400 mb-12 border border-blue-400/20 shadow-[0_0_80px_rgba(37,99,235,0.2)] mx-auto relative group">
                <div className="absolute inset-0 bg-blue-400 rounded-[60px] animate-ping opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <Volume2 size={80} className="relative z-10" />
             </div>
             <h3 className="text-5xl font-black tracking-tighter mb-4 uppercase leading-none italic">PH VOICE</h3>
             <p className="text-slate-400 font-medium mb-12 text-lg">Habla con tu guía virtual en tiempo real sobre cualquier rincón del Pilar.</p>
             <button 
               onClick={startSession} 
               className="bg-blue-600 text-white px-12 py-8 rounded-[40px] font-black uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-5 hover:scale-105 active:scale-95 transition-all w-full"
             >
                <Mic size={32} /> {t.ai_guide.voice_btn}
             </button>
          </div>
        )}

        {isActive && (
          <div className="w-full max-w-2xl animate-in fade-in duration-500">
             {/* Visualizador de Voz Dinámico */}
             <div className="flex items-center justify-center gap-2 h-32 mb-16">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-2 bg-blue-500 rounded-full animate-bounce" 
                    style={{ 
                      height: `${20 + Math.random() * 80}%`,
                      animationDuration: `${0.5 + Math.random()}s`,
                      animationDelay: `${i * 0.05}s`
                    }}
                  ></div>
                ))}
             </div>

             <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[50px] shadow-2xl relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 px-6 py-2 rounded-2xl flex items-center gap-2 shadow-xl">
                   <Sparkles size={16} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Escuchando...</span>
                </div>
                <p className="text-2xl font-bold italic text-white/90 leading-relaxed">
                   "{transcription || 'PH Concierge está listo. ¿En qué puedo ayudarte?'}"
                </p>
             </div>

             <button 
               onClick={stopSession} 
               className="mt-16 bg-red-600 text-white p-10 rounded-[50px] shadow-[0_20px_50px_rgba(220,38,38,0.3)] hover:scale-110 active:scale-90 transition-all border-4 border-white/10"
             >
                <MicOff size={44} />
             </button>
          </div>
        )}

        {isConnecting && (
           <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <div className="text-blue-400 font-black uppercase tracking-[0.3em] animate-pulse">{t.common.loading}</div>
           </div>
        )}
      </div>

      {/* Botón Cerrar (Si no está activo) */}
      {!isActive && (
        <button 
          onClick={onClose}
          className="fixed top-32 right-8 w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-white/40 hover:text-white transition-all z-[300]"
        >
          <X size={32} />
        </button>
      )}

      {/* ANUNCIO INFERIOR */}
      <div className="px-8 py-4 shrink-0 relative z-20">
         <AdSpot ads={ads} position="page-bottom" label={t.common.sponsored} view={ViewState.AI_CHAT} />
      </div>

      <div className="relative z-20 mt-auto">
        <Footer t={t} />
      </div>
    </div>
  );
};
