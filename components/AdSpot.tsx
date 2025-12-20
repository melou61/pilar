
import React from 'react';
import { Ad } from '../types';

interface AdSpotProps {
  ads: Ad[];
  position?: string;
  label?: string;
}

export const AdSpot: React.FC<AdSpotProps> = ({ ads, position = 'page-top' }) => {
  const activeAds = ads.filter(ad => ad.position === position && ad.isActive);

  if (activeAds.length === 0) {
    return (
      <div className="w-full my-4">
         <div className="relative aspect-[4/1] w-full overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-400 font-bold text-sm">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80" className="absolute inset-0 w-full h-full object-cover opacity-20" alt="" />
            <span className="relative z-10">Publicidad Disponible</span>
         </div>
      </div>
    );
  }

  return (
    <div className="w-full my-4 grid gap-3">
        {activeAds.slice(0, 1).map(ad => (
          <a key={ad.id} href={ad.linkUrl} target="_blank" rel="noreferrer" className="block relative aspect-[4/1] overflow-hidden rounded-xl border border-gray-100 shadow-sm">
             <img src={ad.imageUrl} alt={ad.clientName} className="w-full h-full object-cover" />
          </a>
        ))}
    </div>
  );
};
