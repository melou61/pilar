
import React from 'react';
import { History, Sprout, TrendingUp, Trophy, TreePine, MapPin } from './Icons';

interface SightseeingViewProps {
  t: any;
}

export const SightseeingView: React.FC<SightseeingViewProps> = ({ t }) => {
  const content = t.sightseeing_page;

  return (
    <div className="bg-white min-h-screen pb-20 animate-in fade-in duration-300">
      
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2000&q=80" 
          alt="Pinar Nature" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
           <div>
              <h1 className="text-3xl font-bold text-white mb-2">{content.title}</h1>
              <p className="text-white/80 text-sm max-w-md">{content.subtitle}</p>
           </div>
        </div>
      </div>

      <div className="px-5 py-8 space-y-12 max-w-2xl mx-auto">
          {/* Timeline Section */}
          <div className="space-y-8">
              <div className="relative pl-8 border-l-2 border-blue-100 space-y-12">
                  <div className="relative">
                      <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm" />
                      <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <History size={18} className="text-blue-600" />
                        {content.timeline.past.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{content.timeline.past.desc}</p>
                  </div>
                  
                  <div className="relative">
                      <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm" />
                      <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Sprout size={18} className="text-green-600" />
                        {content.timeline.present.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{content.timeline.present.desc}</p>
                  </div>

                  <div className="relative">
                      <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm animate-pulse" />
                      <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <TrendingUp size={18} className="text-purple-600" />
                        {content.timeline.future.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{content.timeline.future.desc}</p>
                  </div>
              </div>
          </div>

          {/* Golf Card */}
          <div className="bg-white rounded-2xl shadow-lg shadow-green-900/5 overflow-hidden border border-gray-100">
             <div className="h-40 relative">
                <img src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1000&q=80" className="w-full h-full object-cover" alt="Golf Lo Romero" />
                <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-green-700 uppercase">
                    Premium Golf
                </div>
             </div>
             <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Trophy size={20} className="text-yellow-500" />
                    {content.golf.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{content.golf.desc}</p>
             </div>
          </div>

          {/* Nature & Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                  <TreePine size={32} className="text-blue-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">{content.nature.title}</h4>
                  <p className="text-gray-600 text-xs leading-relaxed">{content.nature.desc}</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                  <MapPin size={32} className="text-orange-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">{content.connectivity.title}</h4>
                  <p className="text-gray-600 text-xs leading-relaxed">{content.connectivity.desc}</p>
              </div>
          </div>

      </div>
    </div>
  );
};
