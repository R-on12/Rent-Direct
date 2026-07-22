import React from 'react';
import { FilterState, PropertyType, FurnishedStatus, WaterAvailability, SecurityFeature } from '../types';
import { 
  Search, 
  RotateCcw, 
  MapPin, 
  DollarSign, 
  BedDouble, 
  Building2, 
  Armchair, 
  PawPrint, 
  Car, 
  Droplet, 
  ShieldCheck,
  Check,
  SlidersHorizontal
} from 'lucide-react';

interface PropertyFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  availableCities: string[];
  totalResults: number;
}

const PROPERTY_TYPES: PropertyType[] = [
  'Apartment',
  'House',
  'Chamber & Hall',
  'Studio',
  'Penthouse',
  'Duplex',
  'Villa',
  'Townhouse'
];

const FURNISHED_OPTIONS: FurnishedStatus[] = [
  'Furnished',
  'Semi-Furnished',
  'Unfurnished'
];

const WATER_TYPES: WaterAvailability[] = [
  '24/7 Water Supply',
  'Borehole Backup',
  'Municipal Water',
  'Water Tank Storage'
];

const SECURITY_OPTIONS: SecurityFeature[] = [
  '24/7 Security Guard',
  'Gated Community',
  'CCTV Surveillance',
  'Electric Fencing',
  'Intercom System',
  'Biometric Access'
];

