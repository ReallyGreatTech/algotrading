import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  time: '1H',
  timeRange: '1D',
};

const timeFilterSlice = createSlice({
  name: 'timeFilter',
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      state.time = action.payload;
    },
    updateTimeRange: (state, action) => {
      state.timeRange = action.payload;
    },
  },
});

export default timeFilterSlice.reducer;
export const { updateFilter, updateTimeRange } = timeFilterSlice.actions;
