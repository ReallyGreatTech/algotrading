import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Position } from '../../../types';
import { fetchSubPositions } from '../../api/positions';

interface SubPositionsState {
  loading: boolean;
  data: Position[];
  error: string;
}

const initialState: SubPositionsState = {
  loading: false,
  data: [],
  error: '',
};

const subPositionsSlice = createSlice({
  name: 'subPositions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSubPositions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchSubPositions.fulfilled,
      (state, action: PayloadAction<{ results: Position[] }>) => {
        state.data = action.payload.results;
        state.loading = false;
      }
    );
    builder.addCase(fetchSubPositions.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload as string;
    });
  },
});

export default subPositionsSlice.reducer;
