import { initReactI18next } from "react-i18next";
import translationEn from "./locales/en/translation.json";
import translationVn from "./locales/vn/translation.json";

import i18n from "i18next";

const resources = {
  en: {
    translation: translationEn,
  },
  vn: {
    translation: translationVn,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
