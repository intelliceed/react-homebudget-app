import React, { FC, useState } from "react";
import { IconButton, List, TextField } from "@mui/material";
import { Category } from "../../models/categories";
import { useActions } from "../../store/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { idGenerator, setToLocalStorage } from "../../utilities/helpers";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CategoryItem from "../CategoryItem";

interface CategoryListProps {
  categories: Category[];
}
interface Inputs {
  category: string;
}

const CategoryList: FC<CategoryListProps> = ({ categories }) => {
  const { addCategory } = useActions();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const [displayField, setDisplayField] = useState(false);
  const onDisplayField = () => {
    setDisplayField(true);
  };
  const onSubmit: SubmitHandler<Inputs> = ({ category }) => {
    const categoryName = category.trim();
    if (!categories.find((item) => item.name === categoryName)) {
      const categoryData = { id: idGenerator(), name: categoryName };
      setToLocalStorage(categoryData);
      addCategory(categoryData);
    }
    reset();
  };
  return (
    <nav aria-label="main mailbox folders">
      <IconButton
        onClick={onDisplayField}
        color="success"
        aria-label="picture"
        component="span"
      >
        <AddCircleIcon />
      </IconButton>
      {displayField && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("category", { required: true })}
            id="categoryName"
            label="categoryName"
            variant="standard"
          />
        </form>
      )}
      <List>
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </List>
    </nav>
  );
};

export default CategoryList;
