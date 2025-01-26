import { configureStore } from '@reduxjs/toolkit';
import authReducers from '../utils/authentication/adminSlice'
import dataReducer from '../components/NewPro/dataSlice'
import numberReducer from '../utils/providerProfile/providerProfileSlice'

export const store = configureStore({
    reducer: {
        auth: authReducers,
        data: dataReducer,
        providerNumber: numberReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch