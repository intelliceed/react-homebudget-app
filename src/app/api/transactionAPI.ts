import { parseLocalData } from '../utilities/helpers';
import { Transaction } from './../models/transaction';

export const fetchTransactions = () => {
  return new Promise<{ data: Transaction[] | [] }>((resolve) => {
    setTimeout(
      () =>
        resolve({
          data: parseLocalData("transactions") as Transaction[],
        }),
      1000
    );
  });
};