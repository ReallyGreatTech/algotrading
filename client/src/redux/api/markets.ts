import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchMarketParams } from '../../types';
import axios from 'axios';

export const fetchMarket = createAsyncThunk(
  'market/fetchMarket',
  async (params: FetchMarketParams = {}, { rejectWithValue }) => {
    try {
      const results = await axios.get('http://3.76.134.149:8000/api/markets', {
        params,
      });
      return results.data.results;
    } catch (error) {
      rejectWithValue('Something went wrong while fetching the markets');
    }
  }
);
