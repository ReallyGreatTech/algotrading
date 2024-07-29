import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PositionsGroup } from '../../../types';
// import { fetchPositions, updatePosition } from '../../api/positions';
import { fetchPositions } from '../../api/positions';

interface PositionsState {
  loading: boolean;
  data: PositionsGroup[];
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
      (state, action: PayloadAction<PositionsGroup[]>) => {
        state.data = action.payload;
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
