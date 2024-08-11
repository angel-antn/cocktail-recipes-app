import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import Modal from "../components/Modal";
import { useAppStore } from "../store/useAppStore";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const Layout = () => {
  const { loadFromStorage, loadLocaleFromStorage, locale } = useAppStore();

  useEffect(() => {
    loadFromStorage();
    loadLocaleFromStorage();
  }, []);

  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(locale as string);
  }, [locale]);

  return (
    <>
      <Header />
      <main className="container mx-auto py-16">
        <Outlet />
      </main>
      <Modal />
    </>
  );
};
