import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from './apiClient';
import { MarketOption } from '../../types';

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

export const _fetchMarketOptions = async () => {
  const { data } = await apiClient.get<MarketOption[]>('/markets/options');

  return data;
};
