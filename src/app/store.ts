import { configureStore } from '@reduxjs/toolkit';
import authReducers from '../common/utils/authentication/adminSlice'

export const store = configureStore({
    reducer: {
        auth: authReducers
    }
})