import {
  CreatePositionMonitorFormData,
  PositionMonitor,
} from './../../types/index';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiClient } from './apiClient';
import { toast } from 'react-toastify';

export const createPositionMonitor = createAsyncThunk(
  'createPositionMonitor',

  async (
    payload: { data: CreatePositionMonitorFormData },
    { rejectWithValue }
  ) => {
    try {
      const results = await apiClient.post<PositionMonitor>(
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

export const fetchPositionMonitors = createAsyncThunk(
  'fetchPositionMonitor',

  async (_, { rejectWithValue }) => {
    try {
      const results = await apiClient.get<{ results: PositionMonitor[] }>(
        `https://dev-api-algo.reallygreattech.com/api/monitors/positions/`
      );

      return results.data;
    } catch (error) {
      rejectWithValue(
        'Something went wrong while fetching the position monitors'
      );
    }
  }
);

export const deletePositionMonitors = createAsyncThunk(
  "positionMonitors/deletePositionMonitor",
  async (payload: { id: number }, { rejectWithValue }) => {
    try {
      const results = await apiClient.delete<PositionMonitor>(
        `https://dev-api-algo.reallygreattech.com/api/monitors/positions/${payload.id}`
      );
      return results.data;
    } catch (error) {
      return rejectWithValue(
        "Something went wrong while deleting the given position monitor."
      );
    }
  }
);