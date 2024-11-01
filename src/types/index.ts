export type UserProfile = {
    fcmToken?: string;
    name?: string;
    email?: string;
    phoneNumber: string;
    password?: string;
    dob?: string; // Alternatively, Date if you're parsing it as a Date object
    gender?: string;
    location?: Record<string, any>; // Replace `any` with specific fields if known
    isUserPro?: string;
    isUserVerified?: string;
    coins?: number;
    profilePicture?: string ;
    address?: string;
    categoryId?: number;
    experience?: number;
    skillTitle?: string;
    description?: string;
    languages?: string[];
    city?: string;
    subSkills?: string[];
};
  