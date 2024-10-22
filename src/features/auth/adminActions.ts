import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const backendUrl = "https://web-production-ff56.up.railway.app";

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
                { userId, password }, 
                config
            )

            if(data) {
                console.log(data)
                localStorage.setItem('userId', data._id)
            }
            return data
            
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
