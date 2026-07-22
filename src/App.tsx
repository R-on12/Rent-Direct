import React, { useState, useEffect, useMemo } from 'react';
import { Property, FilterState, ViewingBooking, ContactInquiry } from './types';
import { INITIAL_PROPERTIES } from './data/mockProperties';
import { Header } from './components/Header';
import { PropertyCard } from './components/PropertyCard';
import { PropertyFilters } from './components/PropertyFilters';
import { PropertyDetailsModal } from './components/PropertyDetailsModal';
import { ViewingBookingModal } from './components/ViewingBookingModal';
import { ListPropertyModal } from './components/ListPropertyModal';
import { EditPropertyModal } from './components/EditPropertyModal';
import { LandlordDashboard } from './components/LandlordDashboard';
import { BookingsDrawer } from './components/BookingsDrawer';
import { CompareModal } from './components/CompareModal';
import { MapView } from './components/MapView';

import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  Grid, 
  Map as MapIcon, 
  ShieldCheck, 
  Droplet, 
  Home, 
  Sparkles, 
  CheckCircle2, 
  Eye,
  Building2,
  Users
} from 'lucide-react';

const DEFAULT_FILTERS: FilterState = {
  searchKeyword: '',
  city: 'all',
  area: '',
  minPrice: 0,
  maxPrice: 30000,
  bedrooms: 'any',
  propertyType: 'all',
  furnished: 'all',
  petsAllowed: null,
  parking: null,
  waterAvailability: 'all',
  securityFeatures: [],
  sortBy: 'featured'
};

const INITIAL_INQUIRIES: ContactInquiry[] = [
  {
    id: 'inq-1',
    propertyId: 'prop-1',
    propertyTitle: 'Luxury 3BR Executive Villa with Standby Generator & Borehole',
    landlordName: 'Kwame Osei-Mensah',
    tenantName: 'Kofi Annan',
    tenantEmail: 'kofi.annan@example.com',
    tenantPhone: '+233 20 555 9988',
    message: 'Hello Mr. Kwame, I am very interested in this 3BR Executive Villa in East Legon. Does the rent price include security maintenance fees?',
    moveInDate: '2026-08-15',
    status: 'New',
    createdAt: new Date().toISOString()
  },
  {
    id: 'inq-2',
    propertyId: 'prop-9',
    propertyTitle: 'Executive Chamber & Hall Self-Contained in Spintex, Accra',
    landlordName: 'Kofi Badu',
    tenantName: 'Esi Mansa',
    tenantEmail: 'esi.mansa@gmail.com',
    tenantPhone: '+233 24 887 1100',
    message: 'Hi, I would like to schedule a viewing for this Chamber & Hall in Spintex this Saturday afternoon.',
    moveInDate: '2026-08-01',
    status: 'Shortlisted',
    createdAt: new Date().toISOString()
  },
  {
    id: 'inq-3',
    propertyId: 'prop-2',
    propertyTitle: 'Spacious 2BR Apartment in Ahodwo, Kumasi with Backup Generator',
    landlordName: 'Akua Asante-Boateng',
    tenantName: 'David Mensah',
    tenantEmail: 'david.m@yahoo.com',
    tenantPhone: '+233 55 432 1099',
    message: 'Good day, is the 2BR apartment in Ahodwo still available for immediate move in?',
    moveInDate: '2026-08-10',
    status: 'Contacted',
    createdAt: new Date().toISOString()
  }
];

