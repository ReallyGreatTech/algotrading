// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export interface FundingHistory {
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

// interface FundingHistoryState {
//   loading: boolean;
//   data: FundingHistory[]; // Ensure data is correctly typed as an array of FundingHistory
//   error: string;
// }

// interface FetchFundingHistoryResponse {
//   results: FundingHistory[]; // Ensure response matches expected structure
// }

// const initialState = {
//   loading: false,
//   data: [],
//   error: "",
// } as FundingHistoryState;

// export const fetchFundingHistory = createAsyncThunk(
//   "fundingHistory/fetchFundingHistory",
//   async (token: string) => {
//     try {
//       const fundingHistory = await axios.get<FetchFundingHistoryResponse>(
//         "http://3.76.134.149:8000/api/funding-history",
//         {
//           params: { token: token },
//         }
//       );
//       return fundingHistory.data.results;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// const fundingHistorySlice = createSlice({
//   name: "fundingHistory",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchFundingHistory.pending, (state) => {
//       state.loading = true;
//       state.error = ""; // Clear error on pending
//     });
//     builder.addCase(fetchFundingHistory.fulfilled, (state, action) => {
//       state.loading = false;
//       state.data = action.payload;
//       state.error = ""; // Clear error on pending
//     });
//     builder.addCase(fetchFundingHistory.rejected, (state, action) => {
//       state.loading = false;
//       state.data = [];
//       state.error = action.error as string;
//     });
//   },
// });

// export default fundingHistorySlice.reducer;


import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
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
  data: FundingHistory[];
  error: string;
}

interface FetchFundingHistoryResponse {
  results: FundingHistory[];
}

const initialState: FundingHistoryState = {
  loading: false,
  data: [],
  error: "",
};

export const fetchFundingHistory = createAsyncThunk<
  FundingHistory[],
  string,
  { rejectValue: string }
>(
  "fundingHistory/fetchFundingHistory",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get<FetchFundingHistoryResponse>(
        "http://3.76.134.149:8000/api/funding-history",
        {
          params: { token },
        }
      );
      return response.data.results;
    } catch (error) {
      return rejectWithValue("Failed to fetch funding history");
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
    builder.addCase(fetchFundingHistory.fulfilled, (state, action: PayloadAction<FundingHistory[]>) => {
      state.loading = false;
      state.data = action.payload || []; // Ensure data is an array
      state.error = ""; // Clear error on fulfilled
    });
    builder.addCase(fetchFundingHistory.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload || "Failed to fetch data"; // Use payload error if available
    });
  },
});

export default fundingHistorySlice.reducer;
