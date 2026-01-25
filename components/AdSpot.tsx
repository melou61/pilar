
import React, { useState } from 'react';
import { Ad, ViewState } from '../types';
import { Plus } from './Icons';

interface AdSpotProps {
  ads: Ad[];
  position?: 'page-top' | 'page-bottom' | 'menu-top' | 'menu-bottom';
  label?: string;
  view: ViewState; // Obligatorio para saber en qué vista estamos
  currentFilter?: string; // Opcional para segmentación por filtro
}

export const AdSpot: React.FC<AdSpotProps> = ({ ads, position = 'page-top', view, currentFilter }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  // Lógica de filtrado avanzada:
  // 1. Coincidir posición
  // 2. Coincidir Vista (Página)
  // 3. Si el anuncio tiene un filterContext definido, debe coincidir con el currentFilter de la vista.
  const activeAds = ads.filter(ad => {
    const matchPos = ad.position === position;
    const matchView = ad.view === view;
    
    // Normalización para comparación segura (insensitive case)
    const context = ad.filterContext ? ad.filterContext.toLowerCase() : 'all';
    const filter = currentFilter ? currentFilter.toLowerCase() : 'all';
    
    const matchFilter = 
      !ad.filterContext || 
      context === 'all' || 
      filter === 'all' || 
      context === filter;
    
    return ad.isActive && matchPos && matchView && matchFilter;
  });

  // Clases responsivas para asegurar Full Width y Aspect Ratio correcto por dispositivo
  // Móvil: Más alto (21/9) | Tablet: (3/1) | Desktop: Panorámico (4/1)
  const containerClasses = "w-full block relative overflow-hidden shadow-sm transition-all duration-300 md:rounded-2xl";
  const aspectClasses = "aspect-[2/1] sm:aspect-[3/1] md:aspect-[4/1]";

  // --- FALLBACK: ESPACIO DISPONIBLE ---
  // Si no hay anuncios activos, mostramos un placeholder para que se vea el espacio disponible.
  if (activeAds.length === 0) {
    return (
      <div className={`w-full flex flex-col gap-4 px-4 md:px-0 opacity-60 hover:opacity-100 transition-opacity duration-300`}>
         <div className={`${containerClasses} ${aspectClasses} bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 group cursor-pointer`}>
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                <Plus size={24} />
            </div>
            <span className="font-black uppercase tracking-[0.2em] text-[10px] mb-1 group-hover:text-blue-600">Espacio Disponible</span>
            <span className="text-[9px] font-bold opacity-60">Posición: {position?.replace('-', ' ').toUpperCase()}</span>
         </div>
      </div>
    ); 
  }

  return (
    <div className="w-full flex flex-col gap-4 px-0 md:px-0">
        {activeAds.slice(0, 1).map(ad => (
          <a 
            key={ad.id} 
            href={ad.linkUrl} 
            target="_blank" 
            rel="noreferrer" 
            className={`${containerClasses} ${aspectClasses} bg-gray-100 hover:brightness-95 shadow-xl`}
          >
             {!imgLoaded && (
                 <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
                     <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Cargando Promo...</span>
                 </div>
             )}
             <img 
                src={ad.imageUrl} 
                alt={ad.clientName} 
                className={`w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`} 
                onLoad={() => setImgLoaded(true)}
                onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=80";
                }}
             />
             
             {/* Badge Cliente */}
             <div className="absolute top-0 right-0 bg-blue-600/90 backdrop-blur-md text-[8px] sm:text-[10px] text-white px-3 py-1.5 rounded-bl-2xl font-black uppercase tracking-widest z-10">
               {ad.clientName}
             </div>
             
             {/* Badge Patrocinado */}
             <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-black/40 backdrop-blur-sm text-[7px] sm:text-[9px] text-white/80 px-2 py-0.5 rounded-md font-bold uppercase tracking-widest">
                Patrocinado
             </div>
          </a>
        ))}
    </div>
  );
};
