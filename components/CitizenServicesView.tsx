
import React, { useState } from 'react';
import { 
  CalendarCheck, FileText, HelpCircle, MessageSquare, 
  Camera, Send, ChevronRight, Landmark, X, Check, MapPin, Clock, ArrowRight, Sparkles, ArrowLeft, Phone, AlertTriangle
} from './Icons';
import { Ad, ViewState } from '../types';
import { AdSpot } from './AdSpot';
import { Footer } from './Footer';
import { Header } from './Header';

interface CitizenServicesViewProps {
  t: any;
  ads: Ad[];
  onBack: () => void;
  headerProps: any;
  onOpenAdminLogin: () => void;
  isLoggedIn?: boolean;
  userPhone?: string;
  onOpenLogin?: () => void;
  onUpdatePhone?: (phone: string) => void;
}

export const CitizenServicesView: React.FC<CitizenServicesViewProps> = ({ 
  t, ads, onBack, headerProps, onOpenAdminLogin, isLoggedIn, userPhone, onOpenLogin, onUpdatePhone 
}) => {
  const [activeModal, setActiveModal] = useState<'none' | 'appointment' | 'incident' | 'success'>('none');
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [tempPhone, setTempPhone] = useState('');

  const handleDownload = (name: string) => {
    alert(`Iniciando descarga de: ${name}.pdf`);
  };

  const handleAction = (type: 'appointment' | 'incident') => {
    if (!isLoggedIn) {
      if (onOpenLogin) onOpenLogin();
      return;
    }

    if (!userPhone) {
      setShowPhoneModal(true);
      return;
    }

    setActiveModal(type);
  };

  const handleSavePhone = () => {
    if (tempPhone.trim().length < 9) return; // Simple validation
    if (onUpdatePhone) {
      onUpdatePhone(tempPhone);
      setShowPhoneModal(false);
      // Automatically open the appointment/incident modal after saving if intent was clear? 
      // For now, let user click again or we can track intent. Simpler to just close.
    }
  };

  return (
    <div className="fixed inset-0 z-[450] bg-[#f8fafc] flex flex-col animate-in fade-in duration-500 overflow-y-auto no-scrollbar">
      
      {/* 1. HEADER GLOBAL */}
      <div className="relative z-[220] shrink-0">
         <Header {...headerProps} />
      </div>

      {/* 2. ANUNCIO SUPERIOR (Full Width) */}
      <div className="w-full pt-4 pb-2 mt-24 shrink-0 relative z-10 bg-white">
         <AdSpot ads={ads} position="page-top" label={t.common.sponsored} view={ViewState.CITIZEN_SERVICES} />
      </div>
      
      {/* 3. HERO SECTION */}
      <div className="bg-[#0f172a] px-8 pt-10 pb-24 text-white relative overflow-hidden rounded-b-[60px] shadow-2xl mt-4 shrink-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] mb-4">
            <Landmark size={20} /> Sede Electrónica
          </div>
          <h1 className="text-5xl font-black tracking-tighter mb-4">{t.citizen_services.title}</h1>
          <p className="text-white/60 text-lg font-medium leading-tight max-w-sm">{t.citizen_services.subtitle}</p>
        </div>
      </div>

      {/* 4. CONTENIDO INTERACTIVO */}
      <div className="px-6 -mt-12 space-y-10 relative z-10 pb-10">
        
        {/* Botones Principales Grid */}
        <div className="grid grid-cols-2 gap-6">
          <button 
            onClick={() => handleAction('appointment')} 
            className="bg-white p-8 rounded-[40px] shadow-2xl flex flex-col items-center gap-5 border border-gray-100 group transition-all hover:-translate-y-1 active:scale-95 shadow-blue-900/5"
          >
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[22px] flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
              <CalendarCheck size={32} />
            </div>
            <div className="text-center">
              <span className="font-black text-gray-900 text-sm block">{t.citizen_services.appointment}</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Gestión Presencial</span>
            </div>
          </button>
          <button 
            onClick={() => handleAction('incident')} 
            className="bg-white p-8 rounded-[40px] shadow-2xl flex flex-col items-center gap-5 border border-gray-100 group transition-all hover:-translate-y-1 active:scale-95 shadow-red-900/5"
          >
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-[22px] flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all">
              <Camera size={32} />
            </div>
            <div className="text-center">
              <span className="font-black text-gray-900 text-sm block">{t.citizen_services.incidents}</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{t.citizen_services.report}</span>
            </div>
          </button>
        </div>

        {/* Trámites Frecuentes (Restaurado) */}
        <div className="animate-in slide-in-from-bottom duration-700 delay-150">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6 px-4">{t.citizen_services.frequent}</h3>
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-2xl shadow-gray-200/40 overflow-hidden">
            {[
              { id: 'padrón', label: t.citizen_services.certificate, icon: <FileText className="text-blue-500" /> },
              { id: 'tasas', label: t.citizen_services.taxes, icon: <Landmark className="text-orange-500" /> },
              { id: 'obras', label: t.citizen_services.licenses, icon: <MapPin className="text-green-500" /> }
            ].map((task) => (
              <button 
                key={task.id}
                onClick={() => handleDownload(task.label)}
                className="w-full p-8 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-all border-b border-gray-50 last:border-none group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    {task.icon}
                  </div>
                  <span className="text-base font-black text-gray-800 tracking-tighter">{task.label}</span>
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-gray-300 group-hover:text-blue-600 transition-colors">
                  <ChevronRight size={24} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Asistente Virtual Card (Restaurado) */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[50px] p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-500/20 group">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center">
                <Sparkles size={24} className="text-white fill-white" />
              </div>
              <span className="font-black uppercase tracking-[0.2em] text-xs">Asistente Virtual</span>
            </div>
            <h3 className="text-3xl font-black tracking-tighter mb-4">¿Tienes dudas administrativas?</h3>
            <p className="text-white/70 text-base font-medium mb-8 max-w-xs leading-tight leading-none">
              Pregúntame sobre horarios, documentación necesaria o estado de trámites municipales.
            </p>
            <button 
              onClick={() => alert("¡Habla con PH Concierge en la pestaña de Guía IA!")}
              className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <MessageSquare size={18} /> Iniciar Consulta
            </button>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10 group-hover:scale-110 transition-transform duration-1000">
            <Landmark size={240} />
          </div>
        </div>
      </div>

      {/* 5. ANUNCIO INFERIOR (Full Width) */}
      <div className="w-full py-6 shrink-0 opacity-90 relative z-10 bg-white">
         <AdSpot ads={ads} position="page-bottom" label={t.common.sponsored} view={ViewState.CITIZEN_SERVICES} />
      </div>

      {/* 6. FOOTER GLOBAL */}
      <div className="relative z-10">
        <Footer t={t} onOpenAdminLogin={onOpenAdminLogin} />
      </div>

      {/* PHONE REQUIREMENT MODAL */}
      {showPhoneModal && (
        <div className="fixed inset-0 z-[8000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowPhoneModal(false)} />
          <div className="relative bg-white w-full max-w-sm rounded-[40px] p-8 animate-in zoom-in-95 duration-300 shadow-2xl border border-white/20">
             <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-orange-100 rounded-2xl text-orange-600">
                   <AlertTriangle size={32} />
                </div>
                <button onClick={() => setShowPhoneModal(false)} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100"><X size={20} /></button>
             </div>
             
             <h3 className="text-2xl font-black text-gray-900 tracking-tighter leading-none mb-2">Falta un dato clave</h3>
             <p className="text-gray-500 font-medium text-sm mb-6 leading-relaxed">
               Para gestionar citas o incidencias, el personal del Ayuntamiento necesita poder contactarte. Por favor, añade tu teléfono.
             </p>

             <div className="space-y-4">
                <div>
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Tu Teléfono Móvil</label>
                   <div className="relative">
                      <input 
                        type="tel"
                        value={tempPhone}
                        onChange={(e) => setTempPhone(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all text-lg" 
                        placeholder="600 000 000" 
                        autoFocus
                      />
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                   </div>
                </div>

                <button 
                  onClick={handleSavePhone}
                  className="w-full py-5 bg-[#0f172a] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-black transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                   Guardar y Continuar
                </button>
             </div>
          </div>
        </div>
      )}

      {/* SERVICE MODALS (Placeholder) */}
      {activeModal !== 'none' && (
        <div className="fixed inset-0 z-[8000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActiveModal('none')} />
          <div className="relative bg-white w-full max-w-md rounded-[30px] p-10 animate-in zoom-in-95 text-center">
             <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} />
             </div>
             <h3 className="text-2xl font-black text-gray-900 mb-2">Servicio Iniciado</h3>
             <p className="text-gray-500 mb-8">
               Has accedido correctamente al servicio de {activeModal === 'appointment' ? 'Cita Previa' : 'Incidencias'}.
               <br/><br/>
               <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">Teléfono verificado: {userPhone}</span>
             </p>
             <button onClick={() => setActiveModal('none')} className="bg-gray-100 px-8 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-200">Cerrar Demo</button>
          </div>
        </div>
      )}

    </div>
  );
};
