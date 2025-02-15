import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILocation } from 'src/common/types';

const savedLocation: ILocation | null = sessionStorage.getItem            ('userLocationInfo') ? JSON.parse(sessionStorage.getItem('userLocationInfo') as string) 
: null;

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
