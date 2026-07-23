import React, { useState } from 'react';
import { Property, ViewingBooking, ContactInquiry, LandlordVerification, Landlord } from '../types';
import { 
  PlusCircle, 
  Eye, 
  Users, 
  CalendarCheck, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Trash2, 
  Building2, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ExternalLink, 
  Check, 
  Clock, 
  Tag, 
  TrendingUp, 
  Sparkles,
  ArrowRight,
  Filter,
  Search,
  CheckCheck,
  ShieldCheck,
  Award,
  Smartphone,
  FileText,
  Camera,
  AlertCircle,
  LogOut,
  UserCheck
} from 'lucide-react';

interface LandlordDashboardProps {
  properties: Property[];
  viewingBookings: ViewingBooking[];
  inquiries: ContactInquiry[];
  verification?: LandlordVerification;
  onOpenVerificationModal: () => void;
  onOpenUploadModal: () => void;
  onEditProperty: (property: Property) => void;
  onDeleteProperty: (propertyId: string) => void;
  onUpdatePropertyStatus: (propertyId: string, status: 'Available' | 'Pending' | 'Rented') => void;
  onUpdateBookingStatus: (bookingId: string, status: 'Confirmed' | 'Pending' | 'Cancelled') => void;
  onUpdateInquiryStatus: (inquiryId: string, status: 'New' | 'Contacted' | 'Shortlisted' | 'Archived') => void;
  onSelectPropertyForDetails: (property: Property) => void;
  currentLandlord?: Landlord | null;
  onSignOutLandlord?: () => void;
}

