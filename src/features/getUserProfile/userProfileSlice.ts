import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchUserByPhoneNumber, updateUserProfile } from "./userProfileActions"
import { UserProfile } from "../../types"

type UserProfileProps = {
    loading: boolean,
    userInfo: UserProfile | null ,
    error: string | null,
    success: boolean
}

const initialState: UserProfileProps = {
    loading: false,
    userInfo: null,
    error: null,
    success: false
}

const userProfileSLice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // search user profile
            .addCase(fetchUserByPhoneNumber.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUserByPhoneNumber.fulfilled, (state, action: PayloadAction<UserProfile>) => {
                state.loading = false
                state.userInfo = action.payload
                state.success = true
            })
            .addCase(fetchUserByPhoneNumber.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to fetch user'
            })

            // user profile update
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update user';
            });
    }
})



export default userProfileSLice.reducer