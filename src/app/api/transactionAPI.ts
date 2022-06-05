import { getFromLocalStorage } from '../utilities/helpers';
import { Transaction } from './../models/transaction';

export const fetchTransactions = () => {
  return new Promise<{ data: Transaction[] | [] }>((resolve) => {
    setTimeout(
      () =>
        resolve({
          data: getFromLocalStorage("transactions") as Transaction[],
        }),
      1000
    );
  });
};