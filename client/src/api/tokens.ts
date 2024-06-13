import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTokens = createAsyncThunk(
  'tokens/fetchTokens',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('http://3.76.134.149:8000/api/tokens');
      return data;
    } catch (err) {
      rejectWithValue('Something went wrong.');
    }
  }
);
