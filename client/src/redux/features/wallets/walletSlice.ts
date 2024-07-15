import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Wallet } from '../../../types';
import { fetchTokens } from '../../api/tokens';
import { addWallet, deleteWallet, fetchWallets } from '../../api/wallets';


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
    builder.addCase(addWallet.fulfilled, (state,action) => {
        state.data.push(action.payload)
    })
    builder.addCase(deleteWallet.fulfilled, (state, action) => {
      
      state.data = state.data.filter((wallet) => wallet.id !== action.payload.id)
      console.log(action.payload)
    })
  },
  
});

export default walletsSlice.reducer;
