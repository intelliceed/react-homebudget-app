import { FC } from "react";
import { List } from "@mui/material";
import { Category } from "../../models/categories";
import CategoryItem from "../CategoryItem";

interface CategoryListProps {
  categories: Category[];
}

const CategoryList: FC<CategoryListProps> = ({ categories }) => {
  return (
    <List>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </List>
  );
};

export default CategoryList;
