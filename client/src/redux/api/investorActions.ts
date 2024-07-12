import { InvestorActionQueryParams } from '../../types';
import { apiClient } from './apiClient';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchInvestorActions = createAsyncThunk(
  'market/fetchInvestorActions',
  async (params: InvestorActionQueryParams = {}, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get('/investor-actions', {
        params,
      });

      return data;
    } catch (error) {
      rejectWithValue('Something went wrong while fetching the markets');
    }
  }
);
