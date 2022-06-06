import { FC, useEffect } from "react";
import { List, Paper } from "@mui/material";
import { FetchStatus } from "../../models/categories";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getArchivedTransactions,
  selectArchivedTransactions,
} from "../../store/reducers/archivedTransactonsSlice";
import Preloader from "../Preloader";
import TransactionListItem from "../TransactionListItem";

interface TransactionArchivedListProps {}

const TransactionArchivedList: FC<TransactionArchivedListProps> = () => {
  const { archivedTransactions, status } = useAppSelector(
    selectArchivedTransactions
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getArchivedTransactions());
  }, [dispatch]);
  if (status === FetchStatus.loading) return <Preloader />;
  return (
    <Paper>
      <List>
        {archivedTransactions.map((transaction) => (
          <TransactionListItem transaction={transaction} />
        ))}
      </List>
    </Paper>
  );
};

export default TransactionArchivedList;
