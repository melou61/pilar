
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

  const audioContextRef = useRef<AudioContext | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
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
    "¿Qué eventos hay?",
    "Historia de Pilar"
  ];

  useEffect(() => {
    return () => {
      stopSession();
    };
  }, []);

  function encode(bytes: Uint8Array) {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
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
      console.debug('Iniciando PH VOICE - Solicitando Micro...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Setup contexts
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      if (!inputAudioContextRef.current) {
        inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      }

      // Resume both for safety
      await audioContextRef.current.resume();
      await inputAudioContextRef.current.resume();

      const inputCtx = inputAudioContextRef.current;
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
          systemInstruction: `Eres PH Concierge, el asistente de voz oficial de Pilar de la Horadada. 
          Tu misión es ayudar a turistas y vecinos con información local.
          REGLAS:
          1. Habla SIEMPRE. No uses texto a menos que se pida específicamente.
          2. Sé breve y elegante (estilo conserje de hotel de lujo).
          3. Saluda al usuario calurosamente si detectas que te habla por primera vez.
          4. Si hay silencio, no cortes la sesión, espera un poco.`
        },
        callbacks: {
          onopen: () => {
            console.debug('PH VOICE: Sesión Abierta');
            setIsActive(true);
            setIsConnecting(false);
            
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            source.connect(analyzer);
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);

            scriptProcessor.onaudioprocess = (e) => {
              if (isActive) {
                const inputData = e.inputBuffer.getChannelData(0);
                const pcmBlob = createBlob(inputData);
                sessionPromise.then(session => {
                  session.sendRealtimeInput({ media: pcmBlob });
                }).catch(err => console.error("Error enviando audio:", err));
              }
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
              console.debug('PH VOICE: Recibiendo respuesta de audio...');
              const ctx = audioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              source.addEventListener('ended', () => sourcesRef.current.delete(source));
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            console.error("PH VOICE Error:", e);
            setError("Error de red. Asegúrate de tener una conexión estable.");
            stopSession();
          },
          onclose: (e) => {
            console.debug('PH VOICE: Sesión Cerrada', e);
            stopSession();
          }
        }
      });

      sessionRef.current = await sessionPromise;

    } catch (err) {
      console.error("Error de Hardware/Mic:", err);
      setError("Permiso de micrófono denegado o hardware no disponible.");
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    setIsActive(false);
    setIsConnecting(false);
    if (sessionRef.current) { try { sessionRef.current.close(); } catch(e) {} }
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); }
    sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
    sourcesRef.current.clear();
    sessionRef.current = null;
    streamRef.current = null;
    console.debug('PH VOICE: Sistema Detenido');
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
      const radius = 110;

      const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
      const pulseRadius = radius + (avg * 1.5); 

      // Glow Core
      ctx.shadowBlur = 60;
      ctx.shadowColor = 'rgba(37, 99, 235, 0.7)';

      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.1, centerX, centerY, pulseRadius);
      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(0.4, '#2563eb');
      gradient.addColorStop(1, 'rgba(29, 78, 216, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.shadowBlur = 0;

      // Orbitals
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        const r = pulseRadius + (i + 1) * 20 + Math.sin(Date.now() / 300 + i) * 15;
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.3 - i * 0.05})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };
    draw();
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-[#020617] flex flex-col text-white animate-in fade-in duration-500 overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/50 via-transparent to-transparent"></div>
      
      <div className="p-8 flex items-center justify-between relative z-10">
        <button onClick={onClose} className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-white/80 active:scale-90 border border-white/10">
           <ArrowLeft size={28} />
        </button>
        <div className="flex flex-col items-center">
           <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/40">
                <Bot size={22} className="text-white" />
              </div>
              <h2 className="font-black text-base uppercase tracking-[0.4em]">PH VOICE</h2>
           </div>
           <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.5em] italic flex items-center gap-2">
              <Globe size={12} /> PILAR DE LA HORADADA
           </span>
        </div>
        <div className="w-16" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative z-10">
        {!isActive && !isConnecting && !error && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 bg-[#020617]/95 backdrop-blur-xl animate-in fade-in">
             <div className="w-32 h-32 bg-blue-600/10 rounded-[50px] flex items-center justify-center text-blue-400 mb-10 border border-blue-400/20 shadow-[0_0_80px_rgba(37,99,235,0.2)]">
                <Volume2 size={64} className="animate-pulse" />
             </div>
             <h3 className="text-5xl font-black tracking-tighter mb-6 leading-none">Voz en Tiempo Real</h3>
             <p className="text-slate-400 font-medium mb-12 max-w-sm leading-relaxed text-xl">
               Pregúntame cualquier cosa sobre Pilar de la Horadada directamente con tu voz.
             </p>
             <button 
               onClick={startSession}
               className="group bg-blue-600 text-white px-16 py-8 rounded-[45px] font-black text-base uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(37,99,235,0.4)] flex items-center gap-5 hover:scale-105 active:scale-95 transition-all"
             >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <Mic size={28} />
                </div>
                Iniciar Diálogo
             </button>
          </div>
        )}

        <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
          <canvas ref={canvasRef} width={600} height={600} className="w-full h-full" />
          
          {(currentTranscription || transcription) && (
            <div className="absolute bottom-4 left-0 right-0 px-4 animate-in slide-in-from-bottom-4 duration-500">
               <div className="bg-[#0f172a]/90 backdrop-blur-2xl border border-white/20 p-8 rounded-[45px] shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
                  <div className="flex items-center gap-2 text-blue-400 mb-4">
                    <MessageCircle size={18} />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">Respuesta PH</span>
                  </div>
                  <p className="text-2xl font-bold leading-tight text-white/95">
                    {currentTranscription || transcription}
                    {currentTranscription && <span className="inline-block w-2 h-7 bg-blue-500 ml-2 animate-pulse rounded-full" />}
                  </p>
               </div>
            </div>
          )}
        </div>
        
        <div className="mt-12 max-w-md mx-auto">
            <p className="text-blue-500 text-[12px] font-black uppercase tracking-[0.6em] mb-6 h-4">
              {isConnecting ? 'ENLAZANDO...' : isActive ? 'ESCUCHANDO...' : ''}
            </p>
            <h3 className="text-3xl font-black tracking-tight leading-tight min-h-[4rem] text-slate-100">
              {isConnecting ? 'Sincronizando con el servidor municipal...' : isActive ? '¿En qué puedo ayudarte hoy?' : error ? error : ''}
            </h3>
        </div>
      </div>

      {isActive && (
        <div className="p-8 relative z-10">
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {voiceSuggestions.map((s, i) => (
              <button 
                key={i} 
                className="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-sm font-bold text-white/40 whitespace-nowrap hover:bg-blue-600/30 hover:text-blue-400 transition-all active:scale-95"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="p-12 pb-24 flex justify-center gap-8 relative z-10">
         {isActive && (
           <button 
             onClick={stopSession}
             className="w-28 h-28 bg-red-600 text-white rounded-[40px] flex items-center justify-center shadow-[0_25px_50px_rgba(220,38,38,0.5)] hover:scale-110 active:scale-95 transition-all border-8 border-red-500/20"
           >
              <MicOff size={44} />
           </button>
         )}
         <button 
           onClick={onClose}
           className="px-14 py-7 bg-white/5 border border-white/10 rounded-[40px] font-black text-sm uppercase tracking-widest text-white/30 hover:bg-white/10 hover:text-white transition-all active:scale-95"
         >
           Desconectar
         </button>
      </div>
    </div>
  );
};
