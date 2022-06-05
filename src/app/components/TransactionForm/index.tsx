import { FC } from "react";
import {
  Box,
  TextField,
  Typography,
  Paper,
  Button,
  Tooltip,
} from "@mui/material";
import FormSelect from "./FormSelect";
import { SubmitHandler, useForm } from "react-hook-form";
import { Transaction } from "../../models/transaction";
import { idGenerator, setToLocalStorage } from "../../utilities/helpers";
import { useActions, useAppSelector } from "../../store/hooks";
import { useSnackbar } from "notistack";
import { selectCategories } from "../../store/reducers/categoriesSlice";

interface TransactionFormProps {}
interface Inputs {
  name: string;
  amount: string;
  categoryID: string;
}
const TransactionForm: FC<TransactionFormProps> = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { addTransaction } = useActions();
  const { currentCategory } = useAppSelector(selectCategories);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (form) => {
    const taransactionData: Transaction = {
      id: idGenerator(),
      name: form.name,
      date: Date.now(),
      amount: +form.amount,
      categoryId: +form.categoryID,
    };
    if (currentCategory && +form.categoryID === currentCategory) {
      addTransaction(taransactionData);
    }
    setToLocalStorage(taransactionData, "transactions");
    enqueueSnackbar("Transaction has been added!", { variant: "success" });
    reset();
  };
  return (
    <Paper sx={{ p: 3 }}>
      <Typography sx={{ mb: 2 }} variant="h5">
        Transactions
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: 2 }}>
          <Tooltip title={errors?.name?.message || "This field is required"}>
            <TextField
              {...register("name", { required: true })}
              sx={{ width: "65%", mr: "5%" }}
              label="Specify transaction name"
              variant="outlined"
            />
          </Tooltip>
          <Tooltip title={errors?.amount?.message || "Pls use format 0.00"}>
            <TextField
              {...register("amount", {
                required: true,
                pattern: /^-?\d+(?:\.\d{1,2})?$/,
              })}
              sx={{ width: "30%" }}
              label="Amount 0,00"
              variant="outlined"
            />
          </Tooltip>
        </Box>
        <FormSelect
          errors={errors.categoryID}
          reg={{ ...register("categoryID", { required: true }) }}
        />
        <Button
          sx={{ mt: 1, mx: "auto", display: "block" }}
          variant="contained"
          color="success"
          type="submit"
        >
          Add Transaction
        </Button>
      </form>
    </Paper>
  );
};
export default TransactionForm;
