import type {
  AssistancePoint,
  CommunityNeedsReport,
  VolunteerTask,
  Organization,
  SupplyDonation,
  MonetaryDonation,
  AuditLog,
  UserProfile,
  AppNotification
} from '../types';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user-admin-1',
    email: 'admin@manavasathi.org',
    displayName: 'Priya Sharma (Admin)',
    role: 'admin',
    state: 'Delhi',
    district: 'New Delhi',
    city: 'New Delhi',
    isVerified: true,
    createdAt: '2026-01-15T09:00:00Z'
  },
  {
    id: 'user-vol-1',
    email: 'arjun.volunteer@manavasathi.org',
    displayName: 'Arjun Das',
    role: 'volunteer',
    state: 'Telangana',
    district: 'Hyderabad',
    city: 'Hyderabad',
    isVerified: true,
    createdAt: '2026-02-10T11:30:00Z'
  },
  {
    id: 'user-org-1',
    email: 'care@anandaseva.org',
    displayName: 'Ananda Seva Foundation',
    role: 'org_rep',
    organizationId: 'org-1',
    state: 'Maharashtra',
    district: 'Mumbai Suburban',
    city: 'Mumbai',
    isVerified: true,
    createdAt: '2026-01-20T14:15:00Z'
  },
  {
    id: 'user-comm-1',
    email: 'kavitha.user@example.com',
    displayName: 'Kavitha R.',
    role: 'community',
    state: 'Tamil Nadu',
    district: 'Chennai',
    city: 'Chennai',
    isVerified: false,
    createdAt: '2026-03-01T10:00:00Z'
  }
];

export const INITIAL_ORGANIZATIONS: Organization[] = [
  {
    id: 'org-1',
    name: 'Ananda Seva Community Trust',
    registrationNumber: 'MAH/MUM/2018/TR/8912',
    category: 'Community Nutrition & Welfare',
    contactEmail: 'contact@anandaseva.org',
    contactPhone: '+91 98201 12345',
    officialWebsite: 'https://anandaseva-sample.org',
    state: 'Maharashtra',
    district: 'Mumbai Suburban',
    city: 'Mumbai',
    address: 'Plot 14, Near Bandra Station West, Mumbai - 400050',
    verificationStatus: 'verified',
    description: 'Operating verified community kitchens and daily warm meal counters across central transport hubs in Mumbai.',
    authorizedPerson: 'Rajesh Kulkarni (Trustee)',
    createdAt: '2026-01-20T14:15:00Z',
    verifiedAt: '2026-01-25T16:00:00Z',
    verificationNotes: 'Trust deed and 12A/80G documents reviewed and confirmed by ManavaSathi Admin Team.',
    isDemoData: true
  },
  {
    id: 'org-2',
    name: 'Karunya Social Shelter Initiative',
    registrationNumber: 'AP/VSP/2021/NGO/4510',
    category: 'Safe Night Shelter & Rehabilitation',
    contactEmail: 'karunya.shelter@sample.org',
    contactPhone: '+91 89123 45678',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    city: 'Visakhapatnam',
    address: 'Near Old Post Office Junction, One Town, Visakhapatnam - 530001',
    verificationStatus: 'verified',
    description: 'Providing clean beds, basic hygienic facilities, and emergency overnight accommodation for stranded individuals and families.',
    authorizedPerson: 'M. Venkata Ramana',
    createdAt: '2026-02-05T10:00:00Z',
    verifiedAt: '2026-02-12T11:00:00Z',
    verificationNotes: 'Local authority shelter registration verified.',
    isDemoData: true
  },
  {
    id: 'org-3',
    name: 'Maitri Northeast Care Guild',
    registrationNumber: 'AS/KAM/2022/SOC/1129',
    category: 'Winter Clothing & Flood Relief Supplies',
    contactEmail: 'info@maitrine.sample.org',
    contactPhone: '+91 94350 98765',
    state: 'Assam',
    district: 'Kamrup Metropolitan (Guwahati)',
    city: 'Guwahati',
    address: 'Paltan Bazaar Road, Near Guwahati Railway Station, Guwahati - 781008',
    verificationStatus: 'verified',
    description: 'Collecting and distributing winter clothing, waterproof blankets, and student essentials in flood-prone and rural hamlets.',
    authorizedPerson: 'Bipul Hazarika',
    createdAt: '2026-02-18T09:30:00Z',
    verifiedAt: '2026-02-22T14:30:00Z',
    verificationNotes: 'Societies registration and annual audit verified.',
    isDemoData: true
  },
  {
    id: 'org-4',
    name: 'Sneha Spandana Community Health',
    registrationNumber: 'KA/BLR/2023/MED/9901',
    category: 'Essential Health & Elderly Outreach',
    contactEmail: 'reach@snehaspandana.sample.org',
    contactPhone: '+91 80234 56789',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    city: 'Bengaluru',
    address: '8th Cross, Wilson Garden, Bengaluru - 560027',
    verificationStatus: 'pending',
    description: 'Volunteer doctors providing free weekly wellness consultations and hygiene distribution for vulnerable elder folks.',
    authorizedPerson: 'Dr. Sunita Rao',
    createdAt: '2026-03-10T12:00:00Z',
    verificationNotes: 'Awaiting submission of registration certificate copy.',
    isDemoData: true
  }
];

