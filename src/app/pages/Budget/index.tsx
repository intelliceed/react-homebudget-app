import React, { FC, useEffect } from "react";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getCategories,
  selectCategories,
} from "../../store/reducers/categoriesSlice";
import { FetchStatus } from "../../models/categories";
import CategoryList from "../../components/CategoryList";
interface BudgetProps {}

const Budget: FC<BudgetProps> = () => {
  const { categories, status } = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    !categories.length && dispatch(getCategories());
  }, [categories.length, dispatch]);
  if (status === FetchStatus.loading) return <Box>Loading...</Box>;
  return <CategoryList categories={categories} />;
};

export default Budget;
