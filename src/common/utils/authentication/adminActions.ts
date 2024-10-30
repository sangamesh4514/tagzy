import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const backendUrl = "https://web-production-ff56.up.railway.app";

interface UserType{
    userId: string
    password: string
}

export const adminLogin = createAsyncThunk(
    'auth/login',
    async({ userId, password }: UserType, { rejectWithValue }) => {
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const { data } = await axios.post(`${backendUrl}/admin/login`, 
                {
                    "phoneNumber": userId,
                    "password": password
                }, 
                config
            )

            if(data) {
                console.log('Data of user from Action', data)
                localStorage.setItem('userId', data._id)
            }
            return data
            
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
