import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserProfile } from "../../types";
import { backendUrl } from "../../common/utils/authentication/adminActions";

// search user profile by phoneNumber
export const fetchUserByPhoneNumber = createAsyncThunk(
    'user/search',
    async(phoneNumber: string, {rejectWithValue}) => {
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
    }: IUserProfile, { rejectWithValue }) => {
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            if(phoneNumber) {
                const { data } = await axios.post(`${backendUrl}/user/update`, {
                    'name': name,
                    'email': email,
                    'phoneNumber':  phoneNumber,
                    'password': password,
                    'profilePicture': profilePicture,
                    'gender': gender,
                    'dob': dob,
                    'isUserPro': isUserPro,
                    'isUserVerified': isUserVerified
                }, config)
                console.log('user updated data', data)
            }
        }
        catch (error: any) {
            rejectWithValue(error.message)
        }
    }
)