import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// admin login type
interface AdminLoginType{
    userId: string
    password: string
}

export const adminLogin = createAsyncThunk(
    'auth/login',
    async({ userId, password }: AdminLoginType, { rejectWithValue }) => {
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            
            const { data } = await axios.post(`https://web-production-ff56.up.railway.app/admin/login`, 
                {
                    "phoneNumber": userId,
                    "password": password
                }, 
                config
            )

            if(data) {
                localStorage.setItem('userId', data._id)
            }
            return data
            
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