export const INITIAL_ASSISTANCE_POINTS: AssistancePoint[] = [
  // 1. South - Telangana (Hyderabad) - Food
  {
    id: 'point-1',
    title: 'Hyderabad Annapurna Community Meal Centre',
    category: 'food',
    organizationName: 'Ananda Seva Hyderabad Chapter',
    organizationId: 'org-1',
    status: 'verified',
    address: {
      fullAddress: 'Near Nampally Railway Station, Mozamjahi Market Road, Hyderabad - 500001',
      street: 'Mozamjahi Market Road',
      locality: 'Nampally',
      city: 'Hyderabad',
      district: 'Hyderabad',
      state: 'Telangana',
      pinCode: '500001',
      coordinates: { lat: 17.3916, lng: 78.4715 }
    },
    description: 'Daily fresh warm nutritious lunch distributed free of cost to any person in need with respect and dignity.',
    operatingHours: 'Monday to Sunday: 12:00 PM – 2:30 PM & 7:00 PM – 8:30 PM',
    acceptedItems: ['Rice bags (sealed)', 'Dal & Pulses', 'Cooking Oil', 'Clean cooking utensils'],
    currentRequirements: ['Rice (25kg bags)', 'Toor dal', 'Refined sunflower oil'],
    servicesOffered: ['Cooked Hot Meals', 'Clean RO Drinking Water', 'Elderly Priority Seating'],
    contactInfo: {
      phone: '+91 40 2460 1122',
      email: 'hyderabad@anandaseva.org',
      contactPerson: 'Suresh Varma'
    },
    accessibility: {
      wheelchairAccessible: true,
      familyFriendly: true,
      elderlyAssistance: true,
      advanceRegistrationRequired: false
    },
    availabilityStatus: 'confirmed',
    lastConfirmedDate: '2026-10-21',
    createdAt: '2026-01-22T08:00:00Z',
    updatedAt: '2026-10-21T10:00:00Z',
    verificationNotes: 'Verified on-site by field coordinator.',
    isDemoData: true
  },

  // 2. South - Andhra Pradesh (Visakhapatnam) - Shelter
  {
    id: 'point-2',
    title: 'Karunya Night Shelter & Rest Facility',
    category: 'shelter',
    organizationName: 'Karunya Social Shelter Initiative',
    organizationId: 'org-2',
    status: 'verified',
    address: {
      fullAddress: 'Opposite Port Area Gate 2, One Town, Visakhapatnam - 530001',
      street: 'Harbour Road',
      locality: 'One Town',
      city: 'Visakhapatnam',
      district: 'Visakhapatnam',
      state: 'Andhra Pradesh',
      pinCode: '530001',
      coordinates: { lat: 17.6975, lng: 83.2986 }
    },
    description: 'Safe, secure overnight shelter with clean beds, sanitized washrooms, and safe storage for belongings.',
    operatingHours: 'Open 6:30 PM – 8:30 AM Daily',
    acceptedItems: ['Clean bedsheets', 'New blankets', 'Mosquito nets', 'Toiletries'],
    currentRequirements: ['Warm blankets', 'Antiseptic soap bars', 'Toothbrushes'],
    servicesOffered: ['Beds & Clean Bedding', 'Hot Showers', 'First-Aid Assistance', 'Family Rooms (4 units)'],
    contactInfo: {
      phone: '+91 891 270 4455',
      contactPerson: 'M. Venkata Ramana'
    },
    accessibility: {
      wheelchairAccessible: true,
      familyFriendly: true,
      womenSpecific: true,
      elderlyAssistance: true,
      bedsAvailable: 28,
      advanceRegistrationRequired: false
    },
    availabilityStatus: 'confirmed',
    lastConfirmedDate: '2026-10-20',
    createdAt: '2026-02-06T09:00:00Z',
    updatedAt: '2026-10-20T17:00:00Z',
    verificationNotes: 'Municipal shelter authorization confirmed.',
    isDemoData: true
  },

  // 3. West - Maharashtra (Mumbai) - Clothing & Blankets
  {
    id: 'point-3',
    title: 'Bandra Dignity Clothing & Essentials Hub',
    category: 'clothing',
    organizationName: 'Ananda Seva Community Trust',
    organizationId: 'org-1',
    status: 'verified',
    address: {
      fullAddress: 'Shop 4, Municipal Welfare Complex, Hill Road, Bandra West, Mumbai - 400050',
      street: 'Hill Road',
      locality: 'Bandra West',
      city: 'Mumbai',
      district: 'Mumbai Suburban',
      state: 'Maharashtra',
      pinCode: '400050',
      coordinates: { lat: 19.0544, lng: 72.8402 }
    },
    description: 'Donation collection and free dignified distribution point for clean laundered clothes, shoes, and rainwear.',
    operatingHours: 'Tuesday to Sunday: 10:00 AM – 6:00 PM (Closed Mondays)',
    acceptedItems: ['Clean freshly washed clothes (all sizes)', 'Slippers & Shoes', 'Monsoon raincoats', 'School bags'],
    currentRequirements: ['Children clothing (ages 4-12)', 'Adult slippers (sizes 6-9)'],
    servicesOffered: ['Clothing fitting and selection with dignity', 'Drop-off sorting', 'Winter blanket distribution'],
    contactInfo: {
      phone: '+91 22 2640 8899',
      email: 'mumbai.clothing@anandaseva.org',
      contactPerson: 'Deepa Mehta'
    },
    accessibility: {
      wheelchairAccessible: false,
      familyFriendly: true,
      elderlyAssistance: true
    },
    availabilityStatus: 'confirmed',
    lastConfirmedDate: '2026-10-19',
    createdAt: '2026-01-25T11:00:00Z',
    updatedAt: '2026-10-19T14:30:00Z',
    isDemoData: true
  },

  // 4. North - Delhi (New Delhi) - Shelter & Winter Relief
  {
    id: 'point-4',
    title: 'Yamuna Safe Night Shelter & Care Point',
    category: 'shelter',
    organizationName: 'Delhi Rain Basera Network Partner',
    status: 'verified',
    address: {
      fullAddress: 'Near Sarai Kale Khan ISBT, Ring Road, South East Delhi - 110013',
      street: 'Ring Road',
      locality: 'Sarai Kale Khan',
      city: 'New Delhi',
      district: 'South Delhi',
      state: 'Delhi',
      pinCode: '110013',
      coordinates: { lat: 28.5898, lng: 77.2588 }
    },
    description: 'Well-ventilated overnight shelter with insulated flooring, thermal blankets, and clean drinking water.',
    operatingHours: '24 Hours Emergency Intake (Beds assigned 7 PM - 7 AM)',
    acceptedItems: ['Thermal blankets', 'Woollen sweaters', 'Socks & Mufflers', 'First-aid supplies'],
    currentRequirements: ['Heavy winter blankets', 'Men and women jackets'],
    servicesOffered: ['50 Insulated Beds', 'Women and Children safe partitioned wing', 'Night tea & warm water'],
    contactInfo: {
      phone: '+91 11 2435 9011',
      contactPerson: 'Harish Chander'
    },
    accessibility: {
      wheelchairAccessible: true,
      familyFriendly: true,
      womenSpecific: true,
      elderlyAssistance: true,
      bedsAvailable: 42
    },
    availabilityStatus: 'confirmed',
    lastConfirmedDate: '2026-10-21',
    createdAt: '2026-01-10T14:00:00Z',
    updatedAt: '2026-10-21T09:15:00Z',
    isDemoData: true
  },

  // 5. South - Tamil Nadu (Chennai) - Community Food Kitchen
  {
    id: 'point-5',
    title: 'Chennai Karunai Illam Community Kitchen',
    category: 'food',
    organizationName: 'Karunai Illam Charitable Trust',
    status: 'verified',
    address: {
      fullAddress: '12 Wall Tax Road, Near Chennai Central Station, Park Town, Chennai - 600003',
      street: 'Wall Tax Road',
      locality: 'Park Town',
      city: 'Chennai',
      district: 'Chennai',
      state: 'Tamil Nadu',
      pinCode: '600003',
      coordinates: { lat: 13.0827, lng: 80.2707 }
    },
    description: 'Free freshly prepared sambar rice, curd rice, and porridge served twice daily to passengers, daily wage workers, and elderly.',
    operatingHours: 'Morning: 7:30 AM – 9:00 AM | Afternoon: 12:30 PM – 2:00 PM',
    acceptedItems: ['Ponni Rice bags', 'Toor Dal', 'Cooking Oil', 'Vegetables (fresh morning delivery)'],
    currentRequirements: ['Rice bags', 'Toor dal'],
    servicesOffered: ['Hot Meals', 'Filtered Water', 'Takeaway food packets for unwell elders'],
    contactInfo: {
      phone: '+91 44 2538 4400',
      contactPerson: 'S. Selvaraj'
    },
    accessibility: {
      wheelchairAccessible: true,
      familyFriendly: true,
      elderlyAssistance: true
    },
    availabilityStatus: 'confirmed',
    lastConfirmedDate: '2026-10-18',
    createdAt: '2026-02-01T10:00:00Z',
    updatedAt: '2026-10-18T16:00:00Z',
    isDemoData: true
  },

  // 6. South - Karnataka (Bengaluru) - Hygiene & Health
  {
    id: 'point-6',
    title: 'Bengaluru Civic Care & Hygiene Distribution Hub',
    category: 'hygiene',
    organizationName: 'Sneha Spandana Community Health',
    organizationId: 'org-4',
    status: 'pending',
    address: {
      fullAddress: 'Subhash Nagar, Opposite Majestic Bus Stand, Bengaluru - 560009',
      street: 'Gubbi Thotadappa Road',
      locality: 'Majestic',
      city: 'Bengaluru',
      district: 'Bengaluru Urban',
      state: 'Karnataka',
      pinCode: '560009',
      coordinates: { lat: 12.9784, lng: 77.5724 }
    },
    description: 'Bi-weekly distribution of hygiene kits (soap, disinfectant, menstrual hygiene items, dental care) for unhoused workers.',
    operatingHours: 'Wednesdays & Saturdays: 3:00 PM – 6:00 PM',
    acceptedItems: ['Sanitary pads (packaged)', 'Bathing soap bars', 'Toothpaste & Brushes', 'Nail cutters'],
    currentRequirements: ['Menstrual hygiene packs', 'Antibacterial soap'],
    servicesOffered: ['Free Hygiene Kits', 'Basic wound dressing', 'Doctor referral desk'],
    contactInfo: {
      phone: '+91 80 2287 1199',
      contactPerson: 'Dr. Sunita Rao'
    },
    accessibility: {
      wheelchairAccessible: true,
      familyFriendly: true,
      womenSpecific: true
    },
    availabilityStatus: 'schedule_published',
    lastConfirmedDate: '2026-10-15',
    createdAt: '2026-03-12T11:00:00Z',
    updatedAt: '2026-10-15T12:00:00Z',
    verificationNotes: 'Pending document verification by admin.',
    isDemoData: true
  },

  // 7. Northeast - Assam (Guwahati) - Essential Supplies & Relief
  {
    id: 'point-7',
    title: 'Guwahati Brahmaputra Care & Blanket Depository',
    category: 'clothing',
    organizationName: 'Maitri Northeast Care Guild',
    organizationId: 'org-3',
    status: 'verified',
    address: {
      fullAddress: 'Paltan Bazaar, Station Road, Guwahati - 781008',
      street: 'Station Road',
      locality: 'Paltan Bazaar',
      city: 'Guwahati',
      district: 'Kamrup Metropolitan (Guwahati)',
      state: 'Assam',
      pinCode: '781008',
      coordinates: { lat: 26.1812, lng: 91.7516 }
    },
    description: 'Providing protective dry clothing, thermal blankets, tarpaulins, and basic school supplies for displaced rural families.',
    operatingHours: 'Monday to Saturday: 9:00 AM – 5:00 PM',
    acceptedItems: ['Winter jackets', 'Tarpaulin sheets', 'School notebooks', 'Stationery', 'Thermal blankets'],
    currentRequirements: ['Tarpaulin rolls', 'Woollen sweaters for children'],
    servicesOffered: ['Supply Collection', 'Family Emergency Bundles', 'Volunteer Mobilization'],
    contactInfo: {
      phone: '+91 94350 98765',
      contactPerson: 'Bipul Hazarika'
    },
    accessibility: {
      wheelchairAccessible: true,
      familyFriendly: true
    },
    availabilityStatus: 'confirmed',
    lastConfirmedDate: '2026-10-21',
    createdAt: '2026-02-20T10:00:00Z',
    updatedAt: '2026-10-21T11:00:00Z',
    isDemoData: true
  },

  // 8. North - Uttar Pradesh (Lucknow) - Food & Community Kitchen
  {
    id: 'point-8',
    title: 'Lucknow Gomti Sanjhi Rasoi (Community Kitchen)',
    category: 'food',
    organizationName: 'Awadh Humanitarian Society',
    status: 'verified',
    address: {
      fullAddress: 'Near Charbagh Railway Station Main Exit, Lucknow - 226004',
      street: 'Station Road',
      locality: 'Charbagh',
      city: 'Lucknow',
      district: 'Lucknow',
      state: 'Uttar Pradesh',
      pinCode: '226004',
      coordinates: { lat: 26.8315, lng: 80.9234 }
    },
    description: 'Hygienic wholesome meals served with care. No identity verification or questioning; anyone hungry is served respectfully.',
    operatingHours: 'Lunch: 1:00 PM – 3:00 PM | Dinner: 7:30 PM – 9:00 PM',
    acceptedItems: ['Wheat flour (Atta)', 'Mustard oil', 'Potatoes & Onions', 'Lentils'],
    currentRequirements: ['Atta bags', 'Mustard oil tins'],
    servicesOffered: ['Hot Roti-Sabzi & Khichdi', 'Clean Water', 'Child nutrition milk distribution'],
    contactInfo: {
      phone: '+91 522 263 7788',
      contactPerson: 'Mohammad Farhan'
    },
    accessibility: {
      wheelchairAccessible: true,
      familyFriendly: true,
      elderlyAssistance: true
    },
    availabilityStatus: 'confirmed',
    lastConfirmedDate: '2026-10-20',
    createdAt: '2026-02-15T14:00:00Z',
    updatedAt: '2026-10-20T18:00:00Z',
    isDemoData: true
  },

  // 9. East - West Bengal (Kolkata) - General Humanitarian Point
  {
    id: 'point-9',
    title: 'Kolkata Howrah Sahayata Kendra',
    category: 'general_donation',
    organizationName: 'Bengal Relief & Care Alliance',
    status: 'verified',
    address: {
      fullAddress: 'Near Howrah Bridge Approach, Strand Road, Kolkata - 700001',
      street: 'Strand Road',
      locality: 'Bara Bazar / Bridge Approach',
      city: 'Kolkata',
      district: 'Kolkata',
      state: 'West Bengal',
      pinCode: '700001',
      coordinates: { lat: 22.5855, lng: 88.3512 }
    },
    description: 'Central collection point for clothing, footwear, dry rations, and basic medicines for urban migrants and destitute individuals.',
    operatingHours: 'Daily: 9:00 AM – 7:00 PM',
    acceptedItems: ['Dhotis, Sarees, Trousers (clean)', 'Dry rations (Rice, Chira, Gur)', 'Footwear', 'Emergency lights'],
    currentRequirements: ['Dry flattened rice (chira)', 'Children footwear'],
    servicesOffered: ['Supply Intake', 'Distribution to outreach volunteers', 'Emergency helpline desk'],
    contactInfo: {
      phone: '+91 33 2230 4567',
      contactPerson: 'Anirban Mukherjee'
    },
    accessibility: {
      wheelchairAccessible: false,
      familyFriendly: true
    },
    availabilityStatus: 'confirmed',
    lastConfirmedDate: '2026-10-17',
    createdAt: '2026-01-28T09:00:00Z',
    updatedAt: '2026-10-17T15:00:00Z',
    isDemoData: true
  },

  // 10. West - Gujarat (Ahmedabad) - Community Support Centre
  {
    id: 'point-10',
    title: 'Ahmedabad Sabarmati Compassion Centre',
    category: 'community_centre',
    organizationName: 'Sabarmati Seva Mandal',
    status: 'verified',
    address: {
      fullAddress: 'Near Kalupur Railway Station, Relief Road, Ahmedabad - 380001',
      street: 'Relief Road',
      locality: 'Kalupur',
      city: 'Ahmedabad',
      district: 'Ahmedabad',
      state: 'Gujarat',
      pinCode: '380001',
      coordinates: { lat: 23.0298, lng: 72.5985 }
    },
    description: 'Elderly assistance desk, public health helpline assistance, disability mobility aid coordination, and basic grocery support.',
    operatingHours: 'Monday to Saturday: 10:00 AM – 5:30 PM',
    acceptedItems: ['Walking sticks', 'Wheelchairs (manual)', 'Spectacles / Reading glasses', 'Adult diapers'],
    currentRequirements: ['Walking canes with rubber tips', 'Adult incontinence pads'],
    servicesOffered: ['Senior Citizen Assistance', 'Disability Support Desk', 'Govt Scheme Navigation Support'],
    contactInfo: {
      phone: '+91 79 2213 8900',
      contactPerson: 'Jitendra Patel'
    },
    accessibility: {
      wheelchairAccessible: true,
      familyFriendly: true,
      elderlyAssistance: true
    },
    availabilityStatus: 'confirmed',
    lastConfirmedDate: '2026-10-21',
    createdAt: '2026-02-12T10:00:00Z',
    updatedAt: '2026-10-21T08:30:00Z',
    isDemoData: true
  },

  // 11. North - Rajasthan (Jaipur) - Needs update
  {
    id: 'point-11',
    title: 'Jaipur Sindhi Camp Rations & Shelter Desk',
    category: 'shelter',
    organizationName: 'Marudhar Seva Samiti',
    status: 'needs_update',
    address: {
      fullAddress: 'Near Sindhi Camp Bus Terminal, Station Road, Jaipur - 302001',
      street: 'Station Road',
      locality: 'Sindhi Camp',
      city: 'Jaipur',
      district: 'Jaipur',
      state: 'Rajasthan',
      pinCode: '302001',
      coordinates: { lat: 26.9209, lng: 75.7974 }
    },
    description: 'Transit night shelter. Currently undergoing seasonal renovation; capacity temporarily limited.',
    operatingHours: '8:00 PM – 7:00 AM',
    acceptedItems: ['Mattresses', 'Blankets'],
    currentRequirements: ['Information verification pending with local district office'],
    servicesOffered: ['Temporary transit beds'],
    contactInfo: {
      phone: '+91 141 236 8822',
      contactPerson: 'Rameshwar Meena'
    },
    accessibility: {
      wheelchairAccessible: false,
      familyFriendly: false,
      bedsAvailable: 8
    },
    availabilityStatus: 'unknown',
    lastConfirmedDate: '2026-08-10',
    createdAt: '2026-02-28T11:00:00Z',
    updatedAt: '2026-08-10T11:00:00Z',
    verificationNotes: 'Flagged for inspection by regional coordinator.',
    isDemoData: true
  },

  // 12. North - Jammu & Kashmir (Srinagar) - Medical & Winter Warmth
  {
    id: 'point-12',
    title: 'Srinagar Dal-Gate Winter Relief & Health Aid',
    category: 'medical',
    organizationName: 'Kashmir Valley Humanitarian Guild',
    status: 'verified',
    address: {
      fullAddress: 'Boulevard Road, Near Dal Gate Footbridge, Srinagar - 190001',
      street: 'Boulevard Road',
      locality: 'Dal Gate',
      city: 'Srinagar',
      district: 'Srinagar',
      state: 'Jammu and Kashmir',
      pinCode: '190001',
      coordinates: { lat: 34.0837, lng: 74.8322 }
    },
    description: 'Free basic primary care clinic, essential winter medicines, thermal clothing and Kangri safety supplies for isolated families.',
    operatingHours: 'Monday to Friday: 10:00 AM – 4:00 PM',
    acceptedItems: ['Thermal innerwear', 'First-aid kits', 'Paracetamol & Cough syrups', 'Insulated socks'],
    currentRequirements: ['Winter gloves & woollen caps', 'Clean bandages'],
    servicesOffered: ['Doctor Consultations', 'Free basic medicines', 'Emergency thermal blankets'],
    contactInfo: {
      phone: '+91 194 245 6789',
      contactPerson: 'Dr. Tariq Ahmad'
    },
    accessibility: {
      wheelchairAccessible: true,
      familyFriendly: true,
      elderlyAssistance: true
    },
    availabilityStatus: 'confirmed',
    lastConfirmedDate: '2026-10-21',
    createdAt: '2026-01-30T10:00:00Z',
    updatedAt: '2026-10-21T13:00:00Z',
    isDemoData: true
  }
];

