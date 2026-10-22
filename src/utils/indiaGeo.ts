export interface StateInfo {
  name: string;
  code: string;
  zone: 'North' | 'South' | 'East' | 'West' | 'Central' | 'Northeast';
  capital: string;
  districts: string[];
  lat: number;
  lng: number;
}

export const INDIA_STATES_DATA: StateInfo[] = [
  {
    name: 'Andhra Pradesh',
    code: 'AP',
    zone: 'South',
    capital: 'Amaravati',
    districts: ['Visakhapatnam', 'Vijayawada (NTR)', 'Guntur', 'Tirupati', 'Kurnool', 'Nellore', 'Anantapur', 'Kakinada', 'Kadapa', 'Srikakulam'],
    lat: 15.9129,
    lng: 79.7400
  },
  {
    name: 'Telangana',
    code: 'TG',
    zone: 'South',
    capital: 'Hyderabad',
    districts: ['Hyderabad', 'Ranga Reddy', 'Medchal-Malkajgiri', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar', 'Mahabubnagar', 'Nalgonda'],
    lat: 18.1124,
    lng: 79.0193
  },
  {
    name: 'Tamil Nadu',
    code: 'TN',
    zone: 'South',
    capital: 'Chennai',
    districts: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Vellore', 'Erode', 'Thanjavur'],
    lat: 11.1271,
    lng: 78.6569
  },
  {
    name: 'Karnataka',
    code: 'KA',
    zone: 'South',
    capital: 'Bengaluru',
    districts: ['Bengaluru Urban', 'Mysuru', 'Hubballi-Dharwad', 'Mangaluru', 'Belagavi', 'Kalaburagi', 'Ballari', 'Davangere', 'Shivamogga'],
    lat: 15.3173,
    lng: 75.7139
  },
  {
    name: 'Kerala',
    code: 'KL',
    zone: 'South',
    capital: 'Thiruvananthapuram',
    districts: ['Thiruvananthapuram', 'Ernakulam (Kochi)', 'Kozhikode', 'Thrissur', 'Kollam', 'Palakkad', 'Malappuram', 'Kannur', 'Alappuzha'],
    lat: 10.8505,
    lng: 76.2711
  },
  {
    name: 'Maharashtra',
    code: 'MH',
    zone: 'West',
    capital: 'Mumbai',
    districts: ['Mumbai City', 'Mumbai Suburban', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Chhatrapati Sambhajinagar', 'Solapur', 'Kolhapur', 'Amravati'],
    lat: 19.7515,
    lng: 75.7139
  },
  {
    name: 'Gujarat',
    code: 'GJ',
    zone: 'West',
    capital: 'Gandhinagar',
    districts: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar', 'Junagadh', 'Kutch'],
    lat: 22.2587,
    lng: 71.1924
  },
  {
    name: 'Rajasthan',
    code: 'RJ',
    zone: 'North',
    capital: 'Jaipur',
    districts: ['Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer', 'Udaipur', 'Bhilwara', 'Alwar', 'Bharatpur'],
    lat: 27.0238,
    lng: 74.2179
  },
  {
    name: 'Delhi',
    code: 'DL',
    zone: 'North',
    capital: 'New Delhi',
    districts: ['Central Delhi', 'New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi', 'North East Delhi', 'South West Delhi'],
    lat: 28.6139,
    lng: 77.2090
  },
  {
    name: 'Uttar Pradesh',
    code: 'UP',
    zone: 'North',
    capital: 'Lucknow',
    districts: ['Lucknow', 'Kanpur Nagar', 'Varanasi', 'Prayagraj', 'Agra', 'Meerut', 'Noida (Gautam Buddha Nagar)', 'Ghaziabad', 'Gorakhpur', 'Bareilly'],
    lat: 26.8467,
    lng: 80.9462
  },
  {
    name: 'West Bengal',
    code: 'WB',
    zone: 'East',
    capital: 'Kolkata',
    districts: ['Kolkata', 'North 24 Parganas', 'South 24 Parganas', 'Howrah', 'Hooghly', 'Darjeeling', 'Siliguri', 'Paschim Bardhaman', 'Murshidabad'],
    lat: 22.9868,
    lng: 87.8550
  },
  {
    name: 'Assam',
    code: 'AS',
    zone: 'Northeast',
    capital: 'Dispur (Guwahati)',
    districts: ['Kamrup Metropolitan (Guwahati)', 'Dibrugarh', 'Silchar (Cachar)', 'Jorhat', 'Nagaon', 'Tinsukia', 'Tezpur (Sonitpur)'],
    lat: 26.2006,
    lng: 92.9376
  },
  {
    name: 'Madhya Pradesh',
    code: 'MP',
    zone: 'Central',
    capital: 'Bhopal',
    districts: ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna', 'Ratlam'],
    lat: 22.9734,
    lng: 78.6569
  },
  {
    name: 'Jammu and Kashmir',
    code: 'JK',
    zone: 'North',
    capital: 'Srinagar / Jammu',
    districts: ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Udhampur', 'Kathua', 'Pulwama'],
    lat: 33.7782,
    lng: 76.5762
  },
  {
    name: 'Odisha',
    code: 'OD',
    zone: 'East',
    capital: 'Bhubaneswar',
    districts: ['Khordha (Bhubaneswar)', 'Cuttack', 'Ganjam', 'Sundargarh (Rourkela)', 'Puri', 'Sambalpur', 'Balasore'],
    lat: 20.9517,
    lng: 85.0985
  },
  {
    name: 'Bihar',
    code: 'BR',
    zone: 'East',
    capital: 'Patna',
    districts: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga', 'Bihar Sharif'],
    lat: 25.0961,
    lng: 85.3131
  },
  {
    name: 'Punjab',
    code: 'PB',
    zone: 'North',
    capital: 'Chandigarh',
    districts: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali (SAS Nagar)', 'Hoshiarpur'],
    lat: 31.1471,
    lng: 75.3412
  },
  {
    name: 'Haryana',
    code: 'HR',
    zone: 'North',
    capital: 'Chandigarh',
    districts: ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Karnal', 'Hisar', 'Rohtak', 'Panchkula'],
    lat: 29.0588,
    lng: 76.0856
  },
  {
    name: 'Uttarakhand',
    code: 'UK',
    zone: 'North',
    capital: 'Dehradun',
    districts: ['Dehradun', 'Haridwar', 'Nainital (Haldwani)', 'Udham Singh Nagar', 'Almora', 'Rishikesh'],
    lat: 30.0668,
    lng: 79.0193
  },
  {
    name: 'Jharkhand',
    code: 'JH',
    zone: 'East',
    capital: 'Ranchi',
    districts: ['Ranchi', 'East Singhbhum (Jamshedpur)', 'Dhanbad', 'Bokaro', 'Deoghar', 'Hazaribagh'],
    lat: 23.6102,
    lng: 85.2799
  },
  {
    name: 'Chhattisgarh',
    code: 'CG',
    zone: 'Central',
    capital: 'Raipur',
    districts: ['Raipur', 'Durg-Bhilai', 'Bilaspur', 'Korba', 'Rajnandgaon', 'Jagdalpur'],
    lat: 21.2787,
    lng: 81.8661
  },
  {
    name: 'Goa',
    code: 'GA',
    zone: 'West',
    capital: 'Panaji',
    districts: ['North Goa (Panaji, Mapusa)', 'South Goa (Margao, Vasco)'],
    lat: 15.2993,
    lng: 74.1240
  },
  {
    name: 'Himachal Pradesh',
    code: 'HP',
    zone: 'North',
    capital: 'Shimla',
    districts: ['Shimla', 'Kangra (Dharamshala)', 'Mandi', 'Solan', 'Kullu', 'Sirmaur'],
    lat: 31.1048,
    lng: 77.1734
  },
  {
    name: 'Tripura',
    code: 'TR',
    zone: 'Northeast',
    capital: 'Agartala',
    districts: ['West Tripura (Agartala)', 'Gomati', 'South Tripura', 'North Tripura'],
    lat: 23.9408,
    lng: 91.9882
  },
  {
    name: 'Meghalaya',
    code: 'ML',
    zone: 'Northeast',
    capital: 'Shillong',
    districts: ['East Khasi Hills (Shillong)', 'West Garo Hills (Tura)', 'Ri-Bhoi'],
    lat: 25.4670,
    lng: 91.3662
  },
  {
    name: 'Manipur',
    code: 'MN',
    zone: 'Northeast',
    capital: 'Imphal',
    districts: ['Imphal West', 'Imphal East', 'Thoubal', 'Churachandpur'],
    lat: 24.6637,
    lng: 93.9063
  },
  {
    name: 'Nagaland',
    code: 'NL',
    zone: 'Northeast',
    capital: 'Kohima',
    districts: ['Kohima', 'Dimapur', 'Mokokchung', 'Wokha'],
    lat: 26.1584,
    lng: 94.5624
  },
  {
    name: 'Mizoram',
    code: 'MZ',
    zone: 'Northeast',
    capital: 'Aizawl',
    districts: ['Aizawl', 'Lunglei', 'Champhai'],
    lat: 23.1645,
    lng: 92.9376
  },
  {
    name: 'Arunachal Pradesh',
    code: 'AR',
    zone: 'Northeast',
    capital: 'Itanagar',
    districts: ['Papum Pare (Itanagar)', 'Changlang', 'West Kameng', 'Pasighat'],
    lat: 28.2180,
    lng: 94.7278
  },
  {
    name: 'Sikkim',
    code: 'SK',
    zone: 'Northeast',
    capital: 'Gangtok',
    districts: ['Gangtok', 'Namchi', 'Gyalshing', 'Mangan'],
    lat: 27.5330,
    lng: 88.5122
  },
  {
    name: 'Puducherry',
    code: 'PY',
    zone: 'South',
    capital: 'Puducherry',
    districts: ['Puducherry', 'Karaikal', 'Mahe', 'Yanam'],
    lat: 11.9416,
    lng: 79.8083
  },
  {
    name: 'Chandigarh',
    code: 'CH',
    zone: 'North',
    capital: 'Chandigarh',
    districts: ['Chandigarh'],
    lat: 30.7333,
    lng: 76.7794
  },
  {
    name: 'Ladakh',
    code: 'LA',
    zone: 'North',
    capital: 'Leh',
    districts: ['Leh', 'Kargil'],
    lat: 34.1526,
    lng: 77.5771
  },
  {
    name: 'Andaman and Nicobar Islands',
    code: 'AN',
    zone: 'South',
    capital: 'Port Blair',
    districts: ['South Andaman (Port Blair)', 'North and Middle Andaman', 'Nicobar'],
    lat: 11.7401,
    lng: 92.6586
  }
];

// Calculate Haversine distance in km between two lat/lng points
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// Jitter coordinates by ~1-2km to protect vulnerable individuals' exact sleeping/meeting locations
export function getDignifiedApproximateLocation(lat: number, lng: number): { lat: number; lng: number } {
  // Offsets by roughly 0.008 to 0.015 degrees (~1-1.5 km)
  const angle = Math.random() * Math.PI * 2;
  const radius = 0.009 + Math.random() * 0.005;
  return {
    lat: +(lat + radius * Math.cos(angle)).toFixed(4),
    lng: +(lng + radius * Math.sin(angle)).toFixed(4)
  };
}
