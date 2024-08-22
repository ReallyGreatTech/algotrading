import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from './apiClient';

export const createPositionMonitor = createAsyncThunk(
  '/monitors/positions/',

  async (payload: { data: unknown }, { rejectWithValue }) => {
    console.log(JSON.stringify(payload));

    try {
      const results = await apiClient.post(
        `https://dev-api-algo.reallygreattech.com/api/monitors/positions/`,
        payload
      );
      console.log(results);
      return results.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(
        'Something went wrong while creating the position Monitor'
      );
    }
  }
);
