import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipeSlice, RecipeSliceType } from "./slices/recipeSlice";
import {
  createFavoritesSlice,
  FavoritesSliceType,
} from "./slices/favoritesSlice";
import { createLocaleSlice, LocaleSliceType } from "./slices/localeSlice";

export const useAppStore = create<
  RecipeSliceType & FavoritesSliceType & LocaleSliceType
>()(
  devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoritesSlice(...a),
    ...createLocaleSlice(...a),
  }))
);
