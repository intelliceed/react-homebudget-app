import { categoriesSlice } from "./categoriesSlice";
import { transactionSlice } from "./transactionSlice";

export default {
  categories: categoriesSlice.reducer,
  transactions: transactionSlice.reducer
};
