import React, { useState } from 'react';
import { Property } from '../types';
import { Virtual360Viewer } from './Virtual360Viewer';
import { 
  X, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Calendar, 
  Phone, 
  MessageSquare, 
  Droplet, 
  ShieldCheck, 
  PawPrint, 
  Car, 
  CheckCircle2, 
  Eye, 
  Video, 
  Image as ImageIcon,
  Heart,
  Share2,
  CalendarCheck,
  Check,
  Building,
  UserCheck
} from 'lucide-react';

interface PropertyDetailsModalProps {
  property: Property | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (propertyId: string) => void;
  onOpenViewingModal: (property: Property) => void;
  onSendInquiry: (propertyId: string, message: string) => void;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  property,
  onClose,
  isSaved,
  onToggleSave,
  onOpenViewingModal,
  onSendInquiry
}) => {
  if (!property) return null;

  const [activeTab, setActiveTab] = useState<'photos' | 'video' | 'virtual360'>('photos');
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquiryText, setInquiryText] = useState(
    `Hello ${property.landlord.name}, I am interested in renting "${property.title}" in ${property.area}, ${property.city}. Is it available for long-term lease?`
  );
  const [inquirySentSuccess, setInquirySentSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const whatsappText = encodeURIComponent(
    `Hello ${property.landlord.name}, I found your rental listing for "${property.title}" on RentDirect (GH₵ ${property.rentPrice}/mo). I would like to enquire about renting this property.`
  );
  const whatsappUrl = `https://wa.me/${property.landlord.whatsapp}?text=${whatsappText}`;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryText.trim()) return;
    onSendInquiry(property.id, inquiryText);
    setInquirySentSuccess(true);
    setTimeout(() => {
      setInquirySentSuccess(false);
      setShowInquiryForm(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        id="property-details-modal"
        className="bg-white rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-y-auto shadow-2xl border border-neutral-200 flex flex-col my-auto relative text-neutral-900"
      >
        {/* Top Sticky Header Bar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-neutral-200 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wide flex items-center gap-1">
              <Building className="w-3.5 h-3.5" />
              Direct Landlord Listing • No Agent Fee
            </span>
            <h2 className="text-lg sm:text-xl font-bold line-clamp-1">{property.title}</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors"
              title="Share Link"
            >
              {copiedLink ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
            </button>

            <button
              onClick={() => onToggleSave(property.id)}
              className="p-2.5 rounded-full hover:bg-rose-50 text-neutral-600 transition-colors"
              title={isSaved ? 'Unsave' : 'Save'}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Media Viewing Tabs & Player */}
        <div className="bg-neutral-950 p-4 sm:p-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'photos'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Photos ({property.photos.length})
            </button>

            {property.videoUrl && (
              <button
                onClick={() => setActiveTab('video')}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  activeTab === 'video'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                <Video className="w-4 h-4 text-emerald-400" />
                Video Walkthrough
              </button>
            )}

            {property.virtualTour360Url && (
              <button
                onClick={() => setActiveTab('virtual360')}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  activeTab === 'virtual360'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                <Eye className="w-4 h-4 text-emerald-400" />
                360° Virtual Tour
              </button>
            )}
          </div>

          {/* Tab Contents */}
          {activeTab === 'photos' && (
            <div className="flex flex-col gap-3">
              <div className="relative aspect-16/9 w-full bg-neutral-900 rounded-2xl overflow-hidden">
                <img
                  src={property.photos[activePhotoIndex]}
                  alt={`${property.title} photo ${activePhotoIndex + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Photo Thumbnails bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {property.photos.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => setActivePhotoIndex(index)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activePhotoIndex === index ? 'border-emerald-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'video' && property.videoUrl && (
            <div className="aspect-16/9 w-full rounded-2xl overflow-hidden bg-black border border-neutral-800">
              <video controls className="w-full h-full object-cover">
                <source src={property.videoUrl} type="video/mp4" />
                Your browser does not support HTML5 video player.
              </video>
            </div>
          )}

          {activeTab === 'virtual360' && (
            <Virtual360Viewer
              rooms={property.virtualTourRooms}
              defaultImageUrl={property.virtualTour360Url}
              title={property.title}
            />
          )}
        </div>

        {/* Modal Main Content Layout */}
        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Details, Specs, Map, Landlord Info */}
          <div className="lg:col-span-2 space-cols-6 space-y-6">
            
            {/* Rent & Deposit Headline */}
            <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Monthly Rent</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono">
                  GH₵ {property.rentPrice.toLocaleString()} <span className="text-sm font-semibold text-neutral-500">/ month</span>
                </div>
              </div>
              <div className="sm:text-right">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Security Deposit</span>
                <div className="text-xl font-bold text-neutral-800 font-mono">
                  GH₵ {property.depositPrice.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Core Property Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-neutral-200">
              <div className="p-3 bg-neutral-50 rounded-xl text-center">
                <Bed className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <span className="text-xs text-neutral-500 block">Bedrooms</span>
                <span className="text-sm font-bold text-neutral-900">
                  {property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} Beds`}
                </span>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl text-center">
                <Bath className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <span className="text-xs text-neutral-500 block">Bathrooms</span>
                <span className="text-sm font-bold text-neutral-900">{property.bathrooms} Baths</span>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl text-center">
                <Maximize2 className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <span className="text-xs text-neutral-500 block">Area</span>
                <span className="text-sm font-bold text-neutral-900">{property.sqft} sqft</span>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl text-center">
                <Calendar className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <span className="text-xs text-neutral-500 block">Available From</span>
                <span className="text-sm font-bold text-neutral-900">{property.availableDate}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-base font-bold text-neutral-900 mb-2">Property Description</h3>
              <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line bg-neutral-50/60 p-4 rounded-2xl border border-neutral-100">
                {property.description}
              </p>
            </div>

            {/* Utilities & Infrastructure (Water, Security, Parking, Pets) */}
            <div>
              <h3 className="text-base font-bold text-neutral-900 mb-3">Utilities & Building Specs</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Water Availability */}
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-3">
                  <Droplet className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide">Water Availability</h4>
                    <p className="text-sm font-semibold text-blue-950 mt-0.5">{property.waterAvailability}</p>
                    <span className="text-[11px] text-blue-700">Guaranteed uninterrupted supply for tenant comfort.</span>
                  </div>
                </div>

                {/* Security Features */}
                <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-purple-900 uppercase tracking-wide">Security Protection</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {property.securityFeatures.map((sec) => (
                        <span key={sec} className="bg-white text-purple-900 text-[11px] font-semibold px-2 py-0.5 rounded-md border border-purple-200">
                          {sec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pets Allowed */}
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 flex items-start gap-3">
                  <PawPrint className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">Pet Policy</h4>
                    <p className="text-sm font-semibold text-amber-950 mt-0.5">
                      {property.petsAllowed ? 'Pets Allowed 🐾' : 'No Pets Allowed'}
                    </p>
                  </div>
                </div>

                {/* Parking */}
                <div className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200 flex items-start gap-3">
                  <Car className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Parking Facility</h4>
                    <p className="text-sm font-semibold text-slate-950 mt-0.5">
                      {property.parking ? (property.parkingDetails || 'Dedicated Parking Space') : 'No Dedicated Parking'}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Amenities Grid */}
            <div>
              <h3 className="text-base font-bold text-neutral-900 mb-3">Amenities & Features</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 p-2.5 bg-neutral-50 rounded-xl text-xs font-semibold text-neutral-800 border border-neutral-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Map Representation */}
            <div>
              <h3 className="text-base font-bold text-neutral-900 mb-3 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                Location & Neighborhood
              </h3>
              <div className="relative h-56 rounded-2xl overflow-hidden border border-neutral-200 bg-emerald-950/90 p-4 text-white flex flex-col justify-between">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <div className="relative z-10 bg-black/60 backdrop-blur-md p-3 rounded-xl max-w-sm">
                  <p className="text-xs font-bold text-emerald-400">{property.area}, {property.city}</p>
                  <p className="text-sm font-semibold">{property.address}</p>
                </div>

                <div className="relative z-10 flex items-center justify-between text-xs">
                  <span className="bg-emerald-600 text-white px-3 py-1 rounded-full font-bold">
                    GPS Coordinates: {property.lat.toFixed(4)}, {property.lng.toFixed(4)}
                  </span>
                  <span className="text-neutral-300">Quiet Residential Zone</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Landlord Card & Action Buttons */}
          <div className="space-y-6">
            
            {/* Landlord Profile Card */}
            <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={property.landlord.avatarUrl}
                  alt={property.landlord.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="text-base font-bold text-neutral-900">{property.landlord.name}</h4>
                    {property.landlord.isVerified && (
                      <UserCheck className="w-4 h-4 text-emerald-600 fill-emerald-100" title="Verified Landlord" />
                    )}
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md inline-block mt-0.5">
                    Direct Property Owner
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs py-3 border-y border-neutral-200/80">
                <div>
                  <span className="text-neutral-500 block">Response Rate:</span>
                  <span className="font-bold text-neutral-900">{property.landlord.responseRate}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Avg Response:</span>
                  <span className="font-bold text-neutral-900">{property.landlord.responseTime}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                
                {/* Book Viewing Button */}
                <button
                  onClick={() => onOpenViewingModal(property)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Schedule a Viewing</span>
                </button>

                {/* WhatsApp Direct */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Chat on WhatsApp</span>
                </a>

                {/* Call Landlord */}
                <a
                  href={`tel:${property.landlord.phone}`}
                  className="w-full bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-300 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-4 h-4 text-neutral-600" />
                  <span>Call Landlord: {property.landlord.phone}</span>
                </a>

                {/* Send Direct Inquiry */}
                <button
                  onClick={() => setShowInquiryForm(!showInquiryForm)}
                  className="w-full text-xs font-bold text-neutral-600 hover:text-neutral-900 py-2 text-center"
                >
                  {showInquiryForm ? 'Hide Message Form' : 'Send In-App Message to Landlord'}
                </button>
              </div>

              {/* In-App Direct Message Form */}
              {showInquiryForm && (
                <form onSubmit={handleInquirySubmit} className="pt-3 border-t border-neutral-200 space-y-3">
                  {inquirySentSuccess ? (
                    <div className="bg-emerald-100 text-emerald-800 p-3 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-1.5">
                      <Check className="w-4 h-4" /> Message sent directly to {property.landlord.name}!
                    </div>
                  ) : (
                    <>
                      <textarea
                        rows={3}
                        value={inquiryText}
                        onChange={(e) => setInquiryText(e.target.value)}
                        className="w-full p-2.5 bg-white border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Type your message to landlord..."
                      />
                      <button
                        type="submit"
                        className="w-full bg-neutral-900 hover:bg-neutral-800 text-white py-2 rounded-xl text-xs font-bold transition-all"
                      >
                        Send Inquiry
                      </button>
                    </>
                  )}
                </form>
              )}

            </div>

            {/* Zero Agent Fee Guarantee Box */}
            <div className="bg-emerald-950 text-emerald-100 p-5 rounded-2xl border border-emerald-800 text-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero Agent Commission</span>
              </div>
              <p className="text-emerald-200/80 leading-relaxed">
                Rent directly from verified property owners. Avoid agency markups, middleman fees, or hidden listing charges.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
