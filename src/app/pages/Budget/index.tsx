import { FC, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { useActions, useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getCategories,
  selectCategories,
} from "../../store/reducers/categoriesSlice";
import { FetchStatus } from "../../models/categories";
import { setToLocalStorage } from "../../utilities/helpers";
import CategoryTabs from "../../components/CategoryTabs";
import Preloader from '../../components/Preloader';

interface BudgetProps {}

const Budget: FC<BudgetProps> = () => {
  const { categories, status } = useAppSelector(selectCategories);
  const { addCategory } = useActions();
  const dispatch = useAppDispatch();

  useEffect(() => {
    !categories.length && dispatch(getCategories());
  }, [categories.length, dispatch]);
  useEffect(() => {
    if (!categories.length) {
      [
        { id: 1, name: "Salary" },
        { id: 2, name: "Food" },
        { id: 3, name: "Going out" },
      ].map((category) => {
        setToLocalStorage(category);
        addCategory(category);
      });
    }
  }, []);
  if (status === FetchStatus.loading) return <Preloader />;
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <nav aria-label="main mailbox folders">
          <CategoryTabs categories={categories} />
        </nav>
      </Grid>
    </Grid>
  );
};

export default Budget;
