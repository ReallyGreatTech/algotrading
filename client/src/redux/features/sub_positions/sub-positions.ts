import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Position } from '../../../types';
import { fetchSubPositions, updatePosition } from '../../api/positions';
import { AppDispatch } from '../../store';

interface SubPositionsState {
  selectedPosition?: Position;
  loading: boolean;
  data: Position[];
  error: string;
}

const initialState: SubPositionsState = {
  selectedPosition: undefined,
  loading: false,
  data: [],
  error: '',
};

const subPositionsSlice = createSlice({
  name: 'subPositions',
  initialState,
  reducers: {
    positionSelected: (state, action: PayloadAction<Position>) => {
      state.selectedPosition = action.payload;
    },
  },
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
    builder.addCase(
      updatePosition.fulfilled,
      (state, action: PayloadAction<Position>) => {
        const updatedPosition = action.payload;

        const index = state.data.findIndex((p) => p.id === updatedPosition.id);

        if (index > -1) state.data[index] = updatedPosition;
        state.selectedPosition = updatedPosition;
      }
    );
  },
});

export default subPositionsSlice.reducer;
const { positionSelected } = subPositionsSlice.actions;

export const selectPosition =
  (position: Position) => (dispatch: AppDispatch) => {
    dispatch(positionSelected(position));
  };
