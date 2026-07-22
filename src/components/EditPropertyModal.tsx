import React, { useState } from 'react';
import { Property, PropertyType, FurnishedStatus, WaterAvailability, SecurityFeature } from '../types';
import { 
  X, 
  Building2, 
  DollarSign, 
  Droplet, 
  PawPrint, 
  Car, 
  Plus, 
  Check, 
  User, 
  Camera,
  Save,
  CheckCircle2,
  Tag
} from 'lucide-react';

interface EditPropertyModalProps {
  property: Property;
  onClose: () => void;
  onSaveProperty: (updatedProperty: Property) => void;
}

const PRESET_PHOTOS = [
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
];

export const EditPropertyModal: React.FC<EditPropertyModalProps> = ({
  property,
  onClose,
  onSaveProperty
}) => {
  const [title, setTitle] = useState(property.title);
  const [description, setDescription] = useState(property.description);
  const [city, setCity] = useState(property.city);
  const [area, setArea] = useState(property.area);
  const [address, setAddress] = useState(property.address);
  const [rentPrice, setRentPrice] = useState<number | ''>(property.rentPrice);
  const [depositPrice, setDepositPrice] = useState<number | ''>(property.depositPrice);
  const [bedrooms, setBedrooms] = useState<number>(property.bedrooms);
  const [bathrooms, setBathrooms] = useState<number>(property.bathrooms);
  const [sqft, setSqft] = useState<number>(property.sqft);
  const [propertyType, setPropertyType] = useState<PropertyType>(property.propertyType);
  const [furnished, setFurnished] = useState<FurnishedStatus>(property.furnished);
  const [petsAllowed, setPetsAllowed] = useState(property.petsAllowed);
  const [parking, setParking] = useState(property.parking);
  const [parkingDetails, setParkingDetails] = useState(property.parkingDetails || '');
  const [waterAvailability, setWaterAvailability] = useState<WaterAvailability>(property.waterAvailability);
  const [securityFeatures, setSecurityFeatures] = useState<SecurityFeature[]>(property.securityFeatures || []);
  const [amenitiesText, setAmenitiesText] = useState((property.amenities || []).join(', '));
  const [photos, setPhotos] = useState<string[]>(property.photos || []);
  const [customPhotoInput, setCustomPhotoInput] = useState('');
  const [status, setStatus] = useState<'Available' | 'Pending' | 'Rented'>(property.status || 'Available');

  // Landlord contact
  const [landlordName, setLandlordName] = useState(property.landlord.name);
  const [landlordPhone, setLandlordPhone] = useState(property.landlord.phone);
  const [landlordEmail, setLandlordEmail] = useState(property.landlord.email);
  const [landlordWhatsapp, setLandlordWhatsapp] = useState(property.landlord.whatsapp);

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
    if (!title || !rentPrice || !depositPrice) return;

    const parsedAmenities = amenitiesText
      .split(',')
      .map((a) => a.trim())
      .filter((a) => a.length > 0);

    const updatedProp: Property = {
      ...property,
      title,
      description,
      city,
      area,
      address,
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
      amenities: parsedAmenities,
      photos: photos.length > 0 ? photos : property.photos,
      status,
      landlord: {
        ...property.landlord,
        name: landlordName,
        phone: landlordPhone,
        whatsapp: landlordWhatsapp,
        email: landlordEmail
      }
    };

    onSaveProperty(updatedProp);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl border border-neutral-200 flex flex-col my-auto relative text-neutral-900">
        
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" /> Edit Property Listing
            </span>
            <h2 className="text-xl font-extrabold text-neutral-900">{property.title}</h2>
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
            <h3 className="text-2xl font-extrabold text-neutral-900">Listing Updated Successfully!</h3>
            <p className="text-sm text-neutral-600 max-w-md mx-auto">
              Changes to <strong className="text-neutral-900">{title}</strong> have been saved and are now live for potential tenants.
            </p>
            <button
              onClick={onClose}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-md transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            
            {/* Status Selector Banner */}
            <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">Property Availability Status</span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setStatus('Available')}
                  className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all border ${
                    status === 'Available'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  🟢 Available
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('Pending')}
                  className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all border ${
                    status === 'Pending'
                      ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                      : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  🟡 Pending
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('Rented')}
                  className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all border ${
                    status === 'Rented'
                      ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                      : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  🔴 Rented
                </button>
              </div>
            </div>

            {/* Section 1: Property Basics */}
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 pb-1 border-b border-neutral-100 flex items-center gap-1.5">
                <Building2 className="w-4 h-4" /> 1. Property Title & Location
              </h3>

              <div>
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">
                  Listing Title *
                </label>
                <input
                  type="text"
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
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Water, Security & Parking */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 pb-1 border-b border-neutral-100 flex items-center gap-1.5">
                <Droplet className="w-4 h-4 text-blue-500" /> 3. Infrastructure & Security
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
                    Security Features
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

              {/* Pets & Parking */}
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

            {/* Section 4: Photos */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 pb-1 border-b border-neutral-100 flex items-center gap-1.5">
                <Camera className="w-4 h-4" /> 4. Property Photos
              </h3>

              <div>
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
                    </button>
                  ))}
                </div>

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

            {/* Section 5: Description & Amenities */}
            <div className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">Amenities (Comma separated)</label>
                <input
                  type="text"
                  value={amenitiesText}
                  onChange={(e) => setAmenitiesText(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-2xl font-extrabold text-sm shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" /> Save & Update Listing
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
