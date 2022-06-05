import { categoriesSlice } from "../reducers/categoriesSlice";
import { transactionSlice } from "../reducers/transactionSlice";

export const allActionCreators = {
  ...categoriesSlice.actions,
  ...transactionSlice.actions,
};
