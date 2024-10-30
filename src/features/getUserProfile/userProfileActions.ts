import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserProfile } from "../../types";
import { backendUrl } from "../../common/utils/authentication/adminActions";

interface UserSearchDataType {
    phoneNumber: string
}

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
            localStorage.setItem('userPhoneNumber', data.phoneNumber);

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
            const { data } = await axios.post(`${backendUrl}/user/update`, {
                name,
                email,
                phoneNumber,
                profilePicture,
                isUserPro,
                isUserVerified
            }, config)

            return data
        }
        catch (error: any) {
            rejectWithValue(error.message)
        }
    }
)