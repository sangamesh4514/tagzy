import { configureStore } from '@reduxjs/toolkit';
import authReducers from '../common/utils/authentication/adminSlice'
import userProfileReducer from '../features/getUserProfile/userProfileSlice'

export const store = configureStore({
    reducer: {
        auth: authReducers,
        userProfile: userProfileReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch