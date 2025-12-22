
import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { X, Mic, MicOff, Bot, Globe, ArrowLeft, Volume2, Waves, Sparkles, MessageCircle } from './Icons';

interface VoiceConciergeProps {
  onClose: () => void;
  t: any;
}

export const VoiceConcierge: React.FC<VoiceConciergeProps> = ({ onClose, t }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [currentTranscription, setCurrentTranscription] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Audio Contexts & Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const voiceSuggestions = [
    "¿Qué tiempo hace hoy?",
    "¿Cuál es la farmacia de guardia?",
    "Dime un sitio para comer arroz",
    "¿Qué eventos hay este fin de semana?",
    "Cuéntame la historia de la Torre"
  ];

  useEffect(() => {
    return () => {
      stopSession();
    };
  }, []);

  const startSession = async () => {
    if (isActive) return;
    setIsConnecting(true);
    setError(null);
    setTranscription('');
    setCurrentTranscription('');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const analyzer = inputCtx.createAnalyser();
      analyzerRef.current = analyzer;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {}, // Enable transcription for model output
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
          },
          systemInstruction: `Eres PH Concierge, el asistente oficial de voz de Pilar de la Horadada. 
          Eres elegante, servicial y experto en el municipio. Responde de forma MUY concisa (máximo 2-3 frases) porque el usuario te está escuchando por voz. 
          Si no conoces un dato, pregunta para aclarar. Habla siempre en el idioma del usuario.`
        },
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            source.connect(analyzer);
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);

            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Transcription
            if (message.serverContent?.outputTranscription) {
              setCurrentTranscription(prev => prev + message.serverContent.outputTranscription.text);
            }

            if (message.serverContent?.turnComplete) {
              setTranscription(currentTranscription);
              setCurrentTranscription('');
            }

            // Handle Audio
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && audioContextRef.current) {
              const ctx = audioContextRef.current;
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
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setCurrentTranscription('');
            }
          },
          onerror: (e) => {
            console.error("Live AI error:", e);
            setError("Error de conexión. Reintenta.");
            stopSession();
          },
          onclose: () => stopSession()
        }
      });

      sessionRef.current = await sessionPromise;
      visualize();

    } catch (err) {
      console.error("Mic error:", err);
      setError("Necesitas permitir el micrófono para usar PH Voice.");
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    setIsActive(false);
    setIsConnecting(false);
    if (sessionRef.current) sessionRef.current.close();
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
    sessionRef.current = null;
    streamRef.current = null;
  };

  // Helper Functions for Raw PCM
  const decode = (base64: string) => {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, rate: number, channels: number): Promise<AudioBuffer> => {
    const int16 = new Int16Array(data.buffer);
    const count = int16.length / channels;
    const buffer = ctx.createBuffer(channels, count, rate);
    for (let ch = 0; ch < channels; ch++) {
      const chData = buffer.getChannelData(ch);
      for (let i = 0; i < count; i++) chData[i] = int16[i * channels + ch] / 32768.0;
    }
    return buffer;
  };

  const createBlob = (data: Float32Array) => {
    const int16 = new Int16Array(data.length);
    for (let i = 0; i < data.length; i++) int16[i] = data[i] * 32768;
    let binary = '';
    const bytes = new Uint8Array(int16.buffer);
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return { data: btoa(binary), mimeType: 'audio/pcm;rate=16000' };
  };

  // Visualizer Animation
  const visualize = () => {
    if (!canvasRef.current || !analyzerRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const analyzer = analyzerRef.current;
    if (!ctx) return;

    const dataArray = new Uint8Array(analyzer.frequencyBinCount);
    
    const draw = () => {
      if (!isActive && !isConnecting) return;
      requestAnimationFrame(draw);
      analyzer.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 90;

      const avg = dataArray.reduce((a, b) => a + b) / dataArray.length;
      const pulseRadius = radius + avg * 0.7;

      // Glow effect
      ctx.shadowBlur = 40;
      ctx.shadowColor = 'rgba(59, 130, 246, 0.5)';

      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.4, centerX, centerY, pulseRadius);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.9)');
      gradient.addColorStop(0.6, 'rgba(37, 99, 235, 0.4)');
      gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.shadowBlur = 0; // Reset

      // Cyber rings
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const r = pulseRadius + (i + 1) * 35 + Math.sin(Date.now() / 500 + i) * 5;
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 - i * 0.04})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    };
    draw();
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-[#030712] flex flex-col text-white animate-in fade-in duration-500 overflow-hidden">
      {/* Dynamic Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
      
      <div className="p-8 flex items-center justify-between relative z-10">
        <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-white/80 active:scale-90 border border-white/10">
           <ArrowLeft size={28} />
        </button>
        <div className="flex flex-col items-center">
           <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Bot size={18} className="text-white" />
              </div>
              <h2 className="font-black text-sm uppercase tracking-[0.4em]">PH VOICE</h2>
           </div>
           <span className="text-blue-400 text-[8px] font-black uppercase tracking-[0.5em] italic flex items-center gap-2">
              <Globe size={10} /> PILAR DE LA HORADADA
           </span>
        </div>
        <div className="w-14" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative z-10">
        {!isActive && !isConnecting && !error && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 bg-[#030712]/90 backdrop-blur-xl animate-in fade-in">
             <div className="w-28 h-28 bg-blue-600/10 rounded-[45px] flex items-center justify-center text-blue-400 mb-10 border border-blue-400/20 shadow-inner">
                <Volume2 size={56} className="animate-pulse" />
             </div>
             <h3 className="text-4xl font-black tracking-tighter mb-4 leading-none">Voz Inteligente</h3>
             <p className="text-slate-400 font-medium mb-12 max-w-xs leading-relaxed text-lg">
               Interactúa con el municipio usando lenguaje natural. Sin esperas.
             </p>
             <button 
               onClick={startSession}
               className="group bg-blue-600 text-white px-12 py-6 rounded-[35px] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-blue-600/40 flex items-center gap-4 hover:scale-105 active:scale-95 transition-all"
             >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <Mic size={20} />
                </div>
                Empezar a hablar
             </button>
          </div>
        )}

        <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
          <canvas ref={canvasRef} width={600} height={600} className="w-full h-full opacity-80" />
          
          {/* Live Transcription Overlay */}
          {(currentTranscription || transcription) && (
            <div className="absolute bottom-4 left-0 right-0 px-4 animate-in slide-in-from-bottom-4 duration-500">
               <div className="bg-[#0f172a]/60 backdrop-blur-md border border-white/10 p-6 rounded-[30px] shadow-2xl">
                  <div className="flex items-center gap-2 text-blue-400 mb-2">
                    <MessageCircle size={14} />
                    <span className="text-[8px] font-black uppercase tracking-widest">Transcripción en vivo</span>
                  </div>
                  <p className="text-xl font-bold leading-tight text-white/90">
                    {currentTranscription || transcription}
                    {currentTranscription && <span className="inline-block w-2 h-5 bg-blue-500 ml-1 animate-pulse" />}
                  </p>
               </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 max-w-md mx-auto">
            <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.5em] mb-4 h-4">
              {isConnecting ? 'ESTABLECIENDO ENLACE...' : isActive ? 'ESCUCHANDO...' : ''}
            </p>
            <h3 className="text-2xl font-black tracking-tight leading-tight min-h-[3rem]">
              {isConnecting ? 'Iniciando sistemas neuronales...' : isActive ? '¿Qué puedo hacer por ti hoy?' : error ? error : ''}
            </h3>
        </div>
      </div>

      {/* Suggested Chips when active */}
      {isActive && (
        <div className="p-6 relative z-10">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {voiceSuggestions.map((s, i) => (
              <button 
                key={i} 
                className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white/60 whitespace-nowrap hover:bg-white/10 hover:text-white transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="p-12 pb-20 flex justify-center gap-6 relative z-10 bg-gradient-to-t from-[#030712] to-transparent">
         {isActive && (
           <button 
             onClick={stopSession}
             className="w-20 h-20 bg-red-600 text-white rounded-[28px] flex items-center justify-center shadow-2xl shadow-red-600/40 hover:scale-110 active:scale-95 transition-all border-4 border-red-500/20"
           >
              <MicOff size={32} />
           </button>
         )}
         <button 
           onClick={onClose}
           className="px-10 py-5 bg-white/5 border border-white/10 rounded-[30px] font-black text-[10px] uppercase tracking-widest text-white/50 hover:bg-white/10 hover:text-white transition-all"
         >
           Cerrar Sesión
         </button>
      </div>
    </div>
  );
};
