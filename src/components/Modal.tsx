import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useAppStore } from "../store/useAppStore";
import { Fragment, useMemo } from "react";
import { DrinkDetails } from "../models/drink.response";
import { successNotifiication } from "../utils/successNotification";
import { useTranslation } from "react-i18next";

export default function Modal() {
  const { t } = useTranslation();

  const {
    modal,
    closeModal,
    selectedRecipe,
    handleClickFavorite,
    favoriteExist,
    favorites,
  } = useAppStore();

  const isFavorite = useMemo(() => {
    return modal && favoriteExist(selectedRecipe!);
  }, [selectedRecipe, favorites]);

  const renderIngredients = () => {
    const ingredients: JSX.Element[] = [];
    if (selectedRecipe) {
      for (let i = 1; i <= 15; i++) {
        const ingredient =
          selectedRecipe![`strIngredient${i}` as keyof DrinkDetails];
        const measure = selectedRecipe![`strMeasure${i}` as keyof DrinkDetails];

        if (ingredient) {
          ingredients.push(
            <li key={ingredient as string}>
              {ingredient as string} {measure && `- ${measure}`}
            </li>
          );
        }
      }
    }

    return ingredients;
  };

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => closeModal()}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-xl bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                  <DialogTitle
                    as="h3"
                    className="text-gray-900 text-4xl font-extrabold my-5 text-center"
                  >
                    {selectedRecipe?.strDrink}
                  </DialogTitle>
                  <div className="overflow-hidden max-w-96 mx-auto rounded-md">
                    <img
                      src={selectedRecipe?.strDrinkThumb}
                      alt={selectedRecipe?.strDrink}
                      className=" hover:scale-125 hover:rotate-6 transition-transform w-96"
                    />
                  </div>

                  <DialogTitle
                    as="h3"
                    className="text-gray-900 text-2xl font-extrabold my-5"
                  >
                    {t("recipeIngredients")}
                  </DialogTitle>
                  {renderIngredients()}
                  <DialogTitle
                    as="h3"
                    className="text-gray-900 text-2xl font-extrabold my-5"
                  >
                    {t("recipeInstructions")}
                  </DialogTitle>
                  <p className="text-lg">{selectedRecipe?.strInstructions}</p>
                  <button
                    className="mt-10 bg-orange-400 hover:bg-orange-500 w-full p-3 font-bold text-white text-lg rounded-md"
                    onClick={() => {
                      successNotifiication(
                        isFavorite
                          ? t("removeFavoriteMsg")
                          : t("addFavoriteMsg")
                      );
                      handleClickFavorite(selectedRecipe!);
                    }}
                  >
                    {isFavorite
                      ? t("removeFavoriteButton")
                      : t("addFavoriteButton")}
                  </button>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
