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

const store = configureStore({
  reducer: {
    token: tokenReducer,
    fundingHistory: fundingHistoryReducer,
    market: marketReducer,
    timefilter: timeFilterReducer,
    selecetedFundingHistory: selectedfundingHistoryReducer,
    investorActions: investorActionsReducer,
    wallets: walletReducer,
    investors: investorsReducer,
    positions: positionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
