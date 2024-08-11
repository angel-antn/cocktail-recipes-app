import { StateCreator } from "zustand";

export interface LocaleSliceType {
  locale: "es" | "en";
  setLocale: (locale: "es" | "en") => void;
  loadLocaleFromStorage: () => void;
}

export const createLocaleSlice: StateCreator<LocaleSliceType> = (set) => ({
  locale: "en",
  setLocale: (locale) => {
    set({ locale });
    localStorage.setItem("locale", locale);
  },
  loadLocaleFromStorage: () => {
    const storedLocale = localStorage.getItem("locale");

    if (storedLocale && (storedLocale == "en" || storedLocale == "es")) {
      set({ locale: storedLocale as "en" | "es" });
    }
  },
});
