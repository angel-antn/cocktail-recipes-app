import { useMemo } from "react";
import { useAppStore } from "../store/useAppStore";
import { DrinkCard } from "../components/DrinkCard";
import { useTranslation } from "react-i18next";

const IndexPage = () => {
  const { recipes } = useAppStore();

  const isRecipesEmpty = useMemo(
    () => !recipes.drinks || recipes.drinks.length === 0,
    [recipes]
  );

  const { t } = useTranslation();

  return (
    <>
      <h1 className="text-6xl font-extrabold px-5 mb-10">{t("recipes")}</h1>
      {isRecipesEmpty ? (
        <p className="my-10 text-center text-2xl">{t("noRecipesMsg")}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-16 p-5">
          {recipes.drinks.map((recipeDrink) => (
            <DrinkCard recipeDrink={recipeDrink} key={recipeDrink.idDrink} />
          ))}
        </div>
      )}
    </>
  );
};

export default IndexPage;
