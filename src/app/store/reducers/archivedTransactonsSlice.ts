import { FetchStatus } from "./../../models/categories";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Transaction } from "../../models/transaction";
import { fetchArchivedTransactions } from "../../api/archiveAPI";

interface ArhivedTransactionsState {
  archivedTransactions: Transaction[];
  status: FetchStatus.idle | FetchStatus.loading | FetchStatus.failed;
}
const initialState: ArhivedTransactionsState = {
  archivedTransactions: [],
  status: FetchStatus.idle,
};

export const getArchivedTransactions = createAsyncThunk(
  "archive/fetchArchivedTransactions",
  async () => {
    const response = await fetchArchivedTransactions();
    return response.data;
  }
);

export const archivedTransactionsSlice = createSlice({
  name: "TransactionArchive",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArchivedTransactions.pending, (state) => {
        state.status = FetchStatus.loading;
      })
      .addCase(getArchivedTransactions.fulfilled, (state, action) => {
        state.status = FetchStatus.idle;
        state.archivedTransactions = action.payload;
      })
      .addCase(getArchivedTransactions.rejected, (state) => {
        state.status = FetchStatus.failed;
      });
  },
});

export const selectArchivedTransactions = (state: RootState) =>
  state.archivedTransactions;
