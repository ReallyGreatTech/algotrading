import { EditPositionsFormData, NewPositionsFormData } from './../../types/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from './apiClient';
import { Position, PositionsGroup } from '../../types';

export const fetchPositions = createAsyncThunk(
  'tokens/fetchPositions',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get<PositionsGroup[]>(
        '/position-groups/'
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

export const updatePosition = createAsyncThunk(
  'positions/updatePosition',
  async (
    { id, data }: { id: number; data: EditPositionsFormData },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.patch<Position>(
        `/positions/${id}/`,
        data
      );
      return response.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        // Return the error response data
        return rejectWithValue(err.response.data);
      } else {
        // Return a generic error message
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);


export const createPosition = createAsyncThunk(
  'positions/createPosition',
  async (data: NewPositionsFormData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post<Position>('/positions/', data);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);