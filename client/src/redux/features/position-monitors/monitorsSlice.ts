import { createSlice } from '@reduxjs/toolkit';
import { PositionMonitor } from '../../../types';
import {
  createPositionMonitor,
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
      state.isPending = true;
    });
    builder.addCase(fetchPositionMonitors.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchPositionMonitors.fulfilled, (state, action) => {
      state.data = action.payload as PositionMonitor[];

      state.loading = false;
    });
  },
});

export default positionMonitorsSlice.reducer;
