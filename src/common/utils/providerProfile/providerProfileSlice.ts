// src/store/numberSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for the mobile number
const initialState = {
  mobileNumber: '', // This will store the mobile number as a string
};

// Create a slice
const numberSlice = createSlice({
  name: 'number',
  initialState,
  reducers: {
    // Action to set the mobile number
    setMobileNumber: (state, action) => {
      state.mobileNumber = action.payload; // Update the mobile number with the action payload
    },
    // Action to clear the mobile number
    clearMobileNumber: (state) => {
      state.mobileNumber = ''; // Clear the mobile number
    },
  },
});

// Export the actions
export const { setMobileNumber, clearMobileNumber } = numberSlice.actions;

// Export the reducer
export default numberSlice.reducer;