import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserProfile } from "../../types";
import { backendUrl } from "../../common/utils/authentication/adminActions";

interface UserSearchDataType {
    phoneNumber: string
}

// interface UserProfileUpdateType {
//     name?: string;
//     email?: string;
//     phoneNumber: string;
//     password: string
//     dob?: string; // Alternatively, Date if you're parsing it as a Date object
//     gender?: string;
//     location?: Record<string, any>; // Replace `any` with specific fields if known
//     isUserPro?: boolean;
//     isUserVerified?: boolean;
//     coins?: number;
//     profilePicture?: string ;
//     address?: string;
//     categoryId?: number;
//     experience?: number;
//     skillTitle?: string;
//     description?: string;
//     languages?: string[];
//     city?: string;
//     subSkills?: string[];
// };


// search user profile by phoneNumber
export const fetchUserByPhoneNumber = createAsyncThunk(
    'user/search',
    async({phoneNumber}: UserSearchDataType, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            console.log(phoneNumber)

            const { data } = await axios.get(`${backendUrl}/user/phoneNumber/${phoneNumber}`, config)

            if(data) {
                console.log('User Data', data)
            }

            return data
        }
        catch(error: any) {
            rejectWithValue(error.message)
        }
    }
)

// update User profile function
export const updateUserProfile = createAsyncThunk(
    'user/update',
    async({
        name,
        email,
        phoneNumber,
        password,
        gender,
        dob,
        profilePicture,
        isUserPro,
        isUserVerified
    }: UserProfile, { rejectWithValue }) => {
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            if(phoneNumber) {
                const { data } = await axios.post(`${backendUrl}/user/update`, {
                    name,
                    email,
                    phoneNumber,
                    password,
                    profilePicture,
                    gender,
                    dob,
                    isUserPro,
                    isUserVerified
                }, config)
                console.log('user updated data', data)
            }
        }
        catch (error: any) {
            rejectWithValue(error.message)
        }
    }
)