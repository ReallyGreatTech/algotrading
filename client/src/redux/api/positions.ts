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

interface SubPositionsQueryParams {
  token?: string;
}

export const fetchSubPositions = createAsyncThunk(
  'tokens/fetchSubPositions',
  async (params: SubPositionsQueryParams = {}, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get<{ results: Position[] }>(
        '/positions',
        { params }
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
