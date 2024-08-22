import { createSlice } from '@reduxjs/toolkit';
import { PositionMonitor } from '../../../types';

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
  extraReducers(builder) {},
});

export default positionMonitorsSlice.reducer;