export const INITIAL_COMMUNITY_NEEDS: CommunityNeedsReport[] = [
  {
    id: 'need-1',
    category: 'food',
    urgency: 'high',
    approximateLocation: {
      generalArea: 'Near Secunderabad Railway Outer Yard, Chilkalguda Colony',
      city: 'Secunderabad / Hyderabad',
      district: 'Hyderabad',
      state: 'Telangana',
      pinCode: '500025',
      coordinates: { lat: 17.4399, lng: 78.5015 },
      isApproximate: true
    },
    description: 'Group of around 15-20 daily wage migrants and children displaced due to railway siding work needing hot meal packets and drinking water.',
    observedAt: '2026-10-21T16:30:00Z',
    estimatedPeopleAffected: 18,
    reporterType: 'volunteer',
    reporterId: 'user-vol-1',
    reporterContact: 'arjun.volunteer@manavasathi.org',
    status: 'assistance_planned',
    createdAt: '2026-10-21T17:00:00Z',
    updatedAt: '2026-10-21T19:00:00Z',
    reviewedBy: 'Priya Sharma (Admin)',
    reviewNotes: 'Volunteer task #task-1 created for meal delivery.',
    isDemoData: true
  },
  {
    id: 'need-2',
    category: 'clothing',
    urgency: 'medium',
    approximateLocation: {
      generalArea: 'Near Kashmere Gate Inter-State Bus Terminus flyover underside',
      city: 'Delhi',
      district: 'North Delhi',
      state: 'Delhi',
      pinCode: '110006',
      coordinates: { lat: 28.6675, lng: 77.2285 },
      isApproximate: true
    },
    description: 'Upcoming cold wave expected; approximate 25-30 people staying without thermal blankets or woollen sweaters.',
    observedAt: '2026-10-20T20:00:00Z',
    estimatedPeopleAffected: 28,
    reporterType: 'community_member',
    status: 'verified_need',
    createdAt: '2026-10-20T21:15:00Z',
    updatedAt: '2026-10-21T08:30:00Z',
    reviewedBy: 'Priya Sharma (Admin)',
    reviewNotes: 'Verified with Yamuna Shelter team; blanket dispatch scheduled.',
    isDemoData: true
  },
  {
    id: 'need-3',
    category: 'urgent_request',
    urgency: 'critical',
    approximateLocation: {
      generalArea: 'Near Old Gajuwaka auto stand, industrial periphery',
      city: 'Visakhapatnam',
      district: 'Visakhapatnam',
      state: 'Andhra Pradesh',
      pinCode: '530026',
      coordinates: { lat: 17.6908, lng: 83.2104 },
      isApproximate: true
    },
    description: 'Elderly person with limited mobility appearing dehydrated and needing urgent non-emergency community social support and clean water.',
    observedAt: '2026-10-22T07:15:00Z',
    estimatedPeopleAffected: 1,
    reporterType: 'community_member',
    status: 'awaiting_review',
    createdAt: '2026-10-22T07:30:00Z',
    updatedAt: '2026-10-22T07:30:00Z',
    isDemoData: true
  }
];

