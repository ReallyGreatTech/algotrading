import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from './apiClient';

export const fetchTokens = createAsyncThunk(
  'tokens/fetchTokens',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/tokens');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loadTokens = async () => {
  const { data } = await apiClient.get<string[]>('/tokens');

  return data;
};
