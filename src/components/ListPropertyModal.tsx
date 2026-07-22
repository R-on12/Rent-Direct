import React, { useState } from 'react';
import { Property, PropertyType, FurnishedStatus, WaterAvailability, SecurityFeature } from '../types';
import { 
  X, 
  Building2, 
  DollarSign, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Droplet, 
  ShieldCheck, 
  PawPrint, 
  Car, 
  Plus, 
  Check, 
  Phone, 
  User, 
  Sparkles,
  Camera,
  CheckCircle2
} from 'lucide-react';

interface ListPropertyModalProps {
  onClose: () => void;
  onAddProperty: (newProperty: Property) => void;
}

const PRESET_PHOTOS = [
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
];

export const ListPropertyModal: React.FC<ListPropertyModalProps> = ({
  onClose,
  onAddProperty
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('Accra');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [rentPrice, setRentPrice] = useState<number | ''>('');
  const [depositPrice, setDepositPrice] = useState<number | ''>('');
  const [bedrooms, setBedrooms] = useState<number>(1);
  const [bathrooms, setBathrooms] = useState<number>(1);
  const [sqft, setSqft] = useState<number>(850);
  const [propertyType, setPropertyType] = useState<PropertyType>('Apartment');
  const [furnished, setFurnished] = useState<FurnishedStatus>('Furnished');
  const [petsAllowed, setPetsAllowed] = useState(true);
  const [parking, setParking] = useState(true);
  const [parkingDetails, setParkingDetails] = useState('1 Dedicated Parking Space');
  const [waterAvailability, setWaterAvailability] = useState<WaterAvailability>('24/7 Water Supply');
  const [securityFeatures, setSecurityFeatures] = useState<SecurityFeature[]>([
    '24/7 Security Guard',
    'CCTV Surveillance',
    'Intercom System'
  ]);
  const [amenitiesText, setAmenitiesText] = useState('High-Speed Internet, Air Conditioning, Private Balcony, Washer & Dryer');
  const [photos, setPhotos] = useState<string[]>([PRESET_PHOTOS[0], PRESET_PHOTOS[1]]);
  const [customPhotoInput, setCustomPhotoInput] = useState('');
  const [videoUrl, setVideoUrl] = useState('https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-41132-large.mp4');
  const [virtualTour360Url, setVirtualTour360Url] = useState(PRESET_PHOTOS[0]);
  
  // Landlord profile
  const [landlordName, setLandlordName] = useState('');
  const [landlordPhone, setLandlordPhone] = useState('');
  const [landlordEmail, setLandlordEmail] = useState('');
  const [landlordWhatsapp, setLandlordWhatsapp] = useState('');

  const [isSuccess, setIsSuccess] = useState(false);

  const toggleSecurityFeature = (feature: SecurityFeature) => {
    if (securityFeatures.includes(feature)) {
      setSecurityFeatures(securityFeatures.filter((f) => f !== feature));
    } else {
      setSecurityFeatures([...securityFeatures, feature]);
    }
  };

  const handleAddPhotoUrl = () => {
    if (customPhotoInput.trim()) {
      setPhotos([...photos, customPhotoInput.trim()]);
      setCustomPhotoInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !rentPrice || !depositPrice || !landlordName || !landlordPhone) return;

    const parsedAmenities = amenitiesText
      .split(',')
      .map((a) => a.trim())
      .filter((a) => a.length > 0);

    const cleanWhatsapp = (landlordWhatsapp || landlordPhone).replace(/[^0-9]/g, '');

    const newProp: Property = {
      id: `prop-landlord-${Date.now()}`,
      title,
      description: description || 'Spacious long-term rental property available directly from landlord. No agent commission.',
      city,
      area: area || 'Central District',
      address: address || '100 Central Avenue',
      lat: 25.7617 + (Math.random() - 0.5) * 0.1,
      lng: -80.1918 + (Math.random() - 0.5) * 0.1,
      rentPrice: Number(rentPrice),
      depositPrice: Number(depositPrice),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      sqft: Number(sqft),
      propertyType,
      furnished,
      petsAllowed,
      parking,
      parkingDetails: parking ? parkingDetails : undefined,
      waterAvailability,
      securityFeatures,
      amenities: parsedAmenities.length > 0 ? parsedAmenities : ['Air Conditioning', 'High Speed Internet', '24/7 Security'],
      photos: photos.length > 0 ? photos : [PRESET_PHOTOS[0]],
      videoUrl: videoUrl || undefined,
      virtualTour360Url: virtualTour360Url || photos[0],
      virtualTourRooms: [
        { name: 'Main Living Room', imageUrl: photos[0] || PRESET_PHOTOS[0] },
        { name: 'Bedroom', imageUrl: photos[1] || PRESET_PHOTOS[1] }
      ],
      availableDate: new Date().toISOString().split('T')[0],
      landlord: {
        id: `landlord-${Date.now()}`,
        name: landlordName,
        phone: landlordPhone,
        whatsapp: cleanWhatsapp || '13055550192',
        email: landlordEmail || 'landlord@direct.com',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        responseRate: '100%',
        responseTime: 'Under 15 minutes',
        isVerified: true,
        memberSince: 'July 2026',
        propertiesListedCount: 1
      },
      isFeatured: true,
      createdAt: new Date().toISOString()
    };

    onAddProperty(newProp);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl border border-neutral-200 flex flex-col my-auto relative text-neutral-900">
        
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Direct Landlord Studio
            </span>
            <h2 className="text-xl font-extrabold text-neutral-900">List Your Rental Property</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-10 text-center space-y-4 my-auto">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-extrabold text-neutral-900">Property Published Directly!</h3>
            <p className="text-sm text-neutral-600 max-w-md mx-auto">
              Your long-term rental listing for <strong className="text-neutral-900">{title}</strong> is now live on RentDirect. Tenants can contact you directly via WhatsApp, Phone, or Schedule Viewings.
            </p>
            <button
              onClick={onClose}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-md transition-all"
            >
              Back to Marketplace
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            
            {/* Section 1: Property Basics */}
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 pb-1 border-b border-neutral-100 flex items-center gap-1.5">
                <Building2 className="w-4 h-4" /> 1. Property Details & Title
              </h3>

              <div>
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">
                  Listing Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Modern Executive 2BR Apartment with Ocean View & Backup Water"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">City *</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="Accra">Accra</option>
                    <option value="Kumasi">Kumasi</option>
                    <option value="Takoradi">Takoradi</option>
                    <option value="Sunyani">Sunyani</option>
                    <option value="Cape Coast">Cape Coast</option>
                    <option value="Tamale">Tamale</option>
                    <option value="Tema">Tema</option>
                    <option value="Koforidua">Koforidua</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">Area / Neighborhood *</label>
                  <input
                    type="text"
                    placeholder="e.g. East Legon / Ahodwo / Airport Ridge"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">Street Address</label>
                  <input
                    type="text"
                    placeholder="e.g. 14 Lagos Avenue"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

            </div>

            {/* Section 2: Pricing & Specs */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 pb-1 border-b border-neutral-100 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4" /> 2. Rent, Deposit & Specifications
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">Monthly Rent (GH₵) *</label>
                  <input
                    type="number"
                    placeholder="4500"
                    value={rentPrice}
                    onChange={(e) => setRentPrice(e.target.value ? Number(e.target.value) : '')}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono font-bold text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">Deposit (GH₵) *</label>
                  <input
                    type="number"
                    placeholder="4500"
                    value={depositPrice}
                    onChange={(e) => setDepositPrice(e.target.value ? Number(e.target.value) : '')}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono font-bold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">Bedrooms</label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value={0}>Studio (0)</option>
                    <option value={1}>1 Bedroom</option>
                    <option value={2}>2 Bedrooms</option>
                    <option value={3}>3 Bedrooms</option>
                    <option value={4}>4 Bedrooms</option>
                    <option value={5}>5+ Bedrooms</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">Bathrooms</label>
                  <select
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value={1}>1 Bath</option>
                    <option value={1.5}>1.5 Baths</option>
                    <option value={2}>2 Baths</option>
                    <option value={2.5}>2.5 Baths</option>
                    <option value={3}>3 Baths</option>
                    <option value={4}>4+ Baths</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">Property Type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Chamber & Hall">Chamber & Hall</option>
                    <option value="Studio">Studio</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Duplex">Duplex</option>
                    <option value="Villa">Villa</option>
                    <option value="Townhouse">Townhouse</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">Furnishing</label>
                  <select
                    value={furnished}
                    onChange={(e) => setFurnished(e.target.value as FurnishedStatus)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="Furnished">Furnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">Area (sqft)</label>
                  <input
                    type="number"
                    placeholder="850"
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Water, Security, Pets & Parking */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 pb-1 border-b border-neutral-100 flex items-center gap-1.5">
                <Droplet className="w-4 h-4 text-blue-500" /> 3. Water Supply & Security Infrastructure
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">
                    Water Availability *
                  </label>
                  <select
                    value={waterAvailability}
                    onChange={(e) => setWaterAvailability(e.target.value as WaterAvailability)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="24/7 Water Supply">24/7 Water Supply</option>
                    <option value="Borehole Backup">Borehole Backup</option>
                    <option value="Municipal Water">Municipal Water</option>
                    <option value="Water Tank Storage">Water Tank Storage</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">
                    Security Features (Select All That Apply)
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      '24/7 Security Guard',
                      'Gated Community',
                      'CCTV Surveillance',
                      'Electric Fencing',
                      'Intercom System',
                      'Biometric Access'
                    ].map((sec) => {
                      const isSelected = securityFeatures.includes(sec as any);
                      return (
                        <button
                          type="button"
                          key={sec}
                          onClick={() => toggleSecurityFeature(sec as any)}
                          className={`p-2 rounded-xl text-[11px] font-semibold text-left border flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-purple-50 border-purple-300 text-purple-900'
                              : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                          }`}
                        >
                          <span className="truncate">{sec}</span>
                          {isSelected && <Check className="w-3 h-3 text-purple-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Pets & Parking Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <label className="p-3 rounded-2xl border border-neutral-200 bg-neutral-50 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <PawPrint className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold">Pets Allowed?</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={petsAllowed}
                    onChange={(e) => setPetsAllowed(e.target.checked)}
                    className="w-4 h-4 accent-emerald-600"
                  />
                </label>

                <label className="p-3 rounded-2xl border border-neutral-200 bg-neutral-50 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-slate-700" />
                    <span className="text-xs font-bold">Parking Included?</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={parking}
                    onChange={(e) => setParking(e.target.checked)}
                    className="w-4 h-4 accent-emerald-600"
                  />
                </label>
              </div>
            </div>

            {/* Section 4: Photo Gallery & Media */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 pb-1 border-b border-neutral-100 flex items-center gap-1.5">
                <Camera className="w-4 h-4" /> 4. Property Photos & 360° Virtual Tour
              </h3>

              <div>
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">
                  Add Photo URL or Select Presets
                </label>
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="url"
                    placeholder="Paste image URL (https://...)"
                    value={customPhotoInput}
                    onChange={(e) => setCustomPhotoInput(e.target.value)}
                    className="flex-1 p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddPhotoUrl}
                    className="bg-neutral-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>

                {/* Preset Selector Badges */}
                <p className="text-[11px] text-neutral-500 mb-1.5 font-medium">Quick sample photography presets:</p>
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {PRESET_PHOTOS.map((photo, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => {
                        if (!photos.includes(photo)) setPhotos([...photos, photo]);
                      }}
                      className="w-16 h-12 rounded-lg overflow-hidden border border-neutral-300 shrink-0 hover:scale-105 transition-transform relative group"
                    >
                      <img src={photo} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold">
                        + Add
                      </div>
                    </button>
                  ))}
                </div>

                {/* Current Active Photos List */}
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {photos.map((p, idx) => (
                    <div key={idx} className="relative h-20 rounded-xl overflow-hidden border border-neutral-300">
                      <img src={p} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setPhotos(photos.filter((_, i) => i !== idx))}
                        className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full hover:bg-rose-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 5: Landlord Contact Info */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 pb-1 border-b border-neutral-100 flex items-center gap-1.5">
                <User className="w-4 h-4" /> 5. Landlord Direct Contact Info
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Carlos Mendoza"
                    value={landlordName}
                    onChange={(e) => setLandlordName(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="e.g. +1 (305) 555-0192"
                    value={landlordPhone}
                    onChange={(e) => setLandlordPhone(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">WhatsApp Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. 13055550192"
                    value={landlordWhatsapp}
                    onChange={(e) => setLandlordWhatsapp(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="landlord@example.com"
                    value={landlordEmail}
                    onChange={(e) => setLandlordEmail(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Description Area */}
            <div>
              <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">Description</label>
              <textarea
                rows={3}
                placeholder="Describe key features, light, lease terms, rules..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-2xl font-extrabold text-sm shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.01]"
            >
              Publish Listing Directly Free
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
