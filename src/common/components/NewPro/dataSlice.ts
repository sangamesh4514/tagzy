import { getLocationFromSession } from 'src/common/utils/sessionUtlis';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const savedLocation = getLocationFromSession()
interface DataState {
  isLocationFound: boolean;
  text: string;
}

const initialState: DataState = {
  isLocationFound: false || !!savedLocation,
  text: savedLocation?.name ?? '' ,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updatedLocationFound: (state, action: PayloadAction<boolean>) => {
      state.isLocationFound = action.payload;
    },
    updateText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});

export const { updatedLocationFound, updateText } = dataSlice.actions;
export default dataSlice.reducer;
