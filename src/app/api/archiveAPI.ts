import { Transaction } from "../models/transaction";
import { parseLocalData } from "../utilities/helpers";

export const fetchArchivedTransactions = () => {
    return new Promise<{ data: Transaction[] | [] }>((resolve) => {
      setTimeout(
        () =>
          resolve({
            data: parseLocalData("archive") as Transaction[],
          }),
        1000
      );
    });
  };