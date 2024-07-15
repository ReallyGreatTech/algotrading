import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Wallet } from '../../../types';
import { fetchTokens } from '../../api/tokens';
import {
  addWallet,
  deleteWallet,
  fetchWallets,
  updateWallet,
} from '../../api/wallets';

interface WalletsState {
  isPending: boolean;
  loading: boolean;
  data: Wallet[];
  error: string;
}

const initialState: WalletsState = {
  loading: false,
  isPending: false,
  data: [],
  error: '',
};

const walletsSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Wallet
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

    // Add Wallet
    builder.addCase(addWallet.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
    builder.addCase(deleteWallet.fulfilled, (state, action) => {
      state.data = state.data.filter(
        (wallet) => wallet.id !== action.payload.id
      );
      console.log(action.payload);
    });

    // Update Wallet
    builder.addCase(updateWallet.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(
      updateWallet.fulfilled,
      (state, action: PayloadAction<Wallet | undefined>) => {
        const updatedWallet = action.payload;

        const index = state.data.findIndex(
          (wallet) => wallet.id === updatedWallet?.id
        );
        if (updatedWallet && index > -1) state.data[index] = updatedWallet;

        state.isPending = false;
      }
    );
    builder.addCase(updateWallet.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isPending = false;
    });
  },
});

export default walletsSlice.reducer;
