import { configureStore } from '@reduxjs/toolkit';
import authReducers from '../features/auth/adminSlice'

export const store = configureStore({
    reducer: {
        auth: authReducers
    }
})