// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { updateUserProfile } from "./updateProfileActions";
// import { UserProfile } from "../../types";

// type UserProfileProps = {
//     loading: boolean,
//     userInfo: UserProfile | null ,
//     error: string | null,
//     success: boolean
// }

// const initialState: UserProfileProps = {
//     loading: false,
//     userInfo: null,
//     error: null,
//     success: false
// }

// const updateProfileSlice = createSlice({
//     name: 'updateProfile',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         // user profile update
//         builder.addCase(updateUserProfile.pending, (state) => {
//             state.loading = true;
//         })
//         builder.addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<any>) => {
//             state.loading = false;
//             state.userInfo = action.payload;
//         })
//         builder.addCase(updateUserProfile.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.error.message || 'Failed to update user';
//         });
//     }
// })

// export default updateProfileSlice.reducer;