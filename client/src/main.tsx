import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import { store, persistor } from "./app/store"; // Ensure these are imported correctly
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
const theme = createTheme({
  typography: {
    fontFamily: ["Raleway", "sans-serif"].join(","),
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <I18nextProvider i18n={i18n}>
              <Suspense fallback={<div>Loading...</div>}>
                <App />
              </Suspense>
            </I18nextProvider>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
