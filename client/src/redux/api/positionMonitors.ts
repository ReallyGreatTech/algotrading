import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "./apiClient";

// export const createPositionMonitor = createAsyncThunk(
//   "/monitors/positions/",

//   async (payload: { id: number; data: unknown }, { rejectWithValue }) => {
//     console.log(JSON.stringify(payload.data));

//     try {
//       const results = await apiClient.post(
//         `https://dev-api-algo.reallygreattech.com/api/monitors/positions/`,

//         {
//           category_name: "LIQUIDATION_DISTANCE",
//           evaluation_method: "ABS_DISTANCE ",
//           on_field: "direction",
//           base_value: "43",
//           on_abs_distance: "32",
//           on_method: "",
//           enabled: false,
//           category: "1",
//           subject: "2",
//         }
//       );
//       console.log(results);
//       return results.data;
//     } catch (error) {
//       console.log(error);
//       rejectWithValue("Something went wrong while creating the position Monitopr");
//     }
//   }
// );.

export const createPositionMonitor = createAsyncThunk(
  "/monitors/positions/",

  async (payload: { data: unknown }, { rejectWithValue }) => {
    console.log(JSON.stringify(payload));

    try {
      const results = await apiClient.post(
        `https://dev-api-algo.reallygreattech.com/api/monitors/positions/`,
        payload
      );
      console.log(results);
      return results.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(
        "Something went wrong while creating the position Monitor"
      );
    }
  }
);
