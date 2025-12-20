
import React from 'react';
import { Flag, Accessibility, Droplets, Coffee, LifeBuoy, Car } from './Icons';

interface BeachesViewProps {
  t: any;
}

export const BeachesView: React.FC<BeachesViewProps> = ({ t }) => {
  const content = t.beaches_page;
  
  const beaches = [
    {
      id: 'milpalmeras',
      image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1000&q=80', 
      blueFlag: true,
      accessible: true,
      amenities: ['shower', 'bar', 'lifeguard', 'parking']
    },
    {
      id: 'jesuitas',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80',
      blueFlag: true,
      accessible: false,
      amenities: ['shower', 'lifeguard']
    },
    {
      id: 'conde',
      image: 'https://images.unsplash.com/photo-1535262412227-85541e910204?auto=format&fit=crop&w=1000&q=80', 
      blueFlag: true,
      accessible: true,
      amenities: ['shower', 'bar', 'lifeguard']
    },
    {
      id: 'higuericas',
      image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1000&q=80', 
      blueFlag: true,
      accessible: true,
      amenities: ['shower', 'bar', 'lifeguard', 'parking']
    },
    {
      id: 'puerto',
      image: 'https://images.unsplash.com/photo-1563854580252-475630626359?auto=format&fit=crop&w=1000&q=80', 
      blueFlag: true,
      accessible: true,
      amenities: ['shower', 'bar', 'lifeguard']
    },
    {
      id: 'villas',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      blueFlag: true,
      accessible: false,
      amenities: ['shower', 'lifeguard']
    }
  ];

  const getAmenityIcon = (type: string) => {
    switch (type) {
      case 'shower': return <Droplets size={14} />;
      case 'bar': return <Coffee size={14} />;
      case 'lifeguard': return <LifeBuoy size={14} />;
      case 'parking': return <Car size={14} />;
      default: return null;
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20 animate-in fade-in duration-300">
      <div className="px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{content.title}</h1>
          <p className="text-gray-500">{content.subtitle}</p>
        </div>

        <div className="grid gap-8">
          {beaches.map((beach) => (
            <div key={beach.id} className="group overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="aspect-[16/9] overflow-hidden relative">
                <img 
                  src={beach.image} 
                  alt={content.list[beach.id].name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {beach.blueFlag && (
                    <div className="bg-blue-600 text-white p-1.5 rounded-lg shadow-lg" title={content.amenities.blueFlag}>
                      <Flag size={20} fill="currentColor" />
                    </div>
                  )}
                  {beach.accessible && (
                    <div className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-lg" title={content.amenities.accessible}>
                      <Accessibility size={20} />
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{content.list[beach.id].name}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{content.list[beach.id].desc}</p>
                
                <div className="flex flex-wrap gap-3">
                  {beach.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-full text-xs font-medium border border-gray-100">
                      {getAmenityIcon(amenity)}
                      {content.amenities[amenity]}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