export const INITIAL_VOLUNTEER_TASKS: VolunteerTask[] = [
  {
    id: 'task-1',
    title: 'Warm Dinner Meal Distribution — Secunderabad Outreach',
    description: 'Assemble at community kitchen point, pack 40 hot nutritious meals and water pouches, and distribute in designated dignified manner.',
    category: 'food',
    location: {
      name: 'Nampally Distribution Kitchen Counter',
      address: 'Mozamjahi Market Road, Nampally, Hyderabad',
      city: 'Hyderabad',
      district: 'Hyderabad',
      state: 'Telangana',
      coordinates: { lat: 17.3916, lng: 78.4715 }
    },
    dateTime: 'Today, 6:30 PM - 8:30 PM',
    volunteersRequired: 4,
    volunteersAssigned: ['user-vol-1'],
    coordinatorContact: '+91 98490 22334',
    coordinatorId: 'user-vol-1',
    coordinatorName: 'Arjun Das (Lead Volunteer)',
    safetyInstructions: [
      'Maintain recipient dignity: do NOT click photographs or film individuals receiving food.',
      'Wear clean gloves and provided hygiene aprons.',
      'Greet each person with respect and offer food with two hands.'
    ],
    requiredSupplies: ['Gloves', 'Sanitizer', 'Water cartons', 'Thermal carrier bags'],
    status: 'in_progress',
    createdAt: '2026-10-21T18:00:00Z',
    isDemoData: true
  },
  {
    id: 'task-2',
    title: 'Winter Blanket & Woollen Sorting Drive',
    description: 'Sorting freshly donated woollen blankets, sweaters, and shawls by sizes and boxing them for night distribution across shelters.',
    category: 'clothing',
    location: {
      name: 'Yamuna Safe Shelter Hub',
      address: 'Near Sarai Kale Khan ISBT, Ring Road, New Delhi',
      city: 'New Delhi',
      district: 'South Delhi',
      state: 'Delhi',
      coordinates: { lat: 28.5898, lng: 77.2588 }
    },
    dateTime: 'Saturday, 10:00 AM - 1:00 PM',
    volunteersRequired: 6,
    volunteersAssigned: [],
    coordinatorContact: '+91 11 2435 9011',
    coordinatorId: 'user-admin-1',
    coordinatorName: 'Harish Chander (Coordinator)',
    safetyInstructions: [
      'Inspect garments to ensure they are clean, undamaged, and hygienic.',
      'Label boxes clearly with size and gender categories.'
    ],
    status: 'open',
    createdAt: '2026-10-20T10:00:00Z',
    isDemoData: true
  },
  {
    id: 'task-3',
    title: 'Hygiene Kit Assembly for Stranded Families',
    description: 'Pack 100 individual kits containing bathing soaps, toothbrush, toothpaste, sanitary pads, comb, and hand towel.',
    category: 'hygiene',
    location: {
      name: 'Bandra Community Centre',
      address: 'Hill Road, Bandra West, Mumbai',
      city: 'Mumbai',
      district: 'Mumbai Suburban',
      state: 'Maharashtra',
      coordinates: { lat: 19.0544, lng: 72.8402 }
    },
    dateTime: 'Sunday, 2:00 PM - 5:00 PM',
    volunteersRequired: 5,
    volunteersAssigned: [],
    coordinatorContact: '+91 22 2640 8899',
    coordinatorId: 'user-org-1',
    coordinatorName: 'Deepa Mehta',
    safetyInstructions: [
      'Seal menstrual hygiene products safely inside moisture-proof covers.',
      'Check expiry on all donated soaps and medical supplies.'
    ],
    status: 'open',
    createdAt: '2026-10-21T09:00:00Z',
    isDemoData: true
  }
];

