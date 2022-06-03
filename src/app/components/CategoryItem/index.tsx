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
  const { removeCategory } = useActions();
  const onRemove = (id: number) => {
    removeFromLocalStorage(id);
    removeCategory(id);
  };
  return (
    <ListItem key={category.id} disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <ClassIcon />
        </ListItemIcon>
        <ListItemText primary={category.name} />
      </ListItemButton>
      <IconButton
        onClick={() => onRemove(category.id)}
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
