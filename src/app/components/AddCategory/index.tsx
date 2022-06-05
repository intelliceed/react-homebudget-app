import { FC } from "react";
import { TextField, Tooltip, Button } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useActions } from "../../store/hooks";
import { Category } from "../../models/categories";
import { idGenerator, setToLocalStorage } from "../../utilities/helpers";
import { useSnackbar } from "notistack";
import SendIcon from "@mui/icons-material/Send";

interface AddCategoryProps {
  categories: Category[];
}
interface Inputs {
  category: string;
}

const AddCategoryForm: FC<AddCategoryProps> = ({ categories }) => {
  const { addCategory } = useActions();
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = ({ category }) => {
    const categoryName = category.trim();
    if (!categories.find((item) => item.name === categoryName)) {
      const categoryData = { id: idGenerator(), name: categoryName };
      setToLocalStorage(categoryData);
      addCategory(categoryData);
      enqueueSnackbar("This category has been added!", { variant: "success" });
    } else enqueueSnackbar("This category exist!", { variant: "error" });
    reset();
  };
  return (
    <form
      style={{ display: "flex", height: "30px", alignItems: "end" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Tooltip title={errors.category?.message || "this field is required"}>
        <TextField
          {...register("category", { required: true })}
          id="categoryName"
          label="category name"
          variant="standard"
        />
      </Tooltip>
      <Button
        sx={{ mx: 2 }}
        type="submit"
        color="success"
        variant="contained"
        endIcon={<SendIcon />}
      >
        add
      </Button>
    </form>
  );
};

export default AddCategoryForm;
