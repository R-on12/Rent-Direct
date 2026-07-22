import React from 'react';
import { Property } from '../types';
import { X, Scale, Bed, Bath, Droplet, ShieldCheck, PawPrint, Car, ArrowRight } from 'lucide-react';

interface CompareModalProps {
  properties: Property[];
  onClose: () => void;
  onRemoveCompare: (propertyId: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  properties,
  onClose,
  onRemoveCompare,
  onSelectProperty
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200 flex flex-col my-auto relative text-neutral-900">
        
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold">Compare Rental Properties ({properties.length})</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {properties.length === 0 ? (
          <div className="p-12 text-center text-neutral-500">
            No properties selected for comparison. Click the scale icon on any listing card to compare up to 3 homes.
          </div>
        ) : (
          <div className="p-6 overflow-x-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-w-[650px]">
              {properties.map((prop) => (
                <div key={prop.id} className="bg-neutral-50 rounded-2xl p-5 border border-neutral-200 space-y-4 relative flex flex-col justify-between">
                  <button
                    onClick={() => onRemoveCompare(prop.id)}
                    className="absolute top-3 right-3 bg-white p-1.5 rounded-full text-neutral-400 hover:text-rose-600 shadow-xs border border-neutral-200"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="space-y-2">
                    <img
                      src={prop.photos[0]}
                      alt=""
                      className="w-full h-36 object-cover rounded-xl"
                    />
                    <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                      {prop.propertyType}
                    </span>
                    <h3 className="text-sm font-bold line-clamp-1">{prop.title}</h3>
                    <p className="text-xs text-neutral-500">{prop.area}, {prop.city}</p>

                    <div className="pt-2 border-t border-neutral-200 font-mono">
                      <div className="text-xl font-extrabold text-neutral-900">GH₵ {prop.rentPrice.toLocaleString()}/mo</div>
                      <div className="text-xs text-neutral-500">Deposit: GH₵ {prop.depositPrice.toLocaleString()}</div>
                    </div>

                    {/* Comparison Matrix */}
                    <div className="space-y-2 pt-3 border-t border-neutral-200 text-xs font-medium">
                      <div className="flex justify-between py-1 border-b border-neutral-100">
                        <span className="text-neutral-500">Bedrooms:</span>
                        <span className="font-bold">{prop.bedrooms === 0 ? 'Studio' : prop.bedrooms}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-neutral-100">
                        <span className="text-neutral-500">Bathrooms:</span>
                        <span className="font-bold">{prop.bathrooms}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-neutral-100">
                        <span className="text-neutral-500">Square Feet:</span>
                        <span className="font-bold">{prop.sqft} sqft</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-neutral-100">
                        <span className="text-neutral-500">Furnishing:</span>
                        <span className="font-bold text-emerald-700">{prop.furnished}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-neutral-100">
                        <span className="text-neutral-500">Water Supply:</span>
                        <span className="font-bold text-blue-700">{prop.waterAvailability}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-neutral-100">
                        <span className="text-neutral-500">Pets Policy:</span>
                        <span className="font-bold">{prop.petsAllowed ? 'Pets Allowed 🐾' : 'No Pets'}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-neutral-500">Parking:</span>
                        <span className="font-bold">{prop.parking ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectProperty(prop);
                    }}
                    className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1"
                  >
                    View Property Details <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