export const INITIAL_SUPPLY_DONATIONS: SupplyDonation[] = [
  {
    id: 'supply-1',
    donorId: 'user-comm-1',
    donorName: 'Kavitha R.',
    donorContact: '+91 98401 22334',
    items: [
      { name: 'Men & Women Winter Sweaters', category: 'Clothing', quantity: '15 pieces', condition: 'clean_usable' },
      { name: 'Warm Double-Bed Blankets', category: 'Blankets', quantity: '8 blankets', condition: 'new' }
    ],
    generalLocation: 'Anna Nagar, Chennai, Tamil Nadu',
    preferredMethod: 'dropoff',
    suitableTimes: 'Saturday morning 10 AM to 1 PM',
    targetPointId: 'point-5',
    targetOrganizationName: 'Karunai Illam Charitable Trust',
    status: 'accepted',
    notes: 'All woollens washed and folded in clean bags.',
    createdAt: '2026-10-20T14:00:00Z',
    isDemoData: true
  }
];

export const INITIAL_MONETARY_DONATIONS: MonetaryDonation[] = [
  {
    id: 'don-demo-1',
    donorName: 'Anonymous Well-Wisher',
    donorEmail: 'donor@example.com',
    amount: 5000,
    currency: 'INR',
    targetOrganizationId: 'org-1',
    targetOrganizationName: 'Ananda Seva Community Trust',
    purpose: '100 Daily Community Meals at Nampally Kitchen',
    status: 'demo',
    paymentProvider: 'demo',
    transactionRef: 'DEMO-TXN-20261021-9981',
    receiptNumber: 'RCP-DEMO-00124',
    confirmedAt: '2026-10-21T14:32:00Z',
    isDemoData: true
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    adminId: 'user-admin-1',
    adminEmail: 'admin@manavasathi.org',
    action: 'VERIFIED_ASSISTANCE_POINT',
    targetType: 'listing',
    targetId: 'point-1',
    reason: 'Field coordinator physically inspected the Nampally kitchen premises and meal preparation hygiene.',
    timestamp: '2026-01-22T10:30:00Z'
  },
  {
    id: 'log-2',
    adminId: 'user-admin-1',
    adminEmail: 'admin@manavasathi.org',
    action: 'FLAGGED_OUTDATED_POINT',
    targetType: 'listing',
    targetId: 'point-11',
    reason: 'Provider reported temporary renovation; listing status marked as needs_update to prevent misinforming users.',
    timestamp: '2026-08-10T11:05:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    userId: 'user-admin-1',
    title: 'New Donation Point Submitted for Review',
    message: 'Bengaluru Civic Care & Hygiene Distribution Hub submitted by Sneha Spandana is awaiting verification.',
    type: 'info',
    read: false,
    createdAt: '2026-10-21T09:30:00Z',
    link: '/admin'
  },
  {
    id: 'notif-2',
    userId: 'user-vol-1',
    title: 'Volunteer Task Assigned',
    message: 'You have been confirmed for the Warm Dinner Meal Distribution in Secunderabad.',
    type: 'success',
    read: false,
    createdAt: '2026-10-21T18:05:00Z',
    link: '/volunteer-dashboard'
  }
];
