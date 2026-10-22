export type UserRole =
  | 'community'
  | 'volunteer'
  | 'donor'
  | 'org_rep'
  | 'shelter_provider'
  | 'donation_point_manager'
  | 'moderator'
  | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  phone?: string;
  state?: string;
  district?: string;
  city?: string;
  isVerified?: boolean;
  organizationId?: string;
  createdAt: string;
}

export type AssistanceCategory =
  | 'food'
  | 'clothing'
  | 'shelter'
  | 'hygiene'
  | 'medical'
  | 'community_centre'
  | 'general_donation'
  | 'urgent_request'
  | 'volunteer_activity';

export type ListingStatus =
  | 'pending'
  | 'verified'
  | 'rejected'
  | 'temporarily_closed'
  | 'needs_update';

export type AvailabilityStatus =
  | 'confirmed'
  | 'schedule_published'
  | 'unknown'
  | 'temporarily_unavailable';

export interface GeoLocation {
  fullAddress: string;
  street?: string;
  locality?: string;
  villageOrTown?: string;
  city: string;
  district: string;
  state: string;
  pinCode?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface AssistancePoint {
  id: string;
  title: string;
  category: AssistanceCategory;
  organizationName: string;
  organizationId?: string;
  status: ListingStatus;
  address: GeoLocation;
  description: string;
  operatingHours: string;
  acceptedItems: string[];
  currentRequirements: string[];
  servicesOffered: string[];
  contactInfo: {
    phone: string;
    email?: string;
    website?: string;
    contactPerson?: string;
  };
  accessibility: {
    wheelchairAccessible: boolean;
    familyFriendly: boolean;
    womenSpecific?: boolean;
    elderlyAssistance?: boolean;
    bedsAvailable?: number;
    advanceRegistrationRequired?: boolean;
  };
  availabilityStatus: AvailabilityStatus;
  lastConfirmedDate: string;
  createdAt: string;
  updatedAt: string;
  verificationNotes?: string;
  isDemoData: boolean;
}

export type NeedUrgency = 'low' | 'medium' | 'high' | 'critical';

export type NeedStatus =
  | 'new'
  | 'awaiting_review'
  | 'verified_need'
  | 'assistance_planned'
  | 'assistance_in_progress'
  | 'resolved'
  | 'unable_to_verify'
  | 'outdated';

export interface CommunityNeedsReport {
  id: string;
  category: AssistanceCategory;
  urgency: NeedUrgency;
  approximateLocation: {
    generalArea: string;
    city: string;
    district: string;
    state: string;
    pinCode?: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    isApproximate: boolean; // Protected to prevent exposing vulnerable individuals
  };
  description: string;
  observedAt: string;
  estimatedPeopleAffected?: number;
  reporterType: 'volunteer' | 'organization' | 'community_member';
  reporterId?: string;
  reporterContact?: string;
  status: NeedStatus;
  createdAt: string;
  updatedAt: string;
  reviewedBy?: string;
  reviewNotes?: string;
  isDemoData: boolean;
}

export type VolunteerTaskStatus =
  | 'open'
  | 'assigned'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface VolunteerTask {
  id: string;
  title: string;
  description: string;
  category: AssistanceCategory;
  location: {
    name: string;
    address: string;
    city: string;
    district: string;
    state: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  dateTime: string;
  volunteersRequired: number;
  volunteersAssigned: string[]; // User IDs
  coordinatorContact: string;
  coordinatorId: string;
  coordinatorName: string;
  safetyInstructions: string[];
  requiredSupplies?: string[];
  status: VolunteerTaskStatus;
  completionNotes?: string;
  createdAt: string;
  isDemoData: boolean;
}

export interface VolunteerProfile {
  userId: string;
  preferredAreas: string[];
  travelDistanceKm: number;
  assistanceTypes: AssistanceCategory[];
  availableDays: string[];
  canDistributeSupplies: boolean;
  canTransportDonations: boolean;
  canHelpAdmin: boolean;
  organizationAffiliation?: string;
}

export interface SupplyDonation {
  id: string;
  donorId: string;
  donorName: string;
  donorContact: string;
  items: {
    name: string;
    category: string;
    quantity: string;
    condition: 'new' | 'clean_usable';
  }[];
  generalLocation: string;
  preferredMethod: 'dropoff' | 'pickup';
  suitableTimes: string;
  targetPointId?: string;
  targetOrganizationName: string;
  status: 'offered' | 'accepted' | 'received' | 'distributed';
  notes?: string;
  createdAt: string;
  isDemoData: boolean;
}

export interface MonetaryDonation {
  id: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  currency: string;
  targetOrganizationId: string;
  targetOrganizationName: string;
  purpose: string;
  status: 'pending' | 'confirmed' | 'demo';
  paymentProvider: 'razorpay' | 'demo';
  transactionRef?: string;
  receiptNumber?: string;
  confirmedAt?: string;
  isDemoData: boolean;
}

export interface Organization {
  id: string;
  name: string;
  registrationNumber?: string;
  category: string;
  contactEmail: string;
  contactPhone: string;
  officialWebsite?: string;
  state: string;
  district: string;
  city: string;
  address: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  description: string;
  authorizedPerson: string;
  createdAt: string;
  verifiedAt?: string;
  verificationNotes?: string;
  isDemoData: boolean;
}

export interface AuditLog {
  id: string;
  adminId: string;
  adminEmail: string;
  action: string;
  targetType: 'listing' | 'organization' | 'need' | 'user' | 'system';
  targetId: string;
  reason: string;
  timestamp: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  read: boolean;
  createdAt: string;
  link?: string;
}
