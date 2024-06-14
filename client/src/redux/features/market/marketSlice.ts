import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface FetchMarketParams {
  token?: string;
  annual_min_funding_rate?: number;
  funding_normalization?: number;
  min_open_interest_usd?: number;
}

const initialState = {
  loading: false,
  data: [],
  error: "",
};

export const fetchMarket = createAsyncThunk(
  "market/fetchMarket",
  async (params: FetchMarketParams = {}) => {
    console.log(params);
    try {
      const results = await axios.get("http://3.76.134.149:8000/api/markets", {
        params,
      });
      console.log("Data:", results.data);
      return results.data.results;
    } catch (error) {
      console.log(error);
    }
  }
);

const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMarket.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMarket.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchMarket.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload as string;
    });
  },
});

export default marketSlice.reducer;
