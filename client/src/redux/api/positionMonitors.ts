import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "./apiClient";


export const createPositionMonitor = createAsyncThunk(
    "/monitors/positions/",
  
    async (payload: {id:number, data:unknown}, { rejectWithValue }) => {
     
    try {
        const results = await apiClient.post( `/monitors/positions/ ${payload.id}` , payload.data);
        console.log(results)
      return results.data;
    } catch (error) {
          console.log(error);
        rejectWithValue("Something went wrong while creating the markets");
      
    }
  }
);




