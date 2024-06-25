import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Wallet } from '../../../types';
import { fetchTokens } from '../../api/tokens';
import { fetchWallets } from '../../api/wallets';

interface WalletsState {
  loading: boolean;
  data: Wallet[];
  error: string;
}

const initialState: WalletsState = {
  loading: false,
  data: [],
  error: '',
};

const walletsSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWallets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchWallets.fulfilled,
      (state, action: PayloadAction<{ results: Wallet[] }>) => {
        state.data = action.payload.results;
        state.loading = false;
      }
    );
    builder.addCase(fetchTokens.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload as string;
    });
  },
});

export default walletsSlice.reducer;
