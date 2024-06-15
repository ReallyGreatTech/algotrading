import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  time: "1Y",
};

const timeFilterSlice = createSlice({
  name: "timeFilter",
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      state.time = action.payload;
    },
  },
});

export default timeFilterSlice.reducer;
export const { updateFilter } = timeFilterSlice.actions;
