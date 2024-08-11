export interface RecipesResponse {
  drinks: Drink[];
}

export interface Drink {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
}
