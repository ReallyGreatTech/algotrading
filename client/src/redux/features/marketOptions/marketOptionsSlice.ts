import { createSlice } from '@reduxjs/toolkit';
import { fetchMarketOptions } from '../../api/marketsOptions';
import { MarketOption } from '../../../types';

interface MarketOptionsState {
  loading: boolean;
  data: MarketOption[];
  error: string;
}

const initialState: MarketOptionsState = {
  loading: false,
  data: [],
  error: '',
};

const marketOptionsSlice = createSlice({
  name: 'marketOptions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMarketOptions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMarketOptions.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchMarketOptions.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload as string;
    });
  },
});

export default marketOptionsSlice.reducer;
