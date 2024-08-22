import { CreatePositionMonitorFormData } from './../../types/index';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiClient } from './apiClient';
import { toast } from 'react-toastify';

export const createPositionMonitor = createAsyncThunk(
  '/monitors/positions/',

  async (
    payload: { data: CreatePositionMonitorFormData },
    { rejectWithValue }
  ) => {
    try {
      const results = await apiClient.post(
        `https://dev-api-algo.reallygreattech.com/api/monitors/positions/`,
        payload.data
      );
      toast.success(`Monitor created successfully.`);
      return results.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(
        'Something went wrong while creating the position Monitor'
      );
    }
  }
);
