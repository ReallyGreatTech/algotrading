import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTokens = createAsyncThunk(
  'tokens/fetchTokens',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://3.76.134.149:8000/api/tokens');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
