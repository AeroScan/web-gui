/* INTERNATIONALIZATION */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

/* TRANSLATIONS */
import ptTranslations from "../utils/locales/pt.json";
import enTranslations from "../utils/locales/en.json";

i18n.use(initReactI18next).init({
  lng: "pt",
  debug: true,
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    pt: { translation: ptTranslations },
    en: { translation: enTranslations },
  },
});

export default i18n;
