import { configureStore } from '@reduxjs/toolkit';
import authReducers from '../utils/authentication/adminSlice'
import dataReducer from '../components/NewPro/dataSlice'

export const store = configureStore({
    reducer: {
        auth: authReducers,
        data: dataReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch