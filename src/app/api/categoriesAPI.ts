import { getFromLocalStorage } from "../utilities/helpers";
import { Category } from "./../models/categories";

export const fetchCategories = () => {
  return new Promise<{ data: Category[] | [] }>((resolve) => {
    setTimeout(
      () =>
        resolve({
          data: getFromLocalStorage("categories") as Category[],
        }),
      1000
    );
  });
};
