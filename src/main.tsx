import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AppRouter } from "./router";
import "./i18n/i18n";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRouter />
    <ToastContainer />
  </React.StrictMode>
);
