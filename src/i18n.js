import { initReactI18next } from "react-i18next";
import {
  default as translationEn,
  default as translationVn,
} from "./Locales/en/translation.json";
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

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
