import { createSlice } from "@reduxjs/toolkit";
import {
  createPositionGroupMonitor,
  deletePositionGroupMonitor,
  fetchPositionGroupMonitors,
  updatePositionGroupMonitor,
} from "../../api/positionGroupMonitors";
import { PositionGroupMonitor } from "../../../types";

interface PositionGroupMonitorsState {
  loading: boolean;
  isPending: boolean;
  data: PositionGroupMonitor[];
}

const initialState: PositionGroupMonitorsState = {
  loading: false,
  isPending: false,
  data: [],
};

const positionGroupMonitorSlice = createSlice({
  name: "positionGroupMonitors",
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
      if (action.payload) state.data.push(action.payload);

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
      if (action.payload) state.data = action.payload;

      state.loading = false;
    });
    //EXTRA REDUCERS FOR PATCH POSITION MONITOR
    builder.addCase(updatePositionGroupMonitor.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(updatePositionGroupMonitor.rejected, (state) => {
      state.isPending = false;
    });
    builder.addCase(updatePositionGroupMonitor.fulfilled, (state, action) => {
      const monitor = action.payload;

      if (monitor) {
        const index = state.data.findIndex((m) => m.id === monitor.id);
        state.data[index] = monitor;
      }

      state.loading = false;
    });
    //EXTRA REDUCERS FOR DELETE POSITION MONITOR
    builder.addCase(deletePositionGroupMonitor.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(deletePositionGroupMonitor.rejected, (state) => {
      state.isPending = false;
    });
    builder.addCase(deletePositionGroupMonitor.fulfilled, (state, action) => {
      const monitor = action.payload;

      if (monitor) {
        const index = state.data.findIndex((m) => m.id === monitor.id);
        state.data.splice(index, 1);
      }

      state.loading = false;
    });
  },
});

export default positionGroupMonitorSlice.reducer;
