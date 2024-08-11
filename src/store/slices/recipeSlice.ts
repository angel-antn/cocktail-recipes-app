import { StateCreator } from "zustand";
import {
  getCategories,
  getRecipes,
  getDrink,
} from "../../services/recipeService";
import { CategoryResponse } from "../../models/category.response";
import { SearchFilters } from "../../models/searchFilters";
import { Drink, RecipesResponse } from "../../models/recipes.response";
import { DrinkDetails } from "../../models/drink.response";
import { infoNotifiication } from "../../utils/infoNotification";

export interface RecipeSliceType {
  categories: CategoryResponse;
  recipes: RecipesResponse;
  selectedRecipe?: DrinkDetails;
  modal: boolean;
  fetchCategories: () => Promise<void>;
  fetchRecipes: (searchFilters: SearchFilters) => Promise<void>;
  selectRecipe: (id: Drink["idDrink"], locale: "en" | "es") => Promise<void>;
  closeModal: () => void;
}

export const createRecipeSlice: StateCreator<RecipeSliceType> = (set) => ({
  categories: { drinks: [] },
  recipes: { drinks: [] },
  selectedRecipe: undefined,
  modal: false,
  fetchCategories: async () => {
    const categories = await getCategories();
    set({
      categories,
    });
  },
  fetchRecipes: async (searchFilters) => {
    const recipes = await getRecipes(searchFilters);
    set({
      recipes,
    });
  },
  selectRecipe: async (id, locale) => {
    infoNotifiication(
      locale === "es" ? "Mostrando receta..." : "Showing recipe..."
    );
    const recipe = await getDrink(id, locale);
    set({
      selectedRecipe: recipe,
      modal: true,
    });
  },
  closeModal: () => {
    set({
      modal: false,
    });
  },
});
