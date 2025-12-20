
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
      services: ['lavapies', 'chiringuitos', 'socorrismo', 'parking', 'red-volley', 'accesible'],
      status: 'Bandera Verde'
    },
    { 
      id: 'higuericas', 
      image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80', 
      blueFlag: true, 
      rating: 4.8,
      services: ['dunas', 'chiringuitos-trend', 'lavapies', 'parking-amplio', 'pasarelas'],
      status: 'Bandera Verde'
    },
    { 
      id: 'conde', 
      image: 'https://images.unsplash.com/photo-1520942702018-0862200e6873?auto=format&fit=crop&w=1200&q=80', 
      blueFlag: true, 
      rating: 4.7,
      services: ['vistas-torre', 'aguas-tranquilas', 'lavapies', 'restaurantes-cerca'],
      status: 'Bandera Verde'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-32 animate-in fade-in duration-500">
      <div className="bg-white px-8 py-12 rounded-b-[50px] shadow-sm">
        <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-4">{content.title}</h1>
        <p className="text-gray-500 text-lg font-medium leading-tight">{content.subtitle}</p>
      </div>

      <div className="px-6 py-10 space-y-12">
        {beaches.map((beach) => {
          const beachData = content.list[beach.id as keyof typeof content.list] || { name: beach.id, desc: '' };
          return (
            <div key={beach.id} className="bg-white rounded-[56px] shadow-2xl shadow-blue-900/5 overflow-hidden border border-gray-100 group">
               <div className="relative h-72 overflow-hidden">
                  <img src={beach.image} alt={beachData.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute top-8 left-8 flex gap-3">
                     {beach.blueFlag && (
                        <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl flex items-center gap-2 shadow-2xl">
                           <Flag size={14} className="fill-white" />
                           <span className="text-[11px] font-black uppercase tracking-widest">Bandera Azul</span>
                        </div>
                     )}
                     <div className="bg-green-500 text-white px-4 py-2 rounded-2xl shadow-2xl">
                        <span className="text-[11px] font-black uppercase tracking-widest">{beach.status}</span>
                     </div>
                  </div>
                  <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl flex items-center gap-1.5 shadow-xl">
                     <Star size={18} className="text-yellow-500 fill-yellow-500" />
                     <span className="text-lg font-black text-gray-900">{beach.rating}</span>
                  </div>
               </div>
               
               <div className="p-10">
                 <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-4">
                    <Waves size={20} />
                    Costa de Pilar
                 </div>
                 <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tighter">{beachData.name}</h2>
                 <p className="text-gray-500 text-lg leading-relaxed mb-8 font-medium">{beachData.desc}</p>
                 
                 <div className="border-t border-gray-100 pt-8">
                    <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Equipamiento y Servicios</h4>
                    <div className="flex flex-wrap gap-3">
                       {beach.services.map(s => (
                          <div key={s} className="px-5 py-2.5 bg-gray-50 rounded-2xl text-xs font-bold text-gray-600 border border-gray-100 capitalize">
                             {s.replace('-', ' ')}
                          </div>
                       ))}
                    </div>
                 </div>

                 <button className="w-full mt-10 py-5 bg-[#0f172a] text-white rounded-3xl font-black text-base flex items-center justify-center gap-3 shadow-2xl shadow-gray-200 hover:scale-[1.02] transition-all">
                    <MapPin size={22} />
                    Ver Ubicación
                 </button>
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
