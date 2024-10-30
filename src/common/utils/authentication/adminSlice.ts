import { createSlice } from "@reduxjs/toolkit";
import { adminLogin } from "./adminActions";

type LoginState = {
    loading: boolean,
    userInfo: object | null,
    error: any,
    success: boolean
}

const initialState: LoginState = {
    loading: false,
    userInfo: null,
    error: null,
    success: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // user logout
        logout: (state) => {
            if(localStorage.getItem('userId')) {
                localStorage.removeItem('userId')
                state.loading = false
                state.userInfo = null
                state.error = null
                state.success = false
            }
        }
    },
    extraReducers: (builder) => {
        // usrer login
        builder.addCase(adminLogin.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(adminLogin.fulfilled, (state, action) => {
            state.loading = false
            state.userInfo = action.payload
            state.success = true
        })
        builder.addCase(adminLogin.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer;
