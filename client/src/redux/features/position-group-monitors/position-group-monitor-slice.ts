import { createSlice } from '@reduxjs/toolkit';
import {
  createPositionGroupMonitor,
  fetchPositionGroupMonitors,
} from '../../api/positionGroupMonitors';
import { fetchPositionMonitors } from '../../api/position-monitors';

interface PositionGroupMonitorsState {
  loading: boolean;
  isPending: boolean;
  data: unknown[];
}

const initialState: PositionGroupMonitorsState = {
  loading: false,
  isPending: false,
  data: [],
};

const positionGroupMonitorSlice = createSlice({
  name: 'positionGroupMonitors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //EXTRA REDUCERS FOR CREATE POSITION MONITORS
    builder.addCase(createPositionGroupMonitor.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(createPositionGroupMonitor.rejected, (state) => {
      state.isPending = false;
    });
    builder.addCase(createPositionGroupMonitor.fulfilled, (state, action) => {
      const monitor = action.payload.data;
      state.data.push(monitor);
      state.isPending = false;
    });
    //EXTRA REDUCERS FOR FETCH POSITION MONITORS
    builder.addCase(fetchPositionGroupMonitors.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPositionGroupMonitors.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchPositionGroupMonitors.fulfilled, (state, action) => {
      const monitors = action.payload.data.result;
      state.data = monitors;
      state.loading = false;
    });
    //EXTRA REDUCERS FOR PATCH POSITION MONITOR
    builder.addCase(fetchPositionGroupMonitors.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(fetchPositionGroupMonitors.rejected, (state) => {
      state.isPending = false;
    });
    builder.addCase(fetchPositionGroupMonitors.fulfilled, (state, action) => {
      const monitor = action.payload.data;

      const index = 0;
      state.data[index] = monitor;

      state.loading = false;
    });
    //EXTRA REDUCERS FOR DELETE POSITION MONITOR
    builder.addCase(fetchPositionGroupMonitors.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(fetchPositionGroupMonitors.rejected, (state) => {
      state.isPending = false;
    });
    builder.addCase(fetchPositionGroupMonitors.fulfilled, (state, action) => {
      const monitor = action.payload.data;

      const index = 0;
      state.data.splice(index, 1);

      state.loading = false;
    });
  },
});

export default positionGroupMonitorSlice.reducer;
