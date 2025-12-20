import React from 'react';
import { 
  Waves, MapPin, Flag, Accessibility, Coffee, Car, Droplets, LifeBuoy 
} from './Icons';

interface BeachesViewProps {
  t: any; // Translation object (pass the root or beaches sub-object)
}

export const BeachesView: React.FC<BeachesViewProps> = ({ t }) => {
  const content = t.beaches_page;
  
  // Static data structure mapped to translation keys
  const beaches = [
    {
      id: 'milpalmeras',
      // Palm tree beach
      image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1000&q=80', 
      blueFlag: true,
      accessible: true, // Has "Punto Accesible"
      amenities: ['shower', 'bar', 'lifeguard', 'parking']
    },
    {
      id: 'jesuitas',
      // Cove vibe
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80',
      blueFlag: true,
      accessible: false, // Accessibility is harder here due to cliffs/stairs
      amenities: ['shower', 'lifeguard']
    },
    {
      id: 'conde',
      // Near tower/building
      image: 'https://images.unsplash.com/photo-1535262412227-85541e910204?auto=format&fit=crop&w=1000&q=80', 
      blueFlag: true,
      accessible: true, // Has ramps
      amenities: ['shower', 'bar', 'lifeguard']
    },
    {
      id: 'higuericas',
      // Dunes/Sand
      image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1000&q=80', 
      blueFlag: true,
      accessible: true, // Has "Punto Accesible"
      amenities: ['shower', 'bar', 'lifeguard', 'parking']
    },
    {
      id: 'puerto',
      // Marina/Boats
      image: 'https://images.unsplash.com/photo-1563854580252-475630626359?auto=format&fit=crop&w=1000&q=80', 
      blueFlag: true,
      accessible: true,
      amenities: ['shower', 'bar', 'lifeguard']
    },
    {
      id: 'villas',
      // Calm white sand
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      blueFlag: true,
      accessible: false,
      amenities: ['shower', 'lifeguard']
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20 animate-in fade-in duration-300">
      {/* Hero Section */}
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80" 
          alt="Playas de Pilar" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30">
           <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{content.title}</h1>
              <p className="text-gray-600 font-medium max-w-lg">{content.subtitle}</p>
           </div>
        </div>
      </div>

      {/* Beach List */}
      <div className="px-4 py-6 space-y-8">
        {beaches.map((beach) => {
          const beachData = content.list[beach.id as keyof typeof content.list];
          
          return (
            <div key={beach.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
               {/* Image & Badges */}
               <div className="relative h-48">
                  <img src={beach.image} alt={beachData.name} className="w-full h-full object-cover" />
                  
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {beach.blueFlag && (
                        <div className="bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                            <Flag size={12} fill="currentColor" />
                            {content.amenities.blueFlag}
                        </div>
                    )}
                  </div>
                  
                  {beach.accessible && (
                      <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-blue-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-blue-100">
                        <Accessibility size={16} />
                        {content.amenities.accessible}
                      </div>
                  )}
               </div>

               <div className="p-5">
                 <h2 className="text-xl font-bold text-gray-900 mb-2">{beachData.name}</h2>
                 <p className="text-gray-600 text-sm leading-relaxed mb-5">
                    {beachData.desc}
                 </p>

                 {/* Amenities Grid */}
                 <div className="flex flex-wrap gap-3">
                    {beach.amenities.includes('lifeguard') && (
                        <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 px-2.5 py-1.5 rounded-lg border border-red-100">
                           <LifeBuoy size={14} />
                           {content.amenities.lifeguard}
                        </div>
                    )}
                    {beach.amenities.includes('shower') && (
                        <div className="flex items-center gap-1.5 text-xs text-cyan-600 bg-cyan-50 px-2.5 py-1.5 rounded-lg border border-cyan-100">
                           <Droplets size={14} />
                           {content.amenities.shower}
                        </div>
                    )}
                    {beach.amenities.includes('bar') && (
                        <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-100">
                           <Coffee size={14} />
                           {content.amenities.bar}
                        </div>
                    )}
                    {beach.amenities.includes('parking') && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-100 px-2.5 py-1.5 rounded-lg border border-gray-200">
                           <Car size={14} />
                           {content.amenities.parking}
                        </div>
                    )}
                 </div>
               </div>
            </div>
          );
        })}
      </div>

      <div className="px-6 text-center text-xs text-gray-400 mb-6">
        * La disponibilidad de servicios (chiringuitos, punto accesible) puede variar según la temporada.
      </div>
    </div>
  );
};