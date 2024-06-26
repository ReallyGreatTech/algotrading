import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from './apiClient';
import { Position } from '../../types';

export const fetchPositions = createAsyncThunk(
  'tokens/fetchPositions',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get<{ results: Position[] }>(
        '/positions'
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
