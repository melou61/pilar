
import React from 'react';
import { 
  Waves, Flag, Accessibility, Coffee, Car, Droplets, LifeBuoy 
} from './Icons';

interface BeachesViewProps {
  t: any;
}

export const BeachesView: React.FC<BeachesViewProps> = ({ t }) => {
  const content = t.beaches_page;
  
  const beaches = [
    { id: 'milpalmeras', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80', blueFlag: true, amenities: ['shower', 'bar'] },
    { id: 'jesuitas', image: 'https://images.unsplash.com/photo-1520942702018-0862200e6873?auto=format&fit=crop&w=1000&q=80', blueFlag: true, amenities: ['shower'] },
    { id: 'conde', image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=80', blueFlag: true, amenities: ['bar'] },
    { id: 'higuericas', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1000&q=80', blueFlag: true, amenities: ['parking', 'bar'] },
    { id: 'puerto', image: 'https://images.unsplash.com/photo-1538964173425-93884d739596?auto=format&fit=crop&w=1000&q=80', blueFlag: true, amenities: ['shower'] },
    { id: 'villas', image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1000&q=80', blueFlag: true, amenities: ['lifeguard'] }
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="relative h-64 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80" alt="Playas" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30 flex items-end p-8">
           <h1 className="text-3xl font-extrabold text-white drop-shadow-lg tracking-tight">{content.title}</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-8">
        {beaches.map((beach) => {
          const beachData = content.list[beach.id as keyof typeof content.list];
          return (
            <div key={beach.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
               <div className="relative h-48 bg-gray-100">
                  <img src={beach.image} alt={beachData.name} className="w-full h-full object-cover" />
               </div>
               <div className="p-5">
                 <h2 className="text-xl font-bold text-gray-900 mb-2">{beachData.name}</h2>
                 <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{beachData.desc}</p>
                 <div className="flex flex-wrap gap-2">
                    {beach.blueFlag && <div className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-bold uppercase tracking-wider">Bandera Azul</div>}
                    {beach.amenities.map(a => <div key={a} className="text-[10px] bg-gray-50 text-gray-500 px-2 py-1 rounded-full uppercase font-medium">{a}</div>)}
                 </div>
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