export default function App() {
  // Navigation View: 'browse' | 'landlord'
  const [activeView, setActiveView] = useState<'browse' | 'landlord'>('browse');

  // Load properties state
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const stored = localStorage.getItem('rentdirect_custom_properties');
      if (stored) {
        const custom = JSON.parse(stored);
        return [...custom, ...INITIAL_PROPERTIES];
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PROPERTIES;
  });

  // Saved favorites
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('rentdirect_saved_properties');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Scheduled viewings
  const [bookings, setBookings] = useState<ViewingBooking[]>(() => {
    try {
      const stored = localStorage.getItem('rentdirect_viewing_bookings');
      return stored ? JSON.parse(stored) : [
        {
          id: 'booking-demo',
          propertyId: 'prop-1',
          propertyTitle: 'Luxury 3BR Executive Villa with Standby Generator & Borehole',
          propertyCity: 'Accra',
          propertyAddress: '14 Lagos Avenue, East Legon',
          landlordName: 'Kwame Osei-Mensah',
          landlordPhone: '+233 24 412 3890',
          tenantName: 'Kofi Annan',
          tenantEmail: 'kofi.annan@example.com',
          tenantPhone: '+233 20 555 9988',
          date: '2026-07-25',
          timeSlot: '11:00 AM',
          viewingType: 'In-Person',
          status: 'Confirmed',
          createdAt: new Date().toISOString()
        }
      ];
    } catch {
      return [];
    }
  });

  // Tenant Inquiries
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    try {
      const stored = localStorage.getItem('rentdirect_tenant_inquiries');
      return stored ? JSON.parse(stored) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  // Properties comparing
  const [comparePropertyIds, setComparePropertyIds] = useState<string[]>([]);

  // Filters State
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // Active View Mode: 'grid' | 'map' | 'saved'
  const [viewMode, setViewMode] = useState<'grid' | 'map' | 'saved'>('grid');

  // Modals & Drawers state
  const [selectedPropertyForDetails, setSelectedPropertyForDetails] = useState<Property | null>(null);
  const [selectedPropertyForViewing, setSelectedPropertyForViewing] = useState<Property | null>(null);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isListPropertyOpen, setIsListPropertyOpen] = useState(false);
  const [isBookingsDrawerOpen, setIsBookingsDrawerOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync saved favorites to localStorage
  useEffect(() => {
    localStorage.setItem('rentdirect_saved_properties', JSON.stringify(savedPropertyIds));
  }, [savedPropertyIds]);

  // Sync bookings to localStorage
  useEffect(() => {
    localStorage.setItem('rentdirect_viewing_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Sync inquiries to localStorage
  useEffect(() => {
    localStorage.setItem('rentdirect_tenant_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Unique list of cities from properties
  const availableCities = useMemo(() => {
    const set = new Set<string>();
    properties.forEach((p) => set.add(p.city));
    return Array.from(set);
  }, [properties]);

  // Filter properties logic
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Saved mode filter
      if (viewMode === 'saved' && !savedPropertyIds.includes(prop.id)) {
        return false;
      }

      // City filter
      if (filters.city !== 'all' && prop.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }

      // Keyword search (Title, Area, Address, Description)
      if (filters.searchKeyword.trim()) {
        const kw = filters.searchKeyword.toLowerCase();
        const matchesKw = 
          prop.title.toLowerCase().includes(kw) ||
          prop.area.toLowerCase().includes(kw) ||
          prop.address.toLowerCase().includes(kw) ||
          prop.description.toLowerCase().includes(kw) ||
          prop.city.toLowerCase().includes(kw);
        if (!matchesKw) return false;
      }

      // Max Price
      if (prop.rentPrice > filters.maxPrice) {
        return false;
      }

      // Bedrooms
      if (filters.bedrooms !== 'any') {
        if (filters.bedrooms === 4) {
          if (prop.bedrooms < 4) return false;
        } else {
          if (prop.bedrooms !== filters.bedrooms) return false;
        }
      }

      // Property Type
      if (filters.propertyType !== 'all' && prop.propertyType !== filters.propertyType) {
        return false;
      }

      // Furnished
      if (filters.furnished !== 'all' && prop.furnished !== filters.furnished) {
        return false;
      }

      // Pets Allowed
      if (filters.petsAllowed === true && !prop.petsAllowed) {
        return false;
      }

      // Parking
      if (filters.parking === true && !prop.parking) {
        return false;
      }

      // Water Availability
      if (filters.waterAvailability !== 'all' && prop.waterAvailability !== filters.waterAvailability) {
        return false;
      }

      // Security Features (Must include all selected)
      if (filters.securityFeatures.length > 0) {
        const hasAllSec = filters.securityFeatures.every((sec) =>
          prop.securityFeatures.includes(sec)
        );
        if (!hasAllSec) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.rentPrice - b.rentPrice;
      if (filters.sortBy === 'price-desc') return b.rentPrice - a.rentPrice;
      if (filters.sortBy === 'date-newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      // Default 'featured'
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [properties, filters, viewMode, savedPropertyIds]);

  // Toggle Save Favorite
  const handleToggleSave = (propertyId: string) => {
    setSavedPropertyIds((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  // Toggle Compare
  const handleToggleCompare = (propertyId: string) => {
    setComparePropertyIds((prev) => {
      if (prev.includes(propertyId)) {
        return prev.filter((id) => id !== propertyId);
      }
      if (prev.length >= 3) {
        alert('You can compare up to 3 properties at a time.');
        return prev;
      }
      return [...prev, propertyId];
    });
  };

  // Add new property by landlord
  const handleAddProperty = (newProp: Property) => {
    const updated = [newProp, ...properties];
    setProperties(updated);
    
    // Save custom ones to localStorage
    const customList = updated.filter((p) => p.id.startsWith('prop-landlord-'));
    localStorage.setItem('rentdirect_custom_properties', JSON.stringify(customList));
  };

  // Edit existing property
  const handleSavePropertyEdit = (updatedProp: Property) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === updatedProp.id ? updatedProp : p))
    );
  };

  // Delete property
  const handleDeleteProperty = (propertyId: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== propertyId));
  };

  // Update property availability status (Available, Pending, Rented)
  const handleUpdatePropertyStatus = (propertyId: string, status: 'Available' | 'Pending' | 'Rented') => {
    setProperties((prev) =>
      prev.map((p) => (p.id === propertyId ? { ...p, status } : p))
    );
  };

  // Update viewing booking status
  const handleUpdateBookingStatus = (bookingId: string, status: 'Confirmed' | 'Pending' | 'Cancelled') => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
  };

  // Update tenant inquiry status
  const handleUpdateInquiryStatus = (inquiryId: string, status: 'New' | 'Contacted' | 'Shortlisted' | 'Archived') => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === inquiryId ? { ...i, status } : i))
    );
  };

  // Add booking
  const handleConfirmBooking = (newBooking: ViewingBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  // Cancel booking
  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  // Handle direct inquiry sent from property details modal
  const handleSendInquiry = (propId: string, messageText: string) => {
    const prop = properties.find((p) => p.id === propId);
    if (!prop) return;

    const newInquiry: ContactInquiry = {
      id: `inq-${Date.now()}`,
      propertyId: prop.id,
      propertyTitle: prop.title,
      landlordName: prop.landlord.name,
      tenantName: 'Interested Tenant',
      tenantEmail: 'tenant@rentdirect.gh',
      tenantPhone: '+233 24 000 1122',
      message: messageText || 'I am interested in renting this property. Please contact me.',
      moveInDate: prop.availableDate,
      status: 'New',
      createdAt: new Date().toISOString()
    };

    setInquiries((prev) => [newInquiry, ...prev]);
  };

  return (
    <div className="min-h-screen bg-neutral-50/60 font-sans text-neutral-900 flex flex-col">
      
      {/* Header Bar */}
      <Header
        savedCount={savedPropertyIds.length}
        bookingsCount={bookings.length}
        compareCount={comparePropertyIds.length}
        onOpenSaved={() => {
          setActiveView('browse');
          setViewMode('saved');
        }}
        onOpenBookings={() => setIsBookingsDrawerOpen(true)}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onOpenListProperty={() => setIsListPropertyOpen(true)}
        selectedCity={filters.city}
        onSelectCity={(c) => setFilters({ ...filters, city: c })}
        cities={availableCities}
        activeView={activeView}
        onNavigateView={(v) => setActiveView(v)}
      />

      {/* RENDER VIEW: Landlord Dashboard vs Marketplace Browse */}
      {activeView === 'landlord' ? (
        <LandlordDashboard
          properties={properties}
          viewingBookings={bookings}
          inquiries={inquiries}
          onOpenUploadModal={() => setIsListPropertyOpen(true)}
          onEditProperty={(prop) => setEditingProperty(prop)}
          onDeleteProperty={handleDeleteProperty}
          onUpdatePropertyStatus={handleUpdatePropertyStatus}
          onUpdateBookingStatus={handleUpdateBookingStatus}
          onUpdateInquiryStatus={handleUpdateInquiryStatus}
          onSelectPropertyForDetails={(prop) => setSelectedPropertyForDetails(prop)}
        />
      ) : (
        <>
          {/* Hero Banner with Quick Search Bar */}
          <div className="bg-gradient-to-b from-neutral-900 via-emerald-950 to-neutral-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-neutral-800 relative overflow-hidden">
            
            {/* Subtle Background Mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 text-center space-y-6">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Direct Landlord Long-Term Rentals • Zero Agency Markups
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
                Rent Directly from Verified Property Owners
              </h1>

              <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto font-normal">
                Browse long-term homes with verified 24/7 water supply, security infrastructure, 360° virtual tours, and direct landlord WhatsApp or viewing booking.
              </p>

              {/* Hero Quick Search Box */}
              <div className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 max-w-4xl mx-auto text-neutral-900 grid grid-cols-1 sm:grid-cols-4 gap-3 text-left">
                
                {/* Search Keyword */}
                <div className="p-2 sm:p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">City or Area</label>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <input
                      type="text"
                      placeholder="e.g. Accra, East Legon, Kumasi..."
                      value={filters.searchKeyword}
                      onChange={(e) => setFilters({ ...filters, searchKeyword: e.target.value })}
                      className="w-full bg-transparent text-xs font-bold text-neutral-900 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Bedrooms */}
                <div className="p-2 sm:p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Bedrooms</label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value === 'any' ? 'any' : Number(e.target.value) as any })}
                    className="w-full bg-transparent text-xs font-bold text-neutral-900 focus:outline-none cursor-pointer mt-1"
                  >
                    <option value="any">Any Bedrooms</option>
                    <option value={0}>Studio</option>
                    <option value={1}>1 Bedroom</option>
                    <option value={2}>2 Bedrooms</option>
                    <option value={3}>3 Bedrooms</option>
                    <option value={4}>4+ Bedrooms</option>
                  </select>
                </div>

                {/* Max Rent Price */}
                <div className="p-2 sm:p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                    Max Rent: <span className="text-emerald-700 font-mono">GH₵ {filters.maxPrice.toLocaleString()}/mo</span>
                  </label>
                  <input
                    type="range"
                    min={1000}
                    max={30000}
                    step={500}
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                    className="w-full accent-emerald-600 cursor-pointer mt-1"
                  />
                </div>

                {/* Search CTA */}
                <button
                  onClick={() => {
                    setViewMode('grid');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all p-3"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Rentals</span>
                </button>

              </div>

              {/* Direct Landlord Platform Trust Bar */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-300 font-medium">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Direct Landlord Contacts</span>
                <span className="flex items-center gap-1.5"><Droplet className="w-4 h-4 text-blue-400" /> Verified Water Infrastructure</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-purple-400" /> Gated & Security Guards</span>
                <span className="flex items-center gap-1.5"><Eye className="w-4 h-4 text-emerald-400" /> Interactive 360° Tours</span>
              </div>

            </div>
          </div>

          {/* Main App Container */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
            
            {/* Controls Bar: Search Stats, View Switcher & Sort */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-neutral-200/90 shadow-xs">
              
              {/* Active Mode / Results Count */}
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-extrabold text-neutral-900 flex items-center gap-2">
                  {viewMode === 'saved' ? 'Saved Favorite Properties' : 'Available Long-Term Rentals'}
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-0.5 rounded-full">
                    {filteredProperties.length}
                  </span>
                </h2>
              </div>

              {/* View Toggles & Mobile Filter Trigger */}
              <div className="flex items-center gap-2 overflow-x-auto">
                
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                  className="lg:hidden p-2.5 rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-100 text-xs font-bold flex items-center gap-1.5"
                >
                  <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                  <span>Filters</span>
                </button>

                {/* Grid vs Map View Switcher */}
                <div className="bg-neutral-100 p-1 rounded-xl flex items-center gap-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                      viewMode === 'grid'
                        ? 'bg-white text-neutral-900 shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    <Grid className="w-4 h-4 text-emerald-600" />
                    <span>Grid View</span>
                  </button>

                  <button
                    onClick={() => setViewMode('map')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                      viewMode === 'map'
                        ? 'bg-white text-neutral-900 shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    <MapIcon className="w-4 h-4 text-emerald-600" />
                    <span>Location Map</span>
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                  className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-800 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-asc">Sort: Rent Low → High</option>
                  <option value="price-desc">Sort: Rent High → Low</option>
                  <option value="date-newest">Sort: Newly Listed</option>
                </select>

              </div>
            </div>

            {/* Layout Grid: Left Filters Sidebar + Right Listings Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Desktop Filters Sidebar */}
              <div className={`lg:block ${isMobileFilterOpen ? 'block' : 'hidden'} lg:col-span-1`}>
                <PropertyFilters
                  filters={filters}
                  onFilterChange={setFilters}
                  onResetFilters={() => setFilters(DEFAULT_FILTERS)}
                  availableCities={availableCities}
                  totalResults={filteredProperties.length}
                />
              </div>

              {/* Right Main Feed Area */}
              <div className="lg:col-span-3 space-y-6">
                
                {viewMode === 'map' ? (
                  <MapView
                    properties={filteredProperties}
                    onSelectProperty={(p) => setSelectedPropertyForDetails(p)}
                    onOpenViewingModal={(p) => setSelectedPropertyForViewing(p)}
                  />
                ) : filteredProperties.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200/90 shadow-xs space-y-4">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <Home className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900">No properties found matching your search.</h3>
                    <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                      Try adjusting your price range, water availability options, or bedroom filters to find direct landlord rentals.
                    </p>
                    <button
                      onClick={() => {
                        setFilters(DEFAULT_FILTERS);
                        setViewMode('grid');
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all"
                    >
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProperties.map((prop) => (
                      <PropertyCard
                        key={prop.id}
                        property={prop}
                        isSaved={savedPropertyIds.includes(prop.id)}
                        onToggleSave={handleToggleSave}
                        isComparing={comparePropertyIds.includes(prop.id)}
                        onToggleCompare={handleToggleCompare}
                        onSelectProperty={(p) => setSelectedPropertyForDetails(p)}
                        onOpenViewingModal={(p) => setSelectedPropertyForViewing(p)}
                      />
                    ))}
                  </div>
                )}

              </div>

            </div>

          </main>
        </>
      )}

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-10 border-t border-neutral-800 mt-16 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-neutral-400">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">RentDirect</p>
              <p className="text-[11px]">Direct Landlord Long-Term Rental Marketplace</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => { setActiveView('browse'); setViewMode('grid'); }} className="hover:text-white">Find Rentals</button>
            <button onClick={() => setActiveView('landlord')} className="hover:text-white">Landlord Dashboard</button>
            <button onClick={() => setIsListPropertyOpen(true)} className="hover:text-white">List Your Property</button>
            <button onClick={() => setIsBookingsDrawerOpen(true)} className="hover:text-white">My Viewing Bookings</button>
          </div>

          <div className="text-right text-[11px] text-neutral-500">
            © {new Date().getFullYear()} RentDirect. Direct landlord connection without agent commissions.
          </div>

        </div>
      </footer>

      {/* MODALS & DRAWERS */}
      
      {/* Property Details Modal */}
      {selectedPropertyForDetails && (
        <PropertyDetailsModal
          property={selectedPropertyForDetails}
          onClose={() => setSelectedPropertyForDetails(null)}
          isSaved={savedPropertyIds.includes(selectedPropertyForDetails.id)}
          onToggleSave={handleToggleSave}
          onOpenViewingModal={(p) => {
            setSelectedPropertyForDetails(null);
            setSelectedPropertyForViewing(p);
          }}
          onSendInquiry={handleSendInquiry}
        />
      )}

      {/* Viewing Booking Modal */}
      {selectedPropertyForViewing && (
        <ViewingBookingModal
          property={selectedPropertyForViewing}
          onClose={() => setSelectedPropertyForViewing(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {/* List Property Landlord Studio Modal */}
      {isListPropertyOpen && (
        <ListPropertyModal
          onClose={() => setIsListPropertyOpen(false)}
          onAddProperty={handleAddProperty}
        />
      )}

      {/* Edit Property Modal */}
      {editingProperty && (
        <EditPropertyModal
          property={editingProperty}
          onClose={() => setEditingProperty(null)}
          onSaveProperty={(updated) => {
            handleSavePropertyEdit(updated);
            setEditingProperty(null);
          }}
        />
      )}

      {/* Bookings Drawer */}
      {isBookingsDrawerOpen && (
        <BookingsDrawer
          bookings={bookings}
          onClose={() => setIsBookingsDrawerOpen(false)}
          onCancelBooking={handleCancelBooking}
        />
      )}

      {/* Compare Modal */}
      {isCompareModalOpen && (
        <CompareModal
          properties={properties.filter((p) => comparePropertyIds.includes(p.id))}
          onClose={() => setIsCompareModalOpen(false)}
          onRemoveCompare={(id) => setComparePropertyIds((prev) => prev.filter((i) => i !== id))}
          onSelectProperty={(p) => setSelectedPropertyForDetails(p)}
        />
      )}

    </div>
  );
}

