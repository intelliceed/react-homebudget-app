import { IconButton } from "@mui/material";
import { FC } from "react";
import { Category } from "../../models/categories";
import { ITab } from "../../models/tabs";
import AddCategoryForm from "../AddCategory";
import CategoryList from "../CategoryList";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BasicTabs from "../TabPanel";

interface CategoryTabsProps {}

const CategoryTabs: FC<CategoryTabsProps> = () => {
  const tabs: ITab[] = [
    {
      tabName: "Category",
      children: <CategoryList />,
    },
    {
      tabName: (
        <IconButton color="success" aria-label="picture" component="span">
          <AddCircleIcon />
        </IconButton>
      ),
      children: <AddCategoryForm />,
    },
  ];
  return <BasicTabs tabs={tabs} />;
};

export default CategoryTabs;
