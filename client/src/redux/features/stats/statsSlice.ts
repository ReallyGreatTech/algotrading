import { AppDispatch } from './../../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Stat } from '../../../types';
import { fetchStats } from '../../api/stats';
// import { toast } from 'react-toastify';

interface StatsState {
  loading: boolean;
  data: Stat;
  error: string;
}

const initialState: StatsState = {
  loading: true,
  data: { exchanges_count: 0, exchanges: [] },
  error: '',
};

const walletsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    statsFetched: (stats, action: PayloadAction<{ data: Stat }>) => {
      stats.data = action.payload.data;
      stats.loading = false;
    },
  },
});

export default walletsSlice.reducer;
const { statsFetched } = walletsSlice.actions;

export const fetchStatsRecurrently = () => async (dispatch: AppDispatch) => {
  const { data, status } = await fetchStats();

  if (status === 200) {
    dispatch(statsFetched({ data }));
    await new Promise((resolve) => setTimeout(resolve, 5000));

    dispatch(fetchStatsRecurrently());
  } else {
    await new Promise((resolve) => setTimeout(resolve, 100));
    dispatch(fetchStatsRecurrently());
  }

  // const exchangesWithWarnings = data.exchanges.filter(
  //   (ex) => ex.warning
  // ).length;

  // if (exchangesWithWarnings > 0)
    // toast.warning(`${exchangesWithWarnings} exchanges are not looking good.`);
};
