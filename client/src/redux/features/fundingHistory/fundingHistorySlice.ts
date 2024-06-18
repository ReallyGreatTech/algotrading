import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface FundingHistory {
  id: number;
  exchange: string;
  token: string;
  origin_funding: number;
  hourly_funding: number;
  daily_funding: number;
  annual_funding: number;
  timestamp: string;
  trading_pair: number;
}

interface FundingHistoryState {
  loading: boolean;
  data: FundingHistory[]; // Ensure data is correctly typed as an array of FundingHistory
  error: string;
}

interface FetchFundingHistoryResponse {
  results: FundingHistory[]; // Ensure response matches expected structure
}

const initialState = {
  loading: false,
  data: [],
  error: "",
} as FundingHistoryState;

export const fetchFundingHistory = createAsyncThunk(
  "fundingHistory/fetchFundingHistory",
  async (token: string) => {
    try {
      const fundingHistory = await axios.get<FetchFundingHistoryResponse>(
        "http://3.76.134.149:8000/api/funding-history",
        {
          params: { token: token },
        }
      );
      return fundingHistory.data.results;
    } catch (error) {
      console.log(error);
    }
  }
);

const fundingHistorySlice = createSlice({
  name: "fundingHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFundingHistory.pending, (state) => {
      state.loading = true;
      state.error = ""; // Clear error on pending
    });
    builder.addCase(fetchFundingHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = ""; // Clear error on pending
    });
    builder.addCase(fetchFundingHistory.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error as string;
    });
  },
});

export default fundingHistorySlice.reducer;
