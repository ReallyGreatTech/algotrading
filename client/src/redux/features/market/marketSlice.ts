import { createSlice } from '@reduxjs/toolkit';
import { fetchMarket } from '../../api/markets';

const initialState = {
  loading: false,
  data: [],
  error: '',
};

const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMarket.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMarket.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchMarket.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload as string;
    });
  },
});

export default marketSlice.reducer;
