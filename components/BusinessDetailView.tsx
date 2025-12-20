
import React from 'react';
import { CensusItem } from '../types';
import { ArrowLeft, MapPin, Phone, Star, Share2, Clock, Globe, X } from './Icons';

interface BusinessDetailViewProps {
  business: CensusItem;
  onClose: () => void;
  t: any;
}

export const BusinessDetailView: React.FC<BusinessDetailViewProps> = ({ business, onClose, t }) => {
  return (
    <div className="fixed inset-0 z-[110] bg-white flex flex-col animate-in slide-in-from-bottom duration-500 overflow-y-auto pb-44">
      {/* Gallery Hero */}
      <div className="relative h-[50vh] w-full">
        <img 
          src={business.images && business.images.length > 0 ? business.images[0] : 'https://images.unsplash.com/photo-1517248135467-4c7ed9d8607c?auto=format&fit=crop&w=1200&q=80'} 
          className="w-full h-full object-cover" 
          alt={business.name} 
        />
        <div className="absolute top-10 left-10 flex gap-4">
          <button 
            onClick={onClose} 
            className="w-14 h-14 bg-white/20 backdrop-blur-2xl text-white rounded-full flex items-center justify-center border border-white/20 hover:bg-white/40 transition-all"
          >
            <ArrowLeft size={30} />
          </button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-600 px-6 py-2 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl">
              {business.category}
            </span>
            {business.priceRange && (
              <span className="bg-white/20 backdrop-blur-xl px-4 py-2 rounded-2xl text-lg font-black">
                {business.priceRange}
              </span>
            )}
          </div>
          <h1 className="text-6xl font-black tracking-tighter mb-2">{business.name}</h1>
          <p className="text-white/80 font-medium text-lg flex items-center gap-2">
            <MapPin size={20} /> {business.address}
          </p>
        </div>
      </div>

      <div className="p-12 space-y-16 max-w-4xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 p-8 rounded-[40px] border border-gray-100 gap-6">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <div className="flex items-center gap-2 text-yellow-500">
              <Star size={30} className="fill-current" />
              <span className="text-4xl font-black text-gray-900">{business.rating}</span>
            </div>
            <span className="text-gray-400 font-bold ml-1 uppercase tracking-widest text-[10px]">
              {business.reviewCount} Reseñas Reales
            </span>
          </div>
          <div className="flex gap-4">
            <a 
              href={`tel:${business.phone}`} 
              className="w-16 h-16 bg-blue-600 text-white rounded-[24px] flex items-center justify-center shadow-xl hover:scale-105 transition-all"
            >
              <Phone size={28} />
            </a>
            {business.website && (
              <a 
                href={business.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-16 h-16 bg-white text-blue-600 border border-blue-100 rounded-[24px] flex items-center justify-center shadow-lg hover:bg-blue-50 transition-all"
              >
                <Globe size={28} />
              </a>
            )}
            <button className="w-16 h-16 bg-white text-blue-600 border border-blue-100 rounded-[24px] flex items-center justify-center shadow-lg hover:bg-blue-50 transition-all">
              <Share2 size={28} />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Nuestra Historia</h3>
          <p className="text-gray-700 text-2xl leading-relaxed font-medium">{business.description}</p>
        </div>

        {business.featuredItems && business.featuredItems.length > 0 && (
          <div className="space-y-10">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Imprescindibles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {business.featuredItems.map(item => (
                <div key={item} className="p-8 bg-white rounded-[35px] border border-gray-100 shadow-xl shadow-gray-200/40 flex items-center justify-between group hover:border-blue-200 transition-all">
                  <span className="text-xl font-black text-gray-900">{item}</span>
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Star size={20} className="fill-current" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-8">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Horarios y Contacto</h3>
          <div className="bg-gray-50 rounded-[40px] p-10 space-y-6 border border-gray-100">
            <div className="flex justify-between items-center text-lg font-bold">
              <span className="text-gray-500">Lunes - Viernes</span>
              <span className="text-gray-900">{business.hours.weekdays}</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold">
              <span className="text-gray-500">Fines de Semana</span>
              <span className="text-gray-900">{business.hours.weekend}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
