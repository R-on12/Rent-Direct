import React, { useState } from 'react';
import { Property } from '../types';
import { MapPin, Bed, Bath, Droplet, ShieldCheck, X, Eye, ArrowRight } from 'lucide-react';

interface MapViewProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onOpenViewingModal: (property: Property) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  properties,
  onSelectProperty,
  onOpenViewingModal
}) => {
  const [activeProperty, setActiveProperty] = useState<Property | null>(properties[0] || null);

  return (
    <div id="map-view-canvas" className="relative w-full h-[620px] rounded-3xl overflow-hidden border border-neutral-200/90 bg-neutral-900 shadow-lg">
      
      {/* Map Vector Grid Background */}
      <div className="absolute inset-0 bg-[#0f172a] opacity-95">
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        {/* Decorative Grid Roads */}
        <div className="absolute left-1/4 top-0 bottom-0 w-8 bg-slate-800/40 border-x border-slate-700/30" />
        <div className="absolute right-1/3 top-0 bottom-0 w-12 bg-slate-800/40 border-x border-slate-700/30" />
        <div className="absolute top-1/3 left-0 right-0 h-10 bg-slate-800/40 border-y border-slate-700/30" />
        <div className="absolute bottom-1/4 left-0 right-0 h-8 bg-slate-800/40 border-y border-slate-700/30" />
        {/* River accent */}
        <div className="absolute top-0 bottom-0 right-12 w-24 bg-blue-950/40 border-x border-blue-900/30 -rotate-12 blur-xs" />
      </div>

      {/* Map Control Badge */}
      <div className="absolute top-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md text-white px-4 py-2 rounded-2xl border border-slate-700/80 text-xs font-bold flex items-center gap-2 shadow-md">
        <MapPin className="w-4 h-4 text-emerald-400" />
        <span>Interactive Location Map • {properties.length} Properties</span>
      </div>

      {/* Render Property Pins */}
      <div className="absolute inset-0 p-8 sm:p-12 relative pointer-events-auto">
        {properties.map((prop, idx) => {
          // Compute pseudo percentage positioning based on index & coordinates
          const leftPercent = 15 + ((idx * 27 + Math.abs(prop.lng) * 100) % 70);
          const topPercent = 20 + ((idx * 33 + Math.abs(prop.lat) * 100) % 60);
          const isSelected = activeProperty?.id === prop.id;

          return (
            <div
              key={prop.id}
              style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <button
                onClick={() => setActiveProperty(prop)}
                className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-2xl font-mono font-extrabold text-xs shadow-lg transition-all duration-300 ${
                  isSelected
                    ? 'bg-emerald-500 text-white scale-125 z-30 ring-4 ring-emerald-400/30'
                    : 'bg-slate-900/95 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-slate-700 hover:border-emerald-400'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-400 group-hover:text-white'}`} />
                <span>GH₵ {prop.rentPrice.toLocaleString()}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Active Property Card Popover (Bottom Left) */}
      {activeProperty && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-30 bg-white rounded-2xl p-4 shadow-2xl border border-neutral-200 animate-fadeIn">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase">
                {activeProperty.propertyType}
              </span>
              <span className="text-xs font-bold text-neutral-500">{activeProperty.city}</span>
            </div>
            <button
              onClick={() => setActiveProperty(null)}
              className="p-1 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-3">
            <img
              src={activeProperty.photos[0]}
              alt=""
              className="w-24 h-24 rounded-xl object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-lg font-extrabold text-neutral-900 font-mono">
                GH₵ {activeProperty.rentPrice.toLocaleString()} <span className="text-xs text-neutral-500 font-normal">/mo</span>
              </div>
              <h4 className="text-xs font-bold text-neutral-900 truncate mb-1">{activeProperty.title}</h4>
              <p className="text-[11px] text-neutral-500 truncate mb-2">{activeProperty.address}, {activeProperty.area}</p>

              <div className="flex items-center gap-2 text-[10px] font-semibold text-neutral-700 mb-2">
                <span className="flex items-center gap-1"><Bed className="w-3 h-3 text-neutral-400" /> {activeProperty.bedrooms} Bed</span>
                <span className="flex items-center gap-1"><Bath className="w-3 h-3 text-neutral-400" /> {activeProperty.bathrooms} Bath</span>
                <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100">{activeProperty.waterAvailability}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectProperty(activeProperty)}
                  className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" /> Details
                </button>
                <button
                  onClick={() => onOpenViewingModal(activeProperty)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1"
                >
                  Book Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
