
import React, { useState } from 'react';
import { Event, Ad, ViewState } from '../types';
import { Search, Calendar, MapPin, ChevronRight, ArrowLeft, Bookmark, Sparkles, Trophy } from './Icons';
import { EventDetailView } from './EventDetailView';
import { AdSpot } from './AdSpot';

interface EventsViewProps {
  t: any;
  events: Event[];
  onShare: (event: Event) => void;
  onAddToCalendar: (e: React.MouseEvent, event: Event) => void;
  initialEventId?: string | null;
  myEvents?: string[];
  toggleMyEvent?: (id: string) => void;
  ads: Ad[];
}

export const EventsView: React.FC<EventsViewProps> = ({ 
    t, events, onShare, onAddToCalendar, initialEventId, myEvents = [], toggleMyEvent, ads 
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
    <div className="bg-[#f8fafc] min-h-screen pb-44 animate-in fade-in duration-300">
      <div className="bg-[#1e1b4b] px-8 pt-16 pb-24 text-white rounded-b-[60px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-purple-400 font-black text-[10px] uppercase tracking-[0.4em] mb-4">
            <Sparkles size={20} />
            PH Festivales
          </div>
          <h1 className="text-5xl font-black tracking-tighter mb-4 leading-tight">{t.menu.events}</h1>
          <p className="text-purple-100/60 text-lg font-medium leading-tight max-w-sm">
            {t.sections.events.desc}
          </p>

          <div className="mt-8 relative max-w-md">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.common.searchPlaceholder}
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-[24px] focus:outline-none focus:ring-4 focus:ring-purple-500/20 text-white placeholder-white/40 font-bold transition-all"
            />
            <Search className="absolute left-4 top-4 text-white/40" size={24} />
          </div>
        </div>
      </div>

      <div className="px-6 -mt-10 relative z-20">
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-4 px-2 select-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-8 py-3.5 rounded-[22px] text-[10px] font-black whitespace-nowrap transition-all uppercase tracking-widest border border-transparent shadow-lg shrink-0 ${
                activeCategory === cat.id 
                ? 'bg-purple-600 text-white shadow-purple-200/50 scale-105' 
                : 'bg-white text-gray-400 shadow-gray-100 hover:border-purple-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 mt-6 space-y-10">
        {filteredEvents.length > 0 ? (
          <>
            {filteredEvents.map(event => {
              const isSaved = myEvents.includes(event.id);
              const content = getEventContent(event.id);
              const isPatronal = event.id === 'fiestas-patronales';
              
              return (
                  <div 
                      key={event.id}
                      onClick={() => setSelectedEventId(event.id)}
                      className={`bg-white rounded-[56px] overflow-hidden shadow-2xl shadow-purple-900/5 border group cursor-pointer relative transition-all duration-500 hover:shadow-3xl ${isPatronal ? 'ring-4 ring-purple-600/10 border-purple-100' : 'border-gray-100'}`}
                  >
                      <button 
                          onClick={(e) => { e.stopPropagation(); toggleMyEvent?.(event.id); }}
                          className={`absolute top-8 right-8 z-10 w-14 h-14 rounded-3xl flex items-center justify-center transition-all ${isSaved ? 'bg-purple-600 text-white shadow-xl' : 'bg-white/90 backdrop-blur-md text-gray-400 hover:text-purple-600 shadow-sm'}`}
                      >
                          <Bookmark size={24} className={isSaved ? 'fill-current' : ''} />
                      </button>

                      <div className="h-72 overflow-hidden relative">
                          <img 
                              src={event.imageUrl} 
                              alt={content.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                          />
                          <div className="absolute top-8 left-8 bg-purple-600 text-white px-5 py-2.5 rounded-[20px] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl border border-white/20">
                            {content.category}
                          </div>
                          {content.badge && (
                              <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md text-purple-600 px-5 py-2.5 rounded-[20px] flex items-center gap-2 shadow-xl">
                                  <Trophy size={16} />
                                  <span className="text-[10px] font-black uppercase tracking-widest">
                                      {content.badge}
                                  </span>
                              </div>
                          )}
                      </div>
                      
                      <div className="p-10">
                          <h3 className="font-black text-gray-900 text-4xl mb-6 tracking-tighter leading-none group-hover:text-purple-600 transition-colors">{content.title}</h3>
                          
                          <p className="text-gray-500 text-lg leading-relaxed mb-8 font-medium">
                              {content.desc}
                          </p>

                          <div className="space-y-4 mb-10 pt-8 border-t border-gray-50">
                              <div className="flex items-center gap-4 text-xs text-gray-400 font-black uppercase tracking-widest">
                                  <Calendar size={20} className="text-purple-500" />
                                  {content.date}
                              </div>
                              <div className="flex items-center gap-4 text-xs text-gray-400 font-black uppercase tracking-widest">
                                  <MapPin size={20} className="text-red-500" />
                                  {content.location}
                              </div>
                          </div>

                          <div className="flex items-center justify-between text-purple-600 text-sm font-black uppercase tracking-[0.3em] bg-purple-50 px-8 py-5 rounded-[30px] group-hover:bg-purple-600 group-hover:text-white transition-all">
                              <span>{t.common.details}</span>
                              <ChevronRight size={22} />
                          </div>
                      </div>
                  </div>
              );
            })}
            
            <div className="pt-6 -mx-2">
              <AdSpot ads={ads} position="page-bottom" label={t.common.sponsored} view={ViewState.EVENTS} />
            </div>
          </>
        ) : (
          <div className="text-center py-40 text-gray-400 font-black uppercase tracking-widest">
            <Calendar size={64} className="mx-auto mb-6 opacity-10" />
            <p>{t.common.noResults}</p>
          </div>
        )}
      </div>
    </div>
  );
};
