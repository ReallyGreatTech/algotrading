import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Position } from '../../../types';
import { fetchPositions } from '../../api/positions';

interface PositionsState {
  loading: boolean;
  data: Position[];
  error: string;
}

const initialState: PositionsState = {
  loading: false,
  data: [],
  error: '',
};

const positionsSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPositions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchPositions.fulfilled,
      (state, action: PayloadAction<{ results: Position[] }>) => {
        state.data = action.payload.results;
        state.loading = false;
      }
    );
    builder.addCase(fetchPositions.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload as string;
    });
  },
});

export default positionsSlice.reducer;
