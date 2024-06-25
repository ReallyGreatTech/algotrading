import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchMarketParams } from '../../types';
import { apiClient } from './apiClient';

export const fetchMarket = createAsyncThunk(
  'market/fetchMarket',
  async (params: FetchMarketParams = {}, { rejectWithValue }) => {
    try {
      const results = await apiClient.get('/markets', {
        params,
      });
      return results.data.results;
    } catch (error) {
      rejectWithValue('Something went wrong while fetching the markets');
    }
  }
);
