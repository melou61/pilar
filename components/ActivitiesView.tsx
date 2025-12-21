
import React from 'react';
import { ACTIVITIES_LIST } from '../data';
import { Star, MapPin, ChevronRight, Activity } from './Icons';

interface ActivitiesViewProps {
  t: any;
}

export const ActivitiesView: React.FC<ActivitiesViewProps> = ({ t }) => {
  return (
    <div className="bg-white min-h-screen pb-44 animate-in fade-in duration-300">
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Activity className="text-blue-600" />
            {t.sections.activities.title}
        </h1>
        <p className="text-gray-500 text-sm mb-6">
            {t.sections.activities.desc}
        </p>

        <div className="space-y-4">
            {ACTIVITIES_LIST.map((activity) => (
                <div key={activity.id} className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
                    <div className="aspect-video w-full overflow-hidden relative">
                        <img 
                            src={activity.image} 
                            alt={activity.title} 
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                         <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blue-800 uppercase tracking-wide">
                            {activity.category}
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-gray-900">{activity.title}</h3>
                            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-lg">
                                <Star size={12} className="text-yellow-500 fill-yellow-500" />
                                <span className="text-xs font-bold text-gray-800">{activity.rating}</span>
                            </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {activity.description}
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <MapPin size={14} />
                                {activity.location}
                            </div>
                            <span className="text-blue-600 text-sm font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                Ver Detalles <ChevronRight size={16} />
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};
