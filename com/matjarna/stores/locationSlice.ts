import {createSlice} from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    countryCode: '',
  },
  reducers: {
    setLocation: (state, action) => {
      state.countryCode = action.payload;
    },
    deleteLocation: state => {
      state.countryCode = '';
    },
  },
});
export const {setLocation, deleteLocation} = locationSlice.actions;
export default locationSlice.reducer;
