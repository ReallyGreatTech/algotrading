// store.ts
import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./features/tokens/tokenSlice";
import fundingHistoryReducer from "./features/fundingHistory/fundingHistorySlice";
import marketReducer from "./features/market/marketSlice";
import timeFilterReducer from "./features/timeFilter/timeFilter";

const store = configureStore({
  reducer: {
    token: tokenReducer,
    fundingHistory: fundingHistoryReducer,
    market: marketReducer,
    timefilter: timeFilterReducer
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
