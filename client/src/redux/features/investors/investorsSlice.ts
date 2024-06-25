import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Investor } from '../../../types';
import { fetchInvestors } from '../../api/investors';

interface InvestorsState {
  loading: boolean;
  data: Investor[];
  error: string;
}

const initialState: InvestorsState = {
  loading: false,
  data: [],
  error: '',
};

const investorsSlice = createSlice({
  name: 'investors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInvestors.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchInvestors.fulfilled,
      (state, action: PayloadAction<{ results: Investor[] }>) => {
		console.log(action.payload)
        state.data = action.payload.results;
        state.loading = false;
      }
    );
    builder.addCase(fetchInvestors.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload as string;
    });
  },
});

export default investorsSlice.reducer;
