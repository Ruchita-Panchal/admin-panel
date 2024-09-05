import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation files (you will create these files in Step 3)
import en from "./locales/en/translation.json";
import es from "./locales/es/translation.json";

i18n
  .use(LanguageDetector) // Automatically detects user's language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources: {
      en: {
        translation: en,
      },
      es: {
        translation: es,
      },
    },
    fallbackLng: "en", // Default language
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
    // lng: "en",
  });

export default i18n;
