import { archivedTransactionsSlice } from "../reducers/archivedTransactonsSlice";
import { categoriesSlice } from "../reducers/categoriesSlice";
import { transactionSlice } from "../reducers/transactionSlice";

export const allActionCreators = {
  ...categoriesSlice.actions,
  ...transactionSlice.actions,
  ...archivedTransactionsSlice.actions,
};