export const LandlordDashboard: React.FC<LandlordDashboardProps> = ({
  properties,
  viewingBookings,
  inquiries,
  verification,
  onOpenVerificationModal,
  onOpenUploadModal,
  onEditProperty,
  onDeleteProperty,
  onUpdatePropertyStatus,
  onUpdateBookingStatus,
  onUpdateInquiryStatus,
  onSelectPropertyForDetails,
  currentLandlord,
  onSignOutLandlord
}) => {
  const [activeTab, setActiveTab] = useState<'listings' | 'inquiries' | 'viewings'>('listings');
  const [propertyFilter, setPropertyFilter] = useState<'all' | 'Available' | 'Pending' | 'Rented'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Compute stats
  const totalProperties = properties.length;
  const availableCount = properties.filter((p) => (p.status || 'Available') === 'Available').length;
  const rentedCount = properties.filter((p) => p.status === 'Rented').length;
  const pendingCount = properties.filter((p) => p.status === 'Pending').length;
  
  // Simulated total views/visitors
  const totalVisitors = properties.reduce((acc, p) => acc + (p.viewsCount || 120), 0);
  const totalInquiries = inquiries.length;
  const totalPendingBookings = viewingBookings.filter((b) => b.status === 'Pending').length;

  // Filter properties
  const filteredProperties = properties.filter((p) => {
    const matchesStatus = propertyFilter === 'all' || (p.status || 'Available') === propertyFilter;
    const matchesSearch = searchQuery === '' || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.area.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-100/60 pb-20 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Landlord Control Center
              </span>
              {currentLandlord && (
                <span className="bg-white/10 text-white border border-white/20 px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" /> {currentLandlord.name}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {currentLandlord ? `Welcome, ${currentLandlord.name.split(' ')[0]}!` : 'Property Management Dashboard'}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mt-1 font-medium">
              Manage your long-term rental listings in Ghana, review tenant inquiries, confirm viewing appointments, and track property views without agent fees.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            {onSignOutLandlord && (
              <button
                type="button"
                onClick={onSignOutLandlord}
                className="bg-white/10 hover:bg-white/20 text-neutral-200 border border-white/20 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-rose-400" />
                <span>Sign Out Account</span>
              </button>
            )}

            <button
              id="dashboard-upload-btn"
              onClick={onOpenUploadModal}
              className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Upload New Property</span>
            </button>
          </div>
        </div>
      </div>

      {/* Verification Status Banner */}
      {verification?.status === 'Verified' ? (
        <div className="bg-emerald-950 text-white rounded-3xl p-5 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-500/40">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-white">Verified Landlord Status Active</span>
                <span className="bg-emerald-500 text-neutral-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase">
                  100% Authenticated
                </span>
              </div>
              <p className="text-xs text-emerald-200 mt-0.5 font-medium">
                🪪 {verification.idType || 'Ghana Card'}: {verification.idNumber || 'GHA-712345678-9'} • 📱 Phone SMS Verified • 📷 Biometric Selfie Liveness Verified
              </p>
            </div>
          </div>

          <button
            onClick={onOpenVerificationModal}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shrink-0 transition-all cursor-pointer"
          >
            <Award className="w-4 h-4 text-emerald-400" />
            <span>View Verified Certificate</span>
          </button>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-emerald-50/80 via-amber-50/80 to-blue-50/80 bg-white rounded-3xl p-5 border-2 border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs relative overflow-hidden">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-extrabold text-neutral-900">
                  Landlord Verification System — Stand Out & Build Tenant Trust
                </h3>
                <span className="bg-amber-500 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Recommended
                </span>
              </div>
              <p className="text-xs text-neutral-600 max-w-2xl font-medium">
                Get the official <strong>Verified Landlord Badge</strong> on all your rental properties by completing our 3-step verification process:
              </p>
              
              <div className="flex items-center gap-3 pt-1.5 flex-wrap text-[11px] font-bold text-neutral-700">
                <span className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-neutral-200 shadow-2xs">
                  <FileText className="w-3.5 h-3.5 text-blue-600" /> 1. National ID (Ghana Card / Passport)
                </span>
                <span className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-neutral-200 shadow-2xs">
                  <Camera className="w-3.5 h-3.5 text-purple-600" /> 2. Biometric Selfie & Liveness
                </span>
                <span className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-neutral-200 shadow-2xs">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-600" /> 3. Phone SMS Verification
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenVerificationModal}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-2xl text-xs font-extrabold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 shrink-0 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verify ID & Get Verified Badge</span>
          </button>
        </div>
      )}

      {/* Analytics KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Total Views / Visitors */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-neutral-900 font-mono">{totalVisitors.toLocaleString()}</div>
            <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
              <span>Total Visitors</span>
              <span className="text-emerald-600 font-mono text-[10px] font-bold">+14%</span>
            </div>
          </div>
        </div>

        {/* Interested Tenants / Inquiries */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-neutral-900 font-mono">{totalInquiries}</div>
            <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Interested Tenants</div>
          </div>
        </div>

        {/* Pending Viewing Requests */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-neutral-900 font-mono">{totalPendingBookings}</div>
            <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Viewing Requests</div>
          </div>
        </div>

        {/* Total Properties Breakdown */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-neutral-900 font-mono">{totalProperties}</div>
            <div className="text-xs font-medium text-neutral-500">
              <span className="text-emerald-600 font-bold">{availableCount} Avail</span> • <span className="text-purple-600 font-bold">{rentedCount} Rented</span>
            </div>
          </div>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl p-1.5 border border-neutral-200 shadow-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
          
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
              activeTab === 'listings'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>My Properties ({totalProperties})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all relative ${
              activeTab === 'inquiries'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Interested Tenants</span>
            {inquiries.length > 0 && (
              <span className="bg-emerald-500 text-white text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full">
                {inquiries.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('viewings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all relative ${
              activeTab === 'viewings'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Viewing Requests</span>
            {totalPendingBookings > 0 && (
              <span className="bg-amber-500 text-white text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full">
                {totalPendingBookings}
              </span>
            )}
          </button>

        </div>

        {activeTab === 'listings' && (
          <div className="flex items-center gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-neutral-100">
            <div className="relative flex-1 sm:w-48">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search listings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-neutral-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <select
              value={propertyFilter}
              onChange={(e) => setPropertyFilter(e.target.value as any)}
              className="bg-neutral-100 border-none rounded-xl px-3 py-1.5 text-xs font-bold text-neutral-800 focus:outline-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="Available">Available Only</option>
              <option value="Pending">Pending Only</option>
              <option value="Rented">Rented Only</option>
            </select>
          </div>
        )}
      </div>

      {/* TAB 1: PROPERTIES MANAGEMENT */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          
          {filteredProperties.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200/80 space-y-3">
              <Building2 className="w-12 h-12 text-neutral-300 mx-auto" />
              <h3 className="text-lg font-bold text-neutral-800">No properties found</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                No properties match your filter. Upload a new listing or clear your search query.
              </p>
              <button
                onClick={onOpenUploadModal}
                className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" /> Upload Property
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredProperties.map((prop) => {
                const currentStatus = prop.status || 'Available';
                const propInquiries = inquiries.filter((i) => i.propertyId === prop.id);
                const propBookings = viewingBookings.filter((b) => b.propertyId === prop.id);

                return (
                  <div
                    key={prop.id}
                    className="bg-white rounded-3xl p-4 sm:p-5 border border-neutral-200/80 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative group"
                  >
                    
                    {/* Left Info Column */}
                    <div className="flex flex-col sm:flex-row items-start gap-4 min-w-0 flex-1">
                      
                      {/* Property Cover Image */}
                      <div className="relative w-full sm:w-40 h-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 bg-neutral-100">
                        <img
                          src={prop.photos[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80'}
                          alt={prop.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Status Badge */}
                        <div className="absolute top-2 left-2">
                          {currentStatus === 'Available' && (
                            <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span> Available
                            </span>
                          )}
                          {currentStatus === 'Pending' && (
                            <span className="bg-amber-500/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                              🟡 Pending
                            </span>
                          )}
                          {currentStatus === 'Rented' && (
                            <span className="bg-purple-700/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                              🔴 Rented
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Property Specs & Title */}
                      <div className="space-y-1.5 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="font-extrabold text-emerald-800 font-mono text-base sm:text-lg">
                            GH₵ {prop.rentPrice.toLocaleString()} <span className="text-xs text-neutral-500 font-sans font-normal">/mo</span>
                          </span>
                          <span className="text-neutral-300">•</span>
                          <span className="bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-md text-[11px] font-bold">
                            {prop.propertyType}
                          </span>
                          <span className="bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-md text-[11px] font-bold">
                            {prop.bedrooms === 0 ? 'Studio' : `${prop.bedrooms} Bed`}
                          </span>
                        </div>

                        <h3 
                          onClick={() => onSelectPropertyForDetails(prop)}
                          className="text-sm sm:text-base font-extrabold text-neutral-900 hover:text-emerald-600 transition-colors cursor-pointer line-clamp-1"
                        >
                          {prop.title}
                        </h3>

                        <p className="text-xs text-neutral-500 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{prop.address}, {prop.area}, {prop.city}</span>
                        </p>

                        {/* Property Metrics: Visitors & Inquiries */}
                        <div className="pt-1 flex flex-wrap items-center gap-3 text-xs">
                          <div className="flex items-center gap-1 bg-blue-50 text-blue-800 px-2.5 py-1 rounded-lg font-semibold text-[11px]">
                            <Eye className="w-3.5 h-3.5 text-blue-600" />
                            <span><strong>{prop.viewsCount || 142}</strong> Visitors</span>
                          </div>

                          <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg font-semibold text-[11px]">
                            <Users className="w-3.5 h-3.5 text-emerald-600" />
                            <span><strong>{propInquiries.length}</strong> Inquiries</span>
                          </div>

                          <div className="flex items-center gap-1 bg-purple-50 text-purple-800 px-2.5 py-1 rounded-lg font-semibold text-[11px]">
                            <CalendarCheck className="w-3.5 h-3.5 text-purple-600" />
                            <span><strong>{propBookings.length}</strong> Viewings</span>
                          </div>
                        </div>

                      </div>

                    </div>

                    {/* Right Controls: Mark Rented, Edit, Delete */}
                    <div className="flex flex-wrap md:flex-col items-center md:items-end justify-between md:justify-center gap-2.5 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-neutral-100">
                      
                      {/* Mark Property as Rented Toggle */}
                      <div className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-xl">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase px-1.5 hidden sm:inline">Status:</span>
                        
                        <button
                          onClick={() => onUpdatePropertyStatus(prop.id, 'Available')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                            currentStatus === 'Available'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'text-neutral-600 hover:text-neutral-900'
                          }`}
                          title="Mark as Available"
                        >
                          Available
                        </button>

                        <button
                          onClick={() => onUpdatePropertyStatus(prop.id, 'Rented')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                            currentStatus === 'Rented'
                              ? 'bg-purple-600 text-white shadow-xs'
                              : 'text-neutral-600 hover:text-neutral-900'
                          }`}
                          title="Mark as Rented"
                        >
                          Rented
                        </button>
                      </div>

                      {/* Edit & Remove Action Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onEditProperty(prop)}
                          className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Edit</span>
                        </button>

                        {deleteConfirmId === prop.id ? (
                          <div className="flex items-center gap-1 bg-rose-50 p-1 rounded-xl border border-rose-200">
                            <span className="text-[10px] font-bold text-rose-700 px-1">Delete?</span>
                            <button
                              onClick={() => {
                                onDeleteProperty(prop.id);
                                setDeleteConfirmId(null);
                              }}
                              className="bg-rose-600 text-white px-2 py-0.5 rounded-lg text-[10px] font-extrabold"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded-lg text-[10px] font-extrabold"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(prop.id)}
                            className="p-2 rounded-xl text-neutral-400 hover:text-rose-600 hover:bg-rose-50 border border-neutral-200/80 transition-colors"
                            title="Remove Property"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* TAB 2: INTERESTED TENANTS INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-xs">
            <h2 className="text-lg font-extrabold text-neutral-900 mb-1 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" />
              <span>Interested Tenant Inquiries</span>
            </h2>
            <p className="text-xs text-neutral-500 mb-4">
              Tenants who submitted direct contact requests for your listed properties.
            </p>

            {inquiries.length === 0 ? (
              <div className="text-center py-10 text-neutral-400 space-y-2">
                <MessageSquare className="w-10 h-10 mx-auto text-neutral-300" />
                <p className="text-xs font-semibold">No tenant inquiries yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inquiries.map((inq) => {
                  const inquiryStatus = inq.status || 'New';
                  const whatsappMsg = encodeURIComponent(`Hello ${inq.tenantName}, I received your inquiry for "${inq.propertyTitle}". When would you like to view it?`);
                  const whatsappUrl = `https://wa.me/${inq.tenantPhone.replace(/[^0-9]/g, '')}?text=${whatsappMsg}`;

                  return (
                    <div
                      key={inq.id}
                      className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 hover:bg-white hover:shadow-md transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Property</span>
                          <h4 className="text-xs font-extrabold text-neutral-900 line-clamp-1">{inq.propertyTitle}</h4>
                        </div>
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                          inquiryStatus === 'New' ? 'bg-emerald-100 text-emerald-800' :
                          inquiryStatus === 'Shortlisted' ? 'bg-purple-100 text-purple-800' :
                          inquiryStatus === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                          'bg-neutral-200 text-neutral-600'
                        }`}>
                          {inquiryStatus}
                        </span>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-neutral-200/80 space-y-1">
                        <div className="text-xs font-extrabold text-neutral-900">{inq.tenantName}</div>
                        <div className="text-[11px] text-neutral-500 flex flex-wrap gap-x-3 gap-y-1 font-mono">
                          <span>📞 {inq.tenantPhone}</span>
                          <span>✉️ {inq.tenantEmail}</span>
                        </div>
                        <div className="text-[11px] text-emerald-700 font-semibold pt-1">
                          Desired Move-in: {inq.moveInDate || 'Flexible'}
                        </div>
                      </div>

                      <p className="text-xs text-neutral-600 italic bg-white p-2.5 rounded-xl border border-neutral-100">
                        "{inq.message || 'Interested in renting this property. Please reach out.'}"
                      </p>

                      <div className="flex items-center justify-between gap-2 pt-1">
                        {/* Status Change Selector */}
                        <select
                          value={inquiryStatus}
                          onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as any)}
                          className="bg-white border border-neutral-200 text-[11px] font-bold text-neutral-700 rounded-lg px-2 py-1 focus:outline-none"
                        >
                          <option value="New">Status: New</option>
                          <option value="Contacted">Status: Contacted</option>
                          <option value="Shortlisted">Status: Shortlisted</option>
                          <option value="Archived">Status: Archived</option>
                        </select>

                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold inline-flex items-center gap-1 shadow-xs"
                        >
                          <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Tenant
                        </a>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </div>
      )}

      {/* TAB 3: VIEWING REQUESTS */}
      {activeTab === 'viewings' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-xs">
            <h2 className="text-lg font-extrabold text-neutral-900 mb-1 flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-emerald-600" />
              <span>Viewing Appointments & Requests</span>
            </h2>
            <p className="text-xs text-neutral-500 mb-4">
              Review and confirm property viewing schedules from potential tenants.
            </p>

            {viewingBookings.length === 0 ? (
              <div className="text-center py-10 text-neutral-400 space-y-2">
                <CalendarCheck className="w-10 h-10 mx-auto text-neutral-300" />
                <p className="text-xs font-semibold">No viewing requests scheduled yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {viewingBookings.map((b) => {
                  const whatsappReminder = encodeURIComponent(`Hello ${b.tenantName}, confirming your property viewing appointment for "${b.propertyTitle}" on ${b.date} at ${b.timeSlot}. See you then!`);
                  const whatsappUrl = `https://wa.me/${b.tenantPhone.replace(/[^0-9]/g, '')}?text=${whatsappReminder}`;

                  return (
                    <div
                      key={b.id}
                      className="p-4 sm:p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                            b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                            b.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                            'bg-rose-100 text-rose-800'
                          }`}>
                            {b.status}
                          </span>
                          <span className="text-xs font-mono font-bold text-neutral-500">
                            {b.viewingType}
                          </span>
                        </div>

                        <h4 className="text-sm font-extrabold text-neutral-900 line-clamp-1">{b.propertyTitle}</h4>
                        
                        <div className="text-xs text-neutral-600 flex flex-wrap items-center gap-x-4 gap-y-1 font-medium">
                          <span>👤 <strong>{b.tenantName}</strong> ({b.tenantPhone})</span>
                          <span>📅 <strong>{b.date}</strong> @ <strong>{b.timeSlot}</strong></span>
                        </div>

                        {b.notes && (
                          <p className="text-xs text-neutral-500 italic bg-white p-2 rounded-lg border border-neutral-200/80">
                            Note: "{b.notes}"
                          </p>
                        )}
                      </div>

                      {/* Landlord Action Buttons: Accept / Decline / Reminder */}
                      <div className="flex items-center gap-2 shrink-0">
                        {b.status !== 'Confirmed' && (
                          <button
                            onClick={() => onUpdateBookingStatus(b.id, 'Confirmed')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1 shadow-xs"
                          >
                            <CheckCircle2 className="w-4 h-4" /> Accept Viewing
                          </button>
                        )}

                        {b.status !== 'Cancelled' && (
                          <button
                            onClick={() => onUpdateBookingStatus(b.id, 'Cancelled')}
                            className="bg-white hover:bg-rose-50 text-rose-600 border border-neutral-200 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                          >
                            <XCircle className="w-4 h-4" /> Decline
                          </button>
                        )}

                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                          title="Send WhatsApp Confirmation"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
