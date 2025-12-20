import React from 'react';
import { Ad } from '../types';
import { ExternalLink } from 'lucide-react';

interface AdSpotProps {
  ads: Ad[];
  position: 'page-top' | 'page-bottom' | 'menu-top' | 'menu-bottom';
  className?: string;
  label?: string;
}

export const AdSpot: React.FC<AdSpotProps> = ({ ads, position, className = '', label = 'Patrocinado' }) => {
  // Filter ads for this position and check dates
  const today = new Date().toISOString().split('T')[0];
  
  const activeAds = ads.filter(ad => 
    ad.position === position && 
    ad.isActive && 
    ad.startDate <= today && 
    ad.endDate >= today
  );

  // FALLBACK: If no local ads are active, show "Provisional" / "Advertise Here" placeholder
  // This uses a static image similar to the one requested (Tea cup) to indicate available space
  if (activeAds.length === 0) {
    return (
      <div className={`w-full ${className} my-3`}>
         <a 
           href="mailto:publicidad@pilarhoradada.com" // Example contact link
           className="group relative block overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300"
         >
            {/* Provisional Label */}
            <div className="absolute top-0 right-0 bg-blue-50/95 backdrop-blur-[2px] px-2 py-0.5 rounded-bl-lg border-l border-b border-blue-100 z-10">
               <span className="text-[9px] text-blue-600 font-medium tracking-widest uppercase">Disponible</span>
            </div>

            {/* Image Container - Matching the active ad aspect ratios */}
            <div className="relative aspect-[4/1] sm:aspect-[3/1] w-full overflow-hidden bg-gray-50">
              <img 
                src="https://images.unsplash.com/photo-1626202378942-0f639a0391d4?q=80&w=800&auto=format&fit=crop" 
                alt="Espacio Disponible" 
                className="h-full w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
              />
              
              {/* "Advertise Here" Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/5 transition-colors">
                 <div className="bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-white/50 transform group-hover:scale-105 transition-transform flex flex-col items-center">
                    <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">Tu Marca Aquí</span>
                    <span className="text-[10px] text-gray-500 hidden sm:block">Contacta con nosotros</span>
                 </div>
              </div>
            </div>
         </a>
      </div>
    );
  }

  // Limit to 2 ads for page positions, 1 for menu
  const maxAds = position.includes('menu') ? 1 : 2;
  const displayAds = activeAds.slice(0, maxAds);

  // Dynamic Grid Configuration
  const isSingleColumn = position.includes('menu') || displayAds.length === 1;
  const gridClass = isSingleColumn ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2';

  return (
    <div className={`w-full ${className} my-3`}>
      <div className={`grid gap-3 ${gridClass}`}>
        {displayAds.map((ad, index) => (
          <a 
            key={ad.id} 
            href={ad.linkUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`
              group relative block overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300
              ${!position.includes('menu') && index === 1 ? 'hidden sm:block' : 'block'}
            `}
          >
            {/* Discreet Label */}
            <div className="absolute top-0 right-0 bg-gray-50/95 backdrop-blur-[2px] px-2 py-0.5 rounded-bl-lg border-l border-b border-gray-100 z-10">
               <span className="text-[9px] text-gray-400 font-medium tracking-widest uppercase">{label}</span>
            </div>

            {/* Image Container - Adjusted Aspect Ratio for Mobile (4/1 is slimmer than 3/1) */}
            <div className="relative aspect-[4/1] sm:aspect-[3/1] w-full overflow-hidden bg-gray-50">
              <img 
                src={ad.imageUrl} 
                alt={ad.clientName} 
                className="h-full w-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
              />
              
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};