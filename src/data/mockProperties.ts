import { Property } from '../types';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Luxury 3BR Executive Villa with Standby Generator & Borehole',
    description: 'Spacious 3-bedroom luxury villa in prime East Legon. Features full ensuite bedrooms, high-grade European kitchen fittings, continuous 24/7 borehole water filtration system with 10,000L poly tanks, and automatic standby generator for uninterrupted power. Direct landlord listing with no agent fees.',
    city: 'Accra',
    area: 'East Legon',
    address: '14 Lagos Avenue, East Legon',
    lat: 5.6350,
    lng: -0.1601,
    rentPrice: 12500,
    depositPrice: 12500,
    bedrooms: 3,
    bathrooms: 3.5,
    sqft: 2200,
    propertyType: 'Villa',
    furnished: 'Furnished',
    petsAllowed: true,
    parking: true,
    parkingDetails: 'Covered Carport for 3 Vehicles + Automated Gate',
    waterAvailability: '24/7 Water Supply',
    securityFeatures: [
      '24/7 Security Guard',
      'Gated Community',
      'CCTV Surveillance',
      'Electric Fencing',
      'Intercom System'
    ],
    amenities: [
      'Standby Generator',
      'High-Speed Fiber Internet',
      'Swimming Pool Access',
      'Air Conditioning in All Rooms',
      'Borehole & Filtration Unit',
      'Water Heaters',
      'Washing Machine'
    ],
    photos: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-41132-large.mp4',
    virtualTour360Url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80',
    virtualTourRooms: [
      { name: 'Main Reception & Lounge', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80' },
      { name: 'Master Ensuite Suite', imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=2000&q=80' },
      { name: 'Fitted Kitchen', imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=2000&q=80' }
    ],
    availableDate: '2026-08-01',
    landlord: {
      id: 'landlord-1',
      name: 'Kwame Osei-Mensah',
      phone: '+233 24 412 3890',
      whatsapp: '233244123890',
      email: 'kwame.osei@rentdirect.gh',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      responseRate: '99%',
      responseTime: 'Within 10 minutes',
      isVerified: true,
      memberSince: 'March 2022',
      propertiesListedCount: 3
    },
    isFeatured: true,
    createdAt: '2026-07-10'
  },
  {
    id: 'prop-2',
    title: 'Modern 2BR Apartment in Serene Ahodwo Residential Area',
    description: 'Charming 2-bedroom executive apartment located in Ahodwo, Kumasi. Quiet residential setting with paved compound, dedicated water storage tanks with pressure pump, prepaid ECG meter, and security post. No agent commissions involved.',
    city: 'Kumasi',
    area: 'Ahodwo',
    address: '22 Ahodwo Roundabout St, Kumasi',
    lat: 6.6666,
    lng: -1.6163,
    rentPrice: 3800,
    depositPrice: 3800,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    propertyType: 'Apartment',
    furnished: 'Semi-Furnished',
    petsAllowed: false,
    parking: true,
    parkingDetails: 'Assigned Parking Space in Secure Compound',
    waterAvailability: 'Borehole Backup',
    securityFeatures: [
      '24/7 Security Guard',
      'Gated Community',
      'CCTV Surveillance',
      'Electric Fencing'
    ],
    amenities: [
      'Poly Water Tank Backup',
      'Prepaid ECG Meter',
      'Air Conditioning',
      'POP Ceiling Design',
      'Balcony View'
    ],
    photos: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-41132-large.mp4',
    virtualTour360Url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2000&q=80',
    virtualTourRooms: [
      { name: 'Living Room', imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2000&q=80' },
      { name: 'Kitchenette', imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=2000&q=80' }
    ],
    availableDate: '2026-07-25',
    landlord: {
      id: 'landlord-2',
      name: 'Akua Asante-Boateng',
      phone: '+233 20 811 9022',
      whatsapp: '233208119022',
      email: 'akua.asante@gmail.com',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
      responseRate: '100%',
      responseTime: 'Under 15 minutes',
      isVerified: true,
      memberSince: 'January 2023',
      propertiesListedCount: 2
    },
    isFeatured: true,
    createdAt: '2026-07-15'
  },
  {
    id: 'prop-3',
    title: 'Gated 4BR Coastal House near Harbour & Beach Road',
    description: 'Specious 4-bedroom family residence in Takoradi’s prestigious Airport Ridge area. Close to Beach Road and harbour district. Fully walled with electric fence, borehole system, solar water heater, and 2-car garage. Rent directly from property owner.',
    city: 'Takoradi',
    area: 'Airport Ridge',
    address: '8 Coastline Drive, Airport Ridge',
    lat: 4.8981,
    lng: -1.7612,
    rentPrice: 6500,
    depositPrice: 6500,
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 2600,
    propertyType: 'House',
    furnished: 'Unfurnished',
    petsAllowed: true,
    parking: true,
    parkingDetails: 'Double Garage + Spacious Paved Courtyard',
    waterAvailability: '24/7 Water Supply',
    securityFeatures: [
      '24/7 Security Guard',
      'Gated Community',
      'Electric Fencing',
      'CCTV Surveillance'
    ],
    amenities: [
      'Solar Panel Backup',
      'Private Lawn & Garden',
      'Borehole & Poly Tank Storage',
      'Water Heaters',
      'Store Room & Security House'
    ],
    photos: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-41132-large.mp4',
    virtualTour360Url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80',
    virtualTourRooms: [
      { name: 'Exterior Courtyard', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80' },
      { name: 'Spacious Hall', imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80' }
    ],
    availableDate: '2026-08-10',
    landlord: {
      id: 'landlord-3',
      name: 'Kofi Mensah-Baidoo',
      phone: '+233 24 330 4511',
      whatsapp: '233243304511',
      email: 'kofi.mensah@takoradirealty.com',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
      responseRate: '96%',
      responseTime: 'Within 30 minutes',
      isVerified: true,
      memberSince: 'June 2021',
      propertiesListedCount: 1
    },
    isFeatured: false,
    createdAt: '2026-07-12'
  },
  {
    id: 'prop-4',
    title: 'Newly Built 3BR Detached House in Quiet New Ridge Neighborhood',
    description: 'Modern 3-bedroom detached house in Sunyani New Ridge. Features master bedroom ensuite, fully fitted kitchen cabinets, reliable Ghana Water connection plus high-capacity storage poly tanks, and security fence wall. Ideal for professionals and families.',
    city: 'Sunyani',
    area: 'New Ridge',
    address: '15 Cocoa House Link, New Ridge',
    lat: 7.3349,
    lng: -2.3262,
    rentPrice: 2800,
    depositPrice: 2800,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1500,
    propertyType: 'House',
    furnished: 'Unfurnished',
    petsAllowed: true,
    parking: true,
    parkingDetails: 'Private Paved Driveway for 2 Cars',
    waterAvailability: 'Water Tank Storage',
    securityFeatures: [
      'Gated Community',
      'Electric Fencing',
      'Intercom System'
    ],
    amenities: [
      'Ghana Water Connection',
      '5000L Overhead Poly Tank',
      'Ceiling Fans & AC Wiring',
      'Spacious Kitchen Store',
      'Security Post'
    ],
    photos: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-41132-large.mp4',
    virtualTour360Url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=2000&q=80',
    virtualTourRooms: [
      { name: 'Front Elevation', imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=2000&q=80' },
      { name: 'Main Sitting Area', imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2000&q=80' }
    ],
    availableDate: '2026-08-01',
    landlord: {
      id: 'landlord-4',
      name: 'Yaw Kyeremeh',
      phone: '+233 24 908 1277',
      whatsapp: '233249081277',
      email: 'yaw.kyeremeh@sunyanirentals.gh',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      responseRate: '98%',
      responseTime: 'Within 20 minutes',
      isVerified: true,
      memberSince: 'February 2023',
      propertiesListedCount: 1
    },
    isFeatured: true,
    createdAt: '2026-07-05'
  },
  {
    id: 'prop-5',
    title: 'Luxury 2BR Cantonments Residence with Swimming Pool',
    description: 'Premier 2-bedroom luxury apartment in Cantonments, Accra. Near diplomatic missions and international schools. Offers fully integrated Italian kitchen appliances, rooftop infinity pool, 24/7 power backup standby generator, and automated biometric access control.',
    city: 'Accra',
    area: 'Cantonments',
    address: '4 Rangoon Lane, Cantonments',
    lat: 5.5788,
    lng: -0.1771,
    rentPrice: 18500,
    depositPrice: 18500,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1400,
    propertyType: 'Apartment',
    furnished: 'Furnished',
    petsAllowed: false,
    parking: true,
    parkingDetails: 'Underground Secured Parking Slot with Elevator Access',
    waterAvailability: '24/7 Water Supply',
    securityFeatures: [
      '24/7 Security Guard',
      'Gated Community',
      'CCTV Surveillance',
      'Biometric Access',
      'Intercom System'
    ],
    amenities: [
      'Rooftop Swimming Pool',
      'Fitness Gym',
      'Standby Generator',
      'High Speed Internet',
      'Concierge Service',
      'Balcony'
    ],
    photos: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-41132-large.mp4',
    virtualTour360Url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80',
    virtualTourRooms: [
      { name: 'Rooftop Lounge', imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80' },
      { name: 'Interior Living Space', imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=80' }
    ],
    availableDate: '2026-08-15',
    landlord: {
      id: 'landlord-5',
      name: 'Dr. Efua Addison',
      phone: '+233 27 750 9901',
      whatsapp: '233277509901',
      email: 'efua.addison@cantonmentsluxury.com',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
      responseRate: '100%',
      responseTime: 'Under 10 minutes',
      isVerified: true,
      memberSince: 'May 2020',
      propertiesListedCount: 2
    },
    isFeatured: true,
    createdAt: '2026-07-18'
  },
  {
    id: 'prop-6',
    title: 'Spacious 3BR Townhouse in Community 25, Tema',
    description: 'Modern 3-bedroom gated townhouse located in Community 25, Tema. Features master bedroom ensuite, private balcony, water purification plant, 24-hour manned guard house, and children’s playground area. Rent directly from owner.',
    city: 'Tema',
    area: 'Community 25',
    address: 'Block 12 Devtraco Way, Community 25',
    lat: 5.6881,
    lng: -0.0152,
    rentPrice: 4200,
    depositPrice: 4200,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 1650,
    propertyType: 'Townhouse',
    furnished: 'Semi-Furnished',
    petsAllowed: true,
    parking: true,
    parkingDetails: 'Paved Parking for 2 Cars',
    waterAvailability: '24/7 Water Supply',
    securityFeatures: [
      '24/7 Security Guard',
      'Gated Community',
      'CCTV Surveillance',
      'Electric Fencing'
    ],
    amenities: [
      'Prepaid ECG Meter',
      'Water Tank Backup System',
      'Air Conditioning',
      'Estate Maintenance Service',
      'Playground'
    ],
    photos: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-41132-large.mp4',
    virtualTour360Url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2000&q=80',
    virtualTourRooms: [
      { name: 'Ground Floor Lounge', imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2000&q=80' },
      { name: 'Upper Master Suite', imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2000&q=80' }
    ],
    availableDate: '2026-07-30',
    landlord: {
      id: 'landlord-6',
      name: 'Emmanuel Quaye',
      phone: '+233 24 220 8834',
      whatsapp: '233242208834',
      email: 'emmanuel.quaye@temarentals.gh',
      avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80',
      responseRate: '95%',
      responseTime: 'Within 45 minutes',
      isVerified: true,
      memberSince: 'October 2022',
      propertiesListedCount: 1
    },
    isFeatured: false,
    createdAt: '2026-07-08'
  },
  {
    id: 'prop-7',
    title: '3BR Hillside Villa with Ocean Breezes in Cape Coast',
    description: 'Picturesque 3-bedroom villa perched on Ridge Hill overlooking Cape Coast town and the Atlantic coast. Generous garden, dedicated borehole water supply, wall fencing, and tranquil breezes. Direct lease with landlord.',
    city: 'Cape Coast',
    area: 'Ridge',
    address: '9 Fort William Heights, Ridge',
    lat: 5.1053,
    lng: -1.2466,
    rentPrice: 3200,
    depositPrice: 3200,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    propertyType: 'Villa',
    furnished: 'Semi-Furnished',
    petsAllowed: true,
    parking: true,
    parkingDetails: 'Shaded Carport + Driveway',
    waterAvailability: 'Borehole Backup',
    securityFeatures: [
      'Gated Community',
      'Electric Fencing',
      'Intercom System'
    ],
    amenities: [
      'Borehole & Filtration System',
      'Oceanview Veranda',
      'Water Heaters',
      'Spacious Lawn Garden',
      'Ceiling Fans'
    ],
    photos: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-41132-large.mp4',
    virtualTour360Url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80',
    virtualTourRooms: [
      { name: 'Veranda View', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80' }
    ],
    availableDate: '2026-08-05',
    landlord: {
      id: 'landlord-7',
      name: 'Nana Kobina Egyir',
      phone: '+233 24 661 0033',
      whatsapp: '233246610033',
      email: 'nana.egyir@capecoastproperties.com',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      responseRate: '97%',
      responseTime: 'Within 25 minutes',
      isVerified: true,
      memberSince: 'April 2021',
      propertiesListedCount: 1
    },
    isFeatured: false,
    createdAt: '2026-07-02'
  },
  {
    id: 'prop-8',
    title: 'Modern 3BR Gated Compound House in Kalpohin, Tamale',
    description: 'Neat 3-bedroom walled house in Kalpohin Estates, Tamale. Fitted with solar panel system for constant lighting, reliable borehole water tank, paved compound, and security wire fence. Direct from landlord.',
    city: 'Tamale',
    area: 'Kalpohin',
    address: '18 Kalpohin Estates Road, Tamale',
    lat: 9.4008,
    lng: -0.8393,
    rentPrice: 2500,
    depositPrice: 2500,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1450,
    propertyType: 'House',
    furnished: 'Unfurnished',
    petsAllowed: true,
    parking: true,
    parkingDetails: 'Large Paved Compound for 3 Vehicles',
    waterAvailability: 'Borehole Backup',
    securityFeatures: [
      'Gated Community',
      'Electric Fencing',
      'CCTV Surveillance'
    ],
    amenities: [
      'Solar Panel Inverter System',
      'Borehole & Overhead Tank',
      'Prepaid Meter',
      'Air Conditioner in Master Bedroom',
      'Ceiling Fans'
    ],
    photos: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-41132-large.mp4',
    virtualTour360Url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2000&q=80',
    virtualTourRooms: [
      { name: 'Compound & Porch', imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2000&q=80' }
    ],
    availableDate: '2026-08-01',
    landlord: {
      id: 'landlord-8',
      name: 'Alhaji Zakaria Fuseini',
      phone: '+233 24 558 7100',
      whatsapp: '233245587100',
      email: 'zakaria.fuseini@tamalerealestate.gh',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
      responseRate: '99%',
      responseTime: 'Within 15 minutes',
      isVerified: true,
      memberSince: 'November 2022',
      propertiesListedCount: 1
    },
    isFeatured: true,
    createdAt: '2026-07-14'
  },
  {
    id: 'prop-9',
    title: 'Executive Chamber & Hall Self-Contained in Spintex, Accra',
    description: 'Newly finished Executive Chamber & Hall Self-Contained apartment in a quiet compound in Spintex. Features private porch, ensuite bedroom, fitted kitchen with granite top, personal ECG prepaid meter, and continuous borehole water connection with poly tank storage.',
    city: 'Accra',
    area: 'Spintex',
    address: 'Coastal Junction, off Spintex Road',
    lat: 5.6120,
    lng: -0.1012,
    rentPrice: 1800,
    depositPrice: 1800,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
    propertyType: 'Chamber & Hall',
    furnished: 'Unfurnished',
    petsAllowed: false,
    parking: true,
    parkingDetails: 'Gated Compound Parking Space',
    waterAvailability: 'Borehole Backup',
    securityFeatures: [
      'Gated Community',
      'Electric Fencing',
      '24/7 Security Guard'
    ],
    amenities: [
      'Borehole & Poly Tank Water',
      'Personal ECG Prepaid Meter',
      'POP Ceiling & Tiled Floors',
      'Private Veranda',
      'Fitted Kitchen Cabinets'
    ],
    photos: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-41132-large.mp4',
    virtualTour360Url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2000&q=80',
    virtualTourRooms: [
      { name: 'Chamber (Bedroom)', imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2000&q=80' },
      { name: 'Hall (Living Room)', imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=2000&q=80' }
    ],
    availableDate: '2026-08-01',
    landlord: {
      id: 'landlord-9',
      name: 'Kofi Badu',
      phone: '+233 24 100 2299',
      whatsapp: '233241002299',
      email: 'kofi.badu@rentdirect.gh',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      responseRate: '98%',
      responseTime: 'Within 15 minutes',
      isVerified: true,
      memberSince: 'March 2023',
      propertiesListedCount: 2
    },
    isFeatured: true,
    createdAt: '2026-07-20'
  },
  {
    id: 'prop-10',
    title: 'Neat Chamber & Hall Self-Contained in Ayeduase, Kumasi',
    description: 'Clean Chamber & Hall Self-Contained near KNUST Ayeduase Gate. Ideal for young professionals or postgrad students. Comes with private washroom, kitchenette, prepaid meter, and security compound gate.',
    city: 'Kumasi',
    area: 'Ayeduase',
    address: 'Near KNUST Ayeduase Gate, Kumasi',
    lat: 6.6742,
    lng: -1.5641,
    rentPrice: 1200,
    depositPrice: 1200,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 520,
    propertyType: 'Chamber & Hall',
    furnished: 'Semi-Furnished',
    petsAllowed: false,
    parking: true,
    parkingDetails: 'Secure Compound Parking',
    waterAvailability: 'Water Tank Storage',
    securityFeatures: [
      'Gated Community',
      'Electric Fencing'
    ],
    amenities: [
      'Overhead Poly Tank',
      'Separate ECG Prepaid Meter',
      'Tiled Floors & Ceiling Fan',
      'Kitchenette'
    ],
    photos: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-41132-large.mp4',
    virtualTour360Url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=2000&q=80',
    virtualTourRooms: [
      { name: 'Hall & Entry', imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=2000&q=80' }
    ],
    availableDate: '2026-08-01',
    landlord: {
      id: 'landlord-10',
      name: 'Madam Abena Serwaa',
      phone: '+233 20 443 1120',
      whatsapp: '233204431120',
      email: 'abena.serwaa@gmail.com',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
      responseRate: '100%',
      responseTime: 'Under 10 minutes',
      isVerified: true,
      memberSince: 'August 2022',
      propertiesListedCount: 1
    },
    isFeatured: false,
    createdAt: '2026-07-21'
  }
];
