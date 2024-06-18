import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// interface FundingHistory {
//   id: number;
//   exchange: string;
//   token: string;
//   origin_funding: number;
//   hourly_funding: number;
//   daily_funding: number;
//   annual_funding: number;
//   timestamp: string;
//   trading_pair: number;
// }
interface FundingHistory {
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

interface RowParams {
  token: string;
  exchange: string;
}

interface SelectedFundingHistoryState {
  loading: boolean;
  data: FundingHistory[];
  error: string;
}

const initialState = {
  loading: false,
  data: [],
  error: "",
} as SelectedFundingHistoryState;

export const fetchSelectedFundingHistory = createAsyncThunk(
  "selectedFundingHistory/fetchselectedFundingHistory",
  async ({ token, exchange }: RowParams) => {
    console.log("Token", token, "Exchange:", exchange);
    try {
      const response = await axios.get(
        "http://3.76.134.149:8000/api/funding-history",
        {
          params: {
            token,
            exchange,
          },
        }
      );

      return response.data.results;
    } catch (error) {
      console.log(error);
    }
  }
);

const selectedFundingHistory = createSlice({
  name: "selectedFundingHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSelectedFundingHistory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSelectedFundingHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(fetchSelectedFundingHistory.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error as string;
    });
  },
});

export default selectedFundingHistory.reducer;
