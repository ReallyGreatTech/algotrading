// tokenSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchTokens } from '../../../api/tokens';

interface TokenInitialState {
  loading: boolean;
  tokens: string[];
  error: string;
}

const initialState: TokenInitialState = {
  loading: false,
  tokens: [],
  error: '',
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTokens.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchTokens.fulfilled,
      (state, action: PayloadAction<string[]>) => {
        state.tokens = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchTokens.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default tokenSlice.reducer;
