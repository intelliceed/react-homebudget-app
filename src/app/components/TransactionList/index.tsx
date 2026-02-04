import { FC, useEffect } from "react";
import { List, Typography, Box, Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getTransactions,
  selectTransaction,
} from "../../store/reducers/transactionSlice";
import { selectCategories } from "../../store/reducers/categoriesSlice";
import { FetchStatus } from "../../models/categories";
import Preloader from "../Preloader";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import TransactionListItem from "../TransactionListItem";

interface TransactionListProps {}

const TransactionList: FC<TransactionListProps> = () => {
  const { transactions, status } = useAppSelector(selectTransaction);
  const { currentCategory } = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();
  useEffect(() => {
    currentCategory && dispatch(getTransactions(currentCategory));
  }, [currentCategory, dispatch]);
  if (status === FetchStatus.loading) return <Preloader />;
  return (
    <Paper>
      <List>
        {transactions.map((transaction) => (
          <TransactionListItem transaction={transaction} />
        ))}
      </List>
      <Box sx={{ display: "flex", p: 1 }}>
        <Typography sx={{ color: "green", display: "flex", mr: 1 }}>
          <ArrowCircleUpIcon color="success" /> Income:
          {transactions.filter((item) => item.amount > 0).length} =
          {transactions
            .filter((item) => item.amount > 0)
            .reduce((acc, cur) => (acc += cur.amount), 0)}
          $
        </Typography>
        <Typography sx={{ color: "red", display: "flex" }}>
          <ArrowCircleDownIcon color="error" /> Outcome:
          {transactions.filter((item) => item.amount < 0).length} =
          {transactions
            .filter((item) => item.amount < 0)
            .reduce((acc, cur) => (acc += cur.amount), 0)}
          $
        </Typography>
      </Box>
    </Paper>
  );
};

export default TransactionList;
