import React from 'react';
import { Home, Heart, CalendarCheck, PlusCircle, Scale, MapPin, Building2, LayoutGrid } from 'lucide-react';

interface HeaderProps {
  savedCount: number;
  bookingsCount: number;
  compareCount: number;
  onOpenSaved: () => void;
  onOpenBookings: () => void;
  onOpenCompare: () => void;
  onOpenListProperty: () => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  cities: string[];
  activeView: 'browse' | 'landlord';
  onNavigateView: (view: 'browse' | 'landlord') => void;
}

export const Header: React.FC<HeaderProps> = ({
  savedCount,
  bookingsCount,
  compareCount,
  onOpenSaved,
  onOpenBookings,
  onOpenCompare,
  onOpenListProperty,
  selectedCity,
  onSelectCity,
  cities,
  activeView,
  onNavigateView
}) => {
  return (
    <header id="main-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Mode Toggle */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            onClick={() => onNavigateView('browse')} 
            className="flex items-center gap-2.5 group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-neutral-900 flex items-center gap-1">
                RentDirect <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              </span>
              <p className="text-[10px] font-medium text-neutral-500 tracking-wide uppercase">
                Direct Landlord • Zero Agent Fees
              </p>
            </div>
          </button>

          {/* View Mode Switcher Pills (Browse Rentals vs Landlord Portal) */}
          <div className="hidden sm:flex items-center bg-neutral-100 p-1 rounded-2xl border border-neutral-200 text-xs font-bold">
            <button
              onClick={() => onNavigateView('browse')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeView === 'browse'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-emerald-600" />
              <span>Browse</span>
            </button>
            <button
              id="landlord-portal-nav-btn"
              onClick={() => onNavigateView('landlord')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeView === 'landlord'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Landlord Dashboard</span>
            </button>
          </div>

          {/* Quick City Dropdown Selector (Only in browse mode) */}
          {activeView === 'browse' && (
            <div className="hidden lg:flex items-center gap-1.5 bg-neutral-100/80 px-3 py-1.5 rounded-xl border border-neutral-200 text-xs font-medium text-neutral-700">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <select
                value={selectedCity}
                onChange={(e) => onSelectCity(e.target.value)}
                className="bg-transparent border-none font-semibold text-neutral-900 focus:outline-none cursor-pointer pr-1"
              >
                <option value="all">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Mobile Landlord Dashboard Toggle */}
          <button
            onClick={() => onNavigateView(activeView === 'browse' ? 'landlord' : 'browse')}
            className="sm:hidden p-2 rounded-xl bg-neutral-900 text-white text-xs font-bold flex items-center gap-1"
          >
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>{activeView === 'browse' ? 'Landlord' : 'Browse'}</span>
          </button>

          {activeView === 'browse' && (
            <>
              {/* Compare Button */}
              {compareCount > 0 && (
                <button
                  id="compare-header-btn"
                  onClick={onOpenCompare}
                  className="relative p-2 sm:px-3 sm:py-2 rounded-xl text-neutral-700 hover:text-emerald-700 hover:bg-emerald-50/80 border border-neutral-200/80 transition-all text-xs font-medium flex items-center gap-1.5"
                >
                  <Scale className="w-4 h-4 text-emerald-600" />
                  <span className="hidden sm:inline">Compare</span>
                  <span className="bg-emerald-600 text-white px-1.5 py-0.2 rounded-full text-[10px] font-bold">
                    {compareCount}
                  </span>
                </button>
              )}

              {/* Bookings / Scheduled Viewings Button */}
              <button
                id="bookings-header-btn"
                onClick={onOpenBookings}
                className="relative p-2 sm:px-3 sm:py-2 rounded-xl text-neutral-700 hover:text-emerald-700 hover:bg-emerald-50/80 border border-neutral-200/80 transition-all text-xs font-medium flex items-center gap-1.5"
              >
                <CalendarCheck className="w-4 h-4 text-emerald-600" />
                <span className="hidden md:inline">My Viewings</span>
                {bookingsCount > 0 && (
                  <span className="bg-emerald-600 text-white px-1.5 py-0.2 rounded-full text-[10px] font-bold">
                    {bookingsCount}
                  </span>
                )}
              </button>

              {/* Favorites Button */}
              <button
                id="saved-header-btn"
                onClick={onOpenSaved}
                className="relative p-2 sm:px-3 sm:py-2 rounded-xl text-neutral-700 hover:text-rose-600 hover:bg-rose-50/80 border border-neutral-200/80 transition-all text-xs font-medium flex items-center gap-1.5"
              >
                <Heart className={`w-4 h-4 ${savedCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-neutral-500'}`} />
                <span className="hidden md:inline">Saved</span>
                {savedCount > 0 && (
                  <span className="bg-rose-500 text-white px-1.5 py-0.2 rounded-full text-[10px] font-bold">
                    {savedCount}
                  </span>
                )}
              </button>
            </>
          )}

          {/* List Property CTA Button */}
          <button
            id="list-property-header-btn"
            onClick={onOpenListProperty}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-sm shadow-emerald-600/30 flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden xs:inline">Upload Property</span>
          </button>

        </div>
      </div>
    </header>
  );
};
