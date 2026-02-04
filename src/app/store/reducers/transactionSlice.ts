import { FetchStatus } from "./../../models/categories";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Transaction } from "../../models/transaction";
import { fetchTransactions } from "../../api/transactionAPI";

interface TransactionState {
  transactions: Transaction[];
  status: FetchStatus.idle | FetchStatus.loading | FetchStatus.failed;
}
const initialState: TransactionState = {
  transactions: [],
  status: FetchStatus.idle,
};

export const getTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (id: number) => {
    const response = await fetchTransactions();
    return response.data.filter((item) => item.categoryId === id);
  }
);

export const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
    },
    removeTransaction: (state, action: PayloadAction<number>) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.status = FetchStatus.loading;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.status = FetchStatus.idle;
        state.transactions = action.payload;
      })
      .addCase(getTransactions.rejected, (state) => {
        state.status = FetchStatus.failed;
      });
  },
});

export const selectTransaction = (state: RootState) => state.transactions;
