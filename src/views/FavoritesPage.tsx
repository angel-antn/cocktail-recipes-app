import { useMemo } from "react";
import { useAppStore } from "../store/useAppStore";
import { DrinkCard } from "../components/DrinkCard";
import { useTranslation } from "react-i18next";

const FavoritesPage = () => {
  const { favorites } = useAppStore();
  const isRecipesEmpty = useMemo(() => favorites.length === 0, [favorites]);
  const { t } = useTranslation();
  return (
    <>
      <h1 className="text-6xl font-extrabold">{t("favorites")}</h1>
      {isRecipesEmpty ? (
        <p className="my-10 text-center text-2xl">{t("noFavoritesMsg")}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-16 p-5">
          {favorites.map((recipeDrink) => (
            <DrinkCard
              recipeDrink={{
                idDrink: recipeDrink.idDrink!,
                strDrink: recipeDrink.strDrink!,
                strDrinkThumb: recipeDrink.strDrinkThumb!,
              }}
              key={recipeDrink.idDrink}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default FavoritesPage;
