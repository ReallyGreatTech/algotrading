import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from './apiClient';
import { AddInvestorData, Investor, UpdateInvestorData } from '../../types';

export const fetchInvestors = createAsyncThunk(
  'tokens/fetchInvestors',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get<{ results: Investor[] }>(
        '/investors'
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addInvestor = createAsyncThunk(
  'tokens/addInvestor',
  async (data: AddInvestorData, { rejectWithValue }) => {
    try {
      const { data: investor } = await apiClient.post<Investor>(
        '/investors',
        data
      );

      return investor;
    } catch (error: unknown) {
      return rejectWithValue('An error occured while adding an investor.');
    }
  }
);

export const updateInvestor = createAsyncThunk(
  'tokens/addInvestor',
  async (updateData: UpdateInvestorData, { rejectWithValue }) => {
    try {
      const { data: investor } = await apiClient.put<Investor>(
        `/investors/${updateData.id}`,
        updateData.data
      );

      return investor;
    } catch (error: unknown) {
      return rejectWithValue('An error occured while adding an investor.');
    }
  }
);

export const deleteInvestor = createAsyncThunk(
  'tokens/deleteInvestor',
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.post<Investor>(`/investors/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue('An error occured while deleting an investor.');
    }
  }
);
