import React, { FC, useEffect } from "react";
import { List, ListItem, Typography, Box, Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getTransactions,
  selectTransaction,
} from "../../store/reducers/transactionSlice";
import { toFormatDate } from "../../utilities/helpers";
import { selectCategories } from "../../store/reducers/categoriesSlice";
import { FetchStatus } from "../../models/categories";
import Preloader from "../Preloader";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

interface TransactionListProps {}

const TransactionList: FC<TransactionListProps> = () => {
  const { transactions, status } = useAppSelector(selectTransaction);
  const { currentCategory } = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();
  useEffect(() => {
    currentCategory && dispatch(getTransactions(currentCategory));
  }, [currentCategory, getTransactions, dispatch]);
  if (status === FetchStatus.loading) return <Preloader />;
  return (
    <Paper>
      <List>
        {transactions.map((transaction) => (
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid gray",
            }}
            key={transaction.id}
          >
            <Box>
              <Typography>{transaction.name}</Typography>
              <Box sx={{ fontSize: ".9rem", color: "gray" }}>
                {toFormatDate(transaction.date, "DD.MM.YY hh:mm")}
              </Box>
            </Box>
            <Typography
              sx={{ color: transaction.amount > 0 ? "green" : "red" }}
            >
              {transaction.amount.toFixed(2)}$
            </Typography>
          </ListItem>
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
