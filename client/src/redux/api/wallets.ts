import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "./apiClient";
import { Wallet, WalletItem } from "../../types";

export const fetchWallets = createAsyncThunk(
  "tokens/fetchWallets",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get<{ results: Wallet[] }>("/wallets");

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const addWallet = createAsyncThunk(
  "tokens/AddWallet",
  async (walletData: WalletItem, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.post("/wallets/", walletData);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteWallet = createAsyncThunk(
  "tokens/deleteWallet",
  async (walletId: number, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.delete("/wallets/", {
        params: {
          id: walletId,
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
