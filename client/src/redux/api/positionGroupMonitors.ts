import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from './apiClient';
import {
  EditPositionGroupMonitorData,
  PositionGroupMonitor,
} from '../../types';

const POSITION_MONITORS_URL =
  'https://dev-api-algo.reallygreattech.com/api/monitors/position-groups';

export const createPositionGroupMonitor = createAsyncThunk(
  'createPositionMonitor',
  async (
    payload: { data: EditPositionGroupMonitorData },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await apiClient.post<PositionGroupMonitor>(
        POSITION_MONITORS_URL,
        payload.data
      );

      return data;
    } catch (error) {
      rejectWithValue(
        'An error occured while creating a position group monitor.'
      );
    }
  }
);

export const fetchPositionGroupMonitors = createAsyncThunk(
  'fetchPositionMonitors',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get<{ results: PositionGroupMonitor[] }>(
        POSITION_MONITORS_URL
      );

      return data.results;
    } catch {
      rejectWithValue(
        'An error occured while fetching the position group monitors.'
      );
    }
  }
);

export const getPositionGroupMonitor = createAsyncThunk(
  'fetchPositionMonitor',
  async (payload: { id: number }, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get<PositionGroupMonitor>(
        `${POSITION_MONITORS_URL}/${payload.id}/`
      );

      return data;
    } catch {
      rejectWithValue(
        'An error occured while looking up the position group monitor.'
      );
    }
  }
);

export const updatePositionGroupMonitor = createAsyncThunk(
  'updatePositionGroupMonitor',
  async (payload: { id: number; data: unknown }, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.patch<PositionGroupMonitor>(
        `${POSITION_MONITORS_URL}/${payload.id}/`,
        payload.data
      );

      return data;
    } catch {
      rejectWithValue(
        'An error occured while updating the position group monitor.'
      );
    }
  }
);

export const deletePositionGroupMonitor = createAsyncThunk(
  'deletePositionMonitor',
  async (payload: { id: number }, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.delete(
        `${POSITION_MONITORS_URL}/${payload.id}/`
      );

      return data;
    } catch {
      rejectWithValue(
        'An error occured while deleting the position group monitor.'
      );
    }
  }
);
