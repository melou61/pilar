
import React, { useState } from 'react';
import { Ad } from '../types';

interface AdSpotProps {
  ads: Ad[];
  position?: string;
  label?: string;
}

export const AdSpot: React.FC<AdSpotProps> = ({ ads, position = 'page-top' }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const activeAds = ads.filter(ad => ad.position === position && ad.isActive);

  // Proporción 2.5/1: es significativamente más alto ("gordo") que el 4.5/1 anterior.
  const aspectClass = "aspect-[2.5/1]";

  if (activeAds.length === 0) {
    return (
      <div className="w-full mt-2">
         <div className={`relative ${aspectClass} w-full overflow-hidden rounded-2xl border border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-gray-400 font-bold text-sm`}>
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80" className="absolute inset-0 w-full h-full object-cover opacity-20" alt="" />
            <span className="relative z-10 uppercase tracking-widest text-[10px]">Publicidad Disponible</span>
         </div>
      </div>
    );
  }

  return (
    <div className="w-full grid gap-3 mt-2">
        {activeAds.slice(0, 1).map(ad => (
          <a key={ad.id} href={ad.linkUrl} target="_blank" rel="noreferrer" className={`block relative ${aspectClass} overflow-hidden rounded-2xl border border-gray-100 shadow-xl bg-gray-100 hover:scale-[1.01] transition-transform duration-300`}>
             {!imgLoaded && (
                 <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
                     <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Cargando...</span>
                 </div>
             )}
             <img 
                src={ad.imageUrl} 
                alt={ad.clientName} 
                className={`w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`} 
                onLoad={() => setImgLoaded(true)}
                onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80";
                }}
             />
             <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-[8px] text-white px-2 py-1 rounded-lg font-black uppercase tracking-widest border border-white/10">
               {ad.clientName}
             </div>
             <div className="absolute bottom-3 left-3 bg-white/10 backdrop-blur-sm text-[7px] text-white/60 px-2 py-0.5 rounded font-bold uppercase tracking-widest">Patrocinado</div>
          </a>
        ))}
    </div>
  );
};
