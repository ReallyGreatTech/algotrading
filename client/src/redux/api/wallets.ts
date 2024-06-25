import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from './apiClient';
import { Wallet } from '../../types';

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
