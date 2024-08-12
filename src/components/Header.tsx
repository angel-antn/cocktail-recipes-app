import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { errorNotifiication } from "../utils/errorNotification";
import { SearchFilters } from "../models/searchFilters";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { pathname } = useLocation();

  const { fetchCategories, categories, fetchRecipes, locale, setLocale } =
    useAppStore();

  const isHome = useMemo(() => pathname === "/", [pathname]);

  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    ingredient: "",
    category: "",
    mode: "i",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      (searchFilters.mode === "i" && searchFilters.ingredient === "") ||
      (searchFilters.mode === "c" && searchFilters.category === "")
    ) {
      errorNotifiication(t("requiredFieldsValidation"));
      return;
    }
    fetchRecipes(searchFilters, locale);
  };

  const { t } = useTranslation();

  return (
    <header
      className={isHome ? "bg-header bg-center bg-cover" : "bg-amber-800"}
    >
      <div className="mx-auto container px-5 py-8">
        <div className="flex justify-between items-center">
          <div>
            <img src="logo.svg" alt="logo" className="w-32" />
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:gap-8 items-end">
            <nav className="flex gap-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-yellow-200" : "text-white"
                  } uppercase font-bold`
                }
              >
                {t("home")}
              </NavLink>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-yellow-200" : "text-white"
                  } uppercase font-bold`
                }
              >
                {t("favorites")}
              </NavLink>
            </nav>
            <div className="flex gap-4">
              <button
                className={`${
                  locale === "en" ? "text-yellow-200" : "text-white"
                } uppercase font-bold`}
                onClick={() => setLocale("en")}
              >
                EN
              </button>
              <button
                className={`${
                  locale === "es" ? "text-yellow-200" : "text-white"
                } uppercase font-bold`}
                onClick={() => setLocale("es")}
              >
                ES
              </button>
            </div>
          </div>
        </div>
        {isHome && (
          <form
            className="md:w-4/5  lg:w-3/5 xl:w-2/5 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
            onSubmit={submitForm}
          >
            <div className="flex gap-5 flex-col md:flex-row items-center">
              <h2 className="text-white uppercase font-extrabold text-lg">
                {t("searchBy")}
              </h2>
              <div className="flex flex-col md:flex-row gap-1">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSearchFilters({ ...searchFilters, mode: "i" });
                  }}
                  className={`text-white uppercase font-extrabold text-lg ${
                    searchFilters.mode === "i" && "bg-orange-500"
                  } px-5 py-3 hover:bg-orange-500 rounded-lg`}
                >
                  {t("ingredients")}
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSearchFilters({ ...searchFilters, mode: "c" });
                  }}
                  className={`text-white uppercase font-extrabold text-lg ${
                    searchFilters.mode === "c" && "bg-orange-500"
                  } px-5 py-3 hover:bg-orange-500 rounded-lg`}
                >
                  {t("category")}
                </button>
              </div>
            </div>

            {searchFilters.mode === "i" && (
              <div>
                <label
                  className="block text-white uppercase font-extrabold text-lg"
                  htmlFor="ingredient"
                >
                  {`${t("ingredients")}:`}
                </label>
                <input
                  type="text"
                  name="ingredient"
                  id="ingredient"
                  className="p-3 w-full rounded-lg focus:outline-none"
                  placeholder={t("ingredientsHelperText")}
                  value={searchFilters.ingredient}
                  onChange={handleChange}
                />
              </div>
            )}

            {searchFilters.mode === "c" && (
              <div>
                <label
                  className="block text-white uppercase font-extrabold text-lg"
                  htmlFor="category"
                >
                  {`${t("category")}:`}
                </label>
                <select
                  name="category"
                  id="category"
                  className="p-3 w-full rounded-lg focus:outline-none"
                  value={searchFilters.category}
                  onChange={handleChange}
                >
                  <option value="">-- Seleccione --</option>
                  {categories.drinks.map((drink) => (
                    <option value={drink.strCategory} key={drink.strCategory}>
                      {drink.strCategory}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value={t("searchButton")}
              className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-3 uppercase rounded-lg"
            />
          </form>
        )}
      </div>
    </header>
  );
};
