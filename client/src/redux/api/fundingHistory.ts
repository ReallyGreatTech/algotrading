import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  FetchFundingHistoryResponse,
  FundingHistory,
  RowParams,
} from '../../types';

export const fetchFundingHistory = createAsyncThunk<
  FundingHistory[],
  string,
  { rejectValue: string }
>('fundingHistory/fetchFundingHistory', async (token, { rejectWithValue }) => {
  try {
    const response = await axios.get<FetchFundingHistoryResponse>(
      'http://3.76.134.149:8000/api/funding-history',
      {
        params: { token },
      }
    );
    return response.data.results;
  } catch (error) {
    return rejectWithValue('Failed to fetch funding history');
  }
});

export const fetchSelectedFundingHistory = createAsyncThunk(
  'selectedFundingHistory/fetchselectedFundingHistory',
  async ({ token, exchange }: RowParams, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'http://3.76.134.149:8000/api/funding-history',
        {
          params: {
            token,
            exchange,
          },
        }
      );

      return response.data.results;
    } catch (error) {
      rejectWithValue(
        'Something went wrong while fetching getting the selected funding history data.'
      );
    }
  }
);
