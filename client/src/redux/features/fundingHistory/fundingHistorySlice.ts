import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FundingHistory, FundingHistoryState } from '../../../types';
import { fetchFundingHistory } from '../../api/fundingHistory';

const initialState: FundingHistoryState = {
  loading: false,
  data: [],
  error: '',
};

const fundingHistorySlice = createSlice({
  name: 'fundingHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFundingHistory.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(
      fetchFundingHistory.fulfilled,
      (state, action: PayloadAction<FundingHistory[]>) => {
        state.loading = false;
        state.data = action.payload || [];
        state.error = '';
      }
    );
    builder.addCase(fetchFundingHistory.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload || 'Failed to fetch data';
    });
  },
});

export default fundingHistorySlice.reducer;
