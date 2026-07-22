import React, { useState } from 'react';
import { Property } from '../types';
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Droplet, 
  ShieldCheck, 
  PawPrint, 
  Car, 
  Phone, 
  MessageSquare, 
  Eye, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Scale
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  isSaved: boolean;
  onToggleSave: (propertyId: string) => void;
  isComparing: boolean;
  onToggleCompare: (propertyId: string) => void;
  onSelectProperty: (property: Property) => void;
  onOpenViewingModal: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isSaved,
  onToggleSave,
  isComparing,
  onToggleCompare,
  onSelectProperty,
  onOpenViewingModal
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % property.photos.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + property.photos.length) % property.photos.length);
  };

  // Format WhatsApp message URL
  const whatsappText = encodeURIComponent(
    `Hello ${property.landlord.name}, I am interested in your long-term rental property: "${property.title}" in ${property.area}, ${property.city} listed on RentDirect (GH₵ ${property.rentPrice}/mo). Is it still available for viewing?`
  );
  const whatsappUrl = `https://wa.me/${property.landlord.whatsapp}?text=${whatsappText}`;

  return (
    <div 
      id={`property-card-${property.id}`}
      className="group bg-white rounded-2xl border border-neutral-200/90 shadow-xs hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Image Container with Slider */}
      <div className="relative aspect-16/10 bg-neutral-100 overflow-hidden cursor-pointer" onClick={() => onSelectProperty(property)}>
        <img
          src={property.photos[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Dark subtle Gradient overlay for top tags */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-auto">
          <div className="flex items-center gap-1.5 flex-wrap">
            {property.isFeatured && (
              <span className="bg-amber-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3 fill-current" />
                Featured
              </span>
            )}
            <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs">
              Direct Landlord
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Compare Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(property.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all shadow-xs ${
                isComparing
                  ? 'bg-emerald-600 text-white'
                  : 'bg-black/40 hover:bg-black/60 text-white'
              }`}
              title={isComparing ? 'Remove from Compare' : 'Add to Compare'}
            >
              <Scale className="w-4 h-4" />
            </button>

            {/* Favorite Save Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(property.id);
              }}
              className="p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition-all shadow-xs"
              title={isSaved ? 'Unsave Property' : 'Save Property'}
            >
              <Heart className={`w-4 h-4 transition-colors ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
            </button>
          </div>
        </div>

        {/* Image Slider Controls (if multiple images) */}
        {property.photos.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Photo Index Indicator */}
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded-full z-10">
              {currentImageIndex + 1} / {property.photos.length}
            </div>
          </>
        )}

        {/* 360° Virtual Tour Badge */}
        {property.virtualTour360Url && (
          <div className="absolute bottom-3 left-3 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-400/30 text-emerald-300 backdrop-blur-md text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 z-10">
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>360° Virtual Tour Available</span>
          </div>
        )}
      </div>

      {/* Card Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          {/* Price & Deposit */}
          <div className="flex items-baseline justify-between mb-1.5">
            <div>
              <span className="text-xl sm:text-2xl font-extrabold text-neutral-900 font-mono">
                GH₵ {property.rentPrice.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-neutral-500"> / month</span>
            </div>
            <div className="text-xs text-neutral-500 font-medium">
              Deposit: <span className="font-semibold text-neutral-800">GH₵ {property.depositPrice.toLocaleString()}</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectProperty(property)}
            className="text-base font-bold text-neutral-900 line-clamp-1 hover:text-emerald-700 transition-colors cursor-pointer mb-1"
          >
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-neutral-600 mb-3">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">{property.address}, {property.area}, {property.city}</span>
          </div>

          {/* Core Spec Icons (Beds, Baths, Sqft, Furnished) */}
          <div className="grid grid-cols-4 gap-2 py-2.5 px-3 bg-neutral-50 rounded-xl border border-neutral-100 text-xs font-medium text-neutral-700 mb-3">
            <div className="flex items-center gap-1.5" title="Bedrooms">
              <Bed className="w-3.5 h-3.5 text-neutral-500" />
              <span>{property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} Bed`}</span>
            </div>
            <div className="flex items-center gap-1.5" title="Bathrooms">
              <Bath className="w-3.5 h-3.5 text-neutral-500" />
              <span>{property.bathrooms} Bath</span>
            </div>
            <div className="flex items-center gap-1.5" title="Square Footage">
              <Maximize2 className="w-3.5 h-3.5 text-neutral-500" />
              <span>{property.sqft} sqft</span>
            </div>
            <div className="flex items-center gap-1.5 truncate" title="Furnishing Status">
              <span className="truncate font-semibold text-emerald-800">{property.furnished}</span>
            </div>
          </div>

          {/* Feature Badges Grid (Water, Security, Pets, Parking) */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-neutral-600">
            {/* Water Supply */}
            <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg border border-blue-100 flex items-center gap-1">
              <Droplet className="w-3 h-3 text-blue-500" />
              {property.waterAvailability}
            </span>

            {/* Primary Security Feature */}
            {property.securityFeatures.length > 0 && (
              <span className="bg-purple-50 text-purple-700 px-2.5 py-1 rounded-lg border border-purple-100 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-purple-500" />
                {property.securityFeatures[0]}
              </span>
            )}

            {/* Pets allowed */}
            {property.petsAllowed && (
              <span className="bg-amber-50 text-amber-800 px-2.5 py-1 rounded-lg border border-amber-100 flex items-center gap-1">
                <PawPrint className="w-3 h-3 text-amber-600" />
                Pets Allowed
              </span>
            )}

            {/* Parking */}
            {property.parking && (
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md flex items-center gap-1">
                <Car className="w-3 h-3 text-slate-500" />
                Parking
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions: Contact Landlord Directly & Schedule Viewing */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
          
          {/* WhatsApp Direct Action */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-emerald-200/80 transition-colors"
            title="Chat directly on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-emerald-600/20 text-emerald-600" />
            <span>WhatsApp</span>
          </a>

          {/* Call Landlord Button */}
          <a
            href={`tel:${property.landlord.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="p-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl border border-neutral-200 transition-colors"
            title={`Call Landlord ${property.landlord.name} (${property.landlord.phone})`}
          >
            <Phone className="w-4 h-4 text-neutral-700" />
          </a>

          {/* Schedule Viewing CTA */}
          <button
            onClick={() => onOpenViewingModal(property)}
            className="bg-neutral-900 hover:bg-neutral-800 text-white py-2 px-3 rounded-xl text-xs font-semibold transition-all hover:shadow-xs"
          >
            Book Viewing
          </button>
        </div>

      </div>
    </div>
  );
};
