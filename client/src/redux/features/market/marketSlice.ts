import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

export const fetchMarket = createAsyncThunk("market/fetchMarket", async () => {
  try {
    const results = await axios.get("http://3.76.134.149:8000/api/markets");
    return results.data.results;
  } catch (error) {
    console.log(error);
  }
});

const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMarket.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMarket.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchMarket.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload as string;
    });
  },
});

export default marketSlice.reducer;
