import { FetchStatus } from "./../../models/categories";
import { fetchCategories } from "./../../api/categoriesAPI";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../models/categories";
import { RootState } from "../store";

interface CategoriesState {
  categories: Category[];
  status: FetchStatus.idle | FetchStatus.loading | FetchStatus.failed;
  currentCategory: number | null;
}
const initialState: CategoriesState = {
  categories: [],
  status: FetchStatus.idle,
  currentCategory: null,
};

export const getCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.unshift(action.payload);
    },
    removeCategory: (state, action: PayloadAction<number>) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    setCurrentCategory: (state, action: PayloadAction<number>) => {
      state.currentCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.status = FetchStatus.loading;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = FetchStatus.idle;
        state.categories = state.categories.concat(action.payload);
      })
      .addCase(getCategories.rejected, (state) => {
        state.status = FetchStatus.failed;
      });
  },
});

export const selectCategories = (state: RootState) => state.categories;
