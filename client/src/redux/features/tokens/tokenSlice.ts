import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TokenInitialState } from '../../../types';
import { fetchTokens } from '../../api/tokens';

const initialState: TokenInitialState = {
  selectedToken: '',
  loading: false,
  tokens: [],
  error: '',
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    updateSelectedToken: (state, action) => {
      state.selectedToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTokens.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchTokens.fulfilled,
      (state, action: PayloadAction<string[]>) => {
        state.loading = false;
        state.tokens = action.payload;
      }
    );
    builder.addCase(fetchTokens.rejected, (state, action) => {
      state.loading = false;
      state.tokens = [];
      state.error = action.payload as string;
    });
  },
});

export default tokenSlice.reducer;

export const { updateSelectedToken } = tokenSlice.actions;
