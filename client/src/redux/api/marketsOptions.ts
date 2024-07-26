import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from './apiClient';

export const fetchMarketOptions = createAsyncThunk(
  'market/fetchMarketOptions',
  async (_, { rejectWithValue }) => {
    try {
      const results = await apiClient.get('/markets/options');
      return results.data;
    } catch (error) {
      rejectWithValue('Something went wrong while fetching the markets');
    }
  }
);
