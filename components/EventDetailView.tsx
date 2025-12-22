
import React from 'react';
import { Event } from '../types';
import { ArrowLeft, Share2, Calendar, MapPin, Tag, CalendarPlus } from './Icons';

interface EventDetailViewProps {
  event: Event;
  onBack: () => void;
  onShare: (event: Event) => void;
  onAddToCalendar: (e: React.MouseEvent, event: Event) => void;
  t: any;
}

export const EventDetailView: React.FC<EventDetailViewProps> = ({ event, onBack, onShare, onAddToCalendar, t }) => {
  return (
    <div className="bg-white min-h-screen animate-in slide-in-from-right duration-500 pb-32 overflow-x-hidden">
      {/* Sticky Header */}
      <div className="sticky top-0 z-[150] bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="p-3 -ml-2 text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all active:scale-90"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1 px-4 text-center">
             <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] block mb-0.5">{t.event_detail.pilar_event}</span>
             <h2 className="font-black text-gray-900 text-sm truncate uppercase tracking-tighter">{event.title}</h2>
        </div>
        <button 
          onClick={() => onShare(event)}
          className="p-3 -mr-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-all active:scale-90"
        >
          <Share2 size={24} />
        </button>
      </div>

      {/* Hero Image */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[21/9] bg-gray-100">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-8">
          <span className="px-5 py-2 bg-white text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl">
            {event.category}
          </span>
        </div>
      </div>

      <div className="px-8 py-10 max-w-2xl mx-auto -mt-12 relative z-10">
        <div className="bg-white rounded-[50px] shadow-2xl p-10 border border-gray-50">
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter leading-none mb-8">
            {event.title}
            </h1>

            <div className="space-y-4 mb-10">
                <div className="flex items-center gap-5 p-5 bg-blue-50/50 rounded-3xl border border-blue-100/50">
                    <div className="w-12 h-12 bg-white text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                        <Calendar size={22} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">{t.event_detail.date_time}</span>
                        <span className="text-base font-black text-gray-800 tracking-tighter">{event.date}</span>
                    </div>
                </div>
                <div className="flex items-center gap-5 p-5 bg-red-50/50 rounded-3xl border border-red-100/50">
                    <div className="w-12 h-12 bg-white text-red-500 rounded-2xl flex items-center justify-center shadow-sm">
                        <MapPin size={22} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black text-red-300 uppercase tracking-widest">{t.event_detail.main_location}</span>
                        <span className="text-base font-black text-gray-800 tracking-tighter">{event.location}</span>
                    </div>
                </div>
            </div>

            {/* Acciones de Agenda dinámicas */}
            <div className="flex gap-4 mb-10">
                <button 
                onClick={(e) => onAddToCalendar(e, event)}
                className="flex-1 py-5 bg-blue-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 active:scale-95"
                >
                <CalendarPlus size={20} />
                {t.common.addToCalendar}
                </button>
                <button 
                onClick={() => onShare(event)}
                className="w-16 h-16 bg-gray-50 text-gray-500 rounded-3xl font-black flex items-center justify-center hover:bg-gray-100 transition-all border border-gray-100 active:scale-95"
                >
                <Share2 size={24} />
                </button>
            </div>

            <div className="prose prose-blue prose-lg max-w-none text-gray-500 font-medium leading-relaxed mb-12">
                <div dangerouslySetInnerHTML={{ __html: (event as any).long || event.description }} />
            </div>

            <button 
                onClick={() => onShare(event)}
                className="w-full py-5 bg-[#0f172a] text-white rounded-[32px] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-gray-200 hover:scale-[1.02] transition-all flex items-center justify-center gap-4"
            >
                <Share2 size={22} />
                {t.common.share}
            </button>
        </div>
      </div>
    </div>
  );
};
