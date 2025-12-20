
import React, { useState } from 'react';
import { Event } from '../types';
import { Search, Calendar, MapPin, ChevronRight, Filter, ArrowLeft } from './Icons';
import { EventDetailView } from './EventDetailView';

interface EventsViewProps {
  t: any;
  events: Event[];
  onShare: (event: Event) => void;
  onAddToCalendar: (e: React.MouseEvent, event: Event) => void;
  initialEventId?: string | null;
}

export const EventsView: React.FC<EventsViewProps> = ({ t, events, onShare, onAddToCalendar, initialEventId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(initialEventId || null);
  const [activeCategory, setActiveCategory] = useState('all');

  // Fix: Explicitly type categories as string array and cast Array.from result to string[] to avoid 'unknown' type errors during mapping
  const categories: string[] = ['all', ...(Array.from(new Set(events.map(e => e.category.toLowerCase()))) as string[])];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || event.category.toLowerCase() === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedEvent = events.find(e => e.id === selectedEventId);

  if (selectedEvent) {
    return <EventDetailView 
      event={selectedEvent} 
      onBack={() => setSelectedEventId(null)} 
      onShare={onShare} 
      onAddToCalendar={onAddToCalendar} 
      t={t.share} 
    />;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20 animate-in fade-in duration-300">
      <div className="bg-white px-6 pt-6 pb-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{t.sections.events.title}</h1>
        <p className="text-sm text-gray-500">{t.sections.events.desc}</p>

        {/* Search */}
        <div className="mt-6 relative">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar eventos..."
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
          />
          <Search className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-all ${
                activeCategory === cat 
                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100' 
                : 'bg-white text-gray-600 border-gray-200'
              }`}
            >
              {cat === 'all' ? 'Todos' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div 
              key={event.id}
              onClick={() => setSelectedEventId(event.id)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div className="h-40 overflow-hidden relative">
                <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-blue-700 uppercase tracking-widest shadow-sm">
                   {event.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg mb-2">{event.title}</h3>
                <div className="space-y-2 mb-4">
                   <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar size={14} className="text-blue-500" />
                      {event.date}
                   </div>
                   <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin size={14} className="text-red-500" />
                      {event.location}
                   </div>
                </div>
                <div className="flex items-center justify-between text-blue-600 text-sm font-bold border-t border-gray-50 pt-4">
                   <span>Saber más</span>
                   <ChevronRight size={18} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-gray-400">
            <Calendar size={48} className="mx-auto mb-4 opacity-10" />
            <p>No se encontraron eventos para "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};
