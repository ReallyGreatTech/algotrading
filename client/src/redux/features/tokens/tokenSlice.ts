import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface TokenInitialState {
  selectedToken: string;
  loading: boolean;
  tokens: string[];
  error: string;
}

const initialState: TokenInitialState = {
  selectedToken: '',
  loading: false,
  tokens: [],
  error: '',
};

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

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    updateSelectedToken: (state, action) => {
      state.selectedToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTokens.pending, (state) => {
      state.loading = true;
      console.log('fetchTokens pending');
    });
    builder.addCase(
      fetchTokens.fulfilled,
      (state, action: PayloadAction<string[]>) => {
        state.loading = false;
        state.tokens = action.payload;
        console.log('fetchTokens fulfilled', action.payload);
      }
    );
    builder.addCase(fetchTokens.rejected, (state, action) => {
      state.loading = false;
      state.tokens = [];
      state.error = action.payload as string;
      console.log('fetchTokens rejected', action.payload);
    });
  },
});

export default tokenSlice.reducer;

export const { updateSelectedToken } = tokenSlice.actions;
