// store.ts
import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './features/tokens/tokenSlice';
import fundingHistoryReducer from './features/fundingHistory/fundingHistorySlice';
import marketReducer from './features/market/marketSlice';
import timeFilterReducer from './features/timeFilter/timeFilter';
import selectedfundingHistoryReducer from './features/selectedfundingHistory/selectedfundingHistorySlice';
import investorActionsReducer from './features/investorActions/investorActionsSlice';
import walletReducer from './features/wallets/walletSlice';
import investorsReducer from './features/investors/investorsSlice';
import positionsReducer from './features/positions/positionsSlice';
import subPositionsReducer from './features/sub_positions/sub-positions';
import statsReducer from './features/stats/statsSlice';
import localStorageDataSlice from './features/localStorageData/localStorageDataSlice';
import marketOptionsReducer from './features/marketOptions/marketOptionsSlice';
import positionMonitorsReducer from './features/position-monitors/monitorsSlice';
import positionGroupMonitorsReducer from './features/position-group-monitors/position-group-monitor-slice';

const store = configureStore({
  reducer: {
    token: tokenReducer,
    fundingHistory: fundingHistoryReducer,
    market: marketReducer,
    marketOptions: marketOptionsReducer,
    timefilter: timeFilterReducer,
    selecetedFundingHistory: selectedfundingHistoryReducer,
    investorActions: investorActionsReducer,
    wallets: walletReducer,
    investors: investorsReducer,
    positions: positionsReducer,
    subPositions: subPositionsReducer,
    stats: statsReducer,
    localStorageMarketData: localStorageDataSlice,
    positionMonitors: positionMonitorsReducer,
    positionGroupMonitors: positionGroupMonitorsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