export const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  availableCities,
  totalResults
}) => {
  const handleSecurityToggle = (feature: SecurityFeature) => {
    const current = filters.securityFeatures;
    const updated = current.includes(feature)
      ? current.filter((f) => f !== feature)
      : [...current, feature];
    onFilterChange({ ...filters, securityFeatures: updated });
  };

  return (
    <div id="property-filter-panel" className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
          <h2 className="text-base font-bold text-neutral-900">Filter Rentals</h2>
          <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2 py-0.5 rounded-full">
            {totalResults}
          </span>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs font-semibold text-neutral-500 hover:text-emerald-700 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset All
        </button>
      </div>

      {/* Search Keyword (Area, Title, Address) */}
      <div>
        <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Search className="w-3.5 h-3.5 text-neutral-500" />
          Keyword / Area
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Search neighborhood, street, keyword..."
            value={filters.searchKeyword}
            onChange={(e) => onFilterChange({ ...filters, searchKeyword: e.target.value })}
            className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* City Dropdown Filter */}
      <div>
        <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-neutral-500" />
          City
        </label>
        <select
          value={filters.city}
          onChange={(e) => onFilterChange({ ...filters, city: e.target.value })}
          className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
        >
          <option value="all">All Cities</option>
          {availableCities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Monthly Rent Price Range */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-neutral-500" />
            Max Monthly Rent
          </label>
          <span className="text-xs font-extrabold text-emerald-700 font-mono">
            GH₵ {filters.maxPrice.toLocaleString()}/mo
          </span>
        </div>
        <input
          type="range"
          min={1000}
          max={30000}
          step={500}
          value={filters.maxPrice}
          onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-emerald-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-mono text-neutral-400 mt-1">
          <span>GH₵ 1,000/mo</span>
          <span>GH₵ 30,000/mo</span>
        </div>
      </div>

      {/* Bedrooms Selector */}
      <div>
        <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <BedDouble className="w-3.5 h-3.5 text-neutral-500" />
          Bedrooms
        </label>
        <div className="grid grid-cols-6 gap-1 bg-neutral-100 p-1 rounded-xl">
          {[
            { label: 'Any', value: 'any' },
            { label: 'Studio', value: 0 },
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4+', value: 4 }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => onFilterChange({ ...filters, bedrooms: item.value as any })}
              className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filters.bedrooms === item.value
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-neutral-700 hover:text-neutral-900 hover:bg-white/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Property Type Pills */}
      <div>
        <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-neutral-500" />
          Apartment Type
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onFilterChange({ ...filters, propertyType: 'all' })}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filters.propertyType === 'all'
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            All Types
          </button>
          {PROPERTY_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => onFilterChange({ ...filters, propertyType: type })}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                filters.propertyType === type
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Furnished Status */}
      <div>
        <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Armchair className="w-3.5 h-3.5 text-neutral-500" />
          Furnishing
        </label>
        <div className="grid grid-cols-4 gap-1 bg-neutral-100 p-1 rounded-xl">
          <button
            onClick={() => onFilterChange({ ...filters, furnished: 'all' })}
            className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filters.furnished === 'all'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-neutral-700 hover:bg-white/60'
            }`}
          >
            All
          </button>
          {FURNISHED_OPTIONS.map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange({ ...filters, furnished: f })}
              className={`py-1.5 rounded-lg text-[11px] font-semibold transition-all truncate px-1 ${
                filters.furnished === f
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-neutral-700 hover:bg-white/60'
              }`}
            >
              {f.replace('-Furnished', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Water Availability */}
      <div>
        <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Droplet className="w-3.5 h-3.5 text-blue-500" />
          Water Supply Type
        </label>
        <select
          value={filters.waterAvailability}
          onChange={(e) => onFilterChange({ ...filters, waterAvailability: e.target.value as any })}
          className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
        >
          <option value="all">Any Water Availability</option>
          {WATER_TYPES.map((w) => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>
      </div>

      {/* Checkboxes: Pets & Parking */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        {/* Pets Allowed Toggle */}
        <label
          onClick={() => onFilterChange({ ...filters, petsAllowed: filters.petsAllowed === true ? null : true })}
          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 ${
            filters.petsAllowed === true
              ? 'bg-amber-50 border-amber-300 text-amber-900 font-semibold'
              : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
          }`}
        >
          <div className={`w-4 h-4 rounded flex items-center justify-center ${
            filters.petsAllowed === true ? 'bg-amber-600 text-white' : 'border border-neutral-300'
          }`}>
            {filters.petsAllowed === true && <Check className="w-3 h-3" />}
          </div>
          <div className="text-xs flex items-center gap-1.5">
            <PawPrint className="w-3.5 h-3.5 text-amber-600" />
            Pets Allowed
          </div>
        </label>

        {/* Parking Toggle */}
        <label
          onClick={() => onFilterChange({ ...filters, parking: filters.parking === true ? null : true })}
          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 ${
            filters.parking === true
              ? 'bg-slate-100 border-slate-300 text-slate-900 font-semibold'
              : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
          }`}
        >
          <div className={`w-4 h-4 rounded flex items-center justify-center ${
            filters.parking === true ? 'bg-slate-800 text-white' : 'border border-neutral-300'
          }`}>
            {filters.parking === true && <Check className="w-3 h-3" />}
          </div>
          <div className="text-xs flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 text-slate-700" />
            Parking
          </div>
        </label>
      </div>

      {/* Security Features Checkboxes */}
      <div>
        <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
          Security Features
        </label>
        <div className="space-y-1.5">
          {SECURITY_OPTIONS.map((sec) => {
            const isSelected = filters.securityFeatures.includes(sec);
            return (
              <label
                key={sec}
                onClick={() => handleSecurityToggle(sec)}
                className={`p-2 rounded-xl text-xs font-medium flex items-center justify-between cursor-pointer border transition-all ${
                  isSelected
                    ? 'bg-purple-50 border-purple-200 text-purple-900 font-semibold'
                    : 'border-transparent hover:bg-neutral-100 text-neutral-700'
                }`}
              >
                <span>{sec}</span>
                <div className={`w-4 h-4 rounded flex items-center justify-center ${
                  isSelected ? 'bg-purple-600 text-white' : 'border border-neutral-300'
                }`}>
                  {isSelected && <Check className="w-3 h-3" />}
                </div>
              </label>
            );
          })}
        </div>
      </div>

    </div>
  );
};
