
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

  // Refs para control persistente (evita cierres de ámbito en el bucle de animación)
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isRunningRef = useRef(false);

  const voiceSuggestions = [
    "¿Qué tiempo hace hoy?",
    "¿Cuál es la farmacia de guardia?",
    "Sitios para comer",
    "Próximos eventos",
    "Historia local"
  ];

  useEffect(() => {
    return () => {
      stopSession();
    };
  }, []);

  // Funciones de utilidad para codificación/decodificación manual (Requerido por Guías)
  function encode(bytes: Uint8Array) {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }

  function decode(base64: string) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  }

  async function decodeAudioData(data: Uint8Array, ctx: AudioContext, rate: number, channels: number): Promise<AudioBuffer> {
    const int16 = new Int16Array(data.buffer);
    const count = int16.length / channels;
    const buffer = ctx.createBuffer(channels, count, rate);
    for (let ch = 0; ch < channels; ch++) {
      const chData = buffer.getChannelData(ch);
      for (let i = 0; i < count; i++) chData[i] = int16[i * channels + ch] / 32768.0;
    }
    return buffer;
  }

  const createBlob = (data: Float32Array) => {
    const int16 = new Int16Array(data.length);
    for (let i = 0; i < data.length; i++) int16[i] = data[i] * 32768;
    return { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' };
  };

  const startSession = async () => {
    if (isActive || isConnecting) return;
    
    setIsConnecting(true);
    setError(null);
    setTranscription('');
    setCurrentTranscription('');
    isRunningRef.current = true;

    // INICIO INMEDIATO DEL VISUALIZADOR (Incluso antes de tener el micro)
    visualize();

    try {
      console.debug('PH VOICE: Solicitando acceso al hardware...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Inicializar contextos de audio inmediatamente tras interacción del usuario
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      if (!inputAudioContextRef.current) {
        inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      }

      // Despertar contextos (Safari/Chrome fix)
      await Promise.all([
        audioContextRef.current.resume(),
        inputAudioContextRef.current.resume()
      ]);

      const inputCtx = inputAudioContextRef.current;
      const analyzer = inputCtx.createAnalyser();
      analyzer.fftSize = 256;
      analyzerRef.current = analyzer;

      // Conectar micro al analizador LOCAL para que el círculo se mueva aunque la IA no responda
      const source = inputCtx.createMediaStreamSource(stream);
      source.connect(analyzer);

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
          },
          systemInstruction: `Eres PH Concierge, el asistente de voz oficial de Pilar de la Horadada. 
          Tu tono es el de un mayordomo de lujo: elegante, servicial y extremadamente conciso. 
          RESPONDE SIEMPRE POR VOZ. Si el usuario te saluda, dale la bienvenida al municipio. 
          Si te pregunta algo, responde en máximo 15 palabras.`
        },
        callbacks: {
          onopen: () => {
            console.debug('PH VOICE: Canal abierto con la IA');
            setIsActive(true);
            setIsConnecting(false);
            
            // Iniciar streaming hacia la IA
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);

            scriptProcessor.onaudioprocess = (e) => {
              if (isRunningRef.current) {
                const inputData = e.inputBuffer.getChannelData(0);
                const pcmBlob = createBlob(inputData);
                sessionPromise.then(session => {
                  session.sendRealtimeInput({ media: pcmBlob });
                }).catch(err => console.error("Error envío audio:", err));
              }
            };
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
              
              const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
              const sourceNode = ctx.createBufferSource();
              sourceNode.buffer = audioBuffer;
              sourceNode.connect(ctx.destination);
              sourceNode.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(sourceNode);
              sourceNode.onended = () => sourcesRef.current.delete(sourceNode);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            console.error("PH VOICE API ERROR:", e);
            setError("Error de conexión remota.");
            stopSession();
          },
          onclose: () => stopSession()
        }
      });

      sessionRef.current = await sessionPromise;

    } catch (err) {
      console.error("PH VOICE Hardware Error:", err);
      setError("No se pudo activar el micrófono.");
      setIsConnecting(false);
      isRunningRef.current = false;
    }
  };

  const stopSession = () => {
    setIsActive(false);
    setIsConnecting(false);
    isRunningRef.current = false;
    if (sessionRef.current) try { sessionRef.current.close(); } catch(e) {}
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
    sourcesRef.current.clear();
    sessionRef.current = null;
    streamRef.current = null;
  };

  const visualize = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      if (!isRunningRef.current) return;
      requestAnimationFrame(draw);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      let radius = 120;
      let pulse = 0;

      // Obtener datos del analizador si está listo
      if (analyzerRef.current) {
        const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
        analyzerRef.current.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        pulse = avg * 1.8; // Sensibilidad alta
      } else {
        // Latido en espera si no hay micro todavía
        pulse = Math.sin(Date.now() / 200) * 10 + 10;
      }

      const currentRadius = radius + pulse;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Glow exterior
      ctx.shadowBlur = 80;
      ctx.shadowColor = 'rgba(59, 130, 246, 0.5)';

      // Orbe Principal
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.2, centerX, centerY, currentRadius);
      gradient.addColorStop(0, '#60a5fa');
      gradient.addColorStop(0.5, '#2563eb');
      gradient.addColorStop(1, 'rgba(30, 58, 138, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.shadowBlur = 0;

      // Anillos orbitales
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const r = currentRadius + (i + 1) * 30 + Math.sin(Date.now() / 400 + i) * 15;
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(96, 165, 250, ${0.4 - i * 0.1})`;
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 20]);
        ctx.lineDashOffset = -Date.now() / 50;
        ctx.stroke();
      }
    };
    draw();
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-[#020617] flex flex-col text-white animate-in fade-in duration-700 overflow-hidden">
      {/* Fondo de red cibernética */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>
      
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
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 bg-[#020617]/95 backdrop-blur-3xl animate-in fade-in">
             <div className="w-32 h-32 bg-blue-600/10 rounded-[50px] flex items-center justify-center text-blue-400 mb-10 border border-blue-400/20 shadow-[0_0_80px_rgba(37,99,235,0.2)]">
                <Volume2 size={64} className="animate-pulse" />
             </div>
             <h3 className="text-5xl font-black tracking-tighter mb-6 leading-none uppercase">Conserje de Voz</h3>
             <p className="text-slate-400 font-medium mb-12 max-w-sm leading-relaxed text-xl">
               Información turística y municipal al instante mediante voz.
             </p>
             <button 
               onClick={startSession}
               className="group bg-blue-600 text-white px-16 py-8 rounded-[45px] font-black text-base uppercase tracking-[0.2em] shadow-[0_20px_60px_rgba(37,99,235,0.4)] flex items-center gap-5 hover:scale-105 active:scale-95 transition-all"
             >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <Mic size={28} />
                </div>
                Empezar a hablar
             </button>
          </div>
        )}

        <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
          <canvas ref={canvasRef} width={600} height={600} className="w-full h-full" />
          
          {(currentTranscription || transcription) && (
            <div className="absolute bottom-4 left-0 right-0 px-4 animate-in slide-in-from-bottom-8 duration-700">
               <div className="bg-[#0f172a]/90 backdrop-blur-2xl border border-white/20 p-8 rounded-[45px] shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
                  <div className="flex items-center gap-2 text-blue-400 mb-4">
                    <MessageCircle size={18} />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">Respuesta PH</span>
                  </div>
                  <p className="text-2xl font-bold leading-tight text-white/95 italic">
                    "{currentTranscription || transcription}"
                    {currentTranscription && <span className="inline-block w-2 h-7 bg-blue-500 ml-2 animate-pulse rounded-full" />}
                  </p>
               </div>
            </div>
          )}
        </div>
        
        <div className="mt-12 max-w-md mx-auto">
            <p className="text-blue-500 text-[12px] font-black uppercase tracking-[0.6em] mb-6 h-4">
              {isConnecting ? 'CONECTANDO...' : isActive ? 'ESCUCHANDO' : ''}
            </p>
            <h3 className="text-3xl font-black tracking-tight leading-tight min-h-[4rem] text-slate-100">
              {isConnecting ? 'Estableciendo enlace seguro...' : isActive ? 'Pregúntame lo que necesites' : error ? error : ''}
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
