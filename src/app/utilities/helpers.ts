import { Transaction } from "./../models/transaction";
import { Category } from "./../models/categories";
import moment from "moment";

export const parseLocalData = (field: string) => {
  const localData = localStorage.getItem(field);
  if (localData) {
    const data: Category[] | Transaction[] = JSON.parse(localData);
    return data;
  } else return [];
};

export const setToLocalStorage = (
  data: Category | Transaction,
  field: string
) => {
  const localData = parseLocalData(field);
  if (localData) {
    !localData.find((item) => item.id === data.id) && localData.push(data);
    localStorage.setItem(field, JSON.stringify(localData));
  } else {
    localStorage.setItem(field, JSON.stringify([data]));
  }
};
export const removeFromLocalStorage = (id: number, field: string) => {
  let localData = parseLocalData(field);
  if (localData) {
    localData = localData.filter((item) => item.id !== id);
    localStorage.setItem(field, JSON.stringify(localData));
  }
};
export const idGenerator = () => Math.round(Date.now() * Math.random());
export const toFormatDate = (miliseconds: number, format: string) => {
  return moment(miliseconds).format(format);
};
