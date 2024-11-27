export type Service = {
    _id: string;
    name: string;
    description: string;
    image: string[];
    cost: number;
    discount: number;
    phoneNumber: string;
    proId: string;
    proTitle: string;
    proName: string;
    ratingCount: number;
    rating: number;
    reviewCount: number;
    isServiceVerified: boolean;
    location: {
      coordinates: number[];
      name: string;
      type: string;
    };
    maxServiceDistance: number;
    status: string;
    typeOfService: string;
    categoryId: number;
    tags: string[];
    addOns: Array<{
      name: string;
      description: string;
      imageUrl: string;
      cost: number;
      count: number | null;
      _id: string;
    }>;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  
  export type IUserProfile = {
      fcmToken?: string;
      name?: string;
      email?: string;
      phoneNumber: string;
      password?: string;
      dob?: any;
      gender?: string;
      location?: Record<string, any>;
      isUserPro?: boolean;
      isUserVerified?: boolean;
      coins?: number;
      profilePicture?: string;
      address?: string;
      categoryId?: number;
      experience?: number;
      skillTitle?: string;
      description?: string;
      languages?: string[];
      city?: string;
      subSkills?: string[];
      services?: Service[];
  };