import { StateCreator } from "zustand";
import { DrinkDetails } from "../../models/drink.response";

export interface FavoritesSliceType {
  favorites: DrinkDetails[];
  handleClickFavorite: (recipe: DrinkDetails) => void;
  favoriteExist: (recipe: DrinkDetails) => boolean;
  loadFromStorage: () => void;
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (
  set,
  get
) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    if (get().favoriteExist(recipe)) {
      set({
        favorites: get().favorites.filter(
          (favorite) => favorite.idDrink !== recipe.idDrink
        ),
      });
    } else {
      set({ favorites: [...get().favorites, recipe] });
    }
    localStorage.setItem("favorites", JSON.stringify(get().favorites));
  },
  favoriteExist: (recipe) => {
    return get().favorites.some(
      (favorite) => favorite.idDrink === recipe.idDrink
    );
  },
  loadFromStorage: () => {
    const storedFavorites = localStorage.getItem("favorites");

    if (storedFavorites) {
      set({ favorites: JSON.parse(storedFavorites) });
    }
  },
});
