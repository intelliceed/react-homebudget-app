import { FC } from "react";
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Category } from "../../models/categories";
import ClearIcon from "@mui/icons-material/Clear";
import ClassIcon from "@mui/icons-material/Class";
import { useActions, useAppSelector } from "../../store/hooks";
import {
  removeFromLocalStorage,
  setToLocalStorage,
} from "../../utilities/helpers";
import { selectTransaction } from "../../store/reducers/transactionSlice";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem: FC<CategoryItemProps> = ({ category }) => {
  const { removeCategory, setCurrentCategory, removeTransaction } =
    useActions();
  const { transactions } = useAppSelector(selectTransaction);
  const toArchive = () => {
    transactions.map((transaction) => {
      removeFromLocalStorage(transaction.id, "transactions");
      setToLocalStorage(transaction, "archive");
      removeTransaction(transaction.id);
    });
  };
  const onRemove = () => {
    removeFromLocalStorage(category.id, "categories");
    removeCategory(category.id);
    toArchive();
  };
  const onSetCategory = () => {
    setCurrentCategory(category.id);
  };
  return (
    <ListItem
      sx={{ borderBottom: "1px solid gray" }}
      key={category.id}
      disablePadding
    >
      <ListItemButton onClick={onSetCategory}>
        <ListItemIcon>
          <ClassIcon />
        </ListItemIcon>
        <ListItemText primary={category.name} />
      </ListItemButton>
      <IconButton
        onClick={onRemove}
        color="success"
        aria-label="picture"
        component="span"
      >
        <ClearIcon />
      </IconButton>
    </ListItem>
  );
};

export default CategoryItem;
