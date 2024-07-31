import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  FetchFundingHistoryResponse,
  FundingHistory,
  RowParams,
} from '../../types';
import { apiClient } from './apiClient';

// function getFromDateTime(dateRange: number) {
//   const fromDateTime = new Date();
//   fromDateTime.setDate(fromDateTime.getDate() - dateRange);
//   return formatDateTime(fromDateTime);
// }
export const fetchFundingHistory = createAsyncThunk<
  FundingHistory[],
  { token: string },
  { rejectValue: string }
>('fundingHistory/fetchFundingHistory', async ({token}, { rejectWithValue }) => {
  try {
    
    // const fromDateTime = getFromDateTime(dateRange);
    const response = await apiClient.get<FetchFundingHistoryResponse>(
      '/funding-history',
      {
        params: {
          token
        },
      }
    );
    return response.data.results;
  } catch (error) {
    return rejectWithValue('Failed to fetch funding history');
  }
});

export const fetchSelectedFundingHistory = createAsyncThunk(
  'selectedFundingHistory/fetchselectedFundingHistory',
  async ({ token, exchange, from_datetime }: RowParams, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/funding-history', {
        params: {
          token,
          exchange,
          from_datetime
        },
      });

      return response.data.results;
    } catch (error) {
      rejectWithValue(
        'Something went wrong while fetching getting the selected funding history data.'
      );
    }
  }
);
