
import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { X, Mic, MicOff, Volume2 } from './Icons';
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

export const VoiceConcierge: React.FC<VoiceConciergeProps> = ({ onClose, t, ads, headerProps }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcription, setTranscription] = useState('');
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startSession = async () => {
    if (isActive || isConnecting) return;
    setIsConnecting(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: { responseModalities: [Modality.AUDIO], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } }, systemInstruction: "Eres PH Voice." },
        callbacks: {
          onopen: () => { setIsActive(true); setIsConnecting(false); },
          onmessage: (m) => { if (m.serverContent?.outputTranscription) setTranscription(p => p + m.serverContent.outputTranscription.text); },
          onclose: () => stopSession(),
          onerror: () => stopSession()
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (e) { setIsConnecting(false); }
  };

  const stopSession = () => {
    setIsActive(false); setIsConnecting(false);
    if (sessionRef.current) sessionRef.current.close();
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-[#020617] flex flex-col text-white animate-in fade-in duration-700 overflow-y-auto no-scrollbar">
      <div className="relative z-[220] shrink-0">
         <Header {...headerProps} />
      </div>

      <div className="px-8 pt-4 pb-2 mt-24 shrink-0 relative z-20 bg-[#020617]">
         <AdSpot ads={ads} position="page-top" label={t.common.sponsored} view={ViewState.AI_CHAT} />
      </div>

      <div className="flex flex-col items-center justify-center p-8 text-center relative z-20 shrink-0 min-h-[60vh]">
        {!isActive && !isConnecting && (
          <div className="animate-in fade-in">
             <div className="w-32 h-32 bg-blue-600/10 rounded-[50px] flex items-center justify-center text-blue-400 mb-10 border border-blue-400/20 shadow-2xl mx-auto">
                <Volume2 size={64} className="animate-pulse" />
             </div>
             <h3 className="text-5xl font-black tracking-tighter mb-6 uppercase leading-none">PH VOICE</h3>
             <button onClick={startSession} className="bg-blue-600 text-white px-16 py-8 rounded-[45px] font-black uppercase tracking-[0.2em] shadow-2xl flex items-center gap-5 hover:scale-105 transition-all">
                <Mic size={28} /> {t.ai_guide.voice_btn}
             </button>
          </div>
        )}
        {isActive && (
          <div className="p-12">
             <div className="w-24 h-24 bg-blue-600 rounded-full animate-ping mx-auto mb-10"></div>
             <p className="text-2xl font-bold italic">"{transcription || '...'}"</p>
             <button onClick={stopSession} className="mt-12 bg-red-600 p-8 rounded-[40px] shadow-2xl"><MicOff size={40}/></button>
          </div>
        )}
        {isConnecting && (
           <div className="text-blue-400 font-black uppercase tracking-widest animate-pulse">{t.common.loading}</div>
        )}
      </div>

      <div className="relative z-20">
        <Footer t={t} />
      </div>
    </div>
  );
};
