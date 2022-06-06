import { FC, useEffect } from "react";
import { List } from "@mui/material";
import { FetchStatus } from "../../models/categories";
import CategoryItem from "../CategoryItem";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getCategories,
  selectCategories,
} from "../../store/reducers/categoriesSlice";
import { setToLocalStorage } from "../../utilities/helpers";
import Preloader from "../Preloader";

interface CategoryListProps {}

const CategoryList: FC<CategoryListProps> = () => {
  const { categories, status } = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!categories.length) {
      dispatch(getCategories());
      [
        { id: 1, name: "Salary" },
        { id: 2, name: "Food" },
        { id: 3, name: "Going out" },
      ].map((category) => {
        setToLocalStorage(category, "categories");
      });
    }
  }, [categories.length, dispatch]);

  if (status === FetchStatus.loading) return <Preloader />;
  return (
    <List>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </List>
  );
};

export default CategoryList;
