import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InvestorAction } from '../../../types';
import { fetchInvestorActions } from '../../api/investorActions';

interface InvestorActionsState {
  loading: boolean;
  data: InvestorAction[];
  error: string;
}

const initialState: InvestorActionsState = {
  loading: false,
  data: [],
  error: '',
};

export const investorActionsSlice = createSlice({
  name: 'fundingHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInvestorActions.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(
      fetchInvestorActions.fulfilled,
      (state, action: PayloadAction<{ results: InvestorAction[] }>) => {
        state.loading = false;
        state.data = action.payload.results || [];
        state.error = '';
      }
    );
    builder.addCase(fetchInvestorActions.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = 'Failed to fetch data';
    });
  },
});

export default investorActionsSlice.reducer;
