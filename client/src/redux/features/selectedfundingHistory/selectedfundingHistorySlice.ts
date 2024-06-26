import { createSlice } from '@reduxjs/toolkit';
import { SelectedFundingHistoryState } from '../../../types';
import { fetchSelectedFundingHistory } from '../../api/fundingHistory';

const initialState = {
  loading: false,
  data: [],
  error: '',
} as SelectedFundingHistoryState;

const selectedFundingHistory = createSlice({
  name: 'selectedFundingHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSelectedFundingHistory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSelectedFundingHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(fetchSelectedFundingHistory.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error as string;
    });
  },
});

export default selectedFundingHistory.reducer;
