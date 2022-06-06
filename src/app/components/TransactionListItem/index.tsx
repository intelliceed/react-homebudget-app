import { FC } from "react";
import { ListItem, Box, Typography } from "@mui/material";
import { Transaction } from "../../models/transaction";
import { toFormatDate } from "../../utilities/helpers";

interface TransactionListItemProps {
  transaction: Transaction;
}

const TransactionListItem: FC<TransactionListItemProps> = ({ transaction }) => {
  return (
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
      <Typography sx={{ color: transaction.amount > 0 ? "green" : "red" }}>
        {transaction.amount.toFixed(2)}$
      </Typography>
    </ListItem>
  );
};

export default TransactionListItem;
