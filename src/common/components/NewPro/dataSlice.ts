import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  isBoolean: boolean;
  text: string;
}

const initialState: DataState = {
  isBoolean: false,
  text: '',
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updateBoolean: (state, action: PayloadAction<boolean>) => {
      state.isBoolean = action.payload;
    },
    updateText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});

export const { updateBoolean, updateText } = dataSlice.actions;
export default dataSlice.reducer;
