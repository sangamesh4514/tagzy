import { configureStore } from '@reduxjs/toolkit';
import authReducers from '../utils/authentication/adminSlice'

export const store = configureStore({
    reducer: {
        auth: authReducers,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch