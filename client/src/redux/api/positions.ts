import {
  EditPositionsFormData,
  NewPositionsFormData,
} from "./../../types/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "./apiClient";
import { Position, PositionsGroup } from "../../types";

export const fetchPositions = createAsyncThunk(
  "tokens/fetchPositions",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get<PositionsGroup[]>(
        "https://api-algo.reallygreattech.com/api/position-groups/"
      );

      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

interface SubPositionsQueryParams {
  token?: string;
}

export const fetchSubPositions = createAsyncThunk(
  "tokens/fetchSubPositions",
  async (params: SubPositionsQueryParams = {}, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get<{ results: Position[] }>(
        "/positions",
        { params }
      );

      return data;
    }  catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const updatePosition = createAsyncThunk(
  "positions/updatePosition",
  async (
    { id, data }: { id: number; data: EditPositionsFormData },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.patch<Position>(
        `/positions/${id}/`,
        data
      );
      return response.data;
    }  catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const createPosition = createAsyncThunk(
  "positions/createPosition",
  async (data: NewPositionsFormData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post<Position>("/positions/", data);
      return response.data;
    }  catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);
