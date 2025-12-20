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
    <div className="bg-white min-h-screen animate-in slide-in-from-right duration-300 pb-20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <span className="font-semibold text-gray-900 truncate px-4 flex-1 text-center opacity-0 sm:opacity-100 transition-opacity">
          {event.title}
        </span>
        <button 
          onClick={() => onShare(event)}
          className="p-2 -mr-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
        >
          <Share2 size={24} />
        </button>
      </div>

      {/* Hero Image */}
      <div className="relative w-full aspect-video sm:aspect-[21/9] bg-gray-100">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
            {event.category}
          </span>
        </div>
      </div>

      <div className="px-5 py-6 max-w-2xl mx-auto">
        {/* Title and Date */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-4">
          {event.title}
        </h1>

        <div className="flex flex-col gap-3 mb-8 text-sm text-gray-600">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
               <Calendar size={20} />
            </div>
            <div className="mt-1 font-medium text-gray-900">
               {event.date}
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-red-50 text-red-600 rounded-lg shrink-0">
               <MapPin size={20} />
            </div>
            <div className="mt-1 font-medium text-gray-900">
               {event.location}
            </div>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="flex gap-3 mb-8">
            <button 
              onClick={(e) => onAddToCalendar(e, event)}
              className="flex-1 py-2.5 px-4 bg-blue-50 text-blue-700 rounded-xl font-semibold text-sm hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 border border-blue-100"
            >
               <CalendarPlus size={18} />
               Agendar
            </button>
            <button 
              onClick={() => onShare(event)}
              className="flex-1 py-2.5 px-4 bg-gray-50 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 border border-gray-100"
            >
               <Share2 size={18} />
               Compartir
            </button>
        </div>

        <hr className="border-gray-100 mb-8" />

        {/* Long Description Content */}
        <div className="prose prose-blue prose-sm sm:prose-base max-w-none text-gray-600 leading-relaxed">
          {/* We render HTML safely because it comes from our trusted data.ts */}
          <div dangerouslySetInnerHTML={{ __html: event.longDescription || event.description }} />
          
          {/* Fallback styling for the HTML content if prose class isn't fully loaded */}
          <style>{`
            .prose ul { list-style-type: disc; padding-left: 1.5em; margin-top: 1em; margin-bottom: 1em; }
            .prose li { margin-bottom: 0.5em; }
            .prose p { margin-bottom: 1em; }
            .prose h3 { font-weight: 700; color: #111827; font-size: 1.125em; margin-top: 1.5em; margin-bottom: 0.5em; }
            .prose strong { font-weight: 600; color: #111827; }
          `}</style>
        </div>

        {/* Footer Action Button */}
        <div className="mt-10">
          <button 
            onClick={() => onShare(event)}
            className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-medium shadow-lg shadow-gray-200 hover:bg-black transition-transform active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <Share2 size={18} />
            {t.share || 'Compartir Evento'}
          </button>
        </div>
      </div>
    </div>
  );
};