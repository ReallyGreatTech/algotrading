import { createSlice } from '@reduxjs/toolkit';
import { PositionMonitor } from '../../../types';
import {
  createPositionMonitor,
  deletePositionMonitors,
  fetchPositionMonitors,
} from '../../api/position-monitors';

interface PositionMonitorsState {
  loading: boolean;
  isPending: boolean;
  data: PositionMonitor[];
}

const initialState: PositionMonitorsState = {
  loading: false,
  isPending: false,
  data: [],
};

const positionMonitorsSlice = createSlice({
  name: 'positionMonitors',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createPositionMonitor.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(createPositionMonitor.rejected, (state) => {
      state.isPending = false;
      state.loading = false;
    });
    builder.addCase(createPositionMonitor.fulfilled, (state, action) => {
      state.data.push(action.payload as PositionMonitor);

      state.isPending = false;
    });
    builder.addCase(fetchPositionMonitors.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPositionMonitors.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchPositionMonitors.fulfilled, (state, action) => {
      state.data = (action.payload?.results as PositionMonitor[]) ?? [];

      state.loading = false;
    });
    builder.addCase(deletePositionMonitors.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(deletePositionMonitors.rejected, (state) => {
      state.isPending = false;
    });
    builder.addCase(deletePositionMonitors.fulfilled, (state, action) => {
      const monitor = action.payload as PositionMonitor;
      state.data = state.data.filter((m) => m.id !== monitor.id);

      state.isPending = false;
    });
  },
});

export default positionMonitorsSlice.reducer;
