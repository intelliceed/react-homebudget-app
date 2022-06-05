import React, { FC } from "react";
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
import { useActions } from "../../store/hooks";
import { removeFromLocalStorage } from "../../utilities/helpers";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem: FC<CategoryItemProps> = ({ category }) => {
  const { removeCategory, setCurrentCategory } = useActions();
  const onRemove = () => {
    removeFromLocalStorage(category.id, "categories");
    removeCategory(category.id);
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
