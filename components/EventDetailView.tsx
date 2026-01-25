
import React, { useState } from 'react';
import { Event } from '../types';
import { X, Share2, Calendar, MapPin, Tag, CalendarPlus, Star, Clock } from './Icons';
import { RatingModal } from './RatingModal';

interface EventDetailViewProps {
  event: Event;
  onBack: () => void;
  onShare: (event: Event) => void;
  onAddToCalendar: (e: React.MouseEvent, event: Event) => void;
  t: any;
}

export const EventDetailView: React.FC<EventDetailViewProps> = ({ event: initialEvent, onBack, onShare, onAddToCalendar, t }) => {
  const [event, setEvent] = useState(initialEvent);
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  const handleRate = (userRating: number, comment: string) => {
    const currentCount = event.reviewCount || 0;
    const currentRating = event.rating || 0; // Default to 0 if undefined
    const newCount = currentCount + 1;
    const newRating = ((currentRating * currentCount) + userRating) / newCount;
    
    setEvent(prev => ({
        ...prev,
        rating: parseFloat(newRating.toFixed(1)),
        reviewCount: newCount
    }));
  };

  return (
    <div className="fixed inset-0 z-[5000] flex items-end sm:items-center justify-center p-0 sm:p-6">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onBack}
      />

      <RatingModal 
        isOpen={isRatingOpen}
        onClose={() => setIsRatingOpen(false)}
        onSubmit={handleRate}
        title={event.title}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white h-[90vh] sm:h-[85vh] rounded-t-[40px] sm:rounded-[40px] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-500">
        
        {/* Close Button (Floating) */}
        <button 
          onClick={onBack}
          className="absolute top-4 right-4 z-20 p-2.5 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white rounded-full transition-all active:scale-90"
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative">
            
            {/* Hero Image Section */}
            <div className="relative h-72 sm:h-80 w-full shrink-0">
                <img 
                src={event.imageUrl} 
                alt={event.title} 
                className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div className="flex flex-col gap-2">
                        <span className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-lg w-fit">
                            {event.category}
                        </span>
                        {(event.rating !== undefined || event.reviewCount) && (
                            <div className="flex items-center gap-1.5 text-white/90">
                                <Star size={14} className="fill-yellow-400 text-yellow-400"/>
                                <span className="text-sm font-black">{event.rating ? event.rating.toFixed(1) : 'New'}</span>
                                <span className="text-[10px] opacity-70 font-medium">({event.reviewCount || 0} reviews)</span>
                            </div>
                        )}
                    </div>
                    
                    <button 
                        onClick={() => setIsRatingOpen(true)}
                        className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-blue-900 transition-all flex items-center gap-2"
                    >
                        <Star size={14} /> Valorar
                    </button>
                </div>
            </div>

            {/* Content Body */}
            <div className="px-8 py-10 bg-white relative">
                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tighter leading-tight mb-8">
                    {event.title}
                </h1>

                {/* Metadata Grid */}
                <div className="grid grid-cols-1 gap-4 mb-10">
                    <div className="flex items-center gap-5 p-5 bg-slate-50 rounded-3xl border border-slate-100">
                        <div className="w-12 h-12 bg-white text-blue-600 rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                            <Calendar size={22} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{t.event_detail.date_time}</span>
                            <span className="text-base font-black text-slate-900 tracking-tight">{event.date}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-5 bg-slate-50 rounded-3xl border border-slate-100">
                        <div className="w-12 h-12 bg-white text-red-500 rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                            <MapPin size={22} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{t.event_detail.main_location}</span>
                            <span className="text-base font-black text-slate-900 tracking-tight">{event.location}</span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="prose prose-blue prose-lg max-w-none text-gray-500 font-medium leading-relaxed mb-24">
                    <div dangerouslySetInnerHTML={{ __html: (event as any).long || event.description }} />
                </div>
            </div>
        </div>

        {/* Sticky Footer Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 flex gap-3 z-10">
            <button 
                onClick={(e) => onAddToCalendar(e, event)}
                className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 active:scale-95"
            >
                <CalendarPlus size={18} />
                {t.common.addToCalendar}
            </button>
            <button 
                onClick={() => onShare(event)}
                className="w-16 h-14 bg-gray-50 text-gray-600 rounded-2xl font-black flex items-center justify-center hover:bg-gray-100 transition-all border border-gray-200 active:scale-95"
            >
                <Share2 size={22} />
            </button>
        </div>

      </div>
    </div>
  );
};
