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
    } catch (error: unknown) {
      return rejectWithValue('Something went wrong ');
    }
  }
);

export const addInvestor = createAsyncThunk(
  'tokens/addInvestor',
  async (data: AddInvestorData, {}) => {
    const { data: investor } = await apiClient.post('/investors/', data);

    return investor;
  }
);

export const updateInvestor = createAsyncThunk(
  'tokens/updateInvestor',
  async (updateData: UpdateInvestorData, { rejectWithValue }) => {
    try {
      const { data: investor } = await apiClient.patch<Investor>(
        `/investors/${updateData.id}/`,
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
      await apiClient.delete<Investor>(`/investors/${id}/`);

      return { id };
    } catch (error: unknown) {
      return rejectWithValue('An error occured while deleting an investor.');
    }
  }
);
