export type PropertyType = 
  | 'Apartment' 
  | 'House' 
  | 'Chamber & Hall'
  | 'Studio' 
  | 'Penthouse' 
  | 'Duplex' 
  | 'Villa' 
  | 'Townhouse';

export type FurnishedStatus = 'Furnished' | 'Semi-Furnished' | 'Unfurnished';

export type WaterAvailability = 
  | '24/7 Water Supply' 
  | 'Borehole Backup' 
  | 'Municipal Water' 
  | 'Water Tank Storage';

export type SecurityFeature = 
  | '24/7 Security Guard' 
  | 'Gated Community' 
  | 'CCTV Surveillance' 
  | 'Electric Fencing' 
  | 'Intercom System' 
  | 'Biometric Access';

export interface Landlord {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  avatarUrl: string;
  responseRate: string;
  responseTime: string;
  isVerified: boolean;
  memberSince: string;
  propertiesListedCount?: number;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  city: string;
  area: string;
  address: string;
  lat: number;
  lng: number;
  rentPrice: number; // monthly
  depositPrice: number;
  bedrooms: number; // 0 for studio
  bathrooms: number;
  sqft: number;
  propertyType: PropertyType;
  furnished: FurnishedStatus;
  petsAllowed: boolean;
  parking: boolean;
  parkingDetails?: string;
  waterAvailability: WaterAvailability;
  securityFeatures: SecurityFeature[];
  amenities: string[];
  photos: string[];
  videoUrl?: string;
  virtualTour360Url?: string;
  virtualTourRooms?: { name: string; imageUrl: string }[];
  availableDate: string;
  landlord: Landlord;
  isFeatured?: boolean;
  status?: 'Available' | 'Pending' | 'Rented';
  viewsCount?: number;
  createdAt: string;
}

export interface FilterState {
  searchKeyword: string;
  city: string;
  area: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number | 'any';
  propertyType: PropertyType | 'all';
  furnished: FurnishedStatus | 'all';
  petsAllowed: boolean | null;
  parking: boolean | null;
  waterAvailability: WaterAvailability | 'all';
  securityFeatures: SecurityFeature[];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'date-newest';
}

export interface ViewingBooking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyCity: string;
  propertyAddress: string;
  landlordName: string;
  landlordPhone: string;
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  date: string;
  timeSlot: string;
  viewingType: 'In-Person' | 'Live Video Tour';
  notes?: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  createdAt: string;
}

export interface ContactInquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  landlordName: string;
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  message: string;
  moveInDate: string;
  status?: 'New' | 'Contacted' | 'Shortlisted' | 'Archived';
  createdAt: string;
}
