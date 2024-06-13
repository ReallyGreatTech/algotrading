// store.ts
import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./features/tokens/tokenSlice";
import fundingHistoryReducer from "./features/fundingHistory/fundingHistorySlice";

const store = configureStore({
  reducer: {
    token: tokenReducer,
    fundingHistory: fundingHistoryReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
