import { FC, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppSelector } from "../../store/hooks";
import { selectCategories } from "../../store/reducers/categoriesSlice";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Box } from "@mui/material";

interface FormSelectProps {
  reg: UseFormRegisterReturn;
  errors: FieldError | undefined;
}

const FormSelect: FC<FormSelectProps> = ({ reg, errors }) => {
  const [categoryName, setCategoryName] = useState<string>("");
  const { categories } = useAppSelector(selectCategories);

  const handleChange = (event: SelectChangeEvent<typeof categoryName>) => {
    const {
      target: { value },
    } = event;
    setCategoryName(value);
  };

  return (
    <div>
      <InputLabel id="category-name-label">Choose category</InputLabel>
        <Select
          {...reg}
          labelId="category-name-label"
          id="category-name"
          value={categoryName}
          onChange={handleChange}
          fullWidth
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        {errors&&<Box sx={{color:'gray',mt:1}}>Pls choose category</Box>}
    </div>
  );
};
export default FormSelect;
