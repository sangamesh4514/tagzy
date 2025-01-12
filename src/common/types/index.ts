export interface IAddon {
  name: string; //
  description: string; //
  imageUrl: string; //
  cost: number; //
  count: number | null;
  _id: string; //
}


export interface ILocation {
  coordinates: number[];
  name: string;
  type: string;
}

export interface ITimeSlot {
  start: string;
  end: string;
  _id: string;
}

export interface Service {
  _id: string; //
  name: string; //
  description: string; //
  image: string[]; //
  cost: number; //
  discount?: number | null;
  phoneNumber: string;
  proId: string;
  proTitle: string;
  proName: string;
  ratingCount: number;
  rating: number;
  reviewCount: number;
  isServiceVerified: boolean;
  location: ILocation;
  maxServiceDistance: number;
  status: string;
  typeOfService: string;
  categoryId: number;
  tags: string[];
  addOns: IAddon[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  workingDays: string[];
  timeSlots: ITimeSlot[];
}

export interface IUserProfile {
  createdAt: string;
  fcmToken?: string;
  name?: string;
  email?: string;
  phoneNumber: string;
  password?: string;
  dob?: any;
  gender?: string;
  location?: ILocation;
  isUserPro?: boolean;
  isUserVerified?: boolean;
  coins?: number;
  profilePicture?: string;
  address?: string;
  categoryId: number;
  experience?: number;
  skillTitle?: string;
  description?: string;
  languages?: string[];
  city?: string;
  subSkills?: string[];
  services?: Service[];
}

export interface CartItem {
  service: Service;
  addons: { addon: IAddon; quantity: number }[];
  selectedDate: string | null;
  selectedTimeSlot: string | null;
}

export interface Booking {
  proPhoneNumber: string;
  clientPhoneNumber: string;
  address: string;
  location: Record<string, unknown>; // Or replace with a specific type if you know the structure of 'location'
  status: string;
  dateTime: string; // Can be a Date object if parsed later
  proName: string;
  clientName: string;
  discount: number;
  cost: number;
  proId: string;
  clientId: string;
  serviceId: string;
  typeOfService: string;
  addOns: string[];
  procedure: string[];
}
