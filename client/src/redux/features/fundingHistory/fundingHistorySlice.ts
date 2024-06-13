import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

export const fetchFundingHistory = createAsyncThunk(
  "fundingHistory/fetchFundingHistory",
  async (token: string) => {
    try {
      const results = await axios.get(
        "http://3.76.134.149:8000/api/funding-history",
        {
          params: { token: token },
        }
      );
      return results.data.results;
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
    });
    builder.addCase(fetchFundingHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchFundingHistory.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload as string;
    });
  },
});

export default fundingHistorySlice.reducer;
