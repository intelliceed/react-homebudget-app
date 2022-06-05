import { IconButton } from "@mui/material";
import { FC } from "react";
import { Category } from "../../models/categories";
import { ITab } from "../../models/tabs";
import AddCategoryForm from "../AddCategory";
import CategoryList from "../CategoryList";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BasicTabs from "../TabPanel";

interface CategoryTabsProps {
  categories: Category[];
}

const CategoryTabs: FC<CategoryTabsProps> = ({ categories }) => {
  const tabs: ITab[] = [
    {
      tabName: "Category",
      children: <CategoryList categories={categories} />,
    },
    {
      tabName: (
        <IconButton color="success" aria-label="picture" component="span">
          <AddCircleIcon />
        </IconButton>
      ),
      children: <AddCategoryForm categories={categories} />,
    },
  ];
  return <BasicTabs tabs={tabs} />;
};

export default CategoryTabs;
