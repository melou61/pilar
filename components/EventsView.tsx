
import React, { useState } from 'react';
import { Event, Ad, ViewState } from '../types';
import { Search, Calendar, MapPin, ChevronRight, ArrowLeft, Bookmark, Sparkles, Trophy } from './Icons';
import { EventDetailView } from './EventDetailView';
import { AdSpot } from './AdSpot';
import { Header } from './Header';
import { Footer } from './Footer';

interface EventsViewProps {
  t: any;
  events: Event[];
  onShare: (event: Event) => void;
  onAddToCalendar: (e: React.MouseEvent, event: Event) => void;
  initialEventId?: string | null;
  myEvents?: string[];
  toggleMyEvent?: (id: string) => void;
  ads: Ad[];
  headerProps: any;
}

export const EventsView: React.FC<EventsViewProps> = ({ 
    t, events, onShare, onAddToCalendar, initialEventId, myEvents = [], toggleMyEvent, ads, headerProps
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(initialEventId || null);
  const [activeCategory, setActiveCategory] = useState('all');

  const getEventContent = (id: string) => {
    return t.events_data?.[id] || events.find(e => e.id === id);
  };

  const filteredEvents = events.filter(event => {
    const content = getEventContent(event.id);
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          content.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || event.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const selectedEvent = events.find(e => e.id === selectedEventId);

  if (selectedEvent) {
    const translatedEvent = {
        ...selectedEvent,
        ...getEventContent(selectedEvent.id)
    };
    return <EventDetailView 
      event={translatedEvent} 
      onBack={() => setSelectedEventId(null)} 
      onShare={onShare} 
      onAddToCalendar={onAddToCalendar} 
      t={t} 
    />;
  }

  const categories = [
    { id: 'all', label: 'Todo' },
    { id: 'TRADICIÓN', label: 'Tradición' },
    { id: 'RELIGIOSO', label: 'Semana Santa' },
    { id: 'CINE', label: 'Cultura' },
    { id: 'HISTORIA', label: 'Recreación' }
  ];

  return (
    <div className="fixed inset-0 z-[400] bg-[#f8fafc] flex flex-col animate-in fade-in duration-500 overflow-y-auto no-scrollbar">
      
      {/* 1. HEADER GLOBAL */}
      <div className="relative z-[220] shrink-0">
         <Header {...headerProps} />
      </div>

      {/* 2. ANUNCIO SUPERIOR (mt-24) */}
      <div className="px-8 pt-4 pb-2 mt-24 shrink-0 relative z-10 bg-white">
        <AdSpot ads={ads} position="page-top" label={t.common.sponsored} view={ViewState.EVENTS} currentFilter={activeCategory} />
      </div>

      {/* 3. CONTENT */}
      <div className="bg-[#1e1b4b] px-8 pt-16 pb-24 text-white rounded-b-[60px] relative overflow-hidden shrink-0 mt-4">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-purple-400 font-black text-[10px] uppercase tracking-[0.4em] mb-4">
            <Sparkles size={20} />
            PH Festivales
          </div>
          <h1 className="text-5xl font-black tracking-tighter mb-4 leading-tight">{t.menu.events}</h1>
          <div className="mt-8 relative max-w-md">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.common.searchPlaceholder}
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-[24px] text-white placeholder-white/40 font-bold"
            />
            <Search className="absolute left-4 top-4 text-white/40" size={24} />
          </div>
        </div>
      </div>

      <div className="px-6 -mt-10 relative z-20 space-y-10 flex-1">
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-4 px-2 select-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-8 py-3.5 rounded-[22px] text-[10px] font-black whitespace-nowrap uppercase tracking-widest border border-transparent shadow-lg shrink-0 ${activeCategory === cat.id ? 'bg-purple-600 text-white scale-105' : 'bg-white text-gray-400'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-10 pb-20">
          {filteredEvents.map(event => (
              <div key={event.id} onClick={() => setSelectedEventId(event.id)} className="bg-white rounded-[56px] overflow-hidden shadow-2xl border border-gray-100 group cursor-pointer relative transition-all duration-500">
                  <div className="h-72 overflow-hidden relative">
                      <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  </div>
                  <div className="p-10">
                      <h3 className="font-black text-gray-900 text-4xl mb-6 tracking-tighter leading-none">{getEventContent(event.id).title}</h3>
                      <div className="space-y-4 mb-10 pt-8 border-t border-gray-50">
                          <div className="flex items-center gap-4 text-xs text-gray-400 font-black uppercase tracking-widest"><Calendar size={20} className="text-purple-500" /> {getEventContent(event.id).date}</div>
                          <div className="flex items-center gap-4 text-xs text-gray-400 font-black uppercase tracking-widest"><MapPin size={20} className="text-red-500" /> {getEventContent(event.id).location}</div>
                      </div>
                      <div className="flex items-center justify-between text-purple-600 text-sm font-black uppercase tracking-[0.3em] bg-purple-50 px-8 py-5 rounded-[30px] group-hover:bg-purple-600 group-hover:text-white transition-all">
                          <span>{t.common.details}</span><ChevronRight size={22} />
                      </div>
                  </div>
              </div>
          ))}
        </div>
      </div>

      {/* 4. ANUNCIO INFERIOR */}
      <div className="px-6 py-6 shrink-0 opacity-90 relative z-10 bg-white">
        <AdSpot ads={ads} position="page-bottom" label={t.common.sponsored} view={ViewState.EVENTS} currentFilter={activeCategory} />
      </div>

      {/* 5. FOOTER GLOBAL */}
      <div className="relative z-10">
        <Footer t={t} />
      </div>
    </div>
  );
};
