import { useTranslation } from "react-i18next";
import { Drink } from "../models/recipes.response";
import { useAppStore } from "../store/useAppStore";

interface DrinkCardProps {
  recipeDrink: Drink;
}

export const DrinkCard = ({ recipeDrink }: DrinkCardProps) => {
  const { selectRecipe, locale } = useAppStore();
  const { t } = useTranslation();
  return (
    <div className="p-5">
      <button
        className="overflow-hidden rounded-md"
        onClick={() => selectRecipe(recipeDrink.idDrink, locale)}
      >
        <img
          className=" hover:scale-125 hover:rotate-6 transition-transform "
          src={recipeDrink.strDrinkThumb}
          alt={recipeDrink.strDrink}
        />
      </button>

      <h2 className="truncate text-2xl font-bold mt-7">
        {recipeDrink.strDrink}
      </h2>
      <button
        className="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg rounded-md"
        onClick={() => selectRecipe(recipeDrink.idDrink, locale)}
      >
        {t("seeRecipeButton")}
      </button>
    </div>
  );
};
