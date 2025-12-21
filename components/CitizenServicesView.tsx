
import React, { useState } from 'react';
import { 
  CalendarCheck, FileText, HelpCircle, MessageSquare, 
  Camera, Send, ChevronRight, Landmark, X, Check, MapPin, Clock, ArrowRight, Sparkles
} from './Icons';

interface CitizenServicesViewProps {
  t: any;
}

type ModalType = 'none' | 'appointment' | 'incident' | 'success';

export const CitizenServicesView: React.FC<CitizenServicesViewProps> = ({ t }) => {
  const [activeModal, setActiveModal] = useState<ModalType>('none');
  const [loading, setLoading] = useState(false);

  const handleFakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActiveModal('success');
    }, 1500);
  };

  const renderModal = () => {
    if (activeModal === 'none') return null;

    if (activeModal === 'success') {
      return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0f172a]/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] p-10 w-full max-w-sm text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} strokeWidth={3} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">¡Gestión Enviada!</h3>
            <p className="text-gray-500 font-medium mb-8">Recibirás una notificación en tu móvil con el número de seguimiento.</p>
            <button 
              onClick={() => setActiveModal('none')}
              className="w-full py-4 bg-[#0f172a] text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl active:scale-95 transition-all"
            >
              Entendido
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-[#0f172a]/60 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="bg-white w-full max-w-lg rounded-t-[40px] sm:rounded-[40px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom duration-500">
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
            <h3 className="text-xl font-black text-gray-900 tracking-tighter">
              {activeModal === 'appointment' ? 'Solicitar Cita Previa' : 'Reportar Incidencia'}
            </h3>
            <button onClick={() => setActiveModal('none')} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
            <form onSubmit={handleFakeSubmit} className="space-y-6">
              {activeModal === 'appointment' ? (
                <>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Seleccionar Departamento</label>
                    <select required className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 text-gray-900 font-bold appearance-none transition-all">
                      <option>Padrón y Certificados</option>
                      <option>Urbanismo y Obras</option>
                      <option>Servicios Sociales</option>
                      <option>OMIC (Consumo)</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Fecha</label>
                      <input type="date" required className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-900" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Hora</label>
                      <input type="time" required className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-900" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-blue-50/50 border-2 border-dashed border-blue-200 rounded-[30px] p-8 text-center flex flex-col items-center gap-4 group cursor-pointer hover:bg-blue-50 transition-all">
                    <div className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Camera size={30} />
                    </div>
                    <div>
                      <p className="text-blue-600 font-black text-sm uppercase tracking-widest">Añadir Foto</p>
                      <p className="text-blue-400 text-xs mt-1">Sube una foto del problema (farola, bache...)</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Descripción del problema</label>
                    <textarea 
                      required 
                      placeholder="Describe brevemente qué ocurre y dónde..."
                      className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl h-32 resize-none font-medium text-gray-900 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-5 bg-blue-600 text-white rounded-3xl font-black text-lg shadow-xl shadow-blue-500/20 hover:bg-blue-700 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
              >
                {loading ? 'Procesando...' : activeModal === 'appointment' ? 'Confirmar Cita' : 'Enviar Reporte'}
                {!loading && <ArrowRight size={20} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const handleDownload = (name: string) => {
    setLoading(true);
    // Simular descarga
    setTimeout(() => {
      setLoading(false);
      alert(`Descargando: ${name}.pdf`);
    }, 1000);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-44 animate-in fade-in duration-500 overflow-x-hidden">
      {renderModal()}
      
      {/* Header Estilo Moderno */}
      <div className="bg-[#0f172a] px-8 pt-16 pb-24 text-white relative overflow-hidden rounded-b-[60px] shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] mb-4">
            <Landmark size={20} />
            Sede Electrónica
          </div>
          <h1 className="text-5xl font-black tracking-tighter mb-4">Pilar 24h</h1>
          <p className="text-white/60 text-lg font-medium leading-tight max-w-sm">
            Tus gestiones municipales a un solo clic, sin colas y desde cualquier lugar.
          </p>
        </div>
      </div>

      <div className="px-6 -mt-12 space-y-10">
        {/* Quick Actions Grid - Botones Gigantes y Funcionales */}
        <div className="grid grid-cols-2 gap-6">
          <button 
            onClick={() => setActiveModal('appointment')}
            className="bg-white p-8 rounded-[40px] shadow-2xl shadow-blue-900/5 flex flex-col items-center text-center gap-5 hover:-translate-y-2 active:scale-95 transition-all group border border-gray-100"
          >
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[22px] flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
              <CalendarCheck size={32} />
            </div>
            <div>
              <span className="font-black text-gray-900 text-sm block tracking-tighter">Cita Previa</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Reservar Turno</span>
            </div>
          </button>
          
          <button 
            onClick={() => setActiveModal('incident')}
            className="bg-white p-8 rounded-[40px] shadow-2xl shadow-red-900/5 flex flex-col items-center text-center gap-5 hover:-translate-y-2 active:scale-95 transition-all group border border-gray-100"
          >
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-[22px] flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all shadow-inner">
              <Camera size={32} />
            </div>
            <div>
              <span className="font-black text-gray-900 text-sm block tracking-tighter">Incidencias</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Avisar al Ayto.</span>
            </div>
          </button>
        </div>

        {/* Frequent Tasks List - Interactivo */}
        <div className="animate-in slide-in-from-bottom duration-700 delay-150">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-6 px-4">Trámites más usados</h3>
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-2xl shadow-gray-200/40 overflow-hidden">
            {[
              { id: 'padrón', label: 'Volante de Empadronamiento', icon: <FileText className="text-blue-500" /> },
              { id: 'tasas', label: 'Pago de Tasas e Impuestos', icon: <Landmark className="text-orange-500" /> },
              { id: 'obras', label: 'Licencia Obra Menor', icon: <MapPin className="text-green-500" /> }
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

        {/* Chat / Support - Funcionalidad Sugerida */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[50px] p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-500/20 group">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center">
                <Sparkles size={24} className="text-white fill-white" />
              </div>
              <span className="font-black uppercase tracking-[0.2em] text-xs">Asistente Virtual</span>
            </div>
            <h3 className="text-3xl font-black tracking-tighter mb-4">¿Tienes dudas administrativas?</h3>
            <p className="text-white/70 text-base font-medium mb-8 max-w-xs leading-tight">
              Pregúntame sobre horarios, documentación necesaria o estado de trámites.
            </p>
            <button 
              onClick={() => alert("¡Habla con PH Concierge en la pestaña de Guía IA!")}
              className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <MessageSquare size={18} /> Iniciar Consulta
            </button>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10 group-hover:scale-110 transition-transform duration-1000">
            <Landmark size={240} />
          </div>
        </div>

        {/* Contact Info */}
        <div className="p-10 text-center space-y-4 bg-gray-100/50 rounded-[40px] border border-white/50">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Atención Presencial (OAC)</p>
          <div className="space-y-1">
            <h4 className="font-black text-xl text-gray-900 tracking-tighter">Plaza Campoamor, 2</h4>
            <p className="text-gray-500 font-medium text-sm">Lunes a Viernes • 08:30 - 14:30</p>
          </div>
          <a href="tel:965352225" className="inline-block px-8 py-3 bg-white text-blue-600 rounded-full font-black text-xs uppercase tracking-widest shadow-sm border border-gray-200">
            Llamar: 965 35 22 25
          </a>
        </div>
      </div>
    </div>
  );
};
