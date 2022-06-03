import { Category } from "./../models/categories";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

const parseLocalData = (name: string) => {
  const localData = localStorage.getItem(name);
  if (localData) {
    const data: Category[] = JSON.parse(localData);
    return data;
  } else return [];
};
export const getFromLocalStorage = () =>
  // callback: ActionCreatorWithPayload<Category, string>
  {
    const localData = parseLocalData("categories");
    return localData;
    // localData && localData.map(callback);
  };
export const setToLocalStorage = (category: Category) => {
  const localData = parseLocalData("categories");
  if (localData) {
    !localData.find((item) => item.id === category.id) &&
      localData.push(category);
    localStorage.setItem("categories", JSON.stringify(localData));
  } else {
    localStorage.setItem("categories", JSON.stringify([category]));
  }
};
export const removeFromLocalStorage = (categoryId: number) => {
  let localData = parseLocalData("categories");
  if (localData) {
    localData = localData.filter((item) => item.id !== categoryId);
    localStorage.setItem("categories", JSON.stringify(localData));
  }
};
export const idGenerator = () => Math.round(Date.now() * Math.random());
