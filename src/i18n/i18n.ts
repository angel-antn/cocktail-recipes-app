import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        home: "Home",
        favorites: "Favorites",
        searchBy: "Search by:",
        ingredients: "Ingredients",
        category: "Category",
        ingredientsHelperText: "Ingredient. Ex: Vodka, Tequila, Coffe",
        searchButton: "Search recipes",
        recipes: "Recipes",
        seeRecipeButton: "See Recipe",
        recipeIngredients: "Ingredients and Measures",
        recipeInstructions: "Instructions",
        addFavoriteButton: "Add to favorites",
        removeFavoriteButton: "Remove from favorites",
        requiredFieldsValidation: "All fields are required",
        noRecipesMsg: "There are no results yet, use the form to find recipes",
        noFavoritesMsg: "Add your favorite recipes to see them later",
        addFavoriteMsg: "Added to favorites",
        removeFavoriteMsg: "Removed from favorites",
      },
    },
    es: {
      translation: {
        home: "Inicio",
        favorites: "Favoritos",
        searchBy: "Buscar por:",
        ingredients: "Ingredientes",
        category: "Categoría",
        ingredientsHelperText: "Ingrediente. Ej: Vodka, Tequila, Café",
        searchButton: "Buscar recetas",
        recipes: "Recetas",
        seeRecipeButton: "Ver Receta",
        recipeIngredients: "Ingredientes y Cantidades",
        recipeInstructions: "Instrucciones",
        addFavoriteButton: "Agregar a favoritos",
        removeFavoriteButton: "Eliminar de favoritos",
        requiredFieldsValidation: "Todos los campos son obligatorios",
        noRecipesMsg:
          "No hay resultados aún, utiliza el formulario para encontrar recetas",
        noFavoritesMsg: "Agrega tus recetas favoritas para verlas más adelante",
        addFavoriteMsg: "Agregado a favoritos",
        removeFavoriteMsg: "Eliminado de favoritos",
      },
    },
  },
});

export default i18n;
