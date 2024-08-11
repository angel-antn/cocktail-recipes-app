import axios from "axios";
import { CategoryResponse } from "../models/category.response";
import { SearchFilters } from "../models/searchFilters";
import { Drink, RecipesResponse } from "../models/recipes.response";
import { DrinkDetails, DrinkResponse } from "../models/drink.response";
import translate from "translate";

export const getCategories = async () => {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

  const { data } = await axios.get(url);

  const result = data as CategoryResponse;

  return result;
};

export const getRecipes = async (searchFilters: SearchFilters) => {
  let url: string;

  if (searchFilters.mode == "i") {
    url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchFilters.ingredient}`;
  } else {
    url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${searchFilters.category}`;
  }

  const { data } = await axios.get(url);

  const result = data as RecipesResponse;

  return result;
};

export const getDrink = async (
  id: Drink["idDrink"],
  locale: "en" | "es" = "en"
) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  const { data } = await axios.get(url);

  const result = data as DrinkResponse;

  if (locale === "es") {
    for (let i = 1; i <= 15; i++) {
      const ingredient =
        result.drinks[0][`strIngredient${i}` as keyof DrinkDetails];
      if (ingredient) {
        result.drinks[0][`strIngredient${i}` as keyof DrinkDetails] =
          await translate(ingredient as string, "es");
      }

      const measure = result.drinks[0][`strMeasure${i}` as keyof DrinkDetails];
      if (measure) {
        result.drinks[0][`strMeasure${i}` as keyof DrinkDetails] =
          await translate(measure as string, "es");
      }
    }

    const instructions = result.drinks[0].strInstructions;
    result.drinks[0].strInstructions = await translate(
      instructions as string,
      "es"
    );
  }

  return result.drinks[0];
};
