
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

  // Standard manual encode as per guidelines
  function encode(bytes: Uint8Array) {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  // Standard manual decode as per guidelines
  function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
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

  const createBlob = (data: Float32Array) => {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      int16[i] = data[i] * 32768;
    }
    return {
      data: encode(new Uint8Array(int16.buffer)),
      mimeType: 'audio/pcm;rate=16000',
    };
  };

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
      
      // Initialize Contexts
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      
      // Crucial for browser autoplay policies
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const analyzer = inputCtx.createAnalyser();
      analyzer.fftSize = 256;
      analyzerRef.current = analyzer;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
          },
          systemInstruction: `Eres PH Concierge, el asistente oficial de voz de Pilar de la Horadada. 
          Responde SIEMPRE de forma vocal. Sé muy breve y servicial. Tu tono es premium y elegante.
          Si el usuario te pregunta por farmacias, eventos o qué hacer, dale opciones rápidas.
          IMPORTANTE: No esperes demasiado para responder tras detectar que el usuario ha terminado de hablar.`
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
            
            visualize();
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) {
              setCurrentTranscription(prev => prev + message.serverContent.outputTranscription.text);
            }

            if (message.serverContent?.turnComplete) {
              setTranscription(currentTranscription);
              setCurrentTranscription('');
            }

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
              sourcesRef.current.forEach(s => {
                try { s.stop(); } catch(e) {}
              });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setCurrentTranscription('');
            }
          },
          onerror: (e) => {
            console.error("Live AI error:", e);
            setError("Error de red. Reintenta.");
            stopSession();
          },
          onclose: () => stopSession()
        }
      });

      sessionRef.current = await sessionPromise;

    } catch (err) {
      console.error("Mic error:", err);
      setError("Permiso de micrófono denegado.");
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    setIsActive(false);
    setIsConnecting(false);
    if (sessionRef.current) {
        try { sessionRef.current.close(); } catch(e) {}
    }
    if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
    }
    sourcesRef.current.forEach(s => {
        try { s.stop(); } catch(e) {}
    });
    sourcesRef.current.clear();
    sessionRef.current = null;
    streamRef.current = null;
  };

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
      const radius = 100;

      const avg = dataArray.reduce((a, b) => a + b) / dataArray.length;
      const pulseRadius = radius + (avg * 1.2); // More sensitive scale

      ctx.shadowBlur = 50;
      ctx.shadowColor = 'rgba(59, 130, 246, 0.6)';

      // Pulsing Glow
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.2, centerX, centerY, pulseRadius);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 1)');
      gradient.addColorStop(0.5, 'rgba(37, 99, 235, 0.4)');
      gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.shadowBlur = 0;

      // Cyber Orbitals
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        const r = pulseRadius + (i + 1) * 25 + Math.sin(Date.now() / 400 + i) * 10;
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 - i * 0.04})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };
    draw();
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-[#020617] flex flex-col text-white animate-in fade-in duration-500 overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent"></div>
      
      <div className="p-8 flex items-center justify-between relative z-10">
        <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-white/80 active:scale-90 border border-white/10">
           <ArrowLeft size={28} />
        </button>
        <div className="flex flex-col items-center">
           <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/40">
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
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 bg-[#020617]/90 backdrop-blur-xl animate-in fade-in">
             <div className="w-32 h-32 bg-blue-600/10 rounded-[50px] flex items-center justify-center text-blue-400 mb-10 border border-blue-400/20 shadow-[0_0_50px_rgba(37,99,235,0.1)]">
                <Volume2 size={64} className="animate-pulse" />
             </div>
             <h3 className="text-5xl font-black tracking-tighter mb-4 leading-none">Habla con Pilar</h3>
             <p className="text-slate-400 font-medium mb-12 max-w-xs leading-relaxed text-lg">
               Tu asistente inteligente para farmacias, eventos y turismo local.
             </p>
             <button 
               onClick={startSession}
               className="group bg-blue-600 text-white px-14 py-7 rounded-[40px] font-black text-sm uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(37,99,235,0.4)] flex items-center gap-4 hover:scale-105 active:scale-95 transition-all"
             >
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <Mic size={24} />
                </div>
                Empezar conversación
             </button>
          </div>
        )}

        <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
          <canvas ref={canvasRef} width={600} height={600} className="w-full h-full" />
          
          {/* Live Transcription Overlay */}
          {(currentTranscription || transcription) && (
            <div className="absolute bottom-4 left-0 right-0 px-4 animate-in slide-in-from-bottom-4 duration-500">
               <div className="bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 p-8 rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                  <div className="flex items-center gap-2 text-blue-400 mb-3">
                    <MessageCircle size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Respuesta PH</span>
                  </div>
                  <p className="text-2xl font-bold leading-snug text-white/95">
                    {currentTranscription || transcription}
                    {currentTranscription && <span className="inline-block w-1.5 h-6 bg-blue-500 ml-2 animate-pulse rounded-full" />}
                  </p>
               </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 max-w-md mx-auto">
            <p className="text-blue-500 text-[11px] font-black uppercase tracking-[0.6em] mb-4 h-4">
              {isConnecting ? 'SINCRONIZANDO...' : isActive ? 'ESCUCHANDO' : ''}
            </p>
            <h3 className="text-2xl font-black tracking-tight leading-tight min-h-[3rem] text-slate-200">
              {isConnecting ? 'Preparando enlace de baja latencia...' : isActive ? 'Dime, ¿en qué puedo ayudarte?' : error ? error : ''}
            </h3>
        </div>
      </div>

      {isActive && (
        <div className="p-6 relative z-10">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {voiceSuggestions.map((s, i) => (
              <button 
                key={i} 
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-white/50 whitespace-nowrap hover:bg-blue-600/20 hover:text-blue-400 hover:border-blue-500/30 transition-all active:scale-95"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="p-12 pb-20 flex justify-center gap-6 relative z-10">
         {isActive && (
           <button 
             onClick={stopSession}
             className="w-24 h-24 bg-red-600 text-white rounded-[35px] flex items-center justify-center shadow-[0_20px_40px_rgba(220,38,38,0.4)] hover:scale-110 active:scale-95 transition-all border-8 border-red-500/20"
           >
              <MicOff size={36} />
           </button>
         )}
         <button 
           onClick={onClose}
           className="px-12 py-6 bg-white/5 border border-white/10 rounded-[35px] font-black text-xs uppercase tracking-widest text-white/40 hover:bg-white/10 hover:text-white transition-all active:scale-95"
         >
           Finalizar
         </button>
      </div>
    </div>
  );
};
