import { getFromLocalStorage } from "../utilities/helpers";
import { Category } from "./../models/categories";

export const fetchCategories = () => {
  return new Promise<{ data: Category[] | [] }>((resolve) => {
    setTimeout(
      () =>
        resolve({
          data: getFromLocalStorage().concat([
            { id: 1, name: "Salary" },
            { id: 2, name: "Food" },
            { id: 3, name: "Going out" },
          ]),
        }),
      1000
    );
  });
};
