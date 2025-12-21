
import React from 'react';
import { 
  CalendarCheck, FileText, HelpCircle, MessageSquare, 
  Camera, Send, ChevronRight, Landmark 
} from './Icons';

interface CitizenServicesViewProps {
  t: any;
}

export const CitizenServicesView: React.FC<CitizenServicesViewProps> = ({ t }) => {
  return (
    <div className="bg-white min-h-screen pb-44 animate-in fade-in duration-300">
      <div className="bg-blue-700 px-6 pt-8 pb-12 text-white rounded-b-3xl shadow-lg">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Landmark />
            Ayuntamiento 24h
        </h1>
        <p className="text-blue-100 text-sm max-w-sm">
            Realiza tus gestiones de forma rápida sin hacer colas. Tu ayuntamiento más cerca de ti.
        </p>
      </div>

      <div className="px-4 -mt-8 space-y-6">
        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-4">
            <button className="bg-white p-5 rounded-xl shadow-md border border-blue-50 flex flex-col items-center text-center gap-3 hover:transform hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    <CalendarCheck size={24} />
                </div>
                <span className="font-bold text-gray-800 text-sm">Cita Previa</span>
            </button>
            <button className="bg-white p-5 rounded-xl shadow-md border border-blue-50 flex flex-col items-center text-center gap-3 hover:transform hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <Camera size={24} />
                </div>
                <span className="font-bold text-gray-800 text-sm">Comunicar Incidencia</span>
            </button>
        </div>

        {/* Frequent Tasks List */}
        <div>
            <h3 className="font-bold text-gray-900 mb-4 px-2">Trámites Frecuentes</h3>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
                <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                        <FileText size={18} className="text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Certificado de Empadronamiento</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-300" />
                </div>
                <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                        <FileText size={18} className="text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Pago de Tasas Municipales</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-300" />
                </div>
                <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                        <FileText size={18} className="text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Licencias de Obra Menor</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-300" />
                </div>
            </div>
        </div>

        {/* Chat / Support */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 text-white relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="font-bold text-lg mb-2">¿Dudas? Chat Ciudadano</h3>
                <p className="text-white/80 text-sm mb-4">
                    Nuestro asistente virtual está disponible para resolver tus dudas rápidas sobre horarios y servicios.
                </p>
                <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm">
                    <MessageSquare size={16} /> Iniciar Chat
                </button>
             </div>
             <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
                <HelpCircle size={120} />
             </div>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-50 rounded-xl p-5 text-center text-sm text-gray-500 border border-gray-100">
            <p className="font-semibold mb-1">Oficina de Atención al Ciudadano (OAC)</p>
            <p>Plaza Campoamor, 2, Planta Baja</p>
            <p className="mt-2 text-blue-600 font-medium">965 35 22 25</p>
        </div>
      </div>
    </div>
  );
};
