
import React from 'react';
import { 
  History, Sprout, Building2, Trophy, Plane, TreePine, Bike, MapPin 
} from './Icons';

interface SightseeingViewProps {
  t: any;
}

export const SightseeingView: React.FC<SightseeingViewProps> = ({ t }) => {
  const content = t.sightseeing_page;

  return (
    <div className="bg-white min-h-screen pb-20 animate-in fade-in duration-300">
      <div className="relative h-64 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1548574505-12737441edb2?auto=format&fit=crop&w=2000&q=80" alt="Pilar Nature" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center p-6">
           <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 drop-shadow-md">{content.title}</h1>
              <p className="text-white/90 font-medium max-w-lg mx-auto leading-relaxed">{content.subtitle}</p>
           </div>
        </div>
      </div>

      <div className="px-6 py-10 max-w-3xl mx-auto">
         <div className="relative border-l-2 border-blue-100 pl-8 space-y-10 ml-4">
            <div className="relative">
               <div className="absolute -left-[41px] bg-amber-100 p-2 rounded-full text-amber-600 border-4 border-white shadow-sm"><History size={20} /></div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">{content.timeline.past.title}</h3>
               <p className="text-gray-600 leading-relaxed text-sm">{content.timeline.past.desc}</p>
            </div>
            <div className="relative">
               <div className="absolute -left-[41px] bg-blue-100 p-2 rounded-full text-blue-600 border-4 border-white shadow-sm"><Sprout size={20} /></div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">{content.timeline.present.title}</h3>
               <p className="text-gray-600 leading-relaxed text-sm">{content.timeline.present.desc}</p>
            </div>
            <div className="relative">
               <div className="absolute -left-[41px] bg-green-100 p-2 rounded-full text-green-600 border-4 border-white shadow-sm"><Building2 size={20} /></div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">{content.timeline.future.title}</h3>
               <p className="text-gray-600 leading-relaxed text-sm">{content.timeline.future.desc}</p>
            </div>
         </div>
      </div>

      <div className="px-4 pb-12 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 px-2 mb-4">Descubre Más</h2>
          <div className="bg-white rounded-2xl shadow-lg shadow-green-900/5 overflow-hidden border border-gray-100">
             <div className="h-40 relative">
                <img src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1000&q=80" className="w-full h-full object-cover" alt="Golf" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full text-green-700"><Trophy size={20} /></div>
             </div>
             <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{content.golf.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{content.golf.desc}</p>
             </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg shadow-green-900/5 overflow-hidden border border-gray-100 flex">
             <div className="w-1/3 relative"><img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" alt="Nature" /></div>
             <div className="w-2/3 p-5 flex flex-col justify-center">
                 <div className="flex items-center gap-2 mb-2 text-green-600"><TreePine size={18} /><Bike size={18} /></div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{content.nature.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{content.nature.desc}</p>
             </div>
          </div>
          <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 relative overflow-hidden">
             <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4"><Plane size={100} /></div>
             <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3 text-blue-800"><Plane size={20} /><h3 className="text-lg font-bold">{content.connectivity.title}</h3></div>
                <p className="text-blue-900/70 text-sm leading-relaxed mb-4">{content.connectivity.desc}</p>
                <div className="flex gap-4">
                    <div className="flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-900"><MapPin size={12} /> ALC (40')</div>
                    <div className="flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-900"><MapPin size={12} /> RMU (35')</div>
                </div>
             </div>
          </div>
      </div>
    </div>
  );
};
