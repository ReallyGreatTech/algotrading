import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from './apiClient';
import { Investor } from '../../types';

export const fetchInvestors = createAsyncThunk(
  'tokens/fetchInvestors',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get<{ results: Investor[] }>(
        '/investors'
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
