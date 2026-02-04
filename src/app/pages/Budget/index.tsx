import { FC } from "react";
import { Grid } from "@mui/material";
import CategoryTabs from "../../components/CategoryTabs";
import TransactionForm from "../../components/TransactionForm";
import TransactionTabs from "../../components/TransactionTabs";

interface BudgetProps {}

const Budget: FC<BudgetProps> = () => {
  return (
    <Grid sx={{ mt: 3 }} container spacing={2}>
      <Grid item xs={3}>
        <nav aria-label="main mailbox folders">
          <CategoryTabs />
        </nav>
      </Grid>
      <Grid item xs={9}>
        <TransactionForm />
        <TransactionTabs />
      </Grid>
    </Grid>
  );
};

export default Budget;
