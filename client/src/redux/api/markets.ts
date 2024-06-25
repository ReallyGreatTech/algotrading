import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchMarketParams } from '../../types';
import axios from 'axios';

export const fetchMarket = createAsyncThunk(
  'market/fetchMarket',
  async (params: FetchMarketParams = {}) => {
    console.log(params);
    try {
      const results = await axios.get('http://3.76.134.149:8000/api/markets', {
        params,
      });
      return results.data.results;
    } catch (error) {
      console.log(error);
    }
  }
);
