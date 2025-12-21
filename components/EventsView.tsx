
import React, { useState } from 'react';
import { Event } from '../types';
import { Search, Calendar, MapPin, ChevronRight, Filter, ArrowLeft, Bookmark } from './Icons';
import { EventDetailView } from './EventDetailView';

interface EventsViewProps {
  t: any;
  events: Event[];
  onShare: (event: Event) => void;
  onAddToCalendar: (e: React.MouseEvent, event: Event) => void;
  initialEventId?: string | null;
  myEvents?: string[];
  toggleMyEvent?: (id: string) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({ 
    t, events, onShare, onAddToCalendar, initialEventId, myEvents = [], toggleMyEvent 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(initialEventId || null);
  const [activeCategory, setActiveCategory] = useState('all');

  // Dinamización de datos: Extraemos los textos del objeto de traducción t.events_data
  const getEventContent = (id: string) => {
    return t.events_data?.[id] || events.find(e => e.id === id);
  };

  const filteredEvents = events.filter(event => {
    const content = getEventContent(event.id);
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          content.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || event.category.toLowerCase() === activeCategory;
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

  return (
    <div className="bg-gray-50 min-h-screen pb-44 animate-in fade-in duration-300">
      <div className="bg-white px-6 pt-6 pb-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{t.menu.events}</h1>
        <p className="text-sm text-gray-500">{t.sections.events.desc}</p>

        {/* Search */}
        <div className="mt-6 relative">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.common.searchPlaceholder}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium"
          />
          <Search className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
        </div>

        {/* Categories (Simplified for Demo) */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-4">
          <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-all ${
                activeCategory === 'all' 
                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100' 
                : 'bg-white text-gray-600 border-gray-200'
              }`}
            >
              {t.menu.home}
          </button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => {
            const isSaved = myEvents.includes(event.id);
            const content = getEventContent(event.id);
            return (
                <div 
                    key={event.id}
                    onClick={() => setSelectedEventId(event.id)}
                    className="bg-white rounded-[40px] overflow-hidden shadow-2xl shadow-gray-200/40 border border-gray-100 hover:shadow-3xl transition-all group cursor-pointer relative"
                >
                    <button 
                        onClick={(e) => { e.stopPropagation(); toggleMyEvent?.(event.id); }}
                        className={`absolute top-4 right-4 z-10 w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${isSaved ? 'bg-emerald-500 text-white shadow-lg' : 'bg-white/90 backdrop-blur-md text-gray-400 hover:text-emerald-500 shadow-sm'}`}
                    >
                        <Bookmark size={20} className={isSaved ? 'fill-current' : ''} />
                    </button>

                    <div className="h-52 overflow-hidden relative bg-gray-100">
                        <img 
                            src={event.imageUrl} 
                            alt={content.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-2xl text-[10px] font-black text-blue-700 uppercase tracking-[0.2em] shadow-sm">
                        {content.category}
                        </div>
                    </div>
                    <div className="p-8">
                        <h3 className="font-black text-gray-900 text-2xl mb-4 tracking-tighter leading-tight group-hover:text-blue-600 transition-colors">{content.title}</h3>
                        <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-[11px] text-gray-400 font-black uppercase tracking-widest">
                            <Calendar size={16} className="text-blue-500" />
                            {content.date}
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-gray-400 font-black uppercase tracking-widest">
                            <MapPin size={16} className="text-red-500" />
                            {content.location}
                        </div>
                        </div>
                        <div className="flex items-center justify-between text-blue-600 text-xs font-black uppercase tracking-widest border-t border-gray-50 pt-6">
                            <span>{t.common.details}</span>
                            <ChevronRight size={18} />
                        </div>
                    </div>
                </div>
            );
          })
        ) : (
          <div className="text-center py-20 text-gray-400">
            <Calendar size={48} className="mx-auto mb-4 opacity-10" />
            <p className="font-bold">{t.common.noResults}</p>
          </div>
        )}
      </div>
    </div>
  );
};
