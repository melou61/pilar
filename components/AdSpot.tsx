
import React, { useState } from 'react';
import { Ad } from '../types';

interface AdSpotProps {
  ads: Ad[];
  position?: string;
  label?: string;
  className?: string;
}

export const AdSpot: React.FC<AdSpotProps> = ({ ads, position = 'page-top', className = "my-4" }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const activeAds = ads.filter(ad => ad.position === position && ad.isActive);

  if (activeAds.length === 0) {
    return (
      <div className={`w-full ${className}`}>
         <div className="relative aspect-[4/1] w-full overflow-hidden rounded-[24px] border border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 font-bold text-[10px] uppercase tracking-widest">
            Espacio Publicitario
         </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
        {activeAds.slice(0, 1).map(ad => (
          <a key={ad.id} href={ad.linkUrl} target="_blank" rel="noreferrer" className="block relative aspect-[3.5/1] overflow-hidden rounded-[24px] shadow-sm bg-gray-100 group">
             {!imgLoaded && (
                 <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
                     <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Cargando...</span>
                 </div>
             )}
             <img 
                src={ad.imageUrl} 
                alt={ad.clientName} 
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`} 
                onLoad={() => setImgLoaded(true)}
             />
             {/* Sello PATROCINADO idéntico a la captura */}
             <div className="absolute top-4 right-4 bg-black text-white px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest shadow-xl">
                PATROCINADO
             </div>
          </a>
        ))}
    </div>
  );
};
