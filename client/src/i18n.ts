// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpBackend) // Load translation files
  .use(LanguageDetector) // Detect language from the browser
  .use(initReactI18next) // Passes i18n instance to react-i18next.
  .init({
    fallbackLng: "en", // Use English as the fallback language
    debug: true,
    detection: {
      order: [
        "queryString",
        "cookie",
        "localStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["localStorage", "cookie"],
    },
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Path to the translation files
    },
  });

export default i18n;
