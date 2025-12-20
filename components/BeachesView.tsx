
import React from 'react';
import { 
  Waves, Flag, Accessibility, Coffee, Car, Droplets, LifeBuoy, Umbrella, MapPin, Star
} from './Icons';

interface BeachesViewProps {
  t: any;
}

export const BeachesView: React.FC<BeachesViewProps> = ({ t }) => {
  const content = t.beaches_page;
  
  const beaches = [
    { 
      id: 'milpalmeras', 
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', 
      blueFlag: true, 
      rating: 4.9,
      services: ['lavapies', 'chiringuitos', 'socorrismo', 'parking', 'red-volley'],
      status: 'Bandera Verde'
    },
    { 
      id: 'higuericas', 
      image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80', 
      blueFlag: true, 
      rating: 4.8,
      services: ['pasarelas-madera', 'parking-amplio', 'chiringuitos-trend', 'lavapies'],
      status: 'Bandera Verde'
    },
    { 
      id: 'conde', 
      image: 'https://images.unsplash.com/photo-1520942702018-0862200e6873?auto=format&fit=crop&w=1200&q=80', 
      blueFlag: true, 
      rating: 4.7,
      services: ['vistas-torre', 'aguas-tranquilas', 'lavapies'],
      status: 'Bandera Verde'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-32 animate-in fade-in duration-500">
      <div className="bg-white px-6 py-10 rounded-b-[40px] shadow-sm">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">{content.title}</h1>
        <p className="text-gray-500 font-medium">{content.subtitle}</p>
      </div>

      <div className="px-6 py-8 space-y-10">
        {beaches.map((beach) => {
          const beachData = content.list[beach.id as keyof typeof content.list] || { name: beach.id, desc: '' };
          return (
            <div key={beach.id} className="bg-white rounded-[40px] shadow-xl shadow-blue-900/5 overflow-hidden border border-gray-100 group">
               <div className="relative h-64 overflow-hidden">
                  <img src={beach.image} alt={beachData.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute top-6 left-6 flex gap-2">
                     {beach.blueFlag && (
                        <div className="bg-blue-600 text-white px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-xl">
                           <Flag size={14} className="fill-white" />
                           <span className="text-[10px] font-black uppercase tracking-widest">Bandera Azul</span>
                        </div>
                     )}
                     <div className="bg-green-500 text-white px-3 py-1.5 rounded-xl shadow-xl">
                        <span className="text-[10px] font-black uppercase tracking-widest">{beach.status}</span>
                     </div>
                  </div>
                  <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl flex items-center gap-1.5 shadow-xl">
                     <Star size={16} className="text-yellow-500 fill-yellow-500" />
                     <span className="text-sm font-black text-gray-900">{beach.rating}</span>
                  </div>
               </div>
               
               <div className="p-8">
                 <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-2">
                    <Waves size={16} />
                    Costa de Pilar
                 </div>
                 <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">{beachData.name}</h2>
                 <p className="text-gray-500 text-base leading-relaxed mb-6 font-medium">{beachData.desc}</p>
                 
                 <div className="border-t border-gray-50 pt-6">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Servicios Disponibles</h4>
                    <div className="flex flex-wrap gap-2">
                       {beach.services.map(s => (
                          <div key={s} className="px-4 py-2 bg-gray-50 rounded-xl text-[11px] font-bold text-gray-600 border border-gray-100 capitalize">
                             {s.replace('-', ' ')}
                          </div>
                       ))}
                    </div>
                 </div>

                 <button className="w-full mt-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-200">
                    <MapPin size={18} />
                    Cómo llegar
                 </button>
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
