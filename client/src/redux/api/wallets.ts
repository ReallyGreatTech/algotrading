import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from './apiClient';
import { UpdateWalletData, Wallet, WalletItem } from '../../types';

export const fetchWallets = createAsyncThunk(
  'tokens/fetchWallets',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get<{ results: Wallet[] }>('/wallets');

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addWallet = createAsyncThunk(
  'tokens/AddWallet',
  async (walletData: WalletItem, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.post('/wallets/', walletData);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateWallet = createAsyncThunk(
  'wallets/updateWallet',
  async (wallet: UpdateWalletData, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.patch<Wallet>(
        `/wallets/${wallet.id}/`,
        wallet.data
      );

      return data;
    } catch (err) {
      rejectWithValue('Something went wrong while updating the wallet.');
    }
  }
);

export const deleteWallet = createAsyncThunk(
  'tokens/deleteWallet',
  async (walletId: number, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/wallets/${walletId}`);
      return { id: walletId };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
