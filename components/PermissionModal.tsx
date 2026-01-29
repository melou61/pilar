
import React from 'react';
import { MapPin, Mic, Camera, Check } from './Icons';

interface PermissionModalProps {
  t: any;
  onAccept: () => void;
}

export const PermissionModal: React.FC<PermissionModalProps> = ({ t, onAccept }) => {
  const p = t.permissions || {
    title: 'Permisos Necesarios',
    subtitle: 'Para disfrutar de la experiencia completa de Pilar Vivo, necesitamos acceso a:',
    loc_title: 'Ubicación',
    loc_desc: 'Para mostrarte playas y comercios cercanos.',
    mic_title: 'Micrófono',
    mic_desc: 'Para hablar con el Asistente IA en tiempo real.',
    cam_title: 'Cámara',
    cam_desc: 'Para usar PH Lens y reconocer el entorno.',
    btn: 'Permitir y Continuar',
    footer: 'Puedes cambiar esto en los ajustes de tu dispositivo.'
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-[#0f172a]">
      <div className="relative w-full max-w-sm bg-white rounded-[45px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
        
        {/* Header Visual */}
        <div className="bg-blue-600 p-10 pb-16 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
           <div className="w-20 h-20 bg-white rounded-[28px] mx-auto mb-6 flex items-center justify-center shadow-lg transform rotate-6">
              <div className="text-4xl">👋</div>
           </div>
           <h2 className="text-2xl font-black text-white tracking-tighter mb-2">{p.title}</h2>
           <p className="text-blue-100 text-sm font-medium leading-relaxed opacity-90">{p.subtitle}</p>
        </div>

        {/* Permissions List */}
        <div className="px-8 -mt-8 relative z-10 space-y-4 pb-8">
           <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-50 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                 <MapPin size={24} />
              </div>
              <div>
                 <h4 className="font-black text-gray-900 text-sm">{p.loc_title}</h4>
                 <p className="text-[10px] text-gray-500 font-medium leading-tight mt-0.5">{p.loc_desc}</p>
              </div>
           </div>

           <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-50 flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                 <Mic size={24} />
              </div>
              <div>
                 <h4 className="font-black text-gray-900 text-sm">{p.mic_title}</h4>
                 <p className="text-[10px] text-gray-500 font-medium leading-tight mt-0.5">{p.mic_desc}</p>
              </div>
           </div>

           <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-50 flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                 <Camera size={24} />
              </div>
              <div>
                 <h4 className="font-black text-gray-900 text-sm">{p.cam_title}</h4>
                 <p className="text-[10px] text-gray-500 font-medium leading-tight mt-0.5">{p.cam_desc}</p>
              </div>
           </div>
        </div>

        {/* Action */}
        <div className="p-8 pt-0">
           <button 
             onClick={onAccept}
             className="w-full py-5 bg-[#0f172a] text-white rounded-[24px] font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-95"
           >
              {p.btn} <Check size={18} />
           </button>
           <p className="text-[9px] text-gray-400 text-center mt-4 font-medium">{p.footer}</p>
        </div>

      </div>
    </div>
  );
};
