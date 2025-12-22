
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

  if (activeAds.length === 0) {
    return (
      <div className="w-full my-4">
         <div className="relative aspect-[4/1] w-full overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-gray-400 font-bold text-sm">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80" className="absolute inset-0 w-full h-full object-cover opacity-20" alt="" />
            <span className="relative z-10 uppercase tracking-widest text-[10px]">Publicidad Disponible</span>
         </div>
      </div>
    );
  }

  return (
    <div className="w-full my-4 grid gap-3">
        {activeAds.slice(0, 1).map(ad => (
          <a key={ad.id} href={ad.linkUrl} target="_blank" rel="noreferrer" className="block relative aspect-[4/1] overflow-hidden rounded-xl border border-gray-100 shadow-sm bg-gray-100">
             {!imgLoaded && (
                 <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
                     <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Cargando...</span>
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
             <div className="absolute top-2 right-2 bg-black/30 backdrop-blur-sm text-[8px] text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-widest">Patrocinado</div>
          </a>
        ))}
    </div>
  );
};
